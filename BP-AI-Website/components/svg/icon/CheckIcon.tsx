import type { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

import { MotionSvg } from "@/types/framer_motion_types";

interface CheckIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
  nonBouncing?: boolean;
}

const CheckIcon: React.FC<CheckIconProps> = ({
  onClick,
  size = 50,
  nonBouncing = false,
}) => {
  return (
    <MotionSvg
      onClick={onClick}
      className={twMerge("sn", !nonBouncing && onClick && "cp")}
      whileTap={{ scale: !nonBouncing && onClick ? 0.85 : 1 }}
      width={size}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.45755 26.7528L18.893 37.1158L42.3726 13.7992"
        stroke="#3EC04B"
        strokeWidth="4.23938"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </MotionSvg>
  );
};

export default CheckIcon;
