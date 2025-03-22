from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import image_generation

app = FastAPI(title="Image Generator API", 
              description="API for generating images using Hugging Face models")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "https://soothing-tranquility-production-0f1f.up.railway.app/"],  # React dev servers
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(image_generation.router, prefix="/api", tags=["Image Generation"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Image Generator API"}



# from fastapi import FastAPI

# app = FastAPI()

# @app.get("/")
# async def read_root():
#     return {"message": "Hello, FastAPI!"}



# from fastapi import Path

# @app.get("/items/{item_id}")
# async def read_item(item_id: int = Path(..., title="The ID of the item")):
#     return {"item_id": item_id}
