import PostTextContent from "./PostTextContent";
import FH from "@/classes/FH";
import { useFHWatch } from "@/hooks/useFHWatch";
import { useC, useS } from "@/hooks/useReactHooks";
import { FHContext } from "@/app/templates/FH_Wrapper";
import DropdownButton from "../../../components/templates/DropdownButton";
import EditIcon from "../../../components/svg/icon/EditIcon";
import DeleteIcon from "../../../components/svg/icon/DeleteIcon";
import SettingsIcon from "../../../components/svg/icon/SettingsIcon";
import MyModal from "../../../components/templates/MyModal";
import useModal from "@/hooks/useModal";
import MyInput from "../../../components/templates/MyInput";
import MyButton from "../../../components/templates/MyButton";
import { useInputField } from "@/hooks/useInputField";
import { Timestamp } from "firebase/firestore";
import { SocialMediaComment } from "./SocialMediaComment";
import { SocialMediaPost } from "./SocialMediaPost";
import { TailwindContext } from "@/app/templates/Tailwind_Wrapper";
import PostEditModal from "./PostEditModal";
import PostDeleteModal from "./PostDeleteModal";

interface ListCommentsProps {
  comment: SocialMediaComment;
  post: SocialMediaPost;
}

const ListComments: React.FC<ListCommentsProps> = ({ comment, post }) => {
  const { myUser } = useC(FHContext);
  const [loading, setLoading] = useS(false);
  const [settingsExpanded, setSettingsExpanded] = useS(false);
  const { getColor } = useC(TailwindContext);
  const [myUserComment, loadingMyUserComment] = useFHWatch(
    FH.MyUser,
    comment.user_id
  );
  const editInput = useInputField((edit_str) => [
    [!edit_str, "Need text to edit"],
  ]);
  const editModal = useModal();
  const confirmDeleteModal = useModal();
  const ownComment = myUser !== null && myUser.id === comment.user_id;

  async function editComment() {
    if (!myUser || !editInput.verify() || loading) return;

    const content = editInput.getValue()!;

    setLoading(true);
    await FH.SocialMediaComment.update(comment, {
      content,
      updated_at: Timestamp.now(),
    });
    setLoading(false);
    editModal.close();
  }

  async function deleteComment() {
    if (!myUser || loading) return;
    FH.SocialMediaComment.delete(comment);
  }

  return (
    <div className="wf relative px-3 py-2">
      <PostTextContent
        myUser={myUserComment}
        content={comment.content}
        postData={null}
        date={comment.created_at.toDate()}
        post={post}
      />

      {/*//? Settings */}
      {ownComment && (
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
            className="bg-social_media_bg_lighter rsc-2"
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
        onUpdate={editComment}
        disabled={loading}
        inputField={editInput}
        defaultValue={comment.content}
      />

      {/*//? CONFIRM DELETE MODAL */}
      <PostDeleteModal useModal={confirmDeleteModal} onDelete={deleteComment} />
    </div>
  );
};

export default ListComments;
