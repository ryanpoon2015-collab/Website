import { motion } from "framer-motion";
import { useC } from "@/hooks/useReactHooks";
import { Pages, PageWrapperContext } from "@/app/helpers/PageWrapper";
import { useContext, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import CrossCircleIcon from "../svg/icon/CrossCircleIcon";
import DashboardIcon from "../svg/icon/DashboardIcon";
import { MotionDiv } from "@/types/framer_motion_types";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = ({}) => {
  const [selectedTabElement, setSelectedTabElement] =
    useState<HTMLElement | null>(null);

  const stylishRectRef = useRef<HTMLDivElement | null>(null);
  const [stylishRectTop, setStylishRectTop] = useState(0);
  const { page } = useC(PageWrapperContext);
  const { isSidebarOpen, setIsSidebarOpen, isMobile, screenHeight } =
    useC(PageWrapperContext);

  //! Update Stylish Rect
  useEffect(() => {
    const stylishEl = stylishRectRef.current;
    if (!selectedTabElement || !stylishEl) return;
    const tabRect = selectedTabElement.getBoundingClientRect();
    const stylishRect = stylishEl.getBoundingClientRect();
    setStylishRectTop(
      tabRect.top + tabRect.height / 2 - stylishRect.height / 2
    );
  }, [selectedTabElement]);

  return (
    <MotionDiv
      className={twMerge("fixed top-0 min-w-max", isMobile && "")}
      initial={{ x: isMobile ? -250 : 0, zIndex: 50 }}
      animate={{ x: isMobile ? (isSidebarOpen ? 0 : -250) : 0, zIndex: 50 }}
      transition={{ duration: 0.1 }}
      style={{ minWidth: "15rem", width: "15rem" }}
    >
      <div className={twMerge("fixed w-12 z-50", isMobile && "", "bg-gray")}>
        <div
          className={twMerge(
            "relative w-full h-screen border-opacity-50 py-8 pt-12",
            "border-white"
          )}
        >
          {/*//! STYLISH RECT */}
          <StylishRect rectRef={stylishRectRef} top={stylishRectTop} />

          {/*//! TAB LIST */}
          <div
            className={twMerge("csc", screenHeight < 725 ? "gap-14" : "gap-14")}
          >
            <SidebarTab
              icon={<DashboardIcon size={22} selected={page === Pages.Main} />}
              text="Dashboard"
              page={Pages.Main}
              setSelectedTabElement={setSelectedTabElement}
            />
            {/* <SidebarTab
              icon={
                <ActivityLogIcon size={22} selected={page === Pages.History} />
              }
              text="History"
              page={Pages.History}
              setSelectedTabElement={setSelectedTabElement}
            />
            <SidebarTab
              icon={
                <AIAnalyticsIcon
                  size={22}
                  selected={page === Pages.Analytics}
                />
              }
              text="Analytics"
              page={Pages.Analytics}
              setSelectedTabElement={setSelectedTabElement}
            />
            <SidebarTab
              icon={<MilkteaIcon size={24} selected={page === Pages.Milktea} />}
              text="MilkTea"
              page={Pages.Milktea}
              setSelectedTabElement={setSelectedTabElement}
            /> */}
          </div>

          {/*//! X BUTTON - CLOSE SIDEBAR ON MOBILE */}
          {isMobile && (
            <div className="absolute top-1 right-1">
              <CrossCircleIcon onClick={() => setIsSidebarOpen(false)} />
            </div>
          )}
        </div>
      </div>
    </MotionDiv>
  );
};

export default Sidebar;

//! STYLISH RECT
interface StylishRectProps {
  rectRef: React.RefObject<HTMLDivElement | null>;
  top: number;
}

const StylishRect: React.FC<StylishRectProps> = ({ rectRef, top }) => {
  return (
    <div
      ref={rectRef}
      className="absolute"
      style={{ width: "3px", right: "-2px", top: "0px" }}
    >
      <MotionDiv
        className={twMerge(
          "flex justify-center items-center h-12 rounded-full",
          "bg-[#5ec93a]"
        )}
        initial={{ y: 0 }}
        animate={{ y: top }}
      >
        <div
          className={twMerge("h-7 -right-1 rounded-xl", "bg-[#5ec93a]")}
          style={{ width: "2px", right: "-1px" }}
        />
      </MotionDiv>
    </div>
  );
};

//! SIDEBAR TAB
interface SidebarTabProps {
  icon: React.ReactNode;
  text: string;
  page: Pages;
  setSelectedTabElement: (element: HTMLElement | null) => void;
}

const SidebarTab: React.FC<SidebarTabProps> = ({
  icon,
  text,
  page,
  setSelectedTabElement,
}) => {
  const {
    page: currentPage,
    setPage,
    isMobile,
    setIsSidebarOpen,
  } = useContext(PageWrapperContext);
  const divRef = useRef<HTMLDivElement | null>(null);
  const isActive = currentPage === page;

  function goToPage() {
    if (isActive) return;
    setPage(page);
    if (isMobile) setIsSidebarOpen(false);
  }

  useEffect(() => {
    if (isActive && divRef.current) setSelectedTabElement(divRef.current);
  }, [isActive]);

  return (
    <motion.div
      ref={divRef}
      // @ts-ignore
      className={twMerge(
        "flex items-center gap-2 select-none cursor-pointer opacity-50",
        isActive && "opacity-100"
      )}
      whileTap={{ scale: 0.9 }}
      onClick={goToPage}
    >
      {icon}
      {/* <p className={twMerge("t31", isActive ? "font-medium o-100" : "o-75")}>
        {text}
      </p> */}
    </motion.div>
  );
};

// //! SIDEBAR TAB GROUP
// interface SidebarTabGroupProps {
//   title: string;
//   children: React.ReactNode;
// }

// const SidebarTabGroup: React.FC<SidebarTabGroupProps> = ({
//   title,
//   children,
// }) => {
//   return (
//     <div className="flex flex-col gap-2">
//       <p className="opacity-50 text-sm">{title}</p>
//       <div className="flex flex-col gap-4 pl-2">{children}</div>
//     </div>
//   );
// };
