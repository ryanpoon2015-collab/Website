import type { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

import { MotionSvg } from "@/types/framer_motion_types";

interface BackAndroidIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
  hidden?: boolean;
  color?: string;
  nonBouncing?: boolean;
}

const BackAndroidIcon: React.FC<BackAndroidIconProps> = ({
  onClick,
  size = 84,
  hidden = false,
  color = "black",
  nonBouncing = false,
}) => (
  <MotionSvg
    onClick={onClick}
    className={twMerge("sn", !nonBouncing && onClick && "cp")}
    whileTap={{ scale: !nonBouncing && onClick ? 0.85 : 1 }}
    width={size}
    style={{ visibility: hidden ? "hidden" : "visible" }}
    height="73"
    viewBox="0 0 84 73"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_129_10)">
      <path
        d="M7.25622 32.6284H79.7538C80.7151 32.6284 81.6371 33.0103 82.3169 33.6901C82.9967 34.3699 83.3786 35.2919 83.3786 36.2533C83.3786 37.2147 82.9967 38.1367 82.3169 38.8165C81.6371 39.4963 80.7151 39.8782 79.7538 39.8782H7.25622C6.29485 39.8782 5.37285 39.4963 4.69305 38.8165C4.01325 38.1367 3.63135 37.2147 3.63135 36.2533C3.63135 35.2919 4.01325 34.3699 4.69305 33.6901C5.37285 33.0103 6.29485 32.6284 7.25622 32.6284Z"
        fill={color}
      />
      <path
        d="M8.75693 36.2533L38.8217 66.3108C39.5023 66.9915 39.8847 67.9147 39.8847 68.8772C39.8847 69.8398 39.5023 70.763 38.8217 71.4437C38.141 72.1243 37.2178 72.5067 36.2552 72.5067C35.2927 72.5067 34.3695 72.1243 33.6888 71.4437L1.06494 38.8198C0.727371 38.483 0.459546 38.083 0.276805 37.6426C0.0940645 37.2023 0 36.7301 0 36.2533C0 35.7766 0.0940645 35.3044 0.276805 34.8641C0.459546 34.4237 0.727371 34.0237 1.06494 33.6869L33.6888 1.06304C34.3695 0.382387 35.2927 0 36.2552 0C37.2178 0 38.141 0.382387 38.8217 1.06304C39.5023 1.7437 39.8847 2.66686 39.8847 3.62946C39.8847 4.59205 39.5023 5.51521 38.8217 6.19587L8.75693 36.2533Z"
        fill={color}
      />
    </g>
    <defs>
      <clipPath id="clip0_129_10">
        <rect width="83.3786" height="72.5067" fill="white" />
      </clipPath>
    </defs>
  </MotionSvg>
);

export default BackAndroidIcon;
