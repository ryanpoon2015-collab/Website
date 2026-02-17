import "./style.css";

import type { MouseEventHandler } from "react";
import { useEffect, useRef, useState } from "react";

import { MotionRect } from "@/types/framer_motion_types";

interface AnimatedDrawingBorderProps {
  label: string;
  px?: number;
  py?: number;
  onClick?: MouseEventHandler<HTMLDivElement>;
  rectStartingWidth?: number;
  isSelected?: boolean;
}

const AnimatedDrawingBorder: React.FC<AnimatedDrawingBorderProps> = ({
  label,
  px = 10,
  py = 2,
  rectStartingWidth = 20,
  onClick,
  isSelected = false,
}) => {
  const [svgWidth, setSvgWidth] = useState(0);
  const [svgHeight, setSvgHeight] = useState(0);

  const labelRef = useRef<HTMLDivElement | null>(null);

  // Set the width and height of the svg based on the label's width and height
  useEffect(() => {
    if (labelRef.current) {
      setSvgWidth(labelRef.current.clientWidth + px * 2);
      setSvgHeight(labelRef.current.clientHeight + py * 2);
    }
  }, [labelRef?.current?.clientWidth, labelRef?.current?.clientHeight, px, py]);

  const _rectStartingStrokeWidth = svgWidth + svgHeight - rectStartingWidth;
  const _rectEndingWidth = svgWidth + svgHeight;

  return (
    <div
      className="anim-border-svg-wrapper"
      style={{ margin: `${py * 2}px 0` }}
      onClick={onClick}
    >
      <svg
        className="anim-border-svg"
        height={svgHeight}
        width={svgWidth}
        xmlns="http://www.w3.org/2000/svg"
        style={{ border: `${isSelected ? "1.5px solid black" : "none"}` }}
      >
        <MotionRect
          key={`${rectStartingWidth} ${_rectStartingStrokeWidth} ${isSelected}`}
          className="anim-border-shape"
          height={svgHeight}
          width={svgWidth}
          initial={{
            strokeDasharray: `${rectStartingWidth} ${_rectStartingStrokeWidth}`,
            strokeDashoffset: `${rectStartingWidth / 2}`,
            strokeWidth: 1,
          }}
          whileHover={
            !isSelected
              ? {
                  strokeDasharray: `${_rectEndingWidth} 0`,
                  strokeWidth: 3,
                }
              : undefined
          }
          transition={{
            duration: 0.6,
            delay: 0,
            ease: "easeOut",
            type: "tween",
          }}
        />
      </svg>
      <div ref={labelRef} className="anim-border-text">
        {label}
      </div>
    </div>
  );
};

export default AnimatedDrawingBorder;
