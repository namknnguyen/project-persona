import os
import logging
import base64
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# --- Configuration ---
API_KEY = os.getenv("NVIDIA_API_KEY")
if not API_KEY:
    raise RuntimeError("Missing NVIDIA_API_KEY environment variable")

NVIDIA_API_BASE_URL = "https://integrate.api.nvidia.com/v1/chat/completions"
MODEL_NAME = "google/gemma-3n-e4b-it"

# --- Flask Setup ---
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# --- Helpers ---
def call_nvidia_nim(messages, model=MODEL_NAME, max_tokens=250):
    """Sends a request to the NVIDIA NIM API and returns the response."""
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
    }
    
    payload = {
        "model": model,
        "messages": messages,
        "max_tokens": max_tokens,
        "stream": False,
    }
    
    logging.info(f"Calling NVIDIA NIM with payload for model {model}")
    
    resp = requests.post(NVIDIA_API_BASE_URL, headers=headers, json=payload)
    
    try:
        resp.raise_for_status()
    except requests.exceptions.HTTPError as e:
        logging.error(f"NVIDIA API error {resp.status_code}: {resp.text}")
        raise RuntimeError(f"NVIDIA API returned {resp.status_code}") from e

    data = resp.json()
    choice = data.get("choices", [])[0]
    return choice.get("message", {}).get("content", "").strip()

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
        # MODIFICATION: Look for 'imageSrc' which contains the base64 data URL
        image_data_url = m.get("imageSrc") 

        if role == "user" and image_data_url:
            # Directly use the provided data URL
            message_content = [
                {"type": "text", "text": content_text},
                {"type": "image_url", "image_url": {"url": image_data_url}}
            ]
            out.append({"role": "user", "content": message_content})
        elif isinstance(content_text, str):
            out.append({"role": role, "content": content_text})
            
    return out

# --- Endpoints ---
# REMOVED: The /upload_image endpoint is no longer needed.

@app.route('/chat', methods=['POST'])
def chat():
    """Handles the main chat interaction, dialogue generation, and per-turn feedback."""
    logging.info("Received /chat request")
    data = request.get_json(force=True) or {}
    messages = data.get('messages', [])
    situation = data.get('situation')
    language = data.get('language')

    if not messages or not situation or not language:
        return jsonify({"error": "Missing messages, situation, or language data."}), 400

    prepared = prepare_messages(messages)
    if not prepared:
        return jsonify({"error": "No user or assistant messages to process."}), 400

    try:
        reply = call_nvidia_nim(prepared, max_tokens=250)
    except RuntimeError as e:
        logging.error(f"Error fetching LLM response: {e}")
        return jsonify({"error": "Failed to get response from LLM."}), 502

    feedback_sentence = ""
    color = "yellow"
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
        feedback_sentence = call_nvidia_nim(feedback_msgs, max_tokens=50)

        sentiment_instruction = (
            f"Classify the sentiment of the following feedback as positive, neutral, or negative. "
            f"Reply with exactly one word in English: positive, neutral, or negative. "
            f"Feedback: '{feedback_sentence}'"
        )
        sentiment_msgs = [{"role": "user", "content": sentiment_instruction}]
        sentiment_response = call_nvidia_nim(sentiment_msgs, max_tokens=5).lower()

        if "positive" in sentiment_response:
            color = "green"
        elif "negative" in sentiment_response:
            color = "red"
        else:
            color = "yellow"

    return jsonify({"dialogue": reply, "feedback": feedback_sentence, "rating": color})

@app.route('/evaluate', methods=['POST'])
def evaluate():
    """Generates final, comprehensive feedback on the entire conversation."""
    logging.info("Received /evaluate request")
    data = request.get_json(force=True) or {}
    messages = data.get('messages', [])
    language = data.get('language')
    
    if not messages or not language:
        return jsonify({"error": "Missing messages or language for evaluation."}), 400

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
    
    try:
        feedback = call_nvidia_nim(messages_for_llm, max_tokens=400)
    except RuntimeError as e:
        logging.error(f"Error getting evaluation from LLM: {e}")
        return jsonify({"error": "Failed to get evaluation from LLM."}), 502

    return jsonify({"feedback": feedback})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)