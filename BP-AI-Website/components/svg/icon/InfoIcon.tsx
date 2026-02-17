import { motion } from "framer-motion";
import { MouseEventHandler } from "react";

interface InfoIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
  color?: string;
}

const InfoIcon: React.FC<InfoIconProps> = ({
  onClick,
  size = 50,
  color = "#6CE841",
}) => (
  <motion.svg
    onClick={onClick}
    className="select-none"
    width={size}
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M25 35.4165V22.9165"
      stroke={color}
      strokeWidth="3.125"
      strokeLinecap="round"
    />
    <path
      d="M25 14.5833C26.1506 14.5833 27.0834 15.5161 27.0834 16.6667C27.0834 17.8173 26.1506 18.75 25 18.75C23.8494 18.75 22.9167 17.8173 22.9167 16.6667C22.9167 15.5161 23.8494 14.5833 25 14.5833Z"
      fill={color}
    />
    <path
      d="M14.5834 6.95363C17.6477 5.18102 21.2054 4.1665 25 4.1665C36.5059 4.1665 45.8334 13.4939 45.8334 24.9998C45.8334 36.5057 36.5059 45.8332 25 45.8332C13.4941 45.8332 4.16669 36.5057 4.16669 24.9998C4.16669 21.2053 5.18121 17.6475 6.95381 14.5832"
      stroke={color}
      strokeWidth="3.125"
      strokeLinecap="round"
    />
  </motion.svg>
);

export default InfoIcon;
