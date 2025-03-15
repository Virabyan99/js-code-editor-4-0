"use client";
import { useState, useEffect } from "react";
import { IconCircleDotted } from '@tabler/icons-react';
import IconWithHover from "./IconWithHover";

const MIN_WIDTH_VW = 24;
const MAX_WIDTH_VW = 70;
const INITIAL_WIDTH_VW = 48;

export default function ResizablePanel() {
  const [leftWidthVw, setLeftWidthVw] = useState(INITIAL_WIDTH_VW);
  const [windowWidth, setWindowWidth] = useState(0);

  // Update window width on mount and resize
  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };
    updateWindowWidth();
    window.addEventListener("resize", updateWindowWidth);
    return () => window.removeEventListener("resize", updateWindowWidth);
  }, []);

  // Handle divider dragging
  const handleMouseDown = (e) => {
    e.preventDefault(); // Prevent text selection
    const initialMouseX = e.clientX;
    const initialLeftWidthVw = leftWidthVw;

    const handleMouseMove = (e) => {
      e.preventDefault();
      if (windowWidth === 0) return; // Avoid division by zero
      const deltaX = e.clientX - initialMouseX; // Pixels moved
      const deltaVw = (deltaX / windowWidth) * 120; // Convert to vw
      const newLeftWidthVw = initialLeftWidthVw + deltaVw;
      const clampedWidth = Math.max(MIN_WIDTH_VW, Math.min(MAX_WIDTH_VW, newLeftWidthVw));
      setLeftWidthVw(clampedWidth);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <main className="flex h-screen w-screen flex-col p-4 md:flex-row md:p-[2vw] md:gap-1">
      <div
        className="relative h-1/2 w-full rounded-lg bg-gray-100 p-4 shadow-md md:h-full transition-[width] duration-100 ease-out"
        style={{ width: `${leftWidthVw}vw` }}
      >
        <h2 className="ml-7">Left Panel</h2>
        <IconWithHover className="absolute left-2 top-2" />
        <IconWithHover className="absolute right-2 top-2" />
        <IconWithHover className="absolute bottom-2 left-2" />
        <IconWithHover className="absolute bottom-2 right-2" />
      </div>
      <div
        className="h-4 w-full  md:h-full md:w-1 md:cursor-ew-resize hidden md:block"
        onMouseDown={handleMouseDown}
        role="separator"
        aria-label="Resize panels"
      ></div>
      <div className="relative h-1/2 w-full rounded-lg bg-gray-100 p-4 shadow-md md:h-full md:flex-1">
        <h2 className="ml-7">Right Panel</h2>
        <IconWithHover className="absolute left-2 top-2" />
        <IconWithHover className="absolute right-2 top-2" />
        <IconWithHover className="absolute bottom-2 left-2" />
        <IconWithHover className="absolute bottom-2 right-2" />
      </div>
    </main>
  );
}