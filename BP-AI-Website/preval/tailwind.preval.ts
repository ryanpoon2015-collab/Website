import tailwindConfig from "../tailwind.config";
import preval from "next-plugin-preval";
import resolveConfig from "tailwindcss/resolveConfig";

async function getData() {
  const fullConfig = resolveConfig(tailwindConfig);

  return fullConfig?.theme;
}

const tailwindTheme = preval(getData());

export default tailwindTheme;
