import { createContext } from "react";

import ConstantsWrapper from "./Constants_Wrapper";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@/tailwind.config";

const fullConfig = resolveConfig(tailwindConfig);

const colors = fullConfig.theme.colors;

export type TailwindColors = keyof typeof colors;

export const TailwindContext = createContext({
  getColor: {} as (color: keyof typeof colors) => string | undefined,
});

interface Tailwind_WrapperProps {}

const Tailwind_Wrapper: React.FC<Tailwind_WrapperProps> = ({}) => {
  const getColor = (color: keyof typeof colors) => {
    return colors[color]?.toString();
  };

  return (
    <TailwindContext
      value={{
        getColor,
      }}
    >
      <ConstantsWrapper />
    </TailwindContext>
  );
};

export default Tailwind_Wrapper;
