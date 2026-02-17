import type { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

import { MotionSvg } from "@/types/framer_motion_types";

interface AddIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
  nonBouncing?: boolean;
}

const AddIcon: React.FC<AddIconProps> = ({
  onClick,
  size = 35,
  nonBouncing = false,
}) => (
  <MotionSvg
    onClick={onClick}
    className={twMerge("sn", !nonBouncing && onClick && "cp")}
    whileTap={{ scale: !nonBouncing && onClick ? 0.85 : 1 }}
    width={size}
    viewBox="0 0 58 58"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="28.9999" cy="29.1516" r="28.6616" fill="#EB1C36" />
    <path
      d="M29 41.9612V16.3423"
      stroke="#FDFDFD"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.1904 29.1519H41.8093"
      stroke="#FDFDFD"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </MotionSvg>
);

export default AddIcon;
