import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import { useS } from "@/hooks/useReactHooks";

export type ExpandDirection =
  | "bottom-right"
  | "bottom-left"
  | "top-right"
  | "top-left";

interface DropdownButtonProps {
  expandDirection?: ExpandDirection;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  gap?: number;
  className?: string;
  isExpanded?: boolean;
  setIsExpanded?: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({
  expandDirection = "bottom-left",
  icon,
  children,
  gap = 3,
  className,
  isExpanded,
  setIsExpanded,
}) => {
  const iconDivRef = useRef<HTMLDivElement | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);
  useS;

  const [defaultIsExpanded, setDefaultIsExpanded] = useState(false);

  //! POSITION THE DROPDOWN
  useEffect(() => {
    const iconDiv = iconDivRef.current;
    const div = divRef.current;
    if (!iconDiv || !div) return;

    const iconDivHeight = iconDiv.clientHeight;
    const iconDivWidth = iconDiv.clientWidth;
    const divHeight = div.clientHeight;
    const divWidth = div.clientWidth;

    console.log(expandDirection);

    switch (expandDirection) {
      case "bottom-right":
        div.style.top = `${iconDivHeight + gap}px`;
        div.style.left = `${gap}px`;
        break;

      case "bottom-left":
        div.style.top = `${iconDivHeight + gap}px`;
        div.style.left = `-${divWidth - iconDivWidth + gap}px`;
        break;

      case "top-right":
        div.style.top = `-${divHeight + gap}px`;
        div.style.left = `${gap}px`;
        break;

      case "top-left":
        div.style.top = `-${divHeight + gap}px`;
        div.style.left = `-${divWidth - iconDivWidth + gap}px`;
        break;

      default:
        break;
    }
  }, [
    divRef?.current?.clientHeight,
    divRef?.current?.clientWidth,
    isExpanded,
    defaultIsExpanded,
    expandDirection,
  ]);

  return (
    <div className={twMerge("relative cp")}>
      <div
        onClick={() => {
          if (setIsExpanded) setIsExpanded((prev) => !prev);
          else setDefaultIsExpanded((prev) => !prev);
        }}
        ref={iconDivRef}
      >
        {icon}
      </div>
      {(isExpanded === undefined ? defaultIsExpanded : isExpanded) && (
        <div
          ref={divRef}
          className={twMerge(
            "absolute shadow-lg drop-shadow-lg px-2 py-2 rounded-lg z-20",
            expandDirection === "bottom-right" && "rounded-tl-none",
            expandDirection === "bottom-left" && "rounded-tr-none",
            expandDirection === "top-right" && "rounded-bl-none",
            expandDirection === "top-left" && "rounded-br-none",
            className
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
