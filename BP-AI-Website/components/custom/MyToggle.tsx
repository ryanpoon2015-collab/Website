import { Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

interface MyToggleProps {
  left: React.ReactNode;
  right: React.ReactNode;
  width: number;
  leftSelected: boolean;
  setSelected: (value: "left" | "right") => void;
}

const MyToggle: React.FC<MyToggleProps> = ({
  left,
  right,
  width,
  leftSelected,
  setSelected,
}) => {
  return (
    <div className="rsc">
      <div
        className={twMerge(
          "py-1 px-4 rounded-l-full cp",
          leftSelected ? "bg-slate-500 o-100" : "bg-slate-700 o-50"
        )}
        style={{
          width: `${width}px`,
        }}
        onClick={() => setSelected("left")}
      >
        {left}
      </div>
      <div
        className={twMerge(
          "py-1 px-4 rounded-r-full cp",
          !leftSelected ? "bg-slate-500 o-100" : "bg-slate-700 o-50"
        )}
        style={{
          width: `${width}px`,
        }}
        onClick={() => setSelected("right")}
      >
        {right}
      </div>
    </div>
  );
};

export default MyToggle;
