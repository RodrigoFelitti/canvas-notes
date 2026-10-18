import { Canvas } from './canvas/Canvas';
import { useCanvasPersistence } from './canvas/useCanvasPersistence';

function App() {
  useCanvasPersistence();
  return <Canvas />;
}

export default App;
