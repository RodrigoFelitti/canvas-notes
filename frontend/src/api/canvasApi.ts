import type { Edge, Node } from '@xyflow/react';

export type CanvasData = {
  nodes: Node[];
  edges: Edge[];
};

export async function loadCanvas(): Promise<CanvasData> {
  const response = await fetch('/api/canvas');
  if (!response.ok) throw new Error('Failed to load canvas');
  return response.json();
}

export async function saveCanvas(canvas: CanvasData): Promise<void> {
  await fetch('/api/canvas', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(canvas),
  });
}
