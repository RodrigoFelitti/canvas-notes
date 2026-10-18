import json
from pathlib import Path

DATA_DIR = Path(__file__).parent / "data"
CANVAS_FILE = DATA_DIR / "canvas.json"

EMPTY_CANVAS = {"nodes": [], "edges": []}

def load_canvas() -> dict:
    if not CANVAS_FILE.exists():
        return EMPTY_CANVAS
    return json.loads(CANVAS_FILE.read_text(encoding="utf-8"))

def save_canvas(canvas: dict) -> None:
    DATA_DIR.mkdir(exist_ok=True)
    CANVAS_FILE.write_text(json.dumps(canvas, indent=2), encoding="utf-8")