import { type Node, type NodeProps } from '@xyflow/react';
import { useEffect, useRef, useState } from 'react';
import useCanvasStateStore from '../../store/CanvasStore';
import { TextNodeView } from './TextNodeView';

export type TextNodeType = Node<{ label: string }, 'textNode'>;

const VERTICAL_PADDING = 16;

export function TextNode({ id, data, selected }: NodeProps<TextNodeType>) {
  const [isEditing, setIsEditing] = useState(false);
  const updateNodeText = useCanvasStateStore((state) => state.updateNodeText);
  const setNodeHeight = useCanvasStateStore((state) => state.setNodeHeight);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = contentRef.current;
    if (!element) return;

    const observer = new ResizeObserver(() => {
      setNodeHeight(id, Math.ceil(element.offsetHeight) + VERTICAL_PADDING);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [id, setNodeHeight]);

  return (
    <TextNodeView
      selected={selected}
      isEditing={isEditing}
      label={data.label}
      contentRef={contentRef}
      onStartEditing={() => setIsEditing(true)}
      onChange={(text) => updateNodeText(id, text)}
      onFinishEditing={() => setIsEditing(false)}
    />
  );
}
