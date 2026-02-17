import { twMerge } from "tailwind-merge";
import { Config, Constants } from "@/classes/Constants";
import BackIcon from "../custom/BackIcon";

interface PageContainerProps {
  children?: React.ReactNode;
  onClick?: () => void;
  onBack?: () => void;
  className?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  onClick,
  onBack,
  className,
}) => {
  return (
    <div
      className={twMerge(
        "relative z-0 ccc-12 wf hf min-hs overflow-scroll-y pt-32 pb-0 px-8 bg-aspect-ratio max-h-screen",
        className
      )}
      style={{
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      onClick={onClick}
    >
      {children}

      {/*//TODO : align */}
      {onBack && (
        <div className="absolute top-10 right-8">
          <BackIcon onClick={onBack} />
        </div>
      )}
      {/* <div className="fixed -z-10 bottom-12 right-8">
        <LowerRightIcon />
      </div> */}
    </div>
  );
};

export default PageContainer;
