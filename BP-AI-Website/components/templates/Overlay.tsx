import { useEffect, useState } from "react";

interface OverlayProps {
  children: React.ReactNode;
  setOverlay: React.Dispatch<React.SetStateAction<React.ReactNode | null>>;
}

let clickableTimeout: NodeJS.Timeout;

const Overlay: React.FC<OverlayProps> = ({ children, setOverlay }) => {
  const [clickable, setClickable] = useState(false);

  useEffect(() => {
    console.log("Overlay mounted");
    clickableTimeout = setTimeout(() => {
      setClickable(true);
    }, 500);

    return () => {
      clearTimeout(clickableTimeout);
    };
  }, []);
  return (
    <div className="fixed left-0 top-0 z-20 m-auto px-10 rss ws hs">
      <div className="m-auto">{children}</div>
      <div
        className="fixed left-0 top-0 -z-10 bg-black o-50 ws hs"
        onClick={() => {
          if (!clickable) return;
          console.log("overlay clidked");
          setOverlay(null);
        }}
      />
    </div>
  );
};

export default Overlay;
