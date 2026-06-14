"use client";
import { useState } from "react";
import { useId } from 'react';  // For generating unique IDs

export default function ToolTip({ children, tooltip }) {
  const [mouseOver, setMouseOver] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const tooltipId = useId(); // Unique ID for aria-describedby
  
  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <span
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      onMouseMove={handleMouseMove}
      onFocus={() => setMouseOver(true)}
      onBlur={() => setMouseOver(false)}
      className="relative cursor-default"
      aria-describedby={tooltipId}
    >
      {children}
      {mouseOver && (
        <span
          id={tooltipId}
          role="tooltip"
          style={{
            top: mousePosition.y + 10,
            left: mousePosition.x + 10,
          }}
          className="z-50 fixed pointer-events-none bg-off-black px-2 py-1 text-off-white"
          aria-live="polite"
        >
          {tooltip}
        </span>
      )}
    </span>
  );
}
