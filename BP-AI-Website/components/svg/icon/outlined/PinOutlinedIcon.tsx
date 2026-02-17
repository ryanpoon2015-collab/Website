import type { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

import { MotionSvg } from "@/types/framer_motion_types";

interface PinOutlinedIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
  nonBouncing?: boolean;
  color?: string;
}

const PinOutlinedIcon: React.FC<PinOutlinedIconProps> = ({
  onClick,
  size = 36,
  nonBouncing = false,
  color = "#AAAAAA",
}) => {
  return (
    <MotionSvg
      className={twMerge("sn", !nonBouncing && onClick && "cp")}
      whileTap={{ scale: !nonBouncing && onClick ? 0.85 : 1 }}
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 31.2642C23.1041 26.0142 28.2083 21.3131 28.2083 15.5142C28.2083 9.71523 23.6379 5.01422 18 5.01422C12.3621 5.01422 7.79163 9.71523 7.79163 15.5142C7.79163 21.3131 12.8958 26.0142 18 31.2642Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 19.5976C20.4163 19.5976 22.375 17.6389 22.375 15.2226C22.375 12.8063 20.4163 10.8476 18 10.8476C15.5837 10.8476 13.625 12.8063 13.625 15.2226C13.625 17.6389 15.5837 19.5976 18 19.5976Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </MotionSvg>
  );
};

export default PinOutlinedIcon;
