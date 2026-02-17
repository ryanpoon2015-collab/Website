import PageContainer from "@/components/templates/PageContainer";
import Txt from "@/components/templates/Txt";
import { createContext } from "react";
import { Pages, PageWrapperContext } from "../helpers/PageWrapper";
import { useC } from "@/hooks/useReactHooks";
import SignInButton from "@/components/custom/SignInButton";
import DoctorsProfileText from "@/components/custom/DoctorsProfileText";

export const DoctorsProfilePageContext = createContext({});

interface DoctorsProfilePageProps {}

const DoctorsProfilePage: React.FC<DoctorsProfilePageProps> = ({}) => {
  const { setPage } = useC(PageWrapperContext);

  return (
    <DoctorsProfilePageContext value={{}}>
      <PageContainer
        className="!justify-start pt-32"
        onBack={() => setPage(Pages.Main)}
      >
        <DoctorsProfileText />
        <SignInButton onClick={() => setPage(Pages.DoctorsProfile2)} />
      </PageContainer>
    </DoctorsProfilePageContext>
  );
};

export default DoctorsProfilePage;
