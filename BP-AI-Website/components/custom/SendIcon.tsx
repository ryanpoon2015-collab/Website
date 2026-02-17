import { MotionSvg } from "@/types/framer_motion_types";
import { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

interface SendIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
  nonBouncing?: boolean;
}

const SendIcon: React.FC<SendIconProps> = ({
  onClick,
  size = 44,
  nonBouncing = false,
}) => {
  return (
    <MotionSvg
      onClick={onClick}
      className={twMerge("sn", !nonBouncing && onClick && "cp")}
      whileTap={{ scale: !nonBouncing && onClick ? 0.85 : 1 }}
      width={size}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="22" cy="22" r="22" fill="#28859E" />
      <path
        d="M22.948 21.5031H15.3487M15.1333 22.4861L13.8778 26.1867C13.1902 28.2135 12.8464 29.2268 13.0931 29.8508C13.3074 30.3928 13.7676 30.8037 14.3355 30.9601C14.9894 31.1402 15.977 30.7016 17.9523 29.8246L30.6158 24.2016C32.5439 23.3454 33.5079 22.9175 33.8058 22.3228C34.0647 21.8062 34.0647 21.2 33.8058 20.6833C33.5079 20.0888 32.5439 19.6607 30.6158 18.8046L17.9305 13.172C15.9611 12.2976 14.9764 11.8603 14.3232 12.0397C13.7559 12.1955 13.2957 12.6052 13.0807 13.1462C12.8331 13.7691 13.1733 14.7803 13.8536 16.8027L15.1358 20.6145C15.2526 20.9619 15.311 21.1356 15.3341 21.3131C15.3546 21.4708 15.3544 21.6304 15.3335 21.788C15.31 21.9655 15.2511 22.139 15.1333 22.4861Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </MotionSvg>
  );
};

export default SendIcon;
