import type { MouseEventHandler } from "react";

import { MotionSvg } from "@/types/framer_motion_types";

interface RightTriangleProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
}

const RightTriangle: React.FC<RightTriangleProps> = ({
  onClick,
  size = 125,
}) => (
  <MotionSvg
    onClick={onClick}
    width={size}
    viewBox="0 0 125 112"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M99.6584 4.49459C109.373 -3.91855 124.478 2.98224 124.478 15.8335L124.478 97C124.478 105.284 117.762 112 109.478 112H15.7552C1.86689 112 -4.56318 94.7531 5.93538 85.6611L99.6584 4.49459Z"
      fill="#21989D"
    />
  </MotionSvg>
);

export default RightTriangle;
