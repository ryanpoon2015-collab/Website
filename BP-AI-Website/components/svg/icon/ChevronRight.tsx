import type { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

import { MotionSvg } from "@/types/framer_motion_types";

interface ChevronRightProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
  color?: string;
  className?: string;
  nonBouncing?: boolean;
  disabled?: boolean;
}

const ChevronRight: React.FC<ChevronRightProps> = ({
  onClick,
  size = 11,
  color = "black",
  className,
  nonBouncing = false,
  disabled = false,
}) => (
  <MotionSvg
    onClick={!disabled ? onClick : undefined}
    className={twMerge(
      "sn",
      !nonBouncing && onClick && "cp",
      disabled && "opacity-20 cursor-default",
      className
    )}
    whileTap={{ scale: !disabled && !nonBouncing && onClick ? 0.85 : 1 }}
    width={size}
    viewBox="0 0 53 99"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.00208 3.30371L49.5299 49.8316L3.00208 96.3594"
      stroke={color}
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </MotionSvg>
);

export default ChevronRight;
