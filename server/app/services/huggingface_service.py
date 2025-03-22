import requests
import os
from dotenv import load_dotenv
import time

# Load environment variables
load_dotenv()

# Hardcoded token for development - in production, use environment variables instead
HF_API_TOKEN = os.getenv("HF_API_TOKEN")

def generate_image(prompt, model_id="runwayml/stable-diffusion-v1-5"):
    """
    Generate an image using the Hugging Face Inference API
    
    Args:
        prompt (str): The text prompt to generate an image from
        model_id (str): The model ID to use for generation
        
    Returns:
        bytes: The generated image as bytes
    """
    api_url = f"https://api-inference.huggingface.co/models/{model_id}"
    headers = {
        "Authorization": f"Bearer {HF_API_TOKEN}"
    }
    
    # Make the request to the Hugging Face API
    response = requests.post(
        api_url,
        headers=headers,
        json={"inputs": prompt}
    )
    
    # Handle different response scenarios
    if response.status_code == 200:
        return response.content
    elif response.status_code == 503:
        # Model is loading, wait and retry
        estimated_time = response.json().get("estimated_time", 20)
        print(f"Model is loading. Waiting {estimated_time} seconds...")
        time.sleep(estimated_time)
        return generate_image(prompt, model_id)  # Recursive retry
    else:
        # Handle other errors
        error_msg = f"Error: {response.status_code}, {response.text}"
        print(error_msg)
        raise Exception(error_msg)