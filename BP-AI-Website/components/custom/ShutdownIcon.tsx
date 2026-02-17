import { MotionSvg } from "@/types/framer_motion_types";
import { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

interface ShutdownIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
  nonBouncing?: boolean;
}

const ShutdownIcon: React.FC<ShutdownIconProps> = ({
  onClick,
  size = 30,
  nonBouncing = false,
}) => {
  return (
    <div className="p-4 rounded-full bg-[#AE0100]">
      <MotionSvg
        onClick={onClick}
        className={twMerge("sn", !nonBouncing && onClick && "cp")}
        whileTap={{ scale: !nonBouncing && onClick ? 0.85 : 1 }}
        width={size}
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 3V13.5"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.80002 6C-0.899978 14.4 4.80002 27 15.3 27C23.7 27 26.7 20.1 26.7 15.6C26.7 11.1 24.3 7.8 22.2 6"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </MotionSvg>
    </div>
  );
};

export default ShutdownIcon;
