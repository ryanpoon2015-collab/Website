import type { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

import { MotionSvg } from "@/types/framer_motion_types";

interface RedPhoneIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
  nonBouncing?: boolean;
}

const RedPhoneIcon: React.FC<RedPhoneIconProps> = ({
  onClick,
  size = 59,
  nonBouncing = false,
}) => (
  <MotionSvg
    onClick={onClick}
    className={twMerge("sn", !nonBouncing && onClick && "cp")}
    whileTap={{ scale: !nonBouncing && onClick ? 0.85 : 1 }}
    width={size}
    viewBox="0 0 59 59"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      className="shadow-2xl"
      cx="29.4999"
      cy="29.6392"
      r="28.6616"
      fill="#EB1C36"
    />
    <path
      d="M18.0068 21.062C17.8907 19.4183 19.2826 18.1391 20.927 18.1391H24.447C25.2911 18.1391 26.0524 18.6477 26.377 19.4284L27.8489 22.9684C28.2075 23.8308 27.953 24.8268 27.2251 25.4104L26.3075 26.146C25.8981 26.4742 25.7589 27.0403 26.0016 27.5056C27.2493 29.8968 29.0934 31.9262 31.3359 33.3958C31.8092 33.7059 32.4345 33.5825 32.7876 33.1402L33.7437 31.9425C34.3261 31.2131 35.32 30.9581 36.1806 31.3174L39.7133 32.7924C40.4925 33.1177 41 33.8806 41 34.7264V38.2641C41 39.9119 39.6762 41.2489 38.036 41.1323C27.5474 40.3861 18.7503 31.596 18.0068 21.062Z"
      fill="white"
    />
  </MotionSvg>
);

export default RedPhoneIcon;
