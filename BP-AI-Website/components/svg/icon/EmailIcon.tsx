import type { MouseEventHandler } from "react"
import { twMerge } from "tailwind-merge"

import { MotionSvg } from "@/types/framer_motion_types"

interface EmailIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>
  size?: number
  nonBouncing?: boolean
}

const EmailIcon: React.FC<EmailIconProps> = ({
  onClick,
  size = 50,
  nonBouncing = false,
}) => {
  return (
    <MotionSvg
      onClick={onClick}
      className={twMerge("sn", !nonBouncing && onClick && "cp")}
      whileTap={{ scale: !nonBouncing && onClick ? 0.85 : 1 }}
      width={size}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.33331 14.5834L21.25 24.2708C23.4723 25.9375 26.5277 25.9375 28.75 24.2708L41.6666 14.5833"
        stroke="#E8413B"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M39.5833 10.4167H10.4167C8.11548 10.4167 6.25 12.2822 6.25 14.5834V35.4167C6.25 37.7179 8.11548 39.5834 10.4167 39.5834H39.5833C41.8845 39.5834 43.75 37.7179 43.75 35.4167V14.5834C43.75 12.2822 41.8845 10.4167 39.5833 10.4167Z"
        stroke="#EA4335"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </MotionSvg>
  )
}

export default EmailIcon
