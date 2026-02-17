import { useEffect, useRef, useState } from "react";

interface SwipeableProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
}

const Swipeable: React.FC<SwipeableProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [swiped, setSwiped] = useState(false);

  useEffect(() => {
    const element = divRef.current;
    if (!element) return;

    const handlePointerDown = (e: PointerEvent | TouchEvent) => {
      if (e instanceof PointerEvent) {
        setStartX(e.clientX);
        setStartY(e.clientY);
      } else {
        setStartX(e.touches[0].clientX);
        setStartY(e.touches[0].clientY);
      }
      setSwiped(false);
    };

    const handlePointerMove = (e: PointerEvent | TouchEvent) => {
      if (swiped) return;
      let endX = 0;
      let endY = 0;
      if (e instanceof PointerEvent) {
        endX = e.clientX;
        endY = e.clientY;
      } else {
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
      }

      if (Math.abs(endX - startX) > 3 || Math.abs(endY - startY) > 3) {
        return;
      }
      // console.log("pointer move");

      // console.log(startX, endX);

      if (endX < startX) {
        onSwipeLeft?.();
      }
      if (endX > startX) {
        onSwipeRight?.();
      }
      if (endY < startY) {
        onSwipeUp?.();
      }
      if (endY > startY) {
        onSwipeDown?.();
      }
      setSwiped(true);
    };

    element.addEventListener("pointerdown", handlePointerDown);
    element.addEventListener("pointermove", handlePointerMove);

    return () => {
      element.removeEventListener("pointerdown", handlePointerDown);
      element.removeEventListener("pointermove", handlePointerMove);
    };
  }, [
    divRef?.current,
    startX,
    swiped,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
  ]);

  return (
    <div ref={divRef} className="select-none">
      {children}
    </div>
  );
};

export default Swipeable;
