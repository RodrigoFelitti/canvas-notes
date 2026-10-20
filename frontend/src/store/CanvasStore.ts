import { create } from 'zustand';
import {
  type Edge,
  type Node,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from '@xyflow/react';
import { type CanvasNode } from '../types/types';

const exampleCanvasNodes: Node[] = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
  { id: '2', position: { x: 250, y: 120 }, data: { label: 'Node 2' } },
];

const exampleEdges: Edge[] = [];

export type CanvasState = {
  nodes: CanvasNode[];
  edges: Edge[];
  onNodesChange: OnNodesChange<CanvasNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  addNode: (node: CanvasNode) => void;
  setNodes: (nodes: CanvasNode[]) => void;
  setEdges: (edges: Edge[]) => void;
};

const useCanvasStateStore = create<CanvasState>((set, get) => ({
  nodes: exampleCanvasNodes,
  edges: exampleEdges,
  onNodesChange: (changes) => {
    set({ nodes: applyNodeChanges(changes, get().nodes) });
  },
  onEdgesChange: (changes) => {
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },
  onConnect: (connection) => {
    set({ edges: addEdge(connection, get().edges) });
  },
  setNodes: (nodes) => {
    set({ nodes });
  },
  setEdges: (edges) => {
    set({ edges });
  },
  addNode: (node) => {
    set({ nodes: get().nodes.concat(node) });
  },
}));

export default useCanvasStateStore;
