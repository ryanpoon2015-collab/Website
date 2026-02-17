import { twMerge } from "tailwind-merge"

import { MotionSvg } from "@/types/framer_motion_types"

interface MenuBarIconProps {
  onClick?: () => void
  size?: number
  nonBouncing?: boolean
}

const MenuBarIcon: React.FC<MenuBarIconProps> = ({
  onClick,
  size = 25,
  nonBouncing = false,
}) => (
  <MotionSvg
    onClick={onClick}
    className={twMerge("sn", !nonBouncing && onClick && "cp")}
    whileTap={{ scale: !nonBouncing && onClick ? 0.85 : 1 }}
    width={size}
    viewBox="0 0 33 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 1H32M6.8125 12.5H26.1875M10.6875 24H22.3125"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </MotionSvg>
)

export default MenuBarIcon
