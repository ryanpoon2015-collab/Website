import type { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

import { MotionSvg } from "@/types/framer_motion_types";

interface RadarOutlinedIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
  nonBouncing?: boolean;
  color?: string;
}

const RadarOutlinedIcon: React.FC<RadarOutlinedIconProps> = ({
  onClick,
  size = 36,
  nonBouncing = false,
  color = "#AAAAAA",
}) => {
  return (
    <MotionSvg
      onClick={onClick}
      className={twMerge("sn", !nonBouncing && onClick && "cp")}
      whileTap={{ scale: !nonBouncing && onClick ? 0.85 : 1 }}
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.9996 21.0559C19.6104 21.0559 20.9162 19.7501 20.9162 18.1392C20.9162 16.5284 19.6104 15.2226 17.9996 15.2226C16.3887 15.2226 15.0829 16.5284 15.0829 18.1392C15.0829 19.7501 16.3887 21.0559 17.9996 21.0559Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M29.6661 26.8892C31.5036 24.4538 32.5828 21.4205 32.5828 18.1392C32.5828 14.858 31.5036 11.8246 29.6661 9.38922"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.3328 9.38922C4.4953 11.8246 3.41614 14.858 3.41614 18.1392C3.41614 21.4205 4.4953 24.4538 6.3328 26.8892"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.9995 23.3892C26.0933 21.9309 26.7497 20.108 26.7497 18.1392C26.7497 16.1705 26.0933 14.3476 24.9995 12.8893"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.9995 12.8893C9.90578 14.3476 9.24951 16.1705 9.24951 18.1392C9.24951 20.108 9.90578 21.9309 10.9995 23.3892"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </MotionSvg>
  );
};

export default RadarOutlinedIcon;
