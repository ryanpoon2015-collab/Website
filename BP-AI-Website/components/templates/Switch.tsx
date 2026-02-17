import type { ChangeEventHandler } from "react";

interface SwitchProps {
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Switch: React.FC<SwitchProps> = ({ checked = true, onChange }) => {
  return (
    <label className="my-switch">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="my-switch-slider my-switch-round" />
    </label>
  );
};

export default Switch;
