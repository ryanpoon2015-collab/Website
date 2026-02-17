import DiagnosysIcon from "@/components/custom/DiagnosysIcon";
import WebsiteVersion from "@/components/custom/WebsiteVersion";
import WelcomeText from "@/components/custom/WelcomeText";
import PageContainer from "@/components/templates/PageContainer";
import Txt from "@/components/templates/Txt";
import { twMerge } from "tailwind-merge";
import { Pages, PageWrapperContext } from "../helpers/PageWrapper";
import { useC } from "@/hooks/useReactHooks";

interface Intro2PageProps {}

const Intro2Page: React.FC<Intro2PageProps> = ({}) => {
  const { setPage } = useC(PageWrapperContext);
  return (
    <PageContainer onClick={() => setPage(Pages.Main)}>
      <WelcomeText />
    </PageContainer>
  );
};

export default Intro2Page;
