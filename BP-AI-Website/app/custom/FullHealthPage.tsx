import PageContainer from "@/components/templates/PageContainer";
import Txt from "@/components/templates/Txt";
import { createContext } from "react";
import { Pages, PageWrapperContext } from "../helpers/PageWrapper";
import { useC } from "@/hooks/useReactHooks";
import FullHealthMonitoringText from "@/components/custom/FullHealthMonitoringText";
import CreatePatientProfileButton from "@/components/custom/CreatePatientProfileButton";
import SearchPatientProfileButton from "@/components/custom/SearchPatientProfileButton";

export const FullHealthPageContext = createContext({});

interface FullHealthPageProps {}

const FullHealthPage: React.FC<FullHealthPageProps> = ({}) => {
  const { setPage } = useC(PageWrapperContext);

  return (
    <FullHealthPageContext value={{}}>
      <PageContainer onBack={() => setPage(Pages.Main)}>
        <FullHealthMonitoringText />
        <div className="rcc-10">
          <CreatePatientProfileButton
            onClick={() => setPage(Pages.CreatePatient)}
          />
          <SearchPatientProfileButton
            onClick={() => setPage(Pages.SearchPatient)}
          />
        </div>
      </PageContainer>
    </FullHealthPageContext>
  );
};

export default FullHealthPage;
