import PageContainer from "@/components/templates/PageContainer";
import Txt from "@/components/templates/Txt";
import { createContext } from "react";
import { Pages, PageWrapperContext } from "../helpers/PageWrapper";
import { useC, useF } from "@/hooks/useReactHooks";
import DatabaseAccessIcon from "@/components/custom/DatabaseAccessIcon";
import DatabaseAccessText from "@/components/custom/DatabaseAccessText";
import AuthorizedPersonnelIcon from "@/components/custom/AuthorizedPersonnelIcon";
import myFetch from "@/myfunctions/myFetch";
import notify from "@/myfunctions/notify";

export const DatabaseAccessPageContext = createContext({});

interface DatabaseAccessPageProps {}

let interval: NodeJS.Timeout;

const DatabaseAccessPage: React.FC<DatabaseAccessPageProps> = ({}) => {
  const { setPage } = useC(PageWrapperContext);

  //! REQUEST ACCESS
  async function requestAccess() {
    const res = await myFetch<boolean>(
      "http://localhost:5000/fingerprint_read",
      "GET",
      {},
      {},
      "json",
      "json"
    );
    if (!res.error && res.data === true) {
      clearInterval(interval);
      setPage(Pages.DatabaseAccess2);
      return;
    } else {
      if (res.error && !res.error.includes("No valid data available")) {
        console.log(res.error);
        notify(res.error);
        return;
      }
      console.log("No access yet.");
    }
  }

  useF(() => {
    interval = setInterval(() => {
      requestAccess();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <DatabaseAccessPageContext value={{}}>
      <PageContainer
        className="!justify-start !pt-32 !gap-5"
        onBack={() => setPage(Pages.Main)}
      >
        <DatabaseAccessText />
        <AuthorizedPersonnelIcon />
      </PageContainer>
    </DatabaseAccessPageContext>
  );
};

export default DatabaseAccessPage;
