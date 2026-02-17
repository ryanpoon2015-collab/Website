import { MotionSvg } from "@/types/framer_motion_types";
import { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

interface CloseModalIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
  nonBouncing?: boolean;
}

const CloseModalIcon: React.FC<CloseModalIconProps> = ({
  onClick,
  size = 22,
  nonBouncing = false,
}) => {
  return (
    <MotionSvg
      onClick={onClick}
      className={twMerge("sn", !nonBouncing && onClick && "cp")}
      whileTap={{ scale: !nonBouncing && onClick ? 0.85 : 1 }}
      width={size}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.7475 10.9973L21.6354 2.1094C21.8713 1.87889 21.9999 1.56798 21.9999 1.23562C21.9999 0.903261 21.8713 0.597707 21.6354 0.36184C21.153 -0.120614 20.3703 -0.120614 19.8879 0.36184L11 9.24973L2.11208 0.36184C1.62962 -0.115253 0.846977 -0.115253 0.364521 0.36184C0.134016 0.597707 0 0.903261 0 1.23562C0 1.56798 0.134016 1.87353 0.364521 2.1094L9.25241 10.9973L0.364521 19.8852C0.128655 20.1157 0 20.4266 0 20.759C0 21.0913 0.128655 21.4022 0.364521 21.6327C0.846977 22.1152 1.62962 22.1152 2.11208 21.6327L11 12.7448L19.8879 21.6327C20.1237 21.8632 20.4346 21.9973 20.767 21.9973C21.094 21.9973 21.4049 21.8686 21.6354 21.6327C21.8713 21.4022 21.9999 21.0859 21.9999 20.759C21.9999 20.4266 21.8713 20.1157 21.6354 19.8852L12.7475 10.9973Z"
        fill="black"
      />
    </MotionSvg>
  );
};

export default CloseModalIcon;
