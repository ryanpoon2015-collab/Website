import PageContainer from "@/components/templates/PageContainer";
import Txt from "@/components/templates/Txt";
import { createContext } from "react";
import { Pages, PageWrapperContext } from "../helpers/PageWrapper";
import { useC, useS } from "@/hooks/useReactHooks";
import DoctorsProfileInputBg from "@/components/custom/DoctorsProfileInputBg";
import DoctorsProfileText from "@/components/custom/DoctorsProfileText";
import InputRow from "@/components/custom/InputRow";
import MyInput from "@/components/templates/MyInput";
import { useInputField } from "@/hooks/useInputField";
import isValidEmail from "@/myfunctions/is_valid_email";
import MyButton from "@/components/templates/MyButton";
import FH from "@/classes/FH";
import notify from "@/myfunctions/notify";
import useModal from "@/hooks/useModal";
import MyModal from "@/components/templates/MyModal";
import SendToPhysicianText from "@/components/custom/SendToPhysicianText";
import Physician from "@/classes/Physician";
import { FHContext } from "../templates/FH_Wrapper";

export const DoctorsProfile2PageContext = createContext({});

interface DoctorsProfile2PageProps {}

const DoctorsProfile2Page: React.FC<DoctorsProfile2PageProps> = ({}) => {
  const { setPage } = useC(PageWrapperContext);
  const { device } = useC(FHContext);
  const nameInput = useInputField((name) => [
    [!name, "Name is required."],
    [name!.length > 50, "Name cannot exceed 50 characters."],
  ]);
  const emailInput = useInputField((email) => [
    [!email, "Email is required."],
    [!isValidEmail(email!), "Email is not valid."],
  ]);
  const signInModal = useModal();
  const [signingIn, setSigningIn] = useS(false);
  const [physician, setPhysician] = useS<Physician | null>(null);

  //! SIGN IN
  async function signIn() {
    if (signingIn || !nameInput.verify() || !emailInput.verify()) return;
    const name = nameInput.getValue()!.trim();
    const email = emailInput.getValue()!.trim();

    setSigningIn(true);
    const physician = await FH.Physician.get(email);
    setSigningIn(false);
    //? Physician not found
    if (
      !physician ||
      physician.name.trim().toLowerCase() !== name.trim().toLowerCase()
    ) {
      notify("Physician not found.");
      return;
    }

    //? Set default physician
    const success = await FH.Device.update(device, {
      attending_physician: physician.id,
      attending_physician_name: physician.name,
    });
    if (success) {
      //? Success
      setPhysician(physician);
      signInModal.open();
    }
  }

  return (
    <DoctorsProfile2PageContext value={{}}>
      <PageContainer
        className="!justify-start !gap-6 pt-32"
        onBack={() => setPage(Pages.DoctorsProfile)}
      >
        <DoctorsProfileText />
        <div className="relative">
          <DoctorsProfileInputBg />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              signIn();
            }}
            className="wf css-4 absolute bottom-6 px-16 left-1/2 -translate-x-1/2"
          >
            {/*//! NAME */}
            <InputRow title="Name" className="w-16 overflow-y-clip">
              <MyInput
                inputField={nameInput}
                className="bg-white wf py-0 rounded-sm t64"
                divClassName="wf"
              />
            </InputRow>

            {/*//! EMAIL */}
            <InputRow title="Email" className="w-16 overflow-y-clip">
              <MyInput
                inputField={emailInput}
                className="bg-white wf py-0 rounded-sm t64"
                divClassName="wf"
              />
            </InputRow>

            {/*//! BUTTON */}
            <div className="wf csc">
              <MyButton
                type="submit"
                label="Sign In"
                className="w-min bg-[#535353] rounded-md"
                classNameText="!t-white"
                disabled={signingIn}
              />
            </div>
          </form>
        </div>
      </PageContainer>

      {/*//! SIGNED IN MODAL */}
      <MyModal
        useModal={signInModal}
        title={<SendToPhysicianText />}
        button1Str="DONE"
        onButton1Click={() => {
          signInModal.close();
          setPage(Pages.Main);
        }}
        onclose={() => {
          setPage(Pages.Main);
        }}
      >
        <p className="t76">Hello, Dr. {physician?.name}!</p>
      </MyModal>
    </DoctorsProfile2PageContext>
  );
};

export default DoctorsProfile2Page;
