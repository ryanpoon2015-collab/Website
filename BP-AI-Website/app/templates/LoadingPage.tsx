import React from "react";
import { FadeLoader } from "react-spinners";

import { useC } from "@/hooks/useReactHooks";

import { TailwindContext } from "./Tailwind_Wrapper";

interface LoadingPageProps {
  hideIcon?: boolean;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ hideIcon = false }) => {
  const { getColor } = useC(TailwindContext);
  return (
    <div
      className="ccc fixed left-0 top-0 z-10 select-none ws hs bg-aspect-ratio"
      style={{
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {!hideIcon && (
        <FadeLoader
          color={`${getColor("loading_icon")}`}
          loading
          // size={150}
        />
      )}
    </div>
  );
};

export default LoadingPage;
