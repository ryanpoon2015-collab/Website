import { twMerge } from "tailwind-merge";

import EditRoundedIcon from "../svg/icon/EditRoundedIcon";
import Avatar from "./Avatar";

interface EditableAvatarProps {
  selectedImage: File | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<File | null>>;
  size?: number;
  withBackground?: boolean;
  bgClassName?: string;
  onChooseImage?: () => void;
  photoURL?: string;
}

const EditableAvatar: React.FC<EditableAvatarProps> = ({
  selectedImage,
  setSelectedImage,
  size = 75,
  withBackground = false,
  bgClassName = "bg-white",
  onChooseImage,
  photoURL,
}) => {
  return (
    <div
      className={twMerge(
        withBackground && "bg-white rounded-full p-1 rcc",
        withBackground && bgClassName
      )}
    >
      <div className="relative m-auto w-min">
        <Avatar
          src={selectedImage ? URL.createObjectURL(selectedImage) : photoURL}
          size={size}
        />
        <div className="absolute bottom-0 right-0">
          <label htmlFor="avatar-file-input" className="ml-4">
            <EditRoundedIcon />
          </label>
        </div>
      </div>
      <input
        id="avatar-file-input"
        style={{ visibility: "hidden", height: 0, width: 0 }}
        type="file"
        accept=".png,.jpg,.jpeg"
        name="avatarImage"
        onChange={(event) => {
          if (!event.target.files) return;
          if (event.target.files.length === 0) return;
          setSelectedImage(event.target.files[0]);
          if (onChooseImage) onChooseImage();
        }}
      />
    </div>
  );
};

export default EditableAvatar;
