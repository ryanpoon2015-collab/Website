import MyButton from "@/components/templates/MyButton";
import MyInput from "@/components/templates/MyInput";
import MyModal from "@/components/templates/MyModal";
import { InputField } from "@/hooks/useInputField";
import useModal from "@/hooks/useModal";
import { MouseEventHandler } from "react";

interface PostEditModalProps {
  useModal: ReturnType<typeof useModal>;
  onUpdate: MouseEventHandler;
  disabled?: boolean;
  inputField: InputField;
  defaultValue?: string;
}

const PostEditModal: React.FC<PostEditModalProps> = ({
  useModal,
  onUpdate,
  disabled = false,
  inputField,
  defaultValue,
}) => {
  return (
    <MyModal useModal={useModal}>
      <div className="csc-5 bg-gray t-white">
        <MyInput
          className="bg-transparent b-none t32 wf px-2 py-1"
          inputField={inputField}
          defaultValue={defaultValue}
          divClassName="wf"
          numLines={4}
          placeholder="Input text"
          disabled={disabled}
          maxLength={250}
        />
        <div className="flex gap-5">
          <MyButton
            type="button"
            label="Cancel"
            outlined
            className="rounded-full"
            pY={0.2}
            onClick={useModal.close}
            disabled={disabled}
          />
          <MyButton
            type="button"
            label="Update"
            className="rounded-full"
            classNameText="text-white"
            pY={0.2}
            onClick={onUpdate}
            disabled={disabled}
          />
        </div>
      </div>
    </MyModal>
  );
};

export default PostEditModal;
