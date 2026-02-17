import { twMerge } from "tailwind-merge";

import Txt from "./Txt";

interface MiniDataBoxProps {
  title: string;
  data: number;
  icon: React.ReactNode;
  unit: string;
  full?: boolean;
}

const MiniDataBox: React.FC<MiniDataBoxProps> = ({
  title,
  data,
  icon,
  unit,
  full = false,
}) => {
  return (
    <div
      className={twMerge(
        "rbc rounded-2xl py-4 pl-3 pr-4 bg-gray bg-opacity-75",
        full ? "wf" : "w-40"
      )}
    >
      <div className="css-2 wf">
        <Txt.section>{title}</Txt.section>
        <div className="rbs wf">
          <div className="rss">
            <div className="rsc-2">
              <div className="h-3 w-3 rounded-full b" />
              <Txt.number>{maxDecimal(data)}</Txt.number>
            </div>
            <Txt.exponent>{unit}</Txt.exponent>
          </div>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default MiniDataBox;

function maxDecimal(data: number): string {
  if (data > 999)
    return data.toLocaleString(undefined, {
      maximumFractionDigits: 0,
    });

  return data.toLocaleString(undefined, {
    maximumFractionDigits: 2,
  });
}
