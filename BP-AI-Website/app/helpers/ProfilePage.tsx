import FH from "@/classes/FH";
import { MyUser } from "@/classes/MyUser";
import WebsiteVersion from "@/components/custom/WebsiteVersion";
import BackAndroidIcon from "@/components/svg/icon/BackAndroidIcon";
import EditableAvatar from "@/components/templates/EditableAvatar";
import MyButton from "@/components/templates/MyButton";
import MyInput from "@/components/templates/MyInput";
import MyModal from "@/components/templates/MyModal";
import { useInputField } from "@/hooks/useInputField";
import useModal from "@/hooks/useModal";
import { useC, useS } from "@/hooks/useReactHooks";
import notify from "@/myfunctions/notify";
import { signOut } from "firebase/auth";
import { FormEventHandler, useEffect, useState } from "react";
import { auth } from "../firebase";
import { Pages, PageWrapperContext } from "../helpers/PageWrapper";
import { FHContext } from "../templates/FH_Wrapper";
import { TailwindContext } from "../templates/Tailwind_Wrapper";

interface ProfilePageProps {}

const ProfilePage: React.FC<ProfilePageProps> = ({}) => {
  const { myUser } = useC(FHContext);
  const { setPage } = useC(PageWrapperContext);
  const { getColor } = useC(TailwindContext);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedID, setSelectedID] = useS<File | null>(null);

  const nameInput = useInputField((name) => [
    [!name, "Please Enter your name"],
  ]);

  const [photoURLUpdated, setPhotoURLUpdated] = useState(false);
  const [nameUpdated, setNameUpdated] = useState(false);
  const [updatingMyUser, setUpdatingMyUser] = useState(false);

  const signOutModal = useModal();

  const hasUpdates = photoURLUpdated || nameUpdated;

  //! INITIALIZE FIELDS
  useEffect(() => {
    if (!myUser) return;
    nameInput.setValue(myUser.name);
  }, [myUser]);

  //! REGISTER
  const updateMyUser: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!myUser) return;
    if (!nameInput.verify()) return;

    setUpdatingMyUser(true);
    try {
      //! Save image in firebase storage if there is one
      let photoURL: string | undefined = "";

      if (selectedImage) {
        await FH.MyUser.Picture.create(myUser.id, selectedImage);
        photoURL = await FH.MyUser.Picture.get(myUser.id);
      }

      const myUserUpdates: Partial<MyUser> = {};

      if (photoURLUpdated) {
        myUserUpdates.photoURL = photoURL;
      }
      if (nameUpdated) {
        myUserUpdates.name = nameInput.getValue()!;
      }

      await FH.MyUser.update(myUser, myUserUpdates);
      notify("Profile updated", { type: "success" });
      setPhotoURLUpdated(false);
      setNameUpdated(false);
    } catch (error) {
      console.log(error);
      notify("An error occured while updating");
    }
    setUpdatingMyUser(false);
  };

  return (
    <div className="min-hs flex flex-col items-center bg-bg t-text">
      {/*//! HEADER */}
      <div className="wf h-52 bg-darker_primary pt-1 px-5">
        <div className="flex justify-between items-center">
          <BackAndroidIcon
            color={getColor("text")}
            size={25}
            onClick={() => setPage(Pages.Main)}
          />
          <p className="font-semibold text-text">Edit Profile</p>
          <BackAndroidIcon size={25} hidden />
        </div>
      </div>

      {/*//! PROFILE PIC */}
      <div className="-translate-y-1/2">
        <EditableAvatar
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          photoURL={myUser?.photoURL}
          onChooseImage={() => setPhotoURLUpdated(true)}
          size={120}
          withBackground
          bgClassName="bg-bg"
        />
      </div>
      <form className="csc-10 wf px-10 mb-10" onSubmit={updateMyUser}>
        {/*//! NAME */}
        <div className="csc-1 wf">
          <p className="text font-semibold">Name</p>
          <MyInput
            placeholder="Name"
            className="bg-transparent wf"
            divClassName="wf"
            inputField={nameInput}
            maxLength={30}
            onChange={() => setNameUpdated(true)}
          />
        </div>

        {/*//! SUBMIT - BUTTON */}
        <MyButton
          type="submit"
          label="Update"
          disabled={!hasUpdates || updatingMyUser}
        />
      </form>

      {/*//! SIGN OUT - BUTTON */}
      <div className="px-10 mt-20">
        <MyButton
          type="button"
          label="Sign Out"
          outlined
          className="rounded-full bg-red-600"
          classNameText=""
          disabled={updatingMyUser}
          onClick={signOutModal.open}
        />
      </div>

      {/*//! SIGN OUT - MODAL */}
      <MyModal
        useModal={signOutModal}
        title="Sign Out"
        classNameContent="bg-gray"
      >
        <div className="csc-5 bg-gray t-white">
          <p className="t42c o-70">Are you sure you want to sign out?</p>
          <div className="flex gap-5">
            <MyButton
              type="button"
              label="Cancel"
              outlined
              className="rounded-full"
              pY={0.2}
              onClick={signOutModal.close}
            />
            <MyButton
              type="button"
              label="Sign Out"
              className="rounded-full bg-red"
              classNameText="text-white"
              pY={0.2}
              onClick={() => signOut(auth)}
            />
          </div>
        </div>
      </MyModal>

      <WebsiteVersion />
    </div>
  );
};

export default ProfilePage;
