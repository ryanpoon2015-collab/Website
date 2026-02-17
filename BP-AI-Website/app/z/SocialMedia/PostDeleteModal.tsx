import MyButton from "@/components/templates/MyButton";
import MyModal from "@/components/templates/MyModal";
import useModal from "@/hooks/useModal";
import { MouseEventHandler } from "react";

interface PostDeleteModalProps {
  useModal: ReturnType<typeof useModal>;
  onDelete: MouseEventHandler;
}

const PostDeleteModal: React.FC<PostDeleteModalProps> = ({
  useModal,
  onDelete,
}) => {
  return (
    <MyModal useModal={useModal} title="Delete Post">
      <div className="csc-5 bg-gray t-white">
        <p className="t42c o-70">
          Are you sure you want to delete this comment?
        </p>
        <div className="flex gap-5">
          <MyButton
            type="button"
            label="Cancel"
            outlined
            className="rounded-full"
            pY={0.2}
            onClick={useModal.close}
          />
          <MyButton
            type="button"
            label="Delete"
            className="rounded-full bg-button_red"
            classNameText="text-white"
            pY={0.2}
            onClick={onDelete}
          />
        </div>
      </div>
    </MyModal>
  );
};

export default PostDeleteModal;
