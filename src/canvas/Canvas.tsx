import { useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  type Node,
  type Edge,
  type Connection,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const exampleCanvasData: Node[] = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
  { id: '2', position: { x: 250, y: 120 }, data: { label: 'Node 2' } },
];

const exampleEdges: Edge[] = [];

export function Canvas() {
  const [nodes, , onNodesChange] = useNodesState(exampleCanvasData);
  const [edges, setEdges, onEdgesChange] = useEdgesState(exampleEdges);

  const onConnect = useCallback(
    (connection: Connection) =>
      setEdges((currentEdges) => addEdge(connection, currentEdges)),
    [setEdges],
  );

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
