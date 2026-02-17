import PageContainer from "@/components/templates/PageContainer";
import { createContext } from "react";
import { Pages, PageWrapperContext } from "../helpers/PageWrapper";
import { useC } from "@/hooks/useReactHooks";
import QuickHealthMonitoringText from "@/components/custom/QuickHealthMonitoringText";
import CheckVitalSignsGrayIcon from "@/components/custom/CheckVitalSignsGrayIcon";
import CheckVitalSignsIcon from "@/components/custom/CheckVitalSignsIcon";
import AIDiagnosisIcon from "@/components/custom/AIDiagnosisIcon";
import GrayIcon from "@/components/custom/GrayIcon";
import GrayMask from "@/components/custom/GrayMask";
import { FHContext } from "../templates/FH_Wrapper";
import FullHealthMonitoringText from "@/components/custom/FullHealthMonitoringText";

export const QuickHealthPageContext = createContext({});

interface QuickHealthPageProps {}

const QuickHealthPage: React.FC<QuickHealthPageProps> = ({}) => {
  const { temperature, heartRate, spo2, bpSys, bpDia } = useC(FHContext);
  const { setPage, isQuickHealth, setIsQuickHealth, disableCheckVitalSigns } =
    useC(PageWrapperContext);
  return (
    <QuickHealthPageContext value={{}}>
      <PageContainer onBack={() => setPage(Pages.Main)}>
        {isQuickHealth ? (
          <QuickHealthMonitoringText />
        ) : (
          <FullHealthMonitoringText />
        )}
        <div className="rcc-10">
          <CheckVitalSignsIcon
            onClick={() => {
              setIsQuickHealth(true);
              setPage(Pages.CheckVitalSigns);
            }}
            disabled={disableCheckVitalSigns}
          />
          <AIDiagnosisIcon
            disabled={
              temperature === null ||
              heartRate === null ||
              spo2 === null ||
              bpSys === null ||
              bpDia === null
            }
            onClick={() => setPage(Pages.AIDiagnosis)}
          />
        </div>
      </PageContainer>
    </QuickHealthPageContext>
  );
};

export default QuickHealthPage;
