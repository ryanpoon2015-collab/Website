import React from "react";

import { MotionDiv } from "@/types/framer_motion_types";

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

interface FadeInUpwardDivProps {
  children: React.ReactNode;
  className?: string;
}

const FadeInUpwardDiv: React.FC<FadeInUpwardDivProps> = ({
  children,
  className,
}) => {
  return (
    <MotionDiv
      initial="hidden"
      animate="visible"
      className={className}
      variants={variants}
      transition={{ duration: 0.6 }}
    >
      {children}
    </MotionDiv>
  );
};

// Export the component
export default FadeInUpwardDiv;
