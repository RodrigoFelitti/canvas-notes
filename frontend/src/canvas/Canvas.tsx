import {
  ReactFlow,
  Background,
  Controls,
  useReactFlow,
} from '@xyflow/react';
import { type MouseEvent } from 'react';
import '@xyflow/react/dist/style.css';
import useCanvasStateStore from '../store/CanvasStore'
import { TextNode } from '../nodes/TextNode/TextNode';

const nodeTypes = { textNode: TextNode};

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
      type: 'textNode',
      position: { x: position.x - 90, y: position.y - 25 },
      width: 180,
      height: 50,
      data: { label: 'New node' },
    };
    
    addNode(newNode)
  }

  //TO-DO: Controls have low visibility
  return (
    <div onDoubleClick={handleDoubleClick} style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        deleteKeyCode={['Backspace', 'Delete']}
        nodeTypes={nodeTypes}
        nodeOrigin={[0, 0]}
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
