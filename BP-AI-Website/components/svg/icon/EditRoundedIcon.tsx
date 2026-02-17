import type { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

import { MotionSvg } from "@/types/framer_motion_types";

interface EditRoundedIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
  nonBouncing?: boolean;
}

const EditRoundedIcon: React.FC<EditRoundedIconProps> = ({
  onClick,
  size = 32,
  nonBouncing = false,
}) => (
  <MotionSvg
    onClick={onClick}
    className={twMerge("sn", !nonBouncing && onClick && "cp")}
    whileTap={{ scale: !nonBouncing && onClick ? 0.85 : 1 }}
    width={size}
    viewBox="0 0 204 204"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="102.031" cy="101.992" r="101.308" fill="white" />
    <circle cx="102.031" cy="102.188" r="76.5625" fill="#23B244" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M135.947 63.3891C131.456 58.8981 124.175 58.898 119.684 63.3891L65.413 117.66C63.8076 119.265 62.7133 121.31 62.2681 123.536L60.0176 134.788C58.9447 140.153 63.6745 144.883 69.039 143.81L80.2911 141.559C82.5174 141.114 84.5621 140.02 86.1675 138.414L140.438 84.1436C144.929 79.6525 144.929 72.3712 140.438 67.8801L135.947 63.3891ZM125.105 68.8102C126.602 67.3132 129.029 67.3132 130.526 68.8102L135.017 73.3013C136.514 74.7983 136.514 77.2254 135.017 78.7224L124.776 88.9635L114.864 79.0513L125.105 68.8102ZM109.443 84.4725L70.8342 123.081C70.299 123.616 69.9343 124.298 69.7859 125.04L67.5354 136.292L78.7876 134.041C79.5297 133.893 80.2112 133.528 80.7464 132.993L119.355 94.3847L109.443 84.4725Z"
      fill="#EEEEEE"
    />
  </MotionSvg>
);

export default EditRoundedIcon;
