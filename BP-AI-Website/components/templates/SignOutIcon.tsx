import { MotionSvg } from "@/types/framer_motion_types";
import { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

interface SignOutIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
  nonBouncing?: boolean;
}

const SignOutIcon: React.FC<SignOutIconProps> = ({
  onClick,
  size = 26,
  nonBouncing = false,
}) => {
  return (
    <MotionSvg
      onClick={onClick}
      className={twMerge("sn", !nonBouncing && onClick && "cp")}
      whileTap={{ scale: !nonBouncing && onClick ? 0.85 : 1 }}
      width={size}
      viewBox="0 0 26 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.72535 7.04221C6.11684 6.65266 6.11841 6.0195 5.72887 5.628C5.33932 5.2365 4.70616 5.23493 4.31465 5.62448L5.72535 7.04221ZM0.294653 9.62441C-0.0968401 10.014 -0.0984134 10.6472 0.291133 11.0387C0.68068 11.4301 1.31384 11.4317 1.70535 11.0423L0.294653 9.62441ZM1.70535 9.62441C1.31384 9.23494 0.68068 9.23654 0.291133 9.62801C-0.0984134 10.0195 -0.0968401 10.6527 0.294653 11.0423L1.70535 9.62441ZM4.31465 15.0423C4.70616 15.4317 5.33932 15.4301 5.72887 15.0387C6.11841 14.6472 6.11684 14.014 5.72535 13.6244L4.31465 15.0423ZM1 9.33334C0.44772 9.33334 0 9.78108 0 10.3333C0 10.8856 0.44772 11.3333 1 11.3333V9.33334ZM19.6667 11.3333C20.2189 11.3333 20.6667 10.8856 20.6667 10.3333C20.6667 9.78108 20.2189 9.33334 19.6667 9.33334V11.3333ZM4.31465 5.62448L0.294653 9.62441L1.70535 11.0423L5.72535 7.04221L4.31465 5.62448ZM0.294653 11.0423L4.31465 15.0423L5.72535 13.6244L1.70535 9.62441L0.294653 11.0423ZM1 11.3333H19.6667V9.33334H1V11.3333Z"
        fill="white"
      />
      <path
        d="M9 14.3333C9 17.2788 11.3879 19.6667 14.3333 19.6667H19.6667C22.6121 19.6667 25 17.2788 25 14.3333V6.33333C25 3.38781 22.6121 1 19.6667 1H14.3333C11.3879 1 9 3.38781 9 6.33333"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </MotionSvg>
  );
};

export default SignOutIcon;
