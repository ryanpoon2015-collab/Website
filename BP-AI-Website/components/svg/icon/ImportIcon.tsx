import type { MouseEventHandler } from "react"
import { twMerge } from "tailwind-merge"

import { MotionSvg } from "@/types/framer_motion_types"

interface ImportIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>
  size?: number
  nonBouncing?: boolean
}

const ImportIcon: React.FC<ImportIconProps> = ({
  onClick,
  size = 41,
  nonBouncing = false,
}) => (
  <MotionSvg
    onClick={onClick}
    className={twMerge("sn", !nonBouncing && onClick && "cp")}
    whileTap={{ scale: !nonBouncing && onClick ? 0.85 : 1 }}
    width={size}
    viewBox="0 0 41 41"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.9551 7.34558V24.0122M20.9551 24.0122L25.9551 19.0122M20.9551 24.0122L15.9551 19.0122"
      stroke="#262626"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.955 34.0123C13.5912 34.0123 7.6217 28.0428 7.6217 20.6789M34.2884 20.6789C34.2884 24.8896 32.3365 28.6443 29.2884 31.0879"
      stroke="#262626"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </MotionSvg>
)

export default ImportIcon
