import SocialMedia from "./SocialMedia";
import useSocialMedia from "./useSocialMedia";

interface SocialMediaSampleProps {}

const SocialMediaSample: React.FC<SocialMediaSampleProps> = ({}) => {
  const socialMedia = useSocialMedia(10);

  return (
    <SocialMedia
      postDataGenerator={(postStr) => 2}
      socialMedia={socialMedia}
      extraWidgetsCreatePost={<>ExtraCreate</>}
      extraWidgetsPost={(post) => <>ExtraPost</>}
      optionWidgetsCreatePost={<>OptionCreate</>}
      userBadgeGenerator={(myUser) => <>UserBadge</>}
      onLike={(post, like) => {
        console.log(post, like);
      }}
    />
  );
};

export default SocialMediaSample;
