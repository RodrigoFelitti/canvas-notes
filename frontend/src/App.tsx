import { ReactFlowProvider } from '@xyflow/react';
import { Canvas } from './canvas/Canvas';
import { useCanvasPersistence } from './canvas/useCanvasPersistence';

function App() {
  useCanvasPersistence();
  return (
    <ReactFlowProvider>
      <Canvas />
    </ReactFlowProvider>
  );
}

export default App;
