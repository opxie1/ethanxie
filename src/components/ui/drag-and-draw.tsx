import React, { useCallback, useState } from 'react';
import { LinePath } from '@visx/shape';
import { useDrag } from '@visx/drag';
import { curveBasis } from '@visx/curve';
import { LinearGradient } from '@visx/gradient';

type Point = { x: number; y: number };
type Line = Point[];
type Lines = Line[];

export type DragAndDrawProps = {
  width: number;
  height: number;
  data?: Lines;
};

export const DragAndDraw = ({ data = [], width, height }: DragAndDrawProps) => {
  const [lines, setLines] = useState<Lines>(data);

  const onDragStart = useCallback(
    (currDrag: any) => {
      setLines((currLines) => [...currLines, [{ x: currDrag.x, y: currDrag.y }]]);
    },
    [],
  );

  const onDragMove = useCallback(
    (currDrag: any) => {
      setLines((currLines) => {
        const nextLines = [...currLines];
        const newPoint = { x: currDrag.x + currDrag.dx, y: currDrag.y + currDrag.dy };
        const lastIndex = nextLines.length - 1;
        if (lastIndex >= 0 && nextLines[lastIndex]) {
          nextLines[lastIndex] = [...nextLines[lastIndex], newPoint];
        } else {
          nextLines.push([newPoint]);
        }
        return nextLines;
      });
    },
    [],
  );

  const {
    x = 0,
    y = 0,
    dx,
    dy,
    isDragging,
    dragStart,
    dragEnd,
    dragMove,
  } = useDrag({
    onDragStart,
    onDragMove,
    resetOnStart: true,
  });

  if (width < 10 || height < 10) return null;

  return (
    <div className="relative touch-none">
      <svg width={width} height={height}>
        <LinearGradient id="stroke" from="hsl(var(--primary))" to="hsl(var(--accent))" />
        <rect fill="transparent" width={width} height={height} onMouseDown={dragStart} onMouseUp={dragEnd} onMouseMove={dragMove} onTouchStart={dragStart} onTouchEnd={dragEnd} onTouchMove={dragMove} />
        {lines.map((line, i) => (
          <LinePath
            key={`line-${i}`}
            fill="transparent"
            stroke="url(#stroke)"
            strokeWidth={3}
            data={line}
            curve={curveBasis}
            x={(d) => d.x}
            y={(d) => d.y}
            defined={(d) => typeof d.x === 'number' && typeof d.y === 'number'}
          />
        ))}
        <g>
          {isDragging && (
            <rect
              fill="transparent"
              width={width}
              height={height}
              onMouseUp={dragEnd}
              onMouseMove={dragMove}
              onTouchEnd={dragEnd}
              onTouchMove={dragMove}
            />
          )}
          {isDragging && (
            <g transform={`translate(${x + (dx ?? 0)}, ${y + (dy ?? 0)})`}>
              <circle cx={0} cy={0} r={4} fill="transparent" stroke="hsl(var(--foreground))" strokeWidth={1.5} />
              <circle cx={0} cy={0} r={2} fill="hsl(var(--primary))" />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
};
