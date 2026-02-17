import type { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

import { MotionSvg } from "@/types/framer_motion_types";

interface CheckCircleIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
  nonBouncing?: boolean;
}

const CheckCircleIcon: React.FC<CheckCircleIconProps> = ({
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
        d="M25 45.8334C36.5059 45.8334 45.8333 36.506 45.8333 25C45.8333 13.4941 36.5059 4.16669 25 4.16669C13.4941 4.16669 4.16666 13.4941 4.16666 25C4.16666 36.506 13.4941 45.8334 25 45.8334Z"
        stroke="#3EC04B"
        strokeWidth="3"
      />
      <path
        d="M17.7083 26.0417L21.875 30.2084L32.2917 19.7917"
        stroke="#3EC04B"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </MotionSvg>
  );
};

export default CheckCircleIcon;
