import type { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

import { MotionSvg } from "@/types/framer_motion_types";

interface BellOutlinedIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
  nonBouncing?: boolean;
}

const BellOutlinedIcon: React.FC<BellOutlinedIconProps> = ({
  onClick,
  size = 27,
  nonBouncing = false,
}) => (
  <MotionSvg
    onClick={onClick}
    className={twMerge("sn", !nonBouncing && onClick && "cp")}
    whileTap={{ scale: !nonBouncing && onClick ? 0.85 : 1 }}
    width={size}
    height="31"
    viewBox="0 0 27 31"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.8542 26.4507C17.8542 26.893 17.741 27.3311 17.5213 27.7399C17.3014 28.1486 16.9792 28.5199 16.5731 28.8329C16.1668 29.1457 15.6845 29.3937 15.1538 29.5631C14.6231 29.7324 14.0542 29.8196 13.4798 29.8196C12.9054 29.8196 12.3366 29.7324 11.8058 29.5631C11.2751 29.3937 10.7928 29.1457 10.3867 28.8329C9.9805 28.5199 9.65828 28.1486 9.43845 27.7399C9.21861 27.3311 9.10547 26.893 9.10547 26.4507"
      stroke="#AAAAAA"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M24.7695 17.3307L25.1553 18.1631C26.6275 21.3378 24.7103 25.0485 21.2692 25.6845L21.0355 25.7276C16.0408 26.6509 10.9189 26.6509 5.92412 25.7276C2.45488 25.0864 0.619495 21.2482 2.29827 18.1453L2.62845 17.535C3.52995 15.8687 4.00204 14.0039 4.00204 12.1095V10.1826C4.00204 6.93955 5.83756 3.97591 8.74095 2.53107C11.7368 1.04024 15.2473 0.989537 18.2848 2.3932L18.5834 2.53107C21.6947 3.96881 23.6868 7.08379 23.6868 10.5113V12.4226C23.6868 14.1178 24.0562 15.7927 24.7695 17.3307Z"
      stroke="#AAAAAA"
      strokeWidth="2"
    />
  </MotionSvg>
);

export default BellOutlinedIcon;
