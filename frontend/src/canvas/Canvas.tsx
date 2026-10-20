import {
  ReactFlow,
  Background,
  Controls,
  useReactFlow,
} from '@xyflow/react';
import { type MouseEvent } from 'react';
import '@xyflow/react/dist/style.css';
import useCanvasStateStore from '../store/CanvasStore'

export function Canvas() {

  const { screenToFlowPosition } = useReactFlow();
  const nodes = useCanvasStateStore((state) => state.nodes);
  const edges = useCanvasStateStore((state) => state.edges);
  const onNodesChange = useCanvasStateStore((state) => state.onNodesChange);
  const onEdgesChange = useCanvasStateStore((state) => state.onEdgesChange);
  const onConnect = useCanvasStateStore((state) => state.onConnect);
  const addNode = useCanvasStateStore((state) => state.addNode);

  function handleDoubleClick(event: MouseEvent<HTMLDivElement>) {
    const clickXPosition = event.clientX;
    const clickYPosition = event.clientY;

    const position = screenToFlowPosition({x: clickXPosition, y: clickYPosition })

    const newNode = {
      id: crypto.randomUUID(),
      position: position,
      data: {label: 'New node'}
    }
    
    addNode(newNode)
  }

  //TO-DO: Controls have low visibility
  return (
    <div onDoubleClick={handleDoubleClick} style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        zoomOnDoubleClick={false}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
