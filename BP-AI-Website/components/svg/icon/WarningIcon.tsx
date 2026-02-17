import type { MouseEventHandler } from "react";

import { MotionSvg } from "@/types/framer_motion_types";

interface WarningIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
}

const WarningIcon: React.FC<WarningIconProps> = ({ onClick, size = 50 }) => (
  <MotionSvg
    onClick={onClick}
    className="select-none"
    width={size}
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="25" cy="25" r="25" fill="#A5411E" />
    <path
      d="M34.7141 30.2356L25.7922 15.1807C25.21 14.1989 23.7891 14.1989 23.2076 15.1807L14.2858 30.2356C13.7179 31.1944 14.4087 32.4063 15.5227 32.4063H33.4771C34.5912 32.4063 35.2819 31.1944 34.7141 30.2356ZM24.4999 30.25C23.7057 30.25 23.0624 29.6067 23.0624 28.8125C23.0624 28.0183 23.7057 27.375 24.4999 27.375C25.2941 27.375 25.9374 28.0183 25.9374 28.8125C25.9374 29.6067 25.2941 30.25 24.4999 30.25ZM25.9374 22.6147C25.9374 23.3874 25.8131 24.155 25.5687 24.8874L25.4458 25.2554C25.3099 25.6629 24.929 25.9375 24.4999 25.9375C24.0708 25.9375 23.6899 25.6629 23.554 25.2554L23.4311 24.8874C23.1868 24.155 23.0624 23.3874 23.0624 22.6147V20.4657C23.0624 19.9151 23.5088 19.4688 24.0593 19.4688H24.9398C25.4911 19.4688 25.9374 19.9151 25.9374 20.4657V22.6147Z"
      fill="white"
    />
  </MotionSvg>
);

export default WarningIcon;
