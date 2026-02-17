import DiagnosysIcon from "@/components/custom/DiagnosysIcon";
import WebsiteVersion from "@/components/custom/WebsiteVersion";
import PageContainer from "@/components/templates/PageContainer";
import Txt from "@/components/templates/Txt";
import { useC, useF } from "@/hooks/useReactHooks";
import { twMerge } from "tailwind-merge";
import { Pages, PageWrapperContext } from "../helpers/PageWrapper";

interface IntroPageProps {}

const IntroPage: React.FC<IntroPageProps> = ({}) => {
  const { setPage } = useC(PageWrapperContext);

  useF(() => {
    const timer = setTimeout(() => {
      setPage(Pages.Intro2);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div
      className={twMerge(
        "relative z-0 csc-12 wf hf min-hs overflow-scroll-y pt-10 pb-20 px-8 bg-intro-aspect-ratio"
      )}
      style={{
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    ></div>
  );
};

export default IntroPage;
