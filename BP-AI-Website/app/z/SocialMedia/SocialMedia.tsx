import CreatePostDiv from "@/app/z/SocialMedia/CreatePostDiv";
import ListPostDiv from "@/app/z/SocialMedia/ListPostDiv";
import { UseSocialMedia } from "./useSocialMedia";
import { createContext } from "react";
import { MyUser } from "@/classes/MyUser";
import { SocialMediaPost } from "./SocialMediaPost";
import {
  TailwindColors,
  TailwindContext,
} from "@/app/templates/Tailwind_Wrapper";
import { useC } from "@/hooks/useReactHooks";

export const SocialMediaContext = createContext({
  extraWidgetsCreatePost: {} as React.ReactNode,
  optionWidgetsCreatePost: {} as React.ReactNode,
  postDataGenerator: {} as (
    postStr: string
  ) => Promise<SocialMediaPost["data"]> | SocialMediaPost["data"],
  socialMedia: {} as UseSocialMedia,
  userBadgeGenerator: {} as undefined | ((myUser: MyUser) => React.ReactNode),
  onLike: {} as
    | undefined
    | ((post: SocialMediaPost, like: boolean) => void | Promise<void>),

  extraWidgetsPost: {} as
    | undefined
    | ((post: SocialMediaPost) => React.ReactNode),
});

interface SocialMediaProps {
  extraWidgetsCreatePost?: React.ReactNode;
  optionWidgetsCreatePost?: React.ReactNode;
  postDataGenerator: (
    postStr: string
  ) => Promise<SocialMediaPost["data"]> | SocialMediaPost["data"];
  socialMedia: UseSocialMedia;
  userBadgeGenerator?: (myUser: MyUser) => React.ReactNode;
  onLike?: (post: SocialMediaPost, like: boolean) => void | Promise<void>;
  extraWidgetsPost?: (post: SocialMediaPost) => React.ReactNode;
}

const SocialMedia: React.FC<SocialMediaProps> = ({
  extraWidgetsCreatePost,
  optionWidgetsCreatePost,
  postDataGenerator,
  socialMedia,
  userBadgeGenerator,
  onLike,
  extraWidgetsPost,
}) => {
  const { getColor } = useC(TailwindContext);
  return (
    <SocialMediaContext
      value={{
        socialMedia,
        extraWidgetsCreatePost,
        optionWidgetsCreatePost,
        postDataGenerator,
        userBadgeGenerator,
        onLike,
        extraWidgetsPost,
      }}
    >
      <div className="csc-12 wf">
        <CreatePostDiv />
        <ListPostDiv socialMedia={socialMedia} />
        <p className="t32 o-50 mb-6"> - Nothing Follows - </p>
      </div>
    </SocialMediaContext>
  );
};

export default SocialMedia;
