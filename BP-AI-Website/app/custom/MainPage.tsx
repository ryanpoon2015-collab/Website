import DatabaseAccessIcon from "@/components/custom/DatabaseAccessIcon";
import DoctorsProfileIcon from "@/components/custom/DoctorsProfileIcon";
import FullHealthMonitoringIcon from "@/components/custom/FullHealthMonitoringIcon";
import QuickHealthMonitoringIcon from "@/components/custom/QuickHealthMonitoringIcon";
import WebsiteVersion from "@/components/custom/WebsiteVersion";
import PageContainer from "@/components/templates/PageContainer";
import Txt from "@/components/templates/Txt";
import { Pages, PageWrapperContext } from "../helpers/PageWrapper";
import { useC, useS } from "@/hooks/useReactHooks";
import ShutdownIcon from "@/components/custom/ShutdownIcon";
import myFetch from "@/myfunctions/myFetch";
import notify from "@/myfunctions/notify";
import MyModal from "@/components/templates/MyModal";
import useModal from "@/hooks/useModal";
import MyButton from "@/components/templates/MyButton";
import ConfirmShutdownTitle from "@/components/custom/ConfirmShutdownTitle";
import ConfirmShutdownText from "@/components/custom/ConfirmShutdownText";

interface MainPageProps {}

const MainPage: React.FC<MainPageProps> = ({}) => {
  const { setPage, setDisableCheckVitalSigns, setIsQuickHealth } =
    useC(PageWrapperContext);

  const shutdownModal = useModal();
  const [shuttingDown, setShuttingDown] = useS(false);

  //! Shutdown
  async function shutdown() {
    if (shuttingDown) return;
    setShuttingDown(true);
    const res = await myFetch<string>(
      "http://localhost:5000/shutdown",
      "GET",
      {},
      {},
      "json",
      "json"
    );

    if (res.error) {
      console.log(res.error);
      notify("Failed to shutdown the system");
    }
  }

  return (
    <PageContainer>
      <div className="wf rcc-10">
        <QuickHealthMonitoringIcon
          onClick={() => {
            setPage(Pages.QuickHealth);
            setDisableCheckVitalSigns(false);
            setIsQuickHealth(true);
          }}
        />
        <FullHealthMonitoringIcon
          onClick={() => {
            setPage(Pages.FullHealth);
            setIsQuickHealth(false);
          }}
        />
        <DoctorsProfileIcon onClick={() => setPage(Pages.DoctorsProfile)} />
        <DatabaseAccessIcon onClick={() => setPage(Pages.DatabaseAccess)} />
      </div>
      <WebsiteVersion />

      {/*//! SHUTDOWN ICON */}
      <div className="absolute top-10 right-8">
        <ShutdownIcon onClick={shutdownModal.open} />
      </div>

      <MyModal
        useModal={shutdownModal}
        title={<ConfirmShutdownTitle />}
        button1Str="No"
        button2Str="Yes"
        onButton1Click={shutdownModal.close}
        onButton2Click={shutdown}
      >
        <div className="css-4">
          <ConfirmShutdownText />
        </div>
      </MyModal>
    </PageContainer>
  );
};

export default MainPage;
