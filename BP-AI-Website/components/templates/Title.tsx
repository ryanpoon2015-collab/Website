import type { MouseEventHandler } from "react";

import { Constants } from "@/classes/Constants";

interface TitleProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
}

const Title: React.FC<TitleProps> = ({ onClick, size = 200 }) => (
  <div className="rcc-3 tc">
    <p className="t86">{Constants.ProjTitle1}</p>
    <p className="t84">{Constants.ProjTitle2}</p>
  </div>
);

export default Title;
