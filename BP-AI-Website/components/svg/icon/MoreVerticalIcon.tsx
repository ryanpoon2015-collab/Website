import type { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

import { MotionSvg } from "@/types/framer_motion_types";

interface MoreVerticalIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
  nonBouncing?: boolean;
}

const MoreVerticalIcon: React.FC<MoreVerticalIconProps> = ({
  onClick,
  size = 5,
  nonBouncing = false,
}) => (
  <MotionSvg
    onClick={onClick}
    className={twMerge("sn", !nonBouncing && onClick && "cp")}
    whileTap={{ scale: !nonBouncing && onClick ? 0.85 : 1 }}
    width={size}
    viewBox="0 0 29 137"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_139_65)">
      <path
        d="M14.5 27.4375C22.0594 27.4375 28.1875 21.3094 28.1875 13.75C28.1875 6.1906 22.0594 0.0625 14.5 0.0625C6.9406 0.0625 0.8125 6.1906 0.8125 13.75C0.8125 21.3094 6.9406 27.4375 14.5 27.4375Z"
        fill="#4D4D4D"
      />
      <path
        d="M14.5 82.1875C22.0594 82.1875 28.1875 76.0594 28.1875 68.5C28.1875 60.9406 22.0594 54.8125 14.5 54.8125C6.9406 54.8125 0.8125 60.9406 0.8125 68.5C0.8125 76.0594 6.9406 82.1875 14.5 82.1875Z"
        fill="#4D4D4D"
      />
      <path
        d="M14.5 136.938C22.0594 136.938 28.1875 130.809 28.1875 123.25C28.1875 115.691 22.0594 109.562 14.5 109.562C6.9406 109.562 0.8125 115.691 0.8125 123.25C0.8125 130.809 6.9406 136.938 14.5 136.938Z"
        fill="#4D4D4D"
      />
    </g>
    <defs>
      <clipPath id="clip0_139_65">
        <rect
          width="27.375"
          height="136.875"
          fill="white"
          transform="translate(0.8125 0.0625)"
        />
      </clipPath>
    </defs>
  </MotionSvg>
);

export default MoreVerticalIcon;
