interface RadioChooserProps<T extends "single" | "multiple"> {
  color?: string;
  type?: T;
  value: T extends "single" ? string : string[];
  options: readonly string[];
}

const RadioChooser = <T extends "single" | "multiple">({
  color = "",
  type = "single" as T,
  value,
  options,
}: RadioChooserProps<T>) => {
  return (
    <div className="css-3">
      {options.map((option) => (
        <div className="css-3" key={option}>
          <div className="csc-3">
            <div className="bg-green h-4 w-4 rounded-full" />
            <p className="t43">{option}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RadioChooser;
