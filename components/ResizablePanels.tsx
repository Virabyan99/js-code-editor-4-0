
'use client';

import { useState, useRef, useEffect } from 'react';

const MIN_WIDTH_VW = 24;
const MAX_WIDTH_VW = 70;
const INITIAL_WIDTH_VW = 48;
const GUTTER_VW = 2;

export default function ResizablePanels() {
  const [leftWidth, setLeftWidth] = useState(INITIAL_WIDTH_VW);
  const dividerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    const totalWidth = window.innerWidth - 4 * (window.innerWidth * GUTTER_VW / 100);
    const newLeftWidth = (e.clientX / totalWidth) * 100;
    const constrainedWidth = Math.max(MIN_WIDTH_VW, Math.min(MAX_WIDTH_VW, newLeftWidth));
    setLeftWidth(constrainedWidth);
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <main className="flex h-screen w-screen flex-col p-4 md:flex-row md:p-[2vw]">
      <div
        className="h-1/2 w-full rounded-lg bg-gray-100 p-4 shadow-md md:h-full"
        style={{ width: `${leftWidth}vw` }}
      >
        <h2>Left Panel</h2>
      </div>
      <div
        ref={dividerRef}
        className="h-4 w-full bg-gray-400 md:h-full md:w-2 md:cursor-ew-resize"
        onMouseDown={handleMouseDown}
        role="separator"
        aria-label="Resize panels"
      ></div>
      <div className="h-1/2 w-full rounded-lg bg-gray-200 p-4 shadow-md md:h-full md:flex-1">
        <h2>Right Panel</h2>
      </div>
    </main>
  );
}
