import type { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

import { MotionSvg } from "@/types/framer_motion_types";

interface SearchIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
  nonBouncing?: boolean;
}

const SearchIcon: React.FC<SearchIconProps> = ({
  onClick,
  size = 22,
  nonBouncing = false,
}) => (
  <MotionSvg
    onClick={onClick}
    className={twMerge("sn", !nonBouncing && onClick && "cp")}
    whileTap={{ scale: !nonBouncing && onClick ? 0.85 : 1 }}
    width={size}
    height={size}
    viewBox="0 0 94 94"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M38.3533 74.2802C57.9774 74.2802 73.8859 58.3717 73.8859 38.7476C73.8859 19.1235 57.9774 3.21509 38.3533 3.21509C18.7293 3.21509 2.8208 19.1235 2.8208 38.7476C2.8208 58.3717 18.7293 74.2802 38.3533 74.2802Z"
      stroke="black"
      strokeWidth="5"
      strokeLinejoin="round"
    />
    <path
      d="M88.3525 92.6127C89.4201 93.6798 91.1508 93.6798 92.2184 92.6127C93.2855 91.5451 93.2855 89.8144 92.2184 88.7468L88.3525 92.6127ZM92.2184 88.7468L64.8857 61.4141L61.0198 65.28L88.3525 92.6127L92.2184 88.7468Z"
      fill="black"
    />
  </MotionSvg>
);

export default SearchIcon;
