import { twMerge } from "tailwind-merge";

import AvatarGirl from "../svg/icon/AvatarGirl";
import { MotionDiv } from "@/types/framer_motion_types";

interface AvatarProps {
  src?: string;
  size?: number;
  onClick?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({ src, size = 75, onClick }) => {
  return (
    <MotionDiv
      className={twMerge("rounded-full overflow-hidden sn", onClick && "cp")}
      style={{
        width: size,
        height: size,
      }}
      onClick={onClick}
      whileTap={{ scale: onClick ? 0.9 : 1 }}
    >
      {src ? <img alt="not found" src={src} /> : <AvatarGirl size={size} />}
    </MotionDiv>
  );
};

export default Avatar;
