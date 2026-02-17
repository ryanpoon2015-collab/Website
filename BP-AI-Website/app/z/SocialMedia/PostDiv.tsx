import { FHContext } from "@/app/templates/FH_Wrapper";
import { SocialMediaPost } from "@/app/z/SocialMedia/SocialMediaPost";
import FH from "@/classes/FH";
import DH from "@/classes/templates/DH";
import CommentIcon from "@/components/svg/icon/CommentIcon";
import HeartIcon from "@/components/svg/icon/HeartIcon";
import { useFHWatch } from "@/hooks/useFHWatch";
import { useFHWatchQuery } from "@/hooks/useFHWatchQuery";
import { useInputField } from "@/hooks/useInputField";
import useModal from "@/hooks/useModal";
import { useC, useF, useS } from "@/hooks/useReactHooks";
import constrictNumber from "@/myfunctions/constrictNumber";
import { MotionDiv } from "@/types/framer_motion_types";
import {
  arrayRemove,
  arrayUnion,
  increment,
  orderBy,
  Timestamp,
  where,
} from "firebase/firestore";
import { AnimatePresence } from "framer-motion";
import { twMerge } from "tailwind-merge";
import DeleteIcon from "../../../components/svg/icon/DeleteIcon";
import EditIcon from "../../../components/svg/icon/EditIcon";
import SettingsIcon from "../../../components/svg/icon/SettingsIcon";
import DropdownButton from "../../../components/templates/DropdownButton";
import MyButton from "../../../components/templates/MyButton";
import MyInput from "../../../components/templates/MyInput";
import MyModal from "../../../components/templates/MyModal";
import ListComments from "./ListComments";
import PostInputContent from "./PostInputContent";
import PostTextContent from "./PostTextContent";
import { SocialMediaContext } from "./SocialMedia";
import { TailwindContext } from "@/app/templates/Tailwind_Wrapper";
import PostEditModal from "./PostEditModal";
import PostDeleteModal from "./PostDeleteModal";

interface PostDivProps {
  post: SocialMediaPost;
}

const PostDiv: React.FC<PostDivProps> = ({ post }) => {
  const { myUser } = useC(FHContext);
  const { onLike } = useC(SocialMediaContext);
  const { getColor } = useC(TailwindContext);

  const [showComments, setShowComments] = useS(false);

  const [myUserPost, _] = useFHWatch(FH.MyUser, post.user_id);

  const [commenting, setCommenting] = useS(false);

  const [hasCommentStr, setHasCommentStr] = useS(false);

  const ownPost = myUser !== null && myUser.id === post.user_id;

  const commentInput = useInputField((comment_str) => [
    [!comment_str, "Need text to comment"],
  ]);

  const editInput = useInputField((edit_str) => [
    [!edit_str, "Need text to edit"],
  ]);

  const [settingsExpanded, setSettingsExpanded] = useS(false);

  const [comments, loadingComments] = useFHWatchQuery(
    FH.SocialMediaComment,
    [],
    where("post_id", "==", post.id),
    orderBy("created_at", "desc")
  );

  const confirmDeleteModal = useModal();

  const [optimisticLiked, setOptimisticLiked] = useS(
    myUser !== null && post.likes.includes(myUser.id)
  );

  const [optimisticNumLikes, setOptimisticNumLikes] = useS(post.likes.length);

  const [liking, setLiking] = useS(false);

  useF(() => {
    setOptimisticLiked(myUser !== null && post.likes.includes(myUser.id));
    // console.log(
    //   `useEffect: ${myUser !== null && post.likes.includes(myUser.id)}`
    // );
  }, [post.likes]);

  useF(() => {
    setOptimisticNumLikes(post.likes.length);
  }, [post.likes.length]);

  async function like() {
    if (!myUser || liking) return;

    setOptimisticLiked((c) => !c);
    setOptimisticNumLikes((c) => c + (optimisticLiked ? -1 : 1));
    setLiking(true);
    await FH.Transaction(
      "like",
      async (transaction) => {
        await FH.SocialMediaPost.update(
          post,
          {
            likes: optimisticLiked
              ? arrayRemove(myUser.id)
              : arrayUnion(myUser.id),
          },
          { transaction }
        );
        // await FH.MyUser.update(
        //   post.user_id,
        //   {
        //     likes_count: optimisticLiked ? increment(-1) : increment(1),
        //   },
        //   { transaction }
        // );
        await onLike?.(post, optimisticLiked);
      },
      {
        onError: () => {
          setOptimisticLiked(optimisticLiked);
          setOptimisticNumLikes((c) => c + (optimisticLiked ? 1 : -1));
        },
      }
    );
    setLiking(false);
  }

  async function comment() {
    if (!myUser || !commentInput.verify() || commenting) return;

    const comment_str = commentInput.getValue()!;

    setCommenting(true);

    await FH.SocialMediaComment.create({
      id: `${DH.currentMillis()}_${post.id}_${myUser.id}`,
      content: comment_str,
      post_id: post.id,
      user_id: myUser.id,
      created_at: Timestamp.now(),
      updated_at: Timestamp.now(),
    });

    commentInput.clear();
    setCommenting(false);
    setHasCommentStr(false);
  }

  const editModal = useModal();

  async function editPost() {
    if (!myUser || !editInput.verify() || commenting) return;

    const content = editInput.getValue()!;

    setCommenting(true);
    await FH.SocialMediaPost.update(post, {
      content,
      updated_at: Timestamp.now(),
    });
    setCommenting(false);
    editModal.close();
  }

  async function deletePost() {
    if (!myUser || commenting) return;
    FH.SocialMediaPost.delete(post);
  }

  return (
    <div key={post.id} className="css wf relative">
      {/*//? Main Post - Top */}
      <div
        className={twMerge(
          "css wf py-2 px-3 bg-social_media_bg",
          showComments ? "rounded-t-xl" : "rounded-xl"
        )}
      >
        {/*//? Main Post - Avatar/Name/Content */}
        <PostTextContent
          myUser={myUserPost}
          content={post.content}
          postData={post.data}
          date={post.created_at.toDate()}
          post={post}
        />

        {/*//? Options - Like/Reply */}
        <div className="rbc wf">
          <div className="rsc-5 wf">
            {/* <Heart isClick={liked} onClick={like} /> */}
            <HeartIcon
              onClick={like}
              color={optimisticLiked ? "#CC3333" : "transparent"}
              stroke={optimisticLiked ? "transparent" : "#D4D4D4"}
            />
            {/* <HeartIcon onClick={like} color="#3578D9" /> */}
            {/* <div
              className={twMerge("heart", liked ? "is-active" : "")}
              onClick={like}
            ></div> */}
            <MotionDiv
              className="rsc-2 wf cp"
              onClick={() => setShowComments((c) => !c)}
            >
              <CommentIcon />
              {showComments && <p className="t41 o-50">Hide Replies</p>}
            </MotionDiv>
          </div>
          {optimisticNumLikes > 0 && (
            <div className="rsc-2 t33 o-50">
              <p className="">{constrictNumber(optimisticNumLikes)}</p>
              <p className="">Like{optimisticNumLikes > 1 ? "s" : ""}</p>
            </div>
          )}
        </div>
      </div>

      {/*//? Comments - Bottom */}
      <AnimatePresence>
        {showComments && (
          <MotionDiv
            key={`${post.id}_comments`}
            className="css wf bg-gray_comments rounded-b-xl py-2"
            initial={{
              height: 0,
              overflow: "hidden",
            }}
            animate={{
              height: "auto",
            }}
            exit={{
              height: 0,
            }}
            transition={{
              duration: 0.05,
            }}
          >
            {/*//? Create Comment */}
            <div className="cse wf pb-2 pr-2">
              <PostInputContent
                postInput={commentInput}
                disabled={commenting}
                numLines={2}
                className="px-3"
                onChange={(e) => {
                  const value = e.target.value;
                  setHasCommentStr(value.length > 0);
                }}
                noExtraWidgets
              />
              {hasCommentStr && (
                <MyButton
                  label={"Comment"}
                  pY={0.2}
                  pX={1.0}
                  classNameText="t11"
                  classNameBtn="t11"
                  onClick={comment}
                  disabled={commenting}
                />
              )}
            </div>

            {/*//? HR */}
            <hr className="wf o-20" />

            {/*//? List Comments */}
            {comments.map((comment) => {
              return (
                <ListComments key={comment.id} comment={comment} post={post} />
              );
            })}
          </MotionDiv>
        )}
      </AnimatePresence>

      {/*//? SETTINGS */}
      {ownPost && (
        <div className="absolute top-2 right-2">
          <DropdownButton
            isExpanded={settingsExpanded}
            setIsExpanded={setSettingsExpanded}
            icon={
              <SettingsIcon
                size={18}
                onClick={() => {}}
                color={getColor("social_media_icon")}
              />
            }
            className="rsc-2 bg-social_media_bg_lighter"
          >
            <EditIcon
              onClick={() => {
                setSettingsExpanded(false);
                editModal.open();
              }}
            />
            <DeleteIcon
              onClick={() => {
                confirmDeleteModal.open();
                setSettingsExpanded(false);
              }}
            />
          </DropdownButton>
        </div>
      )}

      {/*//? EDIT MODAL */}
      <PostEditModal
        useModal={editModal}
        onUpdate={editPost}
        disabled={commenting}
        inputField={editInput}
        defaultValue={post.content}
      />

      {/*//? CONFIRM DELETE MODAL */}
      <PostDeleteModal useModal={confirmDeleteModal} onDelete={deletePost} />
    </div>
  );
};

export default PostDiv;
