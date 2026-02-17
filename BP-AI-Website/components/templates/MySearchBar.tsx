import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { useInputField } from "@/hooks/useInputField";
import { MotionDiv } from "@/types/framer_motion_types";

import SearchIcon from "../svg/icon/SearchIcon";
import MyInput from "./MyInput";

type MySearchBarField = {
  name: string;
  onClick: () => void;
};

interface MySearchBarProps {
  fields: MySearchBarField[];
}

const MySearchBar: React.FC<MySearchBarProps> = ({ fields }) => {
  const inputField = useInputField((_) => []);
  const [showResults, setShowResults] = useState(false);
  const [filteredFields, setFilteredFields] = useState<MySearchBarField[]>(
    fields
  );

  const updateFilteredFields = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const filtered = fields.filter((field) =>
      field.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredFields(filtered);
  };

  return (
    <div className="">
      <div
        className={twMerge(
          showResults && "absolute z-40 rounded-xl drop-shadow"
        )}
        style={{ width: "calc(100vw - 2.5rem)" }}
      >
        <div
          className={twMerge(
            "rsc-3 rounded-xl b b-zinc-300 px-3",
            showResults && "bg-white bo-0 rounded-b-none rounded-t-xl"
          )}
        >
          <SearchIcon />
          <MyInput
            inputField={inputField}
            placeholder="Search for a setting..."
            className="max-w-sm bg-transparent px-0 py-3 b-none wf"
            divClassName="wf"
            onChange={updateFilteredFields}
            onFocus={() => {
              // scroll to top
              if (typeof window !== "undefined") {
                window.scrollTo(0, 0);
              }
              setShowResults(true);
            }}
            // onBlur={() => setShowResults(false)}
          />
        </div>
        <AnimatePresence>
          {showResults && (
            <MotionDiv
              initial={{ height: "0", opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: "0", opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="absolute top-full z-30 overflow-hidden rounded-b-xl rounded-t-none bg-white py-3 pl-10 css-5 wf"
            >
              {filteredFields.map((field) => {
                return (
                  <p key={field.name} onClick={field.onClick} className="t3">
                    {field.name}
                  </p>
                );
              })}
            </MotionDiv>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {showResults && (
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            exit={{ opacity: 0 }}
            className="absolute left-0 top-0 bg-black ws hs"
            onClick={() => setShowResults(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MySearchBar;
