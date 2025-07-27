import os
import logging
import base64
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import torch
from PIL import Image
import io

# Load environment variables from .env file
load_dotenv()

# --- Configuration ---
MODEL_NAME = "google/gemma-3n-E2B-it"

# --- Hugging Face Imports ---
try:
    from transformers import AutoModelForCausalLM, AutoTokenizer, AutoProcessor
except ImportError:
    logging.error("Transformers not found. Please install it with: pip install --upgrade transformers")
    exit(1)

# --- Flask Setup ---
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# --- Hugging Face Model Loading ---
model, tokenizer, processor = None, None, None
try:
    logging.info(f"Loading Hugging Face model '{MODEL_NAME}'...")
    model = AutoModelForCausalLM.from_pretrained(MODEL_NAME)
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
    processor = AutoProcessor.from_pretrained(MODEL_NAME)
    logging.info("Hugging Face model loaded successfully.")
except Exception as e:
    logging.error(f"An error occurred during Hugging Face model loading: {e}", exc_info=True)

# --- Helpers ---
def prepare_messages(raw_messages):
    """
    Prepares messages for the API, handling system prompts and directly using
    base64 data URLs for multi-modal requests.
    """
    system_prompt_content = ""
    other_messages = []
    for m in raw_messages:
        if m.get("role") == "system":
            system_prompt_content = m.get("content", "")
        elif m.get("role") in {"user", "assistant"}:
            other_messages.append(m)

    if system_prompt_content:
        initial_user_message = {
            "role": "user",
            "content": f"{system_prompt_content}\n\n--- Role-Play Instructions End ---\nLet's begin."
        }
        final_messages = [initial_user_message] + other_messages
    else:
        final_messages = other_messages
    
    out = []
    for m in final_messages:
        role = m.get("role")
        content_text = m.get("content", "")
        image_data_url = m.get("imageSrc")

        if role == "user" and image_data_url:
            message_content = [
                {"type": "text", "text": content_text},
                {"type": "image_url", "image_url": {"url": image_data_url}}
            ]
            out.append({"role": "user", "content": message_content})
        elif isinstance(content_text, str):
            out.append({"role": role, "content": content_text})
            
    return out

# --- Core Hugging Face Call Function ---
def call_hf_for_multimodal(messages, max_tokens: int = 250) -> str:
    """
    Generates a response using the Hugging Face model, handling both text and images.
    """
    if not all([model, tokenizer, processor]):
        app.logger.error("Hugging Face model is not available for inference.")
        return "I'm sorry, the language model is not properly loaded and I can't respond."

    app.logger.info(f"Calling Hugging Face model with max_tokens={max_tokens}")
    try:
        # Prepare inputs for the model
        text_input = "\n".join(
            f"{msg['role']}: {msg['content'] if isinstance(msg['content'], str) else msg['content'][0]['text']}"
            for msg in messages
        )
        images = []
        for msg in messages:
            if isinstance(msg.get("content"), list):
                for part in msg["content"]:
                    if part.get("type") == "image_url":
                        # Extract base64 image data
                        image_data = part["image_url"]["url"].split(",")[1]
                        image_bytes = base64.b64decode(image_data)
                        image = Image.open(io.BytesIO(image_bytes))
                        images.append(image)

        # Process inputs using the processor
        if images:
            inputs = processor(text=text_input, images=images, return_tensors="pt")
        else:
            inputs = processor(text=text_input, return_tensors="pt")

        # Generate output
        outputs = model.generate(
            **inputs,
            max_length=max_tokens + inputs["input_ids"].shape[-1],  # Adjust for input length
            pad_token_id=tokenizer.eos_token_id,
            do_sample=False
        )
        
        app.logger.info("Successfully received response from Hugging Face.")
        
        # Decode the output
        output_text = tokenizer.decode(outputs[0], skip_special_tokens=True).strip()
        
        # Remove the prompt from the output if it's included
        if output_text.startswith(text_input):
            output_text = output_text[len(text_input):].strip()
            
        return output_text
            
    except Exception as e:
        app.logger.error(f"An error occurred in call_hf_for_multimodal: {e}", exc_info=True)
        return "I'm sorry, I encountered an error while generating a response."

# --- Main Chat Endpoint ---
@app.route('/chat', methods=['POST'])
def chat_and_evaluate():
    """ Handles the main chat conversation. """
    app.logger.info("Received request for /chat endpoint.")
    try:
        data = request.get_json()
        messages = data.get('messages')
        situation = data.get('situation')
        language = data.get('language')

        if not all([messages, situation, language]):
            return jsonify({"error": "Missing messages, situation, or language data."}), 400

        prepared = prepare_messages(messages)
        if not prepared:
            return jsonify({"error": "No user or assistant messages to process."}), 400

        dialogue_response = call_hf_for_multimodal(prepared, max_tokens=250)

        rating = "neutral"
        feedback_sentence = ""
        if len(prepared) > 1:
            ai_last = prepared[-2].get('content', '')
            user_last = prepared[-1]
            user_last_content = user_last.get('content', '')
            
            user_last_text = ""
            if isinstance(user_last_content, list):
                for part in user_last_content:
                    if part.get("type") == "text":
                        user_last_text = part.get("text", "")
                        break
            elif isinstance(user_last_content, str):
                user_last_text = user_last_content
                
            feedback_instruction_text = (
                f"Provide a short, one-sentence feedback in {language} on the user's response to the AI's last message. "
                f"AI said: '{ai_last}'. User replied: '{user_last_text}'."
            )
            
            feedback_content_parts = [{"type": "text", "text": feedback_instruction_text}]

            if isinstance(user_last_content, list):
                for part in user_last_content:
                    if part.get("type") == "image_url":
                        feedback_content_parts.append(part)
            
            final_feedback_content = feedback_content_parts if len(feedback_content_parts) > 1 else feedback_instruction_text
            
            feedback_msgs = [{"role": "user", "content": final_feedback_content}]
            feedback_sentence = call_hf_for_multimodal(feedback_msgs, max_tokens=50)

            sentiment_instruction = (
                f"Classify the sentiment of the following feedback as positive, neutral, or negative. "
                f"Reply with exactly one word in English: positive, neutral, or negative. "
                f"Feedback: '{feedback_sentence}'"
            )
            sentiment_msgs = [{"role": "user", "content": sentiment_instruction}]
            sentiment_response = call_hf_for_multimodal(sentiment_msgs, max_tokens=5).lower()

            if "positive" in sentiment_response:
                rating = "green"
            elif "negative" in sentiment_response:
                rating = "red"
            else:
                rating = "yellow"

        response_payload = {
            "dialogue": dialogue_response,
            "feedback": feedback_sentence,
            "rating": rating,
        }
        return jsonify(response_payload)

    except Exception as e:
        app.logger.error(f"An error occurred in the /chat route: {e}", exc_info=True)
        return jsonify({"error": "An internal server error occurred."}), 500

# --- Evaluation Endpoint ---
@app.route('/evaluate', methods=['POST'])
def evaluate_conversation():
    app.logger.info("Received request for /evaluate endpoint.")
    try:
        data = request.get_json()
        messages = data.get('messages')
        situation = data.get('situation')
        language = data.get('language')

        if not all([messages, situation, language]):
            return jsonify({"error": "Missing messages, situation, or language data for evaluation."}), 400

        prepared_history = prepare_messages(messages)

        if not prepared_history:
            return jsonify({"error": "No user or assistant messages to evaluate."}), 400
        
        evaluation_instruction = (
            f"Based on the entire conversation history provided (including any images), please provide detailed, final feedback on the user's performance. "
            "Focus ONLY on the user's messages. Do not evaluate the assistant. "
            f"Your entire response must be ONLY this feedback and nothing else, written in {language} and formatted with Markdown (e.g., bolding, bullet points)."
        )
        
        evaluation_message = {"role": "user", "content": evaluation_instruction}
        
        messages_for_llm = prepared_history + [evaluation_message]
        
        feedback_text = call_hf_for_multimodal(messages_for_llm, max_tokens=400)
        return jsonify({"feedback": feedback_text})
        
    except Exception as e:
        app.logger.error(f"An error occurred in the /evaluate route: {e}", exc_info=True)
        return jsonify({"error": "An internal server error occurred during final evaluation."}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)