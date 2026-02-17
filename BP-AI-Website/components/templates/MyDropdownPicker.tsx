import type { CSSObjectWithLabel } from "react-select";
import Select from "react-select";
import { twMerge } from "tailwind-merge";

import { outfitFont } from "@/styles/fonts";
import { DropdownField } from "@/hooks/useMyDropdown";
import { useF } from "@/hooks/useReactHooks";

interface MyDropDownPickerProps {
  dropdownField: DropdownField;
  initialValue?: string;
  onChange?: () => void;
  placeholder?: string;
  darkMode?: boolean;
  width?: string;
  className?: string;
  divClassname?: string;
  removeChevron?: boolean;
  borderColor?: string;
  fontSize?: string;
  fontWeight?: string;
  padding?: string;
  menuListWidth?: string;
}

const defaultOption = { value: "", label: "-Choose-" };

const MyDropDownPicker: React.FC<MyDropDownPickerProps> = ({
  dropdownField,
  initialValue,
  onChange,
  placeholder,
  darkMode = false,
  width,
  className,
  divClassname,
  removeChevron = false,
  borderColor = "transparent",
  fontSize = "1.1rem",
  fontWeight = "400",
  padding = "0rem",
  menuListWidth = undefined,
}) => {
  const mergedOptions = [defaultOption, ...dropdownField.options];

  // set initial value if provided
  useF(() => {
    if (initialValue && !dropdownField.value) {
      dropdownField.setValue(initialValue);
    }
  }, [initialValue, dropdownField]);

  return (
    <div className={twMerge("", divClassname)}>
      {dropdownField.label && (
        <p className="-translate-y-1 translate-x-3 o-100 t56">
          {dropdownField.label}
        </p>
      )}
      <Select
        value={
          mergedOptions.find(
            (option) => option.value === dropdownField.value
          ) || defaultOption
        }
        options={mergedOptions}
        isSearchable={false}
        className={twMerge(className, outfitFont)}
        onChange={(newValue: any) => {
          onChange?.();
          dropdownField.setValue(newValue ? newValue.value : undefined);
        }}
        placeholder={placeholder}
        styles={{
          container: (baseStyles: any) => ({
            ...baseStyles,
            backgroundColor: "#FFFFFF",
            width,
          }),
          control: (baseStyles: any) => ({
            ...baseStyles,
            borderColor: dropdownField.error ? "red" : borderColor,
            backgroundColor: "transparent",
            cursor: "pointer",
            userSelect: "none",
          }),
          placeholder: (baseStyles: any) => ({
            ...baseStyles,
            color: darkMode ? "#8D8E8F" : "black",
            fontSize: "1.5rem",
            cursor: "pointer",
            userSelect: "none",
            fontFamily: "Outfit",
          }),
          singleValue: (baseStyles: any) => ({
            ...baseStyles,
            color: darkMode ? "#FFF" : "black",
            fontSize,
            fontWeight,
            padding,
            cursor: "pointer",
            userSelect: "none",
            textAlign: removeChevron ? "center" : "left",
            fontFamily: "Outfit",
          }),
          menuList: (baseStyles: any) => ({
            ...baseStyles,
            cursor: "pointer",
            userSelect: "none",
            width: menuListWidth,
            color: darkMode ? "#8D8E8F" : "black",
            backgroundColor: "#FFFFFF",
          }),
          dropdownIndicator: (baseStyles: any) => ({
            ...baseStyles,
            display: removeChevron ? "none" : "default",
          }),
          indicatorSeparator: (baseStyles: any) => ({
            ...baseStyles,
            display: removeChevron ? "none" : "default",
          }),
        }}
      />
    </div>
  );
};

export default MyDropDownPicker;
