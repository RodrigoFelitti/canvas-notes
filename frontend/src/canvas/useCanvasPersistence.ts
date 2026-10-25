import { useEffect, useRef } from 'react';
import useCanvasStateStore from '../store/CanvasStore';
import { loadCanvas, saveCanvas } from '../api/canvasApi';

const SAVE_DEBOUNCE_MS = 500;

export function useCanvasPersistence() {
  const nodes = useCanvasStateStore((state) => state.nodes);
  const edges = useCanvasStateStore((state) => state.edges);
  const setNodes = useCanvasStateStore((state) => state.setNodes);
  const setEdges = useCanvasStateStore((state) => state.setEdges);

  const hasLoaded = useRef(false);

  useEffect(() => {
    loadCanvas()
      .then((canvas) => {
        setNodes(canvas.nodes);
        setEdges(canvas.edges);
        hasLoaded.current = true;
      })
      .catch((error) => console.error('Failed to load canvas', error));
  }, [setNodes, setEdges]);

  useEffect(() => {
    if (!hasLoaded.current) return;

    const timeout = setTimeout(() => {
      saveCanvas({ nodes, edges }).catch((error) =>
        console.error('Failed to save canvas', error),
      );
    }, SAVE_DEBOUNCE_MS);

    return () => clearTimeout(timeout);
  }, [nodes, edges]);
}
