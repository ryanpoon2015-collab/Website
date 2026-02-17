import { twMerge } from "tailwind-merge";

import type { UseBarChartMonthly } from "@/hooks/useBarChartMonthly";

import ChevronLeft from "../svg/icon/ChevronLeft";
import ChevronRight from "../svg/icon/ChevronRight";

interface BarChartMonthlyProps {
  title: string;
  barChartMonthly: UseBarChartMonthly;
}

const BarChartMonthly: React.FC<BarChartMonthlyProps> = ({
  title,
  barChartMonthly,
}) => {
  return (
    <div className="mx-10 rounded-xl px-10 py-4 b b-white csc-3 tj">
      {/* //! TITLE */}
      <p className="t56">{title}</p>

      {/* //! DATA */}
      <div className="h-28 rse-4">
        {barChartMonthly.data.map((data) => (
          <div className="csc" key={`${data.year}-${data.month}`}>
            <p className="t22">{data.value}</p>
            <div
              className="w-7 bg-white"
              style={{
                height: `calc(5rem * ${
                  data.value / barChartMonthly.maxHeight
                })`,
                minHeight: "1px",
                opacity: data.value === 0 ? 0.4 : 1,
              }}
            />
            <p
              className={twMerge(
                "t33",
                data.year < barChartMonthly.lastShownYear && "o-50"
              )}
            >
              {data.month}
            </p>
          </div>
        ))}
      </div>

      {/* //! YEAR CONTROL */}
      <div className="mt-3 rsc-8">
        <ChevronLeft onClick={barChartMonthly.prev} size={7} />
        <p className="t43">{barChartMonthly.lastShownYear}</p>
        <ChevronRight onClick={barChartMonthly.next} size={7} />
      </div>
    </div>
  );
};

export default BarChartMonthly;
