# Import necessary standard libraries
import os # Used for accessing environment variables
import logging # Used for logging application events and errors
import base64 # Used for decoding base64 encoded image data
from flask import Flask, request, jsonify # Core components for building the web server
from flask_cors import CORS # Handles Cross-Origin Resource Sharing
from dotenv import load_dotenv # Loads environment variables from a .env file
import torch # The core machine learning library (dependency for Transformers)
from PIL import Image # Python Imaging Library, used to handle image data
import io # Used to handle in-memory binary streams, like image bytes

# Load environment variables from a .env file in the project's root directory.
load_dotenv()

# --- Configuration ---
# Specify the name of the Hugging Face model to be loaded locally.
MODEL_NAME = "google/gemma-3n-E2B-it"

# --- Hugging Face Imports ---
# Try to import the necessary classes from the Hugging Face transformers library.
try:
    from transformers import AutoModelForCausalLM, AutoTokenizer, AutoProcessor
# If the library isn't installed, log an error and exit the script.
except ImportError:
    logging.error("Transformers not found. Please install it with: pip install --upgrade transformers")
    exit(1)

# --- Flask Setup ---
# Configure basic logging to output informational messages, including timestamp, level, and message.
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
# Create an instance of the Flask web application.
app = Flask(__name__)
# Configure CORS to allow all origins ("*") to access this server. This is common for public APIs or during development.
CORS(app, resources={r"/*": {"origins": "*"}})

# --- Hugging Face Model Loading ---
# Initialize model, tokenizer, and processor variables to None. They will be loaded at startup.
model, tokenizer, processor = None, None, None
# Use a try-except block to handle potential errors during the model loading process.
try:
    logging.info(f"Loading Hugging Face model '{MODEL_NAME}'...")
    # Load the pre-trained model for causal language modeling (text generation).
    model = AutoModelForCausalLM.from_pretrained(MODEL_NAME)
    # Load the tokenizer, which converts text into a format the model can understand.
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
    # Load the processor, which handles both text and image preprocessing for multi-modal models.
    processor = AutoProcessor.from_pretrained(MODEL_NAME)
    logging.info("Hugging Face model loaded successfully.")
except Exception as e:
    # If any part of the loading fails, log the detailed error message.
    logging.error(f"An error occurred during Hugging Face model loading: {e}", exc_info=True)

# --- Helpers ---
def prepare_messages(raw_messages):
    """
    Prepares messages for the API, handling system prompts and directly using
    base64 data URLs for multi-modal requests. This structure is identical to the one
    used for the NVIDIA NIM API, allowing for consistent frontend data format.
    """
    # Initialize variables to separate the system prompt from other messages.
    system_prompt_content = ""
    other_messages = []
    # Iterate through the incoming messages to find and separate the system prompt.
    for m in raw_messages:
        if m.get("role") == "system":
            system_prompt_content = m.get("content", "")
        # Collect all user and assistant messages.
        elif m.get("role") in {"user", "assistant"}:
            other_messages.append(m)

    # If a system prompt exists, prepend it to the conversation as a formatted user message.
    if system_prompt_content:
        initial_user_message = {
            "role": "user",
            "content": f"{system_prompt_content}\n\n--- Role-Play Instructions End ---\nLet's begin."
        }
        final_messages = [initial_user_message] + other_messages
    else:
        # If there's no system prompt, just use the user/assistant messages.
        final_messages = other_messages
    
    # Initialize the list that will hold the final, properly formatted messages.
    out = []
    # Iterate through the processed messages to format them.
    for m in final_messages:
        role = m.get("role")
        content_text = m.get("content", "")
        # Look for an 'imageSrc' key, which contains a base64 data URL.
        image_data_url = m.get("imageSrc")

        # If it's a user message and it contains an image URL, format it as a multi-part message.
        if role == "user" and image_data_url:
            message_content = [
                {"type": "text", "text": content_text},
                {"type": "image_url", "image_url": {"url": image_data_url}}
            ]
            out.append({"role": "user", "content": message_content})
        # If it's a regular text message, append it directly.
        elif isinstance(content_text, str):
            out.append({"role": role, "content": content_text})
            
    # Return the list of prepared messages.
    return out

# --- Core Hugging Face Call Function ---
def call_hf_for_multimodal(messages, max_tokens: int = 250) -> str:
    """
    Generates a response using the Hugging Face model, handling both text and images.
    """
    # Check if the model components were loaded successfully. If not, return an error message.
    if not all([model, tokenizer, processor]):
        app.logger.error("Hugging Face model is not available for inference.")
        return "I'm sorry, the language model is not properly loaded and I can't respond."

    app.logger.info(f"Calling Hugging Face model with max_tokens={max_tokens}")
    try:
        # Prepare text and image inputs for the model from the message list.
        # Concatenate all text parts into a single string for the processor.
        text_input = "\n".join(
            f"{msg['role']}: {msg['content'] if isinstance(msg['content'], str) else msg['content'][0]['text']}"
            for msg in messages
        )
        images = []
        # Iterate through messages to find and decode any images.
        for msg in messages:
            if isinstance(msg.get("content"), list):
                for part in msg["content"]:
                    if part.get("type") == "image_url":
                        # Extract the base64 string from the data URL.
                        image_data = part["image_url"]["url"].split(",")[1]
                        # Decode the base64 string into bytes.
                        image_bytes = base64.b64decode(image_data)
                        # Open the image bytes using PIL (Python Imaging Library).
                        image = Image.open(io.BytesIO(image_bytes))
                        images.append(image)

        # Use the processor to convert text and/or images into tensors the model can understand.
        if images:
            inputs = processor(text=text_input, images=images, return_tensors="pt")
        else:
            inputs = processor(text=text_input, return_tensors="pt")

        # Generate a response from the model.
        outputs = model.generate(
            **inputs, # Unpack the processed inputs dictionary.
            max_length=max_tokens + inputs["input_ids"].shape[-1],  # Set max length relative to input size.
            pad_token_id=tokenizer.eos_token_id, # Use the end-of-sentence token for padding.
            do_sample=False # Disable sampling to get more deterministic output.
        )
        
        app.logger.info("Successfully received response from Hugging Face.")
        
        # Decode the generated token IDs back into a human-readable string.
        output_text = tokenizer.decode(outputs[0], skip_special_tokens=True).strip()
        
        # The model often includes the input prompt in its output; this code removes it.
        if output_text.startswith(text_input):
            output_text = output_text[len(text_input):].strip()
            
        return output_text
        
    except Exception as e:
        # Log any errors that occur during inference and return a user-friendly error message.
        app.logger.error(f"An error occurred in call_hf_for_multimodal: {e}", exc_info=True)
        return "I'm sorry, I encountered an error while generating a response."

# --- Main Chat Endpoint ---
@app.route('/chat', methods=['POST'])
def chat_and_evaluate():
    """ Handles the main chat conversation, including dialogue generation and per-turn feedback. """
    app.logger.info("Received request for /chat endpoint.")
    try:
        # Get JSON data from the request.
        data = request.get_json()
        messages = data.get('messages')
        situation = data.get('situation')
        language = data.get('language')

        # Validate that all required data is present.
        if not all([messages, situation, language]):
            return jsonify({"error": "Missing messages, situation, or language data."}), 400

        # Prepare messages using the helper function.
        prepared = prepare_messages(messages)
        if not prepared:
            return jsonify({"error": "No user or assistant messages to process."}), 400

        # Call the local Hugging Face model to get the dialogue response.
        dialogue_response = call_hf_for_multimodal(prepared, max_tokens=250)

        # --- Per-Turn Feedback and Rating ---
        rating = "neutral" # Default rating color.
        feedback_sentence = ""
        # Only generate feedback if there's a conversational turn to evaluate.
        if len(prepared) > 1:
            # Get the context: AI's last message and user's reply.
            ai_last = prepared[-2].get('content', '')
            user_last = prepared[-1]
            user_last_content = user_last.get('content', '')
            
            # Extract text from the user's last message (handles multi-modal case).
            user_last_text = ""
            if isinstance(user_last_content, list):
                for part in user_last_content:
                    if part.get("type") == "text":
                        user_last_text = part.get("text", "")
                        break
            elif isinstance(user_last_content, str):
                user_last_text = user_last_content
                
            # Create the prompt for generating feedback.
            feedback_instruction_text = (
                f"Provide a short, one-sentence feedback in {language} on the user's response to the AI's last message. "
                f"AI said: '{ai_last}'. User replied: '{user_last_text}'."
            )
            
            # Prepare the payload for the feedback request, including images if present.
            feedback_content_parts = [{"type": "text", "text": feedback_instruction_text}]
            if isinstance(user_last_content, list):
                for part in user_last_content:
                    if part.get("type") == "image_url":
                        feedback_content_parts.append(part)
            
            final_feedback_content = feedback_content_parts if len(feedback_content_parts) > 1 else feedback_instruction_text
            
            # Call the model again to generate the feedback sentence.
            feedback_msgs = [{"role": "user", "content": final_feedback_content}]
            feedback_sentence = call_hf_for_multimodal(feedback_msgs, max_tokens=50)

            # --- Sentiment Analysis for Feedback Coloring ---
            # Create a prompt to classify the sentiment of the feedback.
            sentiment_instruction = (
                f"Classify the sentiment of the following feedback as positive, neutral, or negative. "
                f"Reply with exactly one word in English: positive, neutral, or negative. "
                f"Feedback: '{feedback_sentence}'"
            )
            # Call the model a third time to get the sentiment.
            sentiment_msgs = [{"role": "user", "content": sentiment_instruction}]
            sentiment_response = call_hf_for_multimodal(sentiment_msgs, max_tokens=5).lower()

            # Map sentiment to a color string for the frontend.
            if "positive" in sentiment_response:
                rating = "green"
            elif "negative" in sentiment_response:
                rating = "red"
            else:
                rating = "yellow"

        # Construct the final JSON response payload.
        response_payload = {
            "dialogue": dialogue_response,
            "feedback": feedback_sentence,
            "rating": rating,
        }
        return jsonify(response_payload)

    except Exception as e:
        # Catch-all for any unexpected errors in the route.
        app.logger.error(f"An error occurred in the /chat route: {e}", exc_info=True)
        return jsonify({"error": "An internal server error occurred."}), 500

# --- Evaluation Endpoint ---
@app.route('/evaluate', methods=['POST'])
def evaluate_conversation():
    """Generates a comprehensive final evaluation of the entire conversation."""
    app.logger.info("Received request for /evaluate endpoint.")
    try:
        # Get the full conversation history from the request.
        data = request.get_json()
        messages = data.get('messages')
        situation = data.get('situation') # Included for consistency, though not used in the prompt here.
        language = data.get('language')

        # Validate input.
        if not all([messages, situation, language]):
            return jsonify({"error": "Missing messages, situation, or language data for evaluation."}), 400

        # Prepare the full history.
        prepared_history = prepare_messages(messages)

        if not prepared_history:
            return jsonify({"error": "No user or assistant messages to evaluate."}), 400
        
        # Create the final, detailed prompt for the overall evaluation.
        evaluation_instruction = (
            f"Based on the entire conversation history provided (including any images), please provide detailed, final feedback on the user's performance. "
            "Focus ONLY on the user's messages. Do not evaluate the assistant. "
            f"Your entire response must be ONLY this feedback and nothing else, written in {language} and formatted with Markdown (e.g., bolding, bullet points)."
        )
        
        # Create the final message containing the instruction.
        evaluation_message = {"role": "user", "content": evaluation_instruction}
        
        # Combine the conversation history with the final evaluation prompt.
        messages_for_llm = prepared_history + [evaluation_message]
        
        # Call the model to generate the final feedback.
        feedback_text = call_hf_for_multimodal(messages_for_llm, max_tokens=400)
        return jsonify({"feedback": feedback_text})
        
    except Exception as e:
        # Catch any errors during the evaluation process.
        app.logger.error(f"An error occurred in the /evaluate route: {e}", exc_info=True)
        return jsonify({"error": "An internal server error occurred during final evaluation."}), 500

# This block ensures the server runs only when the script is executed directly.
if __name__ == '__main__':
    # Run the Flask app with debugging enabled on port 5000.
    app.run(debug=True, port=5000)
