import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext } from "react";

import Footer from "@/components/templates/Footer";
//! /* Add Pages Here */
import DatabaseAccess2Page from "../custom/DatabaseAccess2Page";
import DoctorsProfile2Page from "../custom/DoctorsProfile2Page";
import SearchPatientPage from "../custom/SearchPatientPage";
import CreatePatientPage from "../custom/CreatePatientPage";
import AIDiagnosisPage from "../custom/AIDiagnosisPage";
import CheckVitalSignsPage from "../custom/CheckVitalSignsPage";
import DatabaseAccessPage from "../custom/DatabaseAccessPage";
import DoctorsProfilePage from "../custom/DoctorsProfilePage";
import FullHealthPage from "../custom/FullHealthPage";
import Overlay from "@/components/templates/Overlay";
import { useS } from "@/hooks/useReactHooks";

import MainPage from "../custom/MainPage";
import Sample_LogsPage from "../z/Logs/Sample_LogsPage";
import Sidebar from "../../components/templates/Sidebar";
import useDeviceDimensions from "@/hooks/useDeviceDimensions";
import DashboardIcon from "@/components/svg/icon/DashboardIcon";
import IntroPage from "../custom/IntroPage";
import Intro2Page from "../custom/Intro2Page";
import QuickHealthPage from "../custom/QuickHealthPage";

// ? ----------------------
// ? PAGES
// ? BOTTOM SHEETS
// ? ----------------------

export const enum Pages {
  Main,
  DatabaseAccess2,
  DoctorsProfile2,
  SearchPatient,
  CreatePatient,
  AIDiagnosis,
  CheckVitalSigns,
  DatabaseAccess,
  DoctorsProfile,
  FullHealth,
  QuickHealth,
  Intro,
  Intro2,
}

//********************************* */
const defaultPage = Pages.Intro;
//********************************* */

export const PageWrapperContext = createContext({
  page: Pages.Main,
  setPage: {} as Dispatch<SetStateAction<Pages>>,
  overlay: null as ReactNode | null,
  setOverlay: {} as Dispatch<SetStateAction<ReactNode | null>>,
  isSidebarOpen: false,
  setIsSidebarOpen: {} as Dispatch<SetStateAction<boolean>>,
  isMobile: false,
  screenHeight: 0,
  screenWidth: 0,
  isQuickHealth: false,
  setIsQuickHealth: {} as Dispatch<SetStateAction<boolean>>,
  disableCheckVitalSigns: false,
  setDisableCheckVitalSigns: {} as Dispatch<SetStateAction<boolean>>,
});

interface PageWrapperProps {}

const PageWrapper: React.FC<PageWrapperProps> = ({}) => {
  //! OVERLAY
  const [overlay, setOverlay] = useS<ReactNode | null>(null);

  //! Page
  const [page, setPage] = useS<Pages>(defaultPage);

  //! IS QUICK HEALTH
  const [isQuickHealth, setIsQuickHealth] = useS(true);

  //! IS MOBILE
  const { isMobile, screenHeight, screenWidth } = useDeviceDimensions();

  //! IS SIDEBAR OPEN
  const [isSidebarOpen, setIsSidebarOpen] = useS(false);

  //! DISABLE CHECK VITAL SIGNS
  const [disableCheckVitalSigns, setDisableCheckVitalSigns] = useS(false);

  return (
    <PageWrapperContext
      value={{
        page,
        setPage,
        overlay,
        setOverlay,
        isSidebarOpen,
        setIsSidebarOpen,
        isMobile,
        screenHeight,
        screenWidth,
        isQuickHealth,
        setIsQuickHealth,
        disableCheckVitalSigns,
        setDisableCheckVitalSigns,
      }}
    >
      <Footer
        className=""
        // pages={{
        // [Pages.Main]: <DashboardIcon />,
        //   [Pages.Settings]: <SettingsIcon />,
        // }}
      />

      {/* <Sidebar /> */}

      <div className="overflow-y-auto wf hf">
        {page === Pages.Intro && <IntroPage />}
        {page === Pages.Intro2 && <Intro2Page />}
        {page === Pages.Main && <MainPage />}
        {/*//! Add Page Mapping Here */}
        {page === Pages.DatabaseAccess2 && <DatabaseAccess2Page />}
        {page === Pages.DoctorsProfile2 && <DoctorsProfile2Page />}
        {page === Pages.SearchPatient && <SearchPatientPage />}
        {page === Pages.CreatePatient && <CreatePatientPage />}
        {page === Pages.AIDiagnosis && <AIDiagnosisPage />}
        {page === Pages.CheckVitalSigns && <CheckVitalSignsPage />}
        {page === Pages.DatabaseAccess && <DatabaseAccessPage />}
        {page === Pages.DoctorsProfile && <DoctorsProfilePage />}
        {page === Pages.FullHealth && <FullHealthPage />}
        {page === Pages.QuickHealth && <QuickHealthPage />}
      </div>
      {overlay && <Overlay setOverlay={setOverlay}>{overlay}</Overlay>}
    </PageWrapperContext>
  );
};

export default PageWrapper;
