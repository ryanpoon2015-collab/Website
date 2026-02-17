import type { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

import { MotionSvg } from "@/types/framer_motion_types";

interface CrossCircleIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
  nonBouncing?: boolean;
}

const CrossCircleIcon: React.FC<CrossCircleIconProps> = ({
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
      <g clipPath="url(#clip0_2020_41)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M25 46.875C12.9188 46.875 3.125 37.0781 3.125 25C3.125 12.9219 12.9188 3.125 25 3.125C37.0812 3.125 46.875 12.9219 46.875 25C46.875 37.0781 37.0812 46.875 25 46.875ZM25 0C11.1922 0 0 11.1875 0 25C0 38.8125 11.1922 50 25 50C38.8078 50 50 38.8125 50 25C50 11.1875 38.8078 0 25 0ZM33.9328 16.0625C33.3172 15.4532 32.3219 15.4532 31.7062 16.0625L24.9907 22.7812L18.3719 16.1562C17.7609 15.5468 16.7703 15.5468 16.1625 16.1562C15.5516 16.7656 15.5516 17.7656 16.1625 18.375L22.7813 24.9844L16.1157 31.6563C15.5016 32.2656 15.5016 33.2655 16.1157 33.8905C16.7313 34.4999 17.7281 34.4999 18.3437 33.8905L25.0093 27.2188L31.6281 33.8438C32.2391 34.4532 33.2297 34.4532 33.839 33.8438C34.45 33.2344 34.45 32.2344 33.839 31.625L27.2187 25.0156L33.9328 18.2968C34.5468 17.6718 34.5468 16.6875 33.9328 16.0625Z"
          fill="#C11010"
        />
      </g>
      <defs>
        <clipPath id="clip0_2020_41">
          <rect width="50" height="50" fill="white" />
        </clipPath>
      </defs>
    </MotionSvg>
  );
};

export default CrossCircleIcon;
