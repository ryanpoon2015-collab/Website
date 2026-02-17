import { useEffect, useRef } from "react";

// Custom hook to set the height of one div based on another div
export const useCalculateDivHeight = (
  computeHeight: (sourceHeight: number) => string,
  dependencies: any[] = []
) => {
  const sourceRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (sourceRef.current && targetRef.current) {
      // Calculate the height of the source div
      const sourceHeight = sourceRef.current.clientHeight;

      // Set the height of the target div based on the source height
      const calculatedHeight = computeHeight(sourceHeight);
      targetRef.current.style.height = calculatedHeight;

      // Update the state with the source height (if needed)
    }
  }, [sourceRef.current, targetRef.current, dependencies]);

  return [sourceRef, targetRef];
};
