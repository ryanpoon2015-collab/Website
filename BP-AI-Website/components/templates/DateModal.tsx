import { useState } from "react";
import { twMerge } from "tailwind-merge";

import type useModal from "@/hooks/useModal";
import { MotionDiv } from "@/types/framer_motion_types";

import ChevronLeft from "../svg/icon/ChevronLeft";
import ChevronRight from "../svg/icon/ChevronRight";
import MyModal from "./MyModal";
import RightTriangle from "./RightTriangle";

interface DateModalProps {
  dateModal: ReturnType<typeof useModal>;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

const DateModal: React.FC<DateModalProps> = ({
  dateModal,
  selectedDate,
  setSelectedDate,
}) => {
  // const { selectedDate, setSelectedDate } = useContext(FHContext);
  const selectedMonth = months[selectedDate.getMonth()];
  const selectedMYear = selectedDate.getFullYear().toString();

  function setSelectedMonth(month: string) {
    const monthIndex = months.indexOf(month);
    const newDate = new Date(selectedDate);
    newDate.setMonth(monthIndex);
    setSelectedDate(newDate);
    ``;
  }

  function setSelectedYear(year: string) {
    const newDate = new Date(selectedDate);
    newDate.setFullYear(parseInt(year));
    setSelectedDate(newDate);
  }

  function setNextMonth() {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setSelectedDate(newDate);
  }

  function setPrevMonth() {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setSelectedDate(newDate);
  }

  return (
    <MyModal
      useModal={dateModal}
      title="Choose Date"
      classNameContent="top-20 translate-y-0"
    >
      <div className="css-4">
        {/* //! HEADER */}
        <div className="rbc">
          <MyChevron direction="left" onClick={setPrevMonth} />
          <div className="rss-1">
            <MonthYearPicker
              text={selectedMonth}
              list={months}
              setSelected={setSelectedMonth}
            />
            <MonthYearPicker
              text={selectedMYear}
              list={generateYearList(selectedDate)}
              setSelected={setSelectedYear}
            />
          </div>
          <MyChevron direction="right" onClick={setNextMonth} />
        </div>

        {/* //! WEEK DAYS */}
        <div className="ras t35">
          <p>Su</p>
          <p>Mo</p>
          <p>Tu</p>
          <p>We</p>
          <p>Th</p>
          <p>Fr</p>
          <p>Sa</p>
        </div>

        {/* //! DAYS */}
        <div className="grid grid-cols-7 gap-2">
          {generatePrevMonthDays(selectedDate).map((day, index) => (
            <Day
              key={index}
              day={day}
              dateModal={dateModal}
              gray
              prev
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          ))}
          {generateDays(selectedDate).map((day, index) => (
            <Day
              key={index}
              day={day}
              dateModal={dateModal}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          ))}
          {generateNextMonthDays(selectedDate).map((day, index) => (
            <Day
              key={index}
              day={day}
              dateModal={dateModal}
              gray
              next
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          ))}
        </div>
      </div>
    </MyModal>
  );
};

export default DateModal;

//! DAY
interface DayProps {
  day: number;
  dateModal: ReturnType<typeof useModal>;
  gray?: boolean;
  prev?: boolean;
  next?: boolean;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

const Day: React.FC<DayProps> = ({
  day,
  dateModal,
  gray = false,
  prev = false,
  next = false,
  selectedDate,
  setSelectedDate,
}) => {
  return (
    <MotionDiv
      className={twMerge(
        "rcc rounded cp",
        day === selectedDate.getDate() && !gray && "bg-darker_primary t-white",
        gray && "o-50"
      )}
      whileTap={{ scale: 0.9 }}
      onClick={() => {
        const newDate = new Date(selectedDate);
        if (prev) newDate.setMonth(newDate.getMonth() - 1);
        if (next) newDate.setMonth(newDate.getMonth() + 1);
        newDate.setDate(day);
        setSelectedDate(newDate);
        dateModal.close();
      }}
    >
      <p className="m-0">{day}</p>
    </MotionDiv>
  );
};

//! MY CHEVRON
interface MyChevronProps {
  direction: "left" | "right";
  onClick?: () => void;
}

const MyChevron: React.FC<MyChevronProps> = ({ direction, onClick }) => {
  return (
    <MotionDiv
      className="bg-gray h-7 w-7 rounded-full b b-gray-700 rcc cp"
      whileTap={{ scale: 0.8 }}
      onClick={onClick}
    >
      {direction === "left" ? (
        <ChevronLeft size={7} />
      ) : (
        <ChevronRight size={7} />
      )}
    </MotionDiv>
  );
};

//! MONTH YEAR PICKER
interface MonthYearPickerProps {
  text: string;
  list: string[];
  setSelected: (month: string) => void;
}

const MonthYearPicker: React.FC<MonthYearPickerProps> = ({
  text,
  list,
  setSelected,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <MotionDiv
      className="bg-gray relative h-min rounded px-2 b b-gray-700 rce-1 cp"
      whileTap={{ scale: dropdownOpen ? 1 : 0.9 }}
      onClick={() => setDropdownOpen(!dropdownOpen)}
    >
      {/* //! BOX BUTTON */}
      <p className="m-0 tf7">{text}</p>
      <div
        style={{
          transform: "translateY(-5px)",
        }}
      >
        <RightTriangle size={7} />
      </div>

      {/* //! DROPDOWN  */}
      {dropdownOpen && (
        <div
          className="absolute left-full top-full z-10 max-h-72 overflow-y-auto shadow-lg drop-shadow-lg"
          onClick={(e) => {
            e.preventDefault();
            const targetElement = e.target as HTMLInputElement;
            const value = targetElement.textContent;
            if (!value || !isValidMonthOrYear(value)) return;
            setSelected(value);
            setDropdownOpen(false);
          }}
        >
          {list.map((item, index) => (
            <p
              key={index}
              className={twMerge("bg-white p-2", item === text && "tf7")}
            >
              {item}
            </p>
          ))}
        </div>
      )}
    </MotionDiv>
  );
};

//! GENERATE DAYS OF PREV MONTH
const generatePrevMonthDays = (date: Date): number[] => {
  const days = [];
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastMonth = new Date(date.getFullYear(), date.getMonth(), 0);
  for (
    let i = lastMonth.getDate() - firstDay.getDay() + 1;
    i <= lastMonth.getDate();
    i++
  ) {
    days.push(i);
  }
  return days;
};

//! GENERATE DAYS
const generateDays = (date: Date): number[] => {
  const days = [];
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(i);
  }

  return days;
};

//! GENERATE DAYS OF NEXT MONTH
const generateNextMonthDays = (date: Date): number[] => {
  const days = [];
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  for (let i = 1; i <= 6 - lastDay.getDay(); i++) {
    days.push(i);
  }
  return days;
};

//! GENERATE MONTH LIST
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//! GENERATE YEAR LIST
const generateYearList = (date: Date, offset: number = 5): string[] => {
  const year = date.getFullYear();
  const yearList = [];
  for (let i = year - offset; i <= year + offset; i++) {
    yearList.push(i.toString());
  }
  return yearList;
};

//! IS VALID MONTH OR YEAR
const isValidMonthOrYear = (text: string): boolean => {
  const isValidMonth = months.includes(text);
  const isValidYear = !isNaN(parseInt(text)) && text.length === 4;
  return isValidMonth || isValidYear;
};
