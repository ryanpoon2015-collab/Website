import { MotionSvg } from "@/types/framer_motion_types";
import { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

interface BluetoothDisconnectedIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
  nonBouncing?: boolean;
}

const BluetoothDisconnectedIcon: React.FC<BluetoothDisconnectedIconProps> = ({
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
        d="M26 30.5919V37.5039"
        stroke="#E86666"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26 13.5039V25.5039"
        stroke="#E86666"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26 13.5039L32 19.5039L26 25.5039"
        stroke="#E86666"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28.544 28.048L32 31.504L26 37.504"
        stroke="#E86666"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26 25.5039L20 31.5039"
        stroke="#E86666"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26 25.5039L20 19.5039"
        stroke="#E86666"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M38 13.5039L26 25.5039L14 37.5039"
        stroke="#E86666"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </MotionSvg>
  );
};

export default BluetoothDisconnectedIcon;
