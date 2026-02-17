import { twMerge } from "tailwind-merge";

interface InputRowProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
}

const InputRow: React.FC<InputRowProps> = ({ title, children, className }) => {
  return (
    <div className="wf rsc-4">
      <p className={twMerge("t63r t-white whitespace-nowrap w-60", className)}>
        {title}
      </p>
      {children}
    </div>
  );
};

export default InputRow;
