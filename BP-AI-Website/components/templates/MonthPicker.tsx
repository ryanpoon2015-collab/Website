import { useState } from "react";
import { twMerge } from "tailwind-merge";

import DH from "@/classes/templates/DH";
import { MotionDiv } from "@/types/framer_motion_types";

import ChevronLeft from "../svg/icon/ChevronLeft";
import ChevronRight from "../svg/icon/ChevronRight";
import DropdownButton from "./DropdownButton";

interface MonthPickerProps {
  onChange?: (month: number, year: number) => void;
}

const MonthPicker: React.FC<MonthPickerProps> = ({ onChange }) => {
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth()
  );

  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );

  const [shownYear, setShownYear] = useState<number>(selectedYear);

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <DropdownButton
      isExpanded={isExpanded}
      setIsExpanded={setIsExpanded}
      icon={
        <div className="rse-2">
          <p className="t46">{DH.monthAbbrev[selectedMonth]},</p>
          <p className=" o-50 t43">{shownYear}</p>
        </div>
      }
      expandDirection="bottom-right"
      className="bg-gray b b-zinc-400"
    >
      <div className="csc-2">
        {/* //! YEAR */}
        <div className="px-4 py-2 rbc wf">
          <ChevronLeft
            color="white"
            onClick={() => setShownYear((y) => y - 1)}
          />
          <p className="">{shownYear}</p>
          <ChevronRight
            color="white"
            onClick={() => setShownYear((y) => y + 1)}
          />
        </div>
        <hr className="o-30 wf" />
        {/* //! MONTH */}
        <div className="w-48 wcs">
          {DH.monthAbbrev.map((month, index) => {
            // ? Selected Month
            const isSelectedMonth =
              selectedMonth === index && selectedYear === shownYear;

            // ? Current Month
            const isCurrentMonth =
              new Date().getMonth() === index &&
              selectedYear === new Date().getFullYear();

            // ? After current month
            const isAfterCurrentMonth =
              shownYear > new Date().getFullYear() ||
              (shownYear === new Date().getFullYear() &&
                index > new Date().getMonth());

            return (
              <MotionDiv
                key={index}
                onClick={() => {
                  if (isAfterCurrentMonth) return;
                  setSelectedMonth(index);
                  setSelectedYear(shownYear);
                  onChange?.(index, selectedYear);
                  setIsExpanded(false);
                }}
                className="w-16 p-2"
                whileTap={{ scale: 0.9 }}
              >
                <p
                  className={twMerge(
                    "tc tf2 rounded-md",
                    isSelectedMonth && "bg-slate-600",
                    isAfterCurrentMonth && "o-50"
                  )}
                >
                  {month}
                </p>
              </MotionDiv>
            );
          })}
        </div>
      </div>
    </DropdownButton>
  );
};

export default MonthPicker;
