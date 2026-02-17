import FH from "@/classes/FH";
import DH from "@/classes/templates/DH";
import DatabaseAccessText from "@/components/custom/DatabaseAccessText";
import NewSearchIcon from "@/components/custom/NewSearchIcon";
import MyButton from "@/components/templates/MyButton";
import MyInput from "@/components/templates/MyInput";
import PageContainer from "@/components/templates/PageContainer";
import Txt from "@/components/templates/Txt";
import { useFHPagination } from "@/hooks/useFHPagination";
import { useInputField } from "@/hooks/useInputField";
import { useC, useS } from "@/hooks/useReactHooks";
import getAge from "@/myfunctions/getAge";
import { where } from "firebase/firestore";
import { createContext } from "react";
import { Pages, PageWrapperContext } from "../helpers/PageWrapper";
import Patient from "@/classes/Patient";
import LogDevice from "@/classes/LogDevice";
import { twMerge } from "tailwind-merge";
import notify from "@/myfunctions/notify";
import ChevronLeft from "@/components/svg/icon/ChevronLeft";
import ChevronRight from "@/components/svg/icon/ChevronRight";
import PdfViewer from "@/components/custom/PdfViewer";
import DBTable from "@/components/custom/DBTable";
import MyModal from "@/components/templates/MyModal";
import useModal from "@/hooks/useModal";

export const DatabaseAccess2PageContext = createContext({});

interface DatabaseAccess2PageProps {}

const DatabaseAccess2Page: React.FC<DatabaseAccess2PageProps> = ({}) => {
  const { setPage } = useC(PageWrapperContext);
  const searchInput = useInputField((search) => []);
  const [currentSearch, setCurrentSearch] = useS<string | undefined>("");
  const [deletingEntry, setDeletingEntry] = useS(false);
  const tableModal = useModal();

  //! DATABASE PATIENTS
  const databasePatients = useFHPagination(
    FH.LogDevice,
    "pdf_name",
    "desc",
    3,
    [currentSearch],
    ...(!currentSearch
      ? []
      : // ? [where("name", "==", "__never_match__")]
        [
          where("name", ">=", currentSearch ?? ""),
          where("name", "<=", (currentSearch ?? "") + "\uf8ff"),
        ])
  );

  const [selectedLogDevice, setSelectedLogDevice] = useS<LogDevice | null>(
    null
  );

  //! DELETE ROW
  async function deleteEntry() {
    if (deletingEntry) return;
    if (!selectedLogDevice) {
      notify("Please select an entry to delete.");
      return;
    }
    setDeletingEntry(true);
    await FH.LogDevice.delete(selectedLogDevice.id, {
      onSuccess() {
        notify("Entry deleted successfully.", { type: "success" });
        setSelectedLogDevice(null);
        tableModal.close();
      },
    });
    setDeletingEntry(false);
  }

  return (
    <DatabaseAccess2PageContext value={{}}>
      <PageContainer className="!gap-2 !px-12 !justify-start">
        {/*//! DATABASE ACCESS TEXT */}
        <DatabaseAccessText />

        {/*//! SEARCH BAR */}
        <div className="wf">
          <div
            className="rbc bg-white rounded-md t-black px-4 py-1 b b-[#1D5577]"
            style={{
              width: "350px",
            }}
          >
            <MyInput
              inputField={searchInput}
              divClassName="wf"
              className="t43"
              placeholder="Search patient name"
              onChange={(e) => {
                setCurrentSearch(searchInput.getValue()?.trim());
              }}
            />
            <NewSearchIcon />
          </div>
        </div>

        {/*//! TABLE */}
        <div
          className="relative wf overflow-x-auto bg-gradient-to-br from-[#1D5577] to-[#5B8895] rounded-xl b b-[#000000]"
          style={{
            minHeight: "280px",
            maxWidth: "90vw",
          }}
        >
          <DBTable
            logDevices={databasePatients?.data || []}
            onClick={(logDevice) => {
              setSelectedLogDevice(logDevice);
              tableModal.open();
            }}
          />

          <div className="wf rbc">
            {/*//! BACK */}
            <div className="pt-4 pb-4 px-4 rbc">
              <MyButton
                label="Back"
                className="bg-[#AFABAB] w-min rounded-md"
                classNameText="!text-black"
                onClick={() => setPage(Pages.Main)}
              />
            </div>

            {/* //! < 1 > */}
            {databasePatients && (
              <div className="flex gap-4 items-center">
                <ChevronLeft
                  color={"#fff"}
                  onClick={databasePatients.prev}
                  disabled={
                    !databasePatients.hasPrev || databasePatients.loading
                  }
                />
                <p className="text-text_dark">{databasePatients.pageNum}</p>
                <ChevronRight
                  color={"#fff"}
                  onClick={databasePatients.next}
                  disabled={
                    !databasePatients.hasNext || databasePatients.loading
                  }
                />
              </div>
            )}

            {/*//! BACK */}
            <div className="pt-4 pb-4 px-4 rbc invisible">
              <MyButton
                label="Back"
                className="bg-[#AFABAB] w-min rounded-md"
                classNameText="!text-black"
                onClick={() => {}}
              />
            </div>
          </div>
        </div>

        <div className="h-20"></div>
      </PageContainer>

      {/*//! MY MODAL */}
      {selectedLogDevice && (
        <MyModal useModal={tableModal} classNameChildren="!gap-2">
          <div
            style={{
              maxWidth: "90vw",
            }}
          >
            <DBTable
              logDevices={[selectedLogDevice]}
              className="bg-[#E0F9FA] rounded-xl b b-[#000000]"
            />
          </div>

          {/*//! BACK */}
          <div className="pt-2 wf rbc">
            <MyButton
              label="Back"
              className="bg-[#AFABAB] w-min rounded-md"
              classNameText="!text-black"
              onClick={() => {
                setSelectedLogDevice(null);
                tableModal.close();
              }}
            />

            {/*//! DELETE */}
            <MyButton
              label="Delete"
              className="bg-[#AFABAB] w-min rounded-md"
              classNameText="!text-black"
              onClick={deleteEntry}
              disabled={!selectedLogDevice || deletingEntry}
            />
          </div>
        </MyModal>
      )}
    </DatabaseAccess2PageContext>
  );
};

export default DatabaseAccess2Page;
