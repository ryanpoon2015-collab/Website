import PostDiv from "./PostDiv";
import { UseSocialMedia } from "./useSocialMedia";

interface ListPostDivProps {
  socialMedia: UseSocialMedia;
}

const ListPostDiv: React.FC<ListPostDivProps> = ({ socialMedia }) => {
  return (
    <div className="css-5 wf">
      {/*//? One Post Div */}
      {socialMedia.posts.map((post) => {
        return <PostDiv key={post.id} post={post} />;
      })}
    </div>
  );
};

export default ListPostDiv;
