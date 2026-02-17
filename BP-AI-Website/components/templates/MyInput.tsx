import type { ChangeEventHandler, RefObject } from "react";
import { twMerge } from "tailwind-merge";

import type { InputField } from "@/hooks/useInputField";

interface MyInputProps {
  type?: "text" | "number" | "email" | "password"; // Add more types as needed
  placeholder?: string;
  inputField: InputField;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  dark?: boolean;
  className?: string;
  divClassName?: string;
  defaultValue?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  maxLength?: number;
  label?: string;
  disabled?: boolean;
  numLines?: number;
  autoFocus?: boolean;
  labelClassName?: string;
}

const MyInput: React.FC<MyInputProps> = ({
  type = "text",
  placeholder,
  inputField,
  onChange,
  className,
  divClassName,
  defaultValue,
  onFocus,
  onBlur,
  maxLength,
  label,
  numLines,
  disabled = false,
  autoFocus,
  labelClassName,
}) => {
  return (
    <div className={twMerge("css", disabled && "o-50", divClassName)}>
      {label && (
        <p
          className={twMerge(
            "-translate-y-1 translate-x-3 o-75 t34 t-input_Text",
            labelClassName
          )}
        >
          {label}
        </p>
      )}
      <div className={twMerge("rss wf")}>
        {!numLines && (
          <input
            ref={inputField.ref as RefObject<HTMLInputElement>}
            step="any"
            disabled={disabled}
            maxLength={maxLength}
            className={twMerge(
              "wf rounded-lg b p-3 bg-input_bg t-input_Text",
              inputField.error ? "b-red" : "b-transparent",
              className
            )}
            autoFocus={autoFocus}
            type={type}
            onChange={(e) => {
              if (onChange) {
                onChange(e);
              }
              inputField.setError(false);
            }}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder={placeholder}
            defaultValue={defaultValue}
          />
        )}

        {numLines && (
          <textarea
            ref={inputField.ref as RefObject<HTMLTextAreaElement>}
            className={twMerge(
              "wf rounded-lg b p-3",
              inputField.error ? "b-red" : "b-transparent",
              className
            )}
            maxLength={maxLength}
            rows={numLines}
            onChange={(e) => {
              if (onChange) {
                onChange(e);
              }
              inputField.setError(false);
              // if (type === "currency") {
              //   const value = e.target.value;
              //   const number = parseFloat(value.replaceAll(",", ""));
              //   let newValue = value;
              //   const lastChar = value.charAt(value.length - 1);
              //   if (!isNaN(number) && lastChar !== ".") {
              //     newValue = formatCurrency(number);
              //   }

              //   //! If the last input is not a number, set the input to the previous value
              //   newValue = removeLastNonDigitOrPeriod(newValue);

              //   //! Remove dot if there are more than 1
              //   if (newValue.split(".").length > 2) {
              //     newValue = newValue.slice(0, newValue.length - 1);
              //   }
              //   e.target.value = newValue;
              // }
            }}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder={placeholder}
            defaultValue={defaultValue}
          />
        )}
      </div>
    </div>
  );
};

export default MyInput;
