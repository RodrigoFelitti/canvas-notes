from fastapi import FastAPI
from pydantic import BaseModel

from storage import load_canvas, save_canvas

app = FastAPI()


class CanvasData(BaseModel):
    nodes: list = []
    edges: list = []


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.get("/api/canvas")
def get_canvas():
    return load_canvas()


@app.put("/api/canvas")
def put_canvas(canvas: CanvasData):
    save_canvas(canvas.model_dump())
    return {"status": "saved"}