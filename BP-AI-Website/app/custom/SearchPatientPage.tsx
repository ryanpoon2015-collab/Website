import PageContainer from "@/components/templates/PageContainer";
import Txt from "@/components/templates/Txt";
import { createContext } from "react";
import { Pages, PageWrapperContext } from "../helpers/PageWrapper";
import { useC, useS } from "@/hooks/useReactHooks";
import MyInput from "@/components/templates/MyInput";
import { useInputField } from "@/hooks/useInputField";
import NewSearchIcon from "@/components/custom/NewSearchIcon";
import FullHealthMonitoringText from "@/components/custom/FullHealthMonitoringText";
import { useFHPagination } from "@/hooks/useFHPagination";
import FH from "@/classes/FH";
import { where } from "firebase/firestore";
import Patient from "@/classes/Patient";
import SearchProfileFieldRow from "@/components/custom/SearchProfileFieldRow";
import DH from "@/classes/templates/DH";
import getAge from "@/myfunctions/getAge";
import BackIcon from "@/components/custom/BackIcon";
import MyButton from "@/components/templates/MyButton";
import { FHContext } from "../templates/FH_Wrapper";

export const SearchPatientPageContext = createContext({});

interface SearchPatientPageProps {}

const SearchPatientPage: React.FC<SearchPatientPageProps> = ({}) => {
  const { setPage, setIsQuickHealth } = useC(PageWrapperContext);
  const { setPatient } = useC(FHContext);
  const searchInput = useInputField((search) => []);
  const [currentSearch, setCurrentSearch] = useS<string | undefined>("");
  const [selectedPatient, setSelectedPatient] = useS<Patient | null>(null);
  const patientPagination = useFHPagination(
    FH.Patient,
    "name",
    "asc",
    10000,
    [currentSearch],
    ...(!currentSearch
      ? []
      : // ? [where("name", "==", "__never_match__")]
        [
          where("name", ">=", currentSearch ?? ""),
          where("name", "<=", (currentSearch ?? "") + "\uf8ff"),
        ])
  );

  const age = selectedPatient ? getAge(selectedPatient.birthdate.toDate()) : 0;

  return (
    <SearchPatientPageContext value={{}}>
      <PageContainer
        onBack={() => setPage(Pages.FullHealth)}
        className="!gap-4"
      >
        <FullHealthMonitoringText size={450} />
        {/*//! SEARCH BAR */}
        <div
          className="rbc bg-white rounded-full t-black px-8 py-1 b b-[#1D5577]"
          style={{
            width: "750px",
          }}
        >
          <MyInput
            inputField={searchInput}
            divClassName="wf"
            className="t74"
            placeholder="Search patient name"
            onChange={(e) => {
              setCurrentSearch(searchInput.getValue()?.trim());
            }}
          />
          <NewSearchIcon />
        </div>

        {/*//! RESULTS LIST */}
        <div
          className="relative wf csc-6 pt-6 pb-8 bg-gradient-to-br from-[#1D5577] to-[#5B8895] rounded-3xl px-10 overflow-auto b-2 b-black"
          style={{
            width: "730px",
            height: "300px",
          }}
        >
          {/*//! SEARCH RESULTS */}
          {!selectedPatient &&
            patientPagination.data.map((patient) => (
              <div
                key={patient.id}
                className="wf css-0 cp"
                onClick={() => {
                  setSelectedPatient(patient);
                }}
              >
                <p className="t65 t-white">{patient.name}</p>
                <hr className="wf" />
              </div>
            ))}

          {/*//! PATIENT SELECTED */}
          {selectedPatient && (
            <div className="wf csc-2">
              <p className="t75 t-white">Profile</p>

              <div className="wf rss-10">
                <div className="w-60 css-2 overflow-auto">
                  {/*//! Name */}
                  <SearchProfileFieldRow
                    label="Name"
                    value={selectedPatient.name}
                  />

                  {/*//! Date of Birth */}
                  <SearchProfileFieldRow
                    label="Date of Birth"
                    value={DH.shortDateFormat(
                      selectedPatient.birthdate.toDate()
                    )}
                  />

                  {/*//! Age */}
                  <SearchProfileFieldRow
                    label="Age"
                    value={age + ` year${age > 1 ? "s" : ""} old`}
                  />

                  {/*//! SEX */}
                  <SearchProfileFieldRow
                    label="Sex"
                    value={selectedPatient.gender}
                  />
                  {/*//! CONTACT */}
                  <SearchProfileFieldRow
                    label="Phone Number"
                    value={selectedPatient.contact}
                  />
                </div>

                <div className="css-2 overflow-auto">
                  {/*//! EMERGENCY NAME */}
                  <SearchProfileFieldRow
                    label="| Emergency Name"
                    value={selectedPatient.emergency_name}
                  ></SearchProfileFieldRow>

                  {/*//! EMERGENCY CONTACT */}
                  <SearchProfileFieldRow
                    label="| Emergency Number"
                    value={selectedPatient.emergency_contact}
                  />
                </div>
              </div>
            </div>
          )}

          {/*//! BACK BUTTON */}
          {selectedPatient && (
            <div className="absolute top-6 right-6">
              <BackIcon
                color="#787878FF"
                onClick={() => setSelectedPatient(null)}
              />
            </div>
          )}

          {/*//! PROCEED BUTTON */}
          {selectedPatient && (
            <div className="absolute bottom-6 right-6">
              <MyButton
                label="Proceed"
                className="bg-[#ECECEC] rounded-md"
                classNameText="!t43 !t-black"
                onClick={() => {
                  setPage(Pages.CheckVitalSigns);
                  setIsQuickHealth(false);
                  setPatient(selectedPatient);
                }}
              />
            </div>
          )}
        </div>
      </PageContainer>
    </SearchPatientPageContext>
  );
};

export default SearchPatientPage;
