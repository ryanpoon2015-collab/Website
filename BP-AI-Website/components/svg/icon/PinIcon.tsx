import type { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

import { MotionSvg } from "@/types/framer_motion_types";

interface PinIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
  nonBouncing?: boolean;
}

const PinIcon: React.FC<PinIconProps> = ({
  onClick,
  size = 29,
  nonBouncing = false,
}) => (
  <MotionSvg
    onClick={onClick}
    className={twMerge("sn", !nonBouncing && onClick && "cp")}
    whileTap={{ scale: !nonBouncing && onClick ? 0.85 : 1 }}
    width={size}
    viewBox="0 0 29 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.5 34C20.75 27.6 27 21.8692 27 14.8C27 7.73076 21.4036 2 14.5 2C7.59645 2 2 7.73076 2 14.8C2 21.8692 8.25 27.6 14.5 34Z"
      fill="black"
      stroke="black"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.5 20C17.5377 20 20 17.5377 20 14.5C20 11.4624 17.5377 9 14.5 9C11.4623 9 9 11.4624 9 14.5C9 17.5377 11.4623 20 14.5 20Z"
      fill="white"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </MotionSvg>
);

export default PinIcon;
