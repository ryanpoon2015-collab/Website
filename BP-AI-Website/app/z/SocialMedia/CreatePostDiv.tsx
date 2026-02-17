import { FHContext } from "@/app/templates/FH_Wrapper";
import { useInputField } from "@/hooks/useInputField";
import { useC, useS } from "@/hooks/useReactHooks";
import MyButton from "../../../components/templates/MyButton";
import PostInputContent from "./PostInputContent";
import { SocialMediaContext } from "./SocialMedia";
import { twMerge } from "tailwind-merge";
import notify from "@/myfunctions/notify";
import DH from "@/classes/templates/DH";
import { Timestamp } from "firebase/firestore";
import FH from "@/classes/FH";

interface CreatePostDivProps {}

const CreatePostDiv: React.FC<CreatePostDivProps> = ({}) => {
  const { myUser } = useC(FHContext);
  const { optionWidgetsCreatePost, postDataGenerator } =
    useC(SocialMediaContext);
  const [posting, setPosting] = useS(false); //!!!
  const postInput = useInputField((postStr) => []);

  async function _post() {
    if (!postInput.verify() || posting) return;

    if (!myUser) return;

    const postStr = postInput.getValue()!;

    if (postStr === "") {
      notify("Need text to post", { type: "error" });
      return;
    }

    setPosting(true);
    await FH.SocialMediaPost.create({
      id: `${DH.currentMillis()}_${myUser.id}`,
      content: postStr,
      data: await postDataGenerator(postStr),
      likes: [],
      user_id: myUser.id,
      created_at: Timestamp.now(),
      updated_at: Timestamp.now(),
    });

    postInput.clear();
    setPosting(false);
  }

  return (
    <div
      className={twMerge(
        "css-2 wf rounded-xl pt-2 pb-4 px-3 bg-social_media_bg"
      )}
    >
      {/*//? TOP */}
      <PostInputContent postInput={postInput} disabled={posting} />

      {/*//? BOTTOM */}
      <div className="rbc wf">
        <div className="rsc">{optionWidgetsCreatePost}</div>
        <MyButton
          label={"POST"}
          pY={0.2}
          pX={1.2}
          classNameBtn=""
          onClick={_post}
          disabled={posting}
        />
      </div>
    </div>
  );
};

export default CreatePostDiv;
