import React, { useEffect, useState } from "react";

interface MoveDivOnKeyboardProps {
  children: React.ReactNode;
}

const MoveDivOnKeyboard: React.FC<MoveDivOnKeyboardProps> = ({ children }) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [divPosition, setDivPosition] = useState(0); // Initial position

  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        const viewportHeight = window.visualViewport.height;
        const windowHeight = window.innerHeight;

        // If viewport height is less than window height, assume the keyboard is visible
        if (viewportHeight < windowHeight) {
          setKeyboardVisible(true);
          setDivPosition(windowHeight - viewportHeight); // Adjust the position upwards (you can change this value)
        } else {
          setKeyboardVisible(false);
          setDivPosition(0); // Reset the position when keyboard is hidden
        }
      }
    };

    window.visualViewport?.addEventListener("resize", handleResize);

    return () => {
      window.visualViewport?.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: `${divPosition}px`,
        left: 0,
        transition: "bottom 0.3s ease-in-out",
      }}
    >
      {children}
    </div>
  );
};

export default MoveDivOnKeyboard;
