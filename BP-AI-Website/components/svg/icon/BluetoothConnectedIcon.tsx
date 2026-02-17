import { MotionSvg } from "@/types/framer_motion_types";
import { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

interface BluetoothConnectedIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
  nonBouncing?: boolean;
}

const BluetoothConnectedIcon: React.FC<BluetoothConnectedIconProps> = ({
  onClick,
  size = 51,
  nonBouncing = false,
}) => {
  return (
    <MotionSvg
      onClick={onClick}
      className={twMerge("sn", !nonBouncing && onClick && "cp")}
      whileTap={{ scale: !nonBouncing && onClick ? 0.85 : 1 }}
      width={size}
      viewBox="0 0 51 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="25.5" cy="25.5" r="25.5" fill="#282A2A" />
      <path
        d="M19.75 31.25L32.25 18.75L26 12.5V37.5L32.25 31.25L19.75 18.75"
        stroke="#66E88B"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </MotionSvg>
  );
};

export default BluetoothConnectedIcon;
