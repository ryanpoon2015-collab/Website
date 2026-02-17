import { MotionSvg } from "@/types/framer_motion_types";
import { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

interface CommentIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
  nonBouncing?: boolean;
}

const CommentIcon: React.FC<CommentIconProps> = ({
  onClick,
  size = 17,
  nonBouncing = false,
}) => {
  return (
    <MotionSvg
      onClick={onClick}
      className={twMerge("sn", !nonBouncing && onClick && "cp")}
      whileTap={{ scale: !nonBouncing && onClick ? 0.85 : 1 }}
      width={size}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2001_861)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.3562 13.0863L8.5 15.4062L6.64382 13.0863C3.43401 12.4073 1.05825 10.021 1.05825 7.17241C1.05825 3.79632 4.39025 1.05931 8.5 1.05931C12.6097 1.05931 15.9417 3.79632 15.9417 7.17241C15.9417 10.021 13.566 12.4073 10.3562 13.0863ZM8.5 0C3.80534 0 0 3.26347 0 7.28875C0 10.6085 2.5909 13.4045 6.13168 14.2848L8.5 17.0005L10.8689 14.2848C14.4091 13.4045 17 10.6085 17 7.28875C17 3.26347 13.1947 0 8.5 0Z"
          fill="#D4D4D2"
        />
      </g>
      <defs>
        <clipPath id="clip0_2001_861">
          <rect width="17" height="17" fill="white" />
        </clipPath>
      </defs>
    </MotionSvg>
  );
};

export default CommentIcon;
