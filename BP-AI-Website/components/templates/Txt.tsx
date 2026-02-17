import type { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

//! TITLE
const title: React.FC<HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <p className={twMerge("t83 tracking-widest", className)} {...props}>
      {children}
    </p>
  );
};

//! SECTION
const section: React.FC<HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <p className={twMerge("t47 tracking-widest", className)} {...props}>
      {children}
    </p>
  );
};

//! P
const _p: React.FC<HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <p className={twMerge("t33 tracking-wider o-50", className)} {...props}>
      {children}
    </p>
  );
};

//! NUMBER
const number: React.FC<HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <p className={twMerge("t72 tracking-wider", className)} {...props}>
      {children}
    </p>
  );
};

//! EXPONENT
const exponent: React.FC<HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <p className={twMerge("t22 tracking-wider o-75", className)} {...props}>
      {children}
    </p>
  );
};

const Txt = {
  title,
  section,
  p: _p,
  number,
  exponent,
};

export default Txt;
