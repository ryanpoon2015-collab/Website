import { MotionSvg } from "@/types/framer_motion_types";
import { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

interface HeartIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
  nonBouncing?: boolean;
  color?: string;
  stroke?: string;
}

const HeartIcon: React.FC<HeartIconProps> = ({
  onClick,
  size = 19,
  nonBouncing = false,
  color = "transparent",
  stroke = "#D4D4D4",
}) => {
  return (
    <MotionSvg
      onClick={onClick}
      className={twMerge("sn", !nonBouncing && onClick && "cp")}
      whileTap={{ scale: !nonBouncing && onClick ? 0.85 : 1 }}
      width={size}
      viewBox="0 0 19 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.50001 2.84929C7.80057 0.879459 4.96079 0.270696 2.8315 2.07447C0.702197 3.87824 0.402421 6.89404 2.07457 9.02739C3.46485 10.8011 7.67232 14.542 9.0513 15.7528C9.20553 15.8883 9.28269 15.956 9.3727 15.9826C9.45118 16.0058 9.53712 16.0058 9.6157 15.9826C9.70571 15.956 9.78277 15.8883 9.9371 15.7528C11.3161 14.542 15.5235 10.8011 16.9138 9.02739C18.5859 6.89404 18.3227 3.85927 16.1568 2.07447C13.9909 0.289671 11.1994 0.879459 9.50001 2.84929Z"
        stroke={stroke}
        fill={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </MotionSvg>
  );
};

export default HeartIcon;
