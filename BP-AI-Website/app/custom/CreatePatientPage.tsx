import PageContainer from "@/components/templates/PageContainer";
import Txt from "@/components/templates/Txt";
import { createContext } from "react";
import { Pages, PageWrapperContext } from "../helpers/PageWrapper";
import { useC, useS } from "@/hooks/useReactHooks";
import CreatePatientProfileText from "@/components/custom/CreatePatientProfileText";
import NewPatientProfileText from "@/components/custom/NewPatientProfileText";
import MyInput from "@/components/templates/MyInput";
import { useInputField } from "@/hooks/useInputField";
import MyDatePicker from "@/components/templates/MyDatePicker";
import { FHContext } from "../templates/FH_Wrapper";
import InputRow from "@/components/custom/InputRow";
import MyDropDownPicker from "@/components/templates/MyDropdownPicker";
import { useDropdownField } from "@/hooks/useMyDropdown";
import MyButton from "@/components/templates/MyButton";
import FH from "@/classes/FH";
import notify from "@/myfunctions/notify";
import Patient from "@/classes/Patient";
import firestoreAutoId from "@/myfunctions/firestoreAutoId";
import { Timestamp } from "firebase/firestore";
import useModal from "@/hooks/useModal";
import MyModal from "@/components/templates/MyModal";
import SavedModalHeader from "@/components/custom/SavedModalHeader";
import YourDataSavedText from "@/components/custom/YourDataSavedText";

export const CreatePatientPageContext = createContext({});

interface CreatePatientPageProps {}

const CreatePatientPage: React.FC<CreatePatientPageProps> = ({}) => {
  const { setPage, setIsQuickHealth } = useC(PageWrapperContext);
  const { setPatient } = useC(FHContext);
  const [creatingPatient, setCreatingPatient] = useS(false);
  const savedModal = useModal();
  const [toSavePatient, setToSavePatient] = useS<Patient | null>(null);
  const nameInput = useInputField((name) => [
    [!name, "Name is required."],
    [name!.length > 50, "Name cannot exceed 50 characters."],
  ]);
  const [birthdate, setBirthdate] = useS<Date | null>(null);
  const sexDropdown = useDropdownField("", ["Male", "Female"]);

  const contactInput = useInputField((contact) => [
    [!contact, "Contact is required."],
    [contact!.length > 50, "Contact cannot exceed 50 characters."],
  ]);

  const emergencyNameInput = useInputField((name) => [
    [!name, "Emergency contact name is required."],
    [name!.length > 50, "Emergency contact name cannot exceed 50 characters."],
  ]);

  const emergencyContactInput = useInputField((contact) => [
    [!contact, "Emergency contact is required."],
    [contact!.length > 50, "Emergency contact cannot exceed 50 characters."],
  ]);

  async function createPatient() {
    if (creatingPatient) return;
    if (!nameInput.verify()) return;
    if (!birthdate) {
      notify("Birthdate is required.");
      return;
    }
    if (
      !sexDropdown.verify() ||
      !contactInput.verify() ||
      !emergencyNameInput.verify() ||
      !emergencyContactInput.verify()
    )
      return;

    const patient: Patient = {
      id: firestoreAutoId(),
      name: nameInput.getValue()!,
      birthdate: Timestamp.fromDate(birthdate),
      gender: sexDropdown.value!,
      contact: contactInput.getValue()!,
      emergency_name: emergencyNameInput.getValue()!,
      emergency_contact: emergencyContactInput.getValue()!,
    };
    setCreatingPatient(true);

    await FH.Patient.create(patient, {
      success: "Patient created successfully.",
    });
    setToSavePatient(patient);

    setCreatingPatient(false);
    savedModal.open();
  }

  return (
    <CreatePatientPageContext value={{}}>
      <PageContainer onBack={() => setPage(Pages.FullHealth)}>
        {/* <CreatePatientProfileText /> */}

        <div
          className="csc-6 pt-6 pb-8 bg-gradient-to-br from-[#1D5577] to-[#5B8895] rounded-3xl px-10 overflow-auto b-2 b-black"
          style={{
            width: "calc(100% - 6rem)",
          }}
        >
          <NewPatientProfileText />

          <div className="wf css-4 pr-20 pl-20">
            {/*//! NAME */}
            <InputRow title="Name">
              <MyInput
                inputField={nameInput}
                className="bg-white wf py-0 rounded-sm t64"
                divClassName="wf"
              />
            </InputRow>

            {/*//! DATE OF BIRTH */}
            <InputRow title="Date of Birth">
              <MyDatePicker date={birthdate} setDate={setBirthdate} />
            </InputRow>

            {/*//! SEX */}
            <InputRow title="Sex">
              <MyDropDownPicker
                dropdownField={sexDropdown}
                divClassname="wf !p-0"
                className="!p-0"
              />
            </InputRow>

            {/*//! CONTACT */}
            <InputRow title="Phone Number">
              <MyInput
                inputField={contactInput}
                className="bg-white wf py-0 rounded-sm t64"
                divClassName="wf"
              />
            </InputRow>

            <p className="wf t84c t-white pt-2">Emergency Contact</p>
            {/*//! EMERGENCY NAME */}
            <InputRow title="Name">
              <MyInput
                inputField={emergencyNameInput}
                className="bg-white wf py-0 rounded-sm t64"
                divClassName="wf"
              />
            </InputRow>
            {/*//! EMERGENCY CONTACT */}
            <InputRow title="Phone Number">
              <MyInput
                inputField={emergencyContactInput}
                className="bg-white wf py-0 rounded-sm t64"
                divClassName="wf"
              />
            </InputRow>

            {/*//! SUBMIT BUTTON */}
            <div className="wf rec pt-2">
              <MyButton
                label="SUBMIT"
                className="bg-green"
                onClick={createPatient}
                disabled={creatingPatient}
              />
            </div>
          </div>
        </div>
      </PageContainer>

      {/*//! SAVED MODAL */}
      <MyModal
        useModal={savedModal}
        title={<SavedModalHeader />}
        button1Str="NO"
        onButton1Click={() => {
          savedModal.close();
          setPage(Pages.FullHealth);
        }}
        button2Str="YES"
        onButton2Click={() => {
          savedModal.close();
          setPage(Pages.CheckVitalSigns);
          setIsQuickHealth(false);
          setPatient(toSavePatient);
        }}
      >
        <YourDataSavedText />
      </MyModal>
    </CreatePatientPageContext>
  );
};

export default CreatePatientPage;
