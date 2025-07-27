# Import necessary standard libraries
import os # Used for accessing environment variables
import logging # Used for logging application events and errors
import base64 # Used for encoding/decoding image data (though not directly used for encoding in this version)
import requests # Used for making HTTP requests to the NVIDIA API

# Import Flask for creating the web server and handling requests
from flask import Flask, request, jsonify
# Import CORS to handle Cross-Origin Resource Sharing, allowing the frontend to call this backend
from flask_cors import CORS
# Import dotenv to load environment variables from a .env file for easy configuration
from dotenv import load_dotenv

# Load environment variables from a .env file in the project's root directory.
# This is useful for keeping sensitive data like API keys out of the source code.
load_dotenv()

# --- Configuration ---
# Retrieve the NVIDIA API key from environment variables.
API_KEY = os.getenv("NVIDIA_API_KEY")
# If the API key is not set, raise an error to prevent the application from running without it.
if not API_KEY:
    raise RuntimeError("Missing NVIDIA_API_KEY environment variable")

# Define the base URL for the NVIDIA NIM (NVIDIA Inference Microservice) chat completions API.
NVIDIA_API_BASE_URL = "https://integrate.api.nvidia.com/v1/chat/completions"
# Specify the name of the language model to be used for generating responses.
MODEL_NAME = "google/gemma-3n-e4b-it"

# --- Flask Setup ---
# Configure basic logging to output informational messages, including timestamp, level, and message.
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
# Create an instance of the Flask web application.
app = Flask(__name__)
# Configure CORS for the Flask app. This allows web pages from a specified origin
# (retrieved from an environment variable, or "*" by default) to make requests to this server.
CORS(app, resources={r"/*": {"origins": os.getenv("FRONTEND_ORIGIN", "*")}})

# --- Helpers ---
def call_nvidia_nim(messages, model=MODEL_NAME, max_tokens=250):
    """Sends a request to the NVIDIA NIM API and returns the response."""
    # Set up the HTTP headers required for the API request, including the Authorization token.
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
    }
    
    # Construct the JSON payload with the model name, messages, token limit, and streaming disabled.
    payload = {
        "model": model,
        "messages": messages,
        "max_tokens": max_tokens,
        "stream": False, # 'stream: False' means we wait for the full response before proceeding.
    }
    
    # Log that an API call is being made.
    logging.info(f"Calling NVIDIA NIM with payload for model {model}")
    
    # Send a POST request to the NVIDIA API with the headers and payload.
    resp = requests.post(NVIDIA_API_BASE_URL, headers=headers, json=payload)
    
    # Error handling for the API request.
    try:
        # Check if the request was successful (i.e., status code 2xx). If not, raise an HTTPError.
        resp.raise_for_status()
    except requests.exceptions.HTTPError as e:
        # If an error occurs, log the status code and response text for debugging.
        logging.error(f"NVIDIA API error {resp.status_code}: {resp.text}")
        # Raise a new RuntimeError to be caught by the endpoint handler.
        raise RuntimeError(f"NVIDIA API returned {resp.status_code}") from e

    # Parse the JSON response from the API.
    data = resp.json()
    # Safely extract the message content from the nested JSON response structure.
    choice = data.get("choices", [])[0]
    # Return the generated text content, stripping any leading/trailing whitespace.
    return choice.get("message", {}).get("content", "").strip()

def prepare_messages(raw_messages):
    """
    Prepares messages for the API, handling system prompts and directly using
    base64 data URLs for multi-modal requests.
    """
    # Initialize variables to separate the system prompt from other messages.
    system_prompt_content = ""
    other_messages = []
    # Iterate through the incoming messages to find the system prompt.
    for m in raw_messages:
        if m.get("role") == "system":
            system_prompt_content = m.get("content", "")
        # Collect all user and assistant messages.
        elif m.get("role") in {"user", "assistant"}:
            other_messages.append(m)

    # If a system prompt exists, prepend it to the conversation as a formatted user message.
    # This is a common technique for models that don't have a distinct "system" role.
    if system_prompt_content:
        initial_user_message = {
            "role": "user", 
            "content": f"{system_prompt_content}\n\n--- Role-Play Instructions End ---\nLet's begin."
        }
        final_messages = [initial_user_message] + other_messages
    else:
        # If there's no system prompt, just use the user/assistant messages.
        final_messages = other_messages
    
    # Initialize the list that will hold the final, properly formatted messages for the API.
    out = []
    # Iterate through the processed messages to format them for the API.
    for m in final_messages:
        role = m.get("role")
        content_text = m.get("content", "")
        # Look for an 'imageSrc' key, which is expected to contain a base64 data URL.
        image_data_url = m.get("imageSrc") 

        # If it's a user message and it contains an image URL, format it as a multi-part message.
        if role == "user" and image_data_url:
            # The content becomes a list containing both the text and the image URL object.
            # This is the standard format for multi-modal inputs for many vision-language models.
            message_content = [
                {"type": "text", "text": content_text},
                {"type": "image_url", "image_url": {"url": image_data_url}}
            ]
            out.append({"role": "user", "content": message_content})
        # If it's a regular text message, append it directly.
        elif isinstance(content_text, str):
            out.append({"role": role, "content": content_text})
            
    # Return the list of API-ready messages.
    return out

# --- Endpoints ---
# The `/upload_image` endpoint was removed because images are now sent directly
# as base64 data URLs within the `/chat` request payload.

@app.route('/chat', methods=['POST'])
def chat():
    """Handles the main chat interaction, dialogue generation, and per-turn feedback."""
    logging.info("Received /chat request")
    # Get the JSON data from the incoming request.
    data = request.get_json(force=True) or {}
    # Extract the message history, current situation, and target language from the request data.
    messages = data.get('messages', [])
    situation = data.get('situation')
    language = data.get('language')

    # Validate that all required data is present.
    if not messages or not situation or not language:
        return jsonify({"error": "Missing messages, situation, or language data."}), 400

    # Prepare the messages for the API call using the helper function.
    prepared = prepare_messages(messages)
    # Ensure there's something to process.
    if not prepared:
        return jsonify({"error": "No user or assistant messages to process."}), 400

    # Generate the AI's dialogue response.
    try:
        # Call the NVIDIA NIM API to get the next line of dialogue.
        reply = call_nvidia_nim(prepared, max_tokens=250)
    except RuntimeError as e:
        # If the API call fails, log the error and return a server-side error response.
        logging.error(f"Error fetching LLM response: {e}")
        return jsonify({"error": "Failed to get response from LLM."}), 502

    # --- Per-Turn Feedback Generation ---
    # Initialize variables for feedback.
    feedback_sentence = ""
    color = "yellow" # Default color for feedback rating.
    # Only generate feedback if there has been at least one user turn.
    if len(prepared) > 1:
        # Get the AI's last message and the user's most recent response.
        ai_last = prepared[-2].get('content', '')
        user_last = prepared[-1]
        user_last_content = user_last.get('content', '')
        
        # Extract the text part of the user's last message, even if it's multi-modal.
        user_last_text = ""
        if isinstance(user_last_content, list):
            for part in user_last_content:
                if part.get("type") == "text":
                    user_last_text = part.get("text", "")
                    break
        elif isinstance(user_last_content, str):
            user_last_text = user_last_content
            
        # Create a detailed prompt for the LLM to generate feedback on the user's response.
        feedback_instruction_text = (
            f"Provide a short, one-sentence feedback in {language} on the user's response to the AI's last message. "
            f"AI said: '{ai_last}'. User replied: '{user_last_text}'."
        )
        
        # Prepare the content for the feedback request, starting with the text instruction.
        feedback_content_parts = [{"type": "text", "text": feedback_instruction_text}]

        # If the user's last message included an image, add it to the feedback request.
        if isinstance(user_last_content, list):
            for part in user_last_content:
                if part.get("type") == "image_url":
                    feedback_content_parts.append(part)
        
        # Determine the final content for the feedback request (either string or list of parts).
        final_feedback_content = feedback_content_parts if len(feedback_content_parts) > 1 else feedback_instruction_text
        
        # Format the feedback request messages.
        feedback_msgs = [{"role": "user", "content": final_feedback_content}]
        # Call the LLM to generate the feedback sentence.
        feedback_sentence = call_nvidia_nim(feedback_msgs, max_tokens=50)

        # --- Sentiment Analysis for Feedback Coloring ---
        # Create a prompt to classify the sentiment of the generated feedback.
        sentiment_instruction = (
            f"Classify the sentiment of the following feedback as positive, neutral, or negative. "
            f"Reply with exactly one word in English: positive, neutral, or negative. "
            f"Feedback: '{feedback_sentence}'"
        )
        # Call the LLM to get the sentiment.
        sentiment_msgs = [{"role": "user", "content": sentiment_instruction}]
        sentiment_response = call_nvidia_nim(sentiment_msgs, max_tokens=5).lower()

        # Map the sentiment response to a color for the frontend.
        if "positive" in sentiment_response:
            color = "green"
        elif "negative" in sentiment_response:
            color = "red"
        else: # "neutral" or any other response
            color = "yellow"

    # Return the final JSON response containing the AI's dialogue, feedback, and rating color.
    return jsonify({"dialogue": reply, "feedback": feedback_sentence, "rating": color})

@app.route('/evaluate', methods=['POST'])
def evaluate():
    """Generates final, comprehensive feedback on the entire conversation."""
    logging.info("Received /evaluate request")
    # Get the JSON data from the request.
    data = request.get_json(force=True) or {}
    # Extract the full message history and target language.
    messages = data.get('messages', [])
    language = data.get('language')
    
    # Validate input.
    if not messages or not language:
        return jsonify({"error": "Missing messages or language for evaluation."}), 400

    # Prepare the entire conversation history.
    prepared_history = prepare_messages(messages)

    if not prepared_history:
        return jsonify({"error": "No user or assistant messages to evaluate."}), 400
    
    # Create the detailed prompt for the final evaluation.
    evaluation_instruction = (
        f"Based on the entire conversation history provided (including any images), please provide detailed, final feedback on the user's performance. "
        "Focus ONLY on the user's messages. Do not evaluate the assistant. "
        f"Your entire response must be ONLY this feedback and nothing else, written in {language} and formatted with Markdown (e.g., bolding, bullet points)."
    )
    
    # Create the final user message that contains the evaluation instructions.
    evaluation_message = {"role": "user", "content": evaluation_instruction}
    
    # Combine the conversation history with the final evaluation prompt.
    # The LLM will use the history as context to follow the final instruction.
    messages_for_llm = prepared_history + [evaluation_message]
    
    try:
        # Call the LLM to generate the comprehensive feedback.
        feedback = call_nvidia_nim(messages_for_llm, max_tokens=400)
    except RuntimeError as e:
        # Handle API errors.
        logging.error(f"Error getting evaluation from LLM: {e}")
        return jsonify({"error": "Failed to get evaluation from LLM."}), 502

    # Return the generated feedback.
    return jsonify({"feedback": feedback})

# This block ensures the server runs only when the script is executed directly.
if __name__ == "__main__":
    # Get the port from an environment variable, defaulting to 5000.
    port = int(os.environ.get("PORT", 5000))
    # Run the Flask app, making it accessible from any IP address on the network ('0.0.0.0').
    app.run(host="0.0.0.0", port=port)
