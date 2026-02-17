import type { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

import { MotionSvg } from "@/types/framer_motion_types";

interface PhoneIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
  nonBouncing?: boolean;
}

const PhoneIcon: React.FC<PhoneIconProps> = ({
  onClick,
  size = 23,
  nonBouncing = false,
}) => (
  <MotionSvg
    onClick={onClick}
    className={twMerge("sn", !nonBouncing && onClick && "cp")}
    whileTap={{ scale: !nonBouncing && onClick ? 0.85 : 1 }}
    width={size}
    height={size}
    viewBox="0 0 23 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.00676881 3.06198C-0.109255 1.41828 1.2826 0.139069 2.927 0.139069H6.44697C7.29107 0.139069 8.05238 0.647668 8.37703 1.42845L9.84894 4.96845C10.2075 5.83079 9.95302 6.82683 9.22507 7.41043L8.30753 8.14599C7.89806 8.47425 7.75885 9.04028 8.00163 9.50559C9.24933 11.8968 11.0934 13.9262 13.3359 15.3958C13.8092 15.7059 14.4345 15.5825 14.7876 15.1402L15.7437 13.9425C16.3261 13.2131 17.32 12.9581 18.1806 13.3174L21.7133 14.7924C22.4925 15.1177 23 15.8806 23 16.7264V20.2641C23 21.9119 21.6762 23.2489 20.036 23.1323C9.54741 22.3861 0.750336 13.596 0.00676881 3.06198Z"
      fill="#74B4D2"
    />
  </MotionSvg>
);

export default PhoneIcon;
