from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import io
from app.services.huggingface_service import generate_image

router = APIRouter()

class ImageRequest(BaseModel):
    prompt: str
    model_id: str = "runwayml/stable-diffusion-v1-5"  # Default model

@router.post("/generate-image")
async def create_image(request: ImageRequest):
    try:
        image_bytes = generate_image(request.prompt, request.model_id)
        
        # Return the image as a streaming response
        return StreamingResponse(
            io.BytesIO(image_bytes),
            media_type="image/png"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
        
@router.get("/available-models")
async def get_available_models():
    # You can expand this list as needed
    return {
        "models": [
            {"id": "runwayml/stable-diffusion-v1-5", "name": "Stable Diffusion v1.5"},
            {"id": "stabilityai/stable-diffusion-2-1", "name": "Stable Diffusion v2.1"},
            {"id": "CompVis/stable-diffusion-v1-4", "name": "Stable Diffusion v1.4"},
            {"id": "prompthero/openjourney", "name": "Openjourney (Midjourney Style)"}
        ]
    }