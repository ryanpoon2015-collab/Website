import { SocialMediaPost } from "@/app/z/SocialMedia/SocialMediaPost";
import { MyUser } from "@/classes/MyUser";
import { useC } from "@/hooks/useReactHooks";
import constrictDate from "@/myfunctions/constrictDate";
import { twMerge } from "tailwind-merge";
import AvatarBlue from "./AvatarBlue";
import { SocialMediaContext } from "./SocialMedia";

interface PostTextContentProps {
  myUser: MyUser | null;
  content: string;
  postData?: SocialMediaPost["data"] | null;
  date: Date;
  post: SocialMediaPost;
}

const PostTextContent: React.FC<PostTextContentProps> = ({
  myUser,
  content,
  postData,
  date,
  post,
}) => {
  const hasData = postData !== null && postData !== undefined;
  const { userBadgeGenerator, extraWidgetsPost } = useC(SocialMediaContext);

  return (
    <div className="rss-1 wf">
      {/*//? LEFT */}
      <AvatarBlue src={myUser?.photoURL} size={36} />

      {/*//? RIGHT */}
      <div className="css-1 wf">
        {/*//? Name */}
        <div className="rsc-1">
          <p className="t45 pl-3">{myUser?.name}</p>
          {myUser && userBadgeGenerator?.(myUser)}

          <p className="t22 o-50">- {constrictDate(date)}</p>
        </div>

        <div className={twMerge("css-1 wf")}>
          {/*//? Text */}
          <p className="t32 px-3 py-1">{content}</p>

          {/*//? Post Data Div */}
          <div className="px-3 py-1">{extraWidgetsPost?.(post)}</div>
        </div>
      </div>
    </div>
  );
};

export default PostTextContent;
