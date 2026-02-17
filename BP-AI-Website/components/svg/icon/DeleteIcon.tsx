import type { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

import { MotionSvg } from "@/types/framer_motion_types";

interface DeleteIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
  nonBouncing?: boolean;
}

const DeleteIcon: React.FC<DeleteIconProps> = ({
  onClick,
  size = 20,
  nonBouncing = false,
}) => (
  <MotionSvg
    onClick={onClick}
    className={twMerge("sn", !nonBouncing && onClick && "cp")}
    whileTap={{ scale: !nonBouncing && onClick ? 0.85 : 1 }}
    width={size}
    viewBox="0 0 219 219"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_140_73)">
      <path
        d="M130.25 0.941528C152.825 0.941528 171.125 19.2419 171.125 41.8165H212C215.762 41.8165 218.812 44.8666 218.812 48.629C218.812 52.3915 215.762 55.4415 212 55.4415L191.562 55.4347V178.067C191.562 200.641 173.262 218.942 150.688 218.942H68.9375C46.3629 218.942 28.0625 200.641 28.0625 178.067V55.4415H7.625C3.86256 55.4415 0.8125 52.3915 0.8125 48.629C0.8125 44.8666 3.86256 41.8165 7.625 41.8165H48.5C48.5 19.2419 66.8004 0.941528 89.375 0.941528H130.25ZM177.938 55.4415H41.6875V178.067C41.6875 192.66 53.1595 204.574 67.5775 205.283L68.9375 205.317H150.688C165.281 205.317 177.195 193.844 177.904 179.427L177.938 178.067V55.4415ZM89.375 96.3165C93.1374 96.3165 96.1875 99.3666 96.1875 103.129V150.817C96.1875 154.579 93.1374 157.629 89.375 157.629C85.6126 157.629 82.5625 154.579 82.5625 150.817V103.129C82.5625 99.3666 85.6126 96.3165 89.375 96.3165ZM130.25 96.3165C134.012 96.3165 137.062 99.3666 137.062 103.129V150.817C137.062 154.579 134.012 157.629 130.25 157.629C126.488 157.629 123.438 154.579 123.438 150.817V103.129C123.438 99.3666 126.488 96.3165 130.25 96.3165ZM130.25 14.5665H89.375C74.7813 14.5665 62.867 26.0386 62.1583 40.4565L62.125 41.8165H109.812H157.5C157.5 27.2228 146.028 15.3086 131.61 14.5999L130.25 14.5665Z"
        fill="#EB1C36"
      />
    </g>
    <defs>
      <clipPath id="clip0_140_73">
        <rect
          width="218"
          height="218"
          fill="white"
          transform="translate(0.8125 0.941528)"
        />
      </clipPath>
    </defs>
  </MotionSvg>
);

export default DeleteIcon;
