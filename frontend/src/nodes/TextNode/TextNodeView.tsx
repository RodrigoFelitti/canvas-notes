import { Handle, NodeResizeControl, Position } from '@xyflow/react';
import { type CSSProperties, type RefObject } from 'react';

type TextNodeViewProps = {
  selected?: boolean;
  isEditing: boolean;
  label: string;
  contentRef: RefObject<HTMLDivElement | null>;
  onStartEditing: () => void;
  onChange: (text: string) => void;
  onFinishEditing: () => void;
};

const nodeContainer: CSSProperties = {
  width: '100%',
  height: '100%',
  padding: '8px 12px',
  border: '1px solid #777',
  borderRadius: 6,
  background: '#fff',
  boxSizing: 'border-box',
};

const resizeControl: CSSProperties = {
  background: 'transparent',
  border: 'none',
};

const resizeHandle: CSSProperties = {
  width: 6,
  height: 24,
  borderRadius: 4,
  background: '#9ca3af',
  boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.9)',
};

const textEditor: CSSProperties = {
  width: '100%',
  color: '#222',
  font: 'inherit',
  background: 'transparent',
  border: 'none',
  outline: 'none',
  resize: 'none',
  padding: 0,
  margin: 0,
  display: 'block',
  whiteSpace: 'pre-wrap',
  overflowWrap: 'anywhere',
  fieldSizing: 'content',
};

const textDisplay: CSSProperties = {
  color: '#222',
  whiteSpace: 'pre-wrap',
  overflowWrap: 'anywhere',
};

export function TextNodeView({
  selected,
  isEditing,
  label,
  contentRef,
  onStartEditing,
  onChange,
  onFinishEditing,
}: TextNodeViewProps) {
  return (
    <div
      style={nodeContainer}
      onDoubleClick={(event) => {
        event.stopPropagation();
        onStartEditing();
      }}
    >
      {selected && (
        <>
          <NodeResizeControl position="left" minWidth={120} style={resizeControl}>
            <div style={resizeHandle} />
          </NodeResizeControl>
          <NodeResizeControl position="right" minWidth={120} style={resizeControl}>
            <div style={resizeHandle} />
          </NodeResizeControl>
        </>
      )}
      <Handle type="target" position={Position.Top} />
      <div ref={contentRef}>
        {isEditing ? (
          <textarea
            className="nodrag"
            autoFocus
            value={label}
            style={textEditor}
            onChange={(event) => onChange(event.target.value)}
            onBlur={onFinishEditing}
          />
        ) : (
          <div style={textDisplay}>{label}</div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
