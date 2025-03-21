from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def read_root():
    return {"message": "Hello, FastAPI!"}



from fastapi import Path

@app.get("/items/{item_id}")
async def read_item(item_id: int = Path(..., title="The ID of the item")):
    return {"item_id": item_id}
