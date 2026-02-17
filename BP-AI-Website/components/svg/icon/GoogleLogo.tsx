import type { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

import { MotionSvg } from "@/types/framer_motion_types";

interface GoogleLogoProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
  nonBouncing?: boolean;
}

const GoogleLogo: React.FC<GoogleLogoProps> = ({
  onClick,
  size = 21,
  nonBouncing = false,
}) => (
  <MotionSvg
    onClick={onClick}
    className={twMerge("sn", !nonBouncing && onClick && "cp")}
    whileTap={{ scale: !nonBouncing && onClick ? 0.85 : 1 }}
    width={size}
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_2002_181)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.51819 10.5C4.51819 9.83314 4.62895 9.19381 4.82663 8.59414L1.36652 5.95187C0.692164 7.32107 0.312225 8.86387 0.312225 10.5C0.312225 12.1347 0.691697 13.6766 1.36512 15.0449L4.82336 12.3975C4.62755 11.8006 4.51819 11.1636 4.51819 10.5Z"
        fill="#FBBC05"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5935 4.43334C12.0422 4.43334 13.3507 4.94667 14.3788 5.78667L17.3697 2.8C15.5472 1.21334 13.2105 0.233337 10.5935 0.233337C6.53051 0.233337 3.03862 2.55687 1.36652 5.95187L4.82662 8.59414C5.62389 6.174 7.89651 4.43334 10.5935 4.43334Z"
        fill="#EB4335"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5935 16.5667C7.89651 16.5667 5.62389 14.826 4.82662 12.4059L1.36652 15.0477C3.03862 18.4432 6.53051 20.7667 10.5935 20.7667C13.1012 20.7667 15.4953 19.8763 17.2922 18.208L14.0078 15.6688C13.0811 16.2526 11.9141 16.5667 10.5935 16.5667Z"
        fill="#34A853"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.4074 10.5C20.4074 9.89333 20.3139 9.24 20.1737 8.63333H10.5935V12.6H16.108C15.8322 13.9524 15.0817 14.9921 14.0078 15.6688L17.2922 18.2079C19.1797 16.4561 20.4074 13.8465 20.4074 10.5Z"
        fill="#4285F4"
      />
    </g>
    <defs>
      <clipPath id="clip0_2002_181">
        <rect width="21" height="21" fill="white" />
      </clipPath>
    </defs>
  </MotionSvg>
);

export default GoogleLogo;
