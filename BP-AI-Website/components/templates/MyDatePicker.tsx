import "react-datepicker/dist/react-datepicker.css";

import type { Dispatch, MouseEventHandler, SetStateAction } from "react";
import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import { twMerge } from "tailwind-merge";

interface MyDatePickerProps {
  date: Date | null;
  setDate: Dispatch<SetStateAction<Date | null>>;
  className?: string;
}

const MyDatePicker: React.FC<MyDatePickerProps> = ({
  date,
  setDate,
  className,
}) => {
  const ExampleCustomInput = forwardRef<
    HTMLButtonElement,
    { value: string; onClick: MouseEventHandler<HTMLButtonElement> }
  >(({ value, onClick }, ref) => (
    <button
      className={twMerge(
        "relative wf px-2 py-2 bg-white t44 b b-white t-black h-8 rounded-sm text-left",
        className
      )}
      onClick={onClick}
      ref={ref}
    >
      <p className="t44 absolute top-1/2 -translate-y-1/2">{value}</p>
    </button>
  ));

  ExampleCustomInput.displayName = "ExampleCustomInput";

  return (
    <div className="wf">
      <DatePicker
        showMonthDropdown
        wrapperClassName="wf"
        showYearDropdown
        selected={date}
        onChange={(date) => setDate(date)}
        customInput={<ExampleCustomInput value="H" onClick={() => {}} />}
      ></DatePicker>
    </div>
  );
};
export default MyDatePicker;
