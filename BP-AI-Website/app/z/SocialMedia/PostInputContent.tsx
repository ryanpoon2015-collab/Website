import { FHContext } from "@/app/templates/FH_Wrapper";
import { InputField } from "@/hooks/useInputField";
import { useC } from "@/hooks/useReactHooks";
import { ChangeEventHandler } from "react";
import { twMerge } from "tailwind-merge";
import MyInput from "../../../components/templates/MyInput";
import AvatarBlue from "./AvatarBlue";
import { SocialMediaContext } from "./SocialMedia";

interface PostInputContentProps {
  disabled?: boolean;
  postInput: InputField;
  numLines?: number;
  className?: string;
  onChange?:
    | ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  noExtraWidgets?: boolean;
}

const PostInputContent: React.FC<PostInputContentProps> = ({
  disabled = false,
  postInput,
  numLines = 4,
  className = "",
  onChange,
  noExtraWidgets = false,
}) => {
  const { myUser } = useC(FHContext);
  const { extraWidgetsCreatePost } = useC(SocialMediaContext);

  return (
    <div className={twMerge("rss-1 wf", className)}>
      {/*//? LEFT */}
      <AvatarBlue src={myUser?.photoURL} size={36} />

      {/*//? RIGHT */}
      <div className="css-1 wf">
        <div className={twMerge("css-1 wf")}>
          <MyInput
            className="bg-transparent b-none t32 wf px-2 py-1"
            inputField={postInput}
            divClassName="wf"
            onChange={onChange}
            numLines={numLines}
            placeholder="Share your ideas"
            disabled={disabled}
            maxLength={250}
          />
          {/*//? Post Data Div */}
          {!noExtraWidgets && extraWidgetsCreatePost}
        </div>
      </div>
    </div>
  );
};

export default PostInputContent;
