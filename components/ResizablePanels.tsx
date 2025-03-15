'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import IconWithHover from './IconWithHover';

const MIN_WIDTH_VW = 24;
const MAX_WIDTH_VW = 70;
const INITIAL_WIDTH_VW = 48;

export default function ResizablePanels() {
  const [windowWidth, setWindowWidth] = useState(0);
  const x = useMotionValue(0);
  const leftWidthVw = useMotionValue(INITIAL_WIDTH_VW);

  // Update window width on mount and resize
  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };
    updateWindowWidth();
    window.addEventListener('resize', updateWindowWidth);
    return () => window.removeEventListener('resize', updateWindowWidth);
  }, []);

  // Update leftWidthVw based on drag offset
  useEffect(() => {
    if (windowWidth === 0) return;
    const unsubscribe = x.onChange((dragOffset) => {
      const deltaVw = (dragOffset / windowWidth) * 100;
      const newWidth = INITIAL_WIDTH_VW + deltaVw;
      const clampedWidth = Math.max(MIN_WIDTH_VW, Math.min(MAX_WIDTH_VW, newWidth));
      leftWidthVw.set(clampedWidth);
    });
    return () => unsubscribe();
  }, [windowWidth, x, leftWidthVw]);

  // Transform leftWidthVw to a string with 'vw' units
  const leftWidth = useTransform(leftWidthVw, (vw) => `${vw}vw`);

  // Calculate drag constraints
  const dragConstraints = useMemo(() => {
    if (windowWidth === 0) return { left: 0, right: 0 };
    const vwToPx = windowWidth / 100;
    const leftConstraint = -(INITIAL_WIDTH_VW - MIN_WIDTH_VW) * vwToPx; // -24vw in pixels
    const rightConstraint = (MAX_WIDTH_VW - INITIAL_WIDTH_VW) * vwToPx; // 22vw in pixels
    return { left: leftConstraint, right: rightConstraint };
  }, [windowWidth]);

  return (
    <main className="flex h-screen w-screen flex-col p-[0.25rem] md:flex-row md:p-[0.55rem] gap-2 md:gap-1">
      <motion.div
        className="relative h-1/2 w-full rounded-lg bg-gray-100 p-4 shadow-md md:h-full transition-[width] duration-100 ease-out"
        style={{ width: windowWidth > 768 ? leftWidth : '100%' }}
      >
        <h2 className="ml-7">Left Panel</h2>
        <IconWithHover className="absolute left-2 top-2" />
        <IconWithHover className="absolute right-2 top-2" />
        <IconWithHover className="absolute bottom-2 left-2" />
        <IconWithHover className="absolute bottom-2 right-2" />
      </motion.div>

      <motion.div
        className="h-4 w-full md:h-full md:w-1 md:cursor-ew-resize z-30 bg-gray-400 hidden md:block"
        drag="x"
        dragConstraints={dragConstraints}
        dragElastic={0}
        style={{ x }}
        role="separator"
        aria-label="Resize panels"
      />

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