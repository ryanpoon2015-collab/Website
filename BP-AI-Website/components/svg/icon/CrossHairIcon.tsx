import type { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

import { MotionSvg } from "@/types/framer_motion_types";

interface CenterIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
  nonBouncing?: boolean;
}

const CrossHairIcon: React.FC<CenterIconProps> = ({
  onClick,
  size = 50,
  nonBouncing = false,
}) => (
  <MotionSvg
    onClick={onClick}
    className={twMerge("sn", !nonBouncing && onClick && "cp")}
    whileTap={{ scale: !nonBouncing && onClick ? 0.85 : 1 }}
    width={size}
    viewBox="0 0 309 309"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M308.062 143.527H285.568C282.94 112.555 269.443 83.5108 247.464 61.5317C225.485 39.5526 196.441 26.0556 165.469 23.4282V0.933472H143.531V23.4282C112.559 26.0556 83.5148 39.5526 61.5357 61.5317C39.5567 83.5108 26.0596 112.555 23.4322 143.527H0.9375V165.465H23.4322C26.0596 196.437 39.5567 225.481 61.5357 247.46C83.5148 269.439 112.559 282.936 143.531 285.564V308.058H165.469V285.564C196.441 282.936 225.485 269.439 247.464 247.46C269.443 225.481 282.94 196.437 285.568 165.465H308.062V143.527ZM165.469 263.626V220.308H143.531V263.626C118.371 261.062 94.8664 249.896 76.9834 232.013C59.1004 214.13 47.9344 190.625 45.3697 165.465H88.6875V143.527H45.3697C47.9344 118.367 59.1004 94.8623 76.9834 76.9794C94.8664 59.0964 118.371 47.9303 143.531 45.3657V88.6835H165.469V45.3657C190.629 47.9303 214.134 59.0964 232.017 76.9794C249.9 94.8623 261.066 118.367 263.63 143.527H220.312V165.465H263.63C261.066 190.625 249.9 214.13 232.017 232.013C214.134 249.896 190.629 261.062 165.469 263.626Z"
      fill="#C11010"
    />
  </MotionSvg>
);

export default CrossHairIcon;
