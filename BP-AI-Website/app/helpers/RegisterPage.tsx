import type { User } from "firebase/auth";
import type { FormEventHandler } from "react";

import { Config } from "@/classes/Constants";
import FH from "@/classes/FH";
import type { MyUser } from "@/classes/MyUser";
import EditableAvatar from "@/components/templates/EditableAvatar";
import MyButton from "@/components/templates/MyButton";
import MyInput from "@/components/templates/MyInput";
import Title from "@/components/templates/Title";
import { useCheckboxField, useInputField } from "@/hooks/useInputField";
import { useS } from "@/hooks/useReactHooks";
import notify from "@/myfunctions/notify";

interface RegisterPageProps {
  user: User;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ user }) => {
  const [selectedImage, setSelectedImage] = useS<File | null>(null);
  const [creatingMyUser, setCreatingMyUser] = useS(false);

  const nameInput = useInputField((name) => [
    [!name, "Please Enter your full name"],
  ]);

  const termsInput = useCheckboxField(
    "Please agree to the terms and conditions"
  );

  //! REGISTER
  const register: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!nameInput.verify()) return;
    if (Config.hasTermsAndConditions && !termsInput.verify()) return;

    setCreatingMyUser(true);
    try {
      //! Save image in storage if there is one
      let photoURL = "";
      if (selectedImage) {
        await FH.MyUser.Picture.create(user.uid, selectedImage);
        const photoUrlFromFirebase = await FH.MyUser.Picture.get(user.uid);

        if (!photoUrlFromFirebase) {
          console.log("Error getting photo url from firebase");
          notify("An error occured getting photo url from firebase");
          return;
        }

        photoURL = photoUrlFromFirebase;
      }

      const myUser: MyUser = {
        id: user.uid,
        name: nameInput.getValue()!,
        photoURL,
        email: user.email!,
        device_id: "",
      };

      //! Create MyUser
      await FH.MyUser.create(myUser);
    } catch (error) {
      console.log(error);
      notify("An error occured while registering");
    }
    setCreatingMyUser(false);
  };

  return (
    <div className="px-10">
      {/* <img src={user.photoURL ?? undefined} alt="dsads" /> */}
      {/* //! TITLE */}
      <div className="h-28" />
      <Title />
      <h1 className="mb-10 mt-2 tc">Tell us about you..</h1>
      {/* <SizedBox height={80} /> */}

      {/* //! AVATAR */}
      <EditableAvatar
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        size={120}
      />
      <form className="mb-10 csc-10" onSubmit={register}>
        {/* //! FULL NAME */}
        <MyInput
          placeholder="Full name"
          className="bg-transparent"
          inputField={nameInput}
        />
        {/* //! TERMS AND CONDITIONS */}
        {Config.hasTermsAndConditions && (
          <TermsAndConditions termsInput={termsInput} />
        )}

        {/* //! SUBMIT BUTTON */}
        <MyButton
          type="submit"
          label="Create Account"
          disabled={creatingMyUser}
        />
      </form>
    </div>
  );
};

export default RegisterPage;

interface TermsAndConditionsProps {
  termsInput: ReturnType<typeof useCheckboxField>;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({
  termsInput,
}) => {
  return (
    <div className="flex items-center gap-2 text-sm justify-center">
      <input ref={termsInput.ref} type="checkbox" name="terms" />
      <p
        className="opacity-50 cp"
        onClick={() => {
          termsInput.ref.current?.click();
        }}
      >
        I agree to the{" "}
      </p>
      <p className="font-semibold">
        <a target="_blank" href={Config.termsLink}>
          Terms & Conditions
        </a>
      </p>
    </div>
  );
};
