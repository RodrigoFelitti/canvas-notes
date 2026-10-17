import {
  ReactFlow,
  Background,
  Controls,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import useCanvasStateStore from '../store/CanvasStore'

export function Canvas() {

  const nodes = useCanvasStateStore((state) => state.nodes);
  const edges = useCanvasStateStore((state) => state.edges);
  const onNodesChange = useCanvasStateStore((state) => state.onNodesChange);
  const onEdgesChange = useCanvasStateStore((state) => state.onEdgesChange);
  const onConnect = useCanvasStateStore((state) => state.onConnect);

  //TO-DO: Controls have low visibility
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
