# canvas-notes

A local-first, infinite-canvas notes app (in the spirit of Mural / Excalidraw), built as
a personal knowledge base. Notes are stored as plain files on disk, so they can later be
consumed by a local AI (RAG).

## Stack

- **Frontend:** React + TypeScript + Vite — canvas via [React Flow](https://reactflow.dev),
  state via [Zustand](https://zustand.docs.pmnd.rs)
- **Backend:** Python + FastAPI — serves and persists the canvas as a JSON file on disk
- **Dev:** a single `npm run dev` runs both, via `concurrently` + a Vite proxy

> Note: the dev scripts currently assume Windows paths for the Python virtual environment.

## Requirements

- Node.js
- Python 3.x

## Setup

Run once after cloning.

Frontend dependencies (the repo root is only the dev orchestrator):

```bash
npm install
npm install --prefix frontend
```

Backend (Python virtual environment):

```bash
python -m venv backend/.venv
# Windows
backend\.venv\Scripts\python -m pip install -r backend/requirements.txt
# macOS/Linux
# backend/.venv/bin/python -m pip install -r backend/requirements.txt
```

## Run

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:8000 (interactive API docs at `/docs`)

The canvas is persisted to `backend/data/canvas.json`.

## Structure

```
frontend/      React app (canvas, store, api)
backend/       FastAPI app (routes, storage)
package.json   root orchestration (the single `npm run dev`)
```
