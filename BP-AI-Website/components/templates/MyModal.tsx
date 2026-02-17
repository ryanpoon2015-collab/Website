import Modal from "react-modal";
import { twMerge } from "tailwind-merge";

import type useModal from "@/hooks/useModal";
import CloseModalIcon from "../custom/CloseModalIcon";
import MyButton from "./MyButton";
import { useF, useS } from "@/hooks/useReactHooks";

let measuringDotInterval: NodeJS.Timer;

interface MyModalProps {
  useModal: ReturnType<typeof useModal>;
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  classNameInner?: string;
  classNameContent?: string;
  classNameChildren?: string;
  button1Str?: string;
  button2Str?: string;
  onButton1Click?: () => void;
  onButton2Click?: () => void;
  isMeasuring?: boolean;
  measuringText?: string;
  onclose?: () => void;
}

const MyModal: React.FC<MyModalProps> = ({
  useModal,
  title,
  children,
  className,
  classNameContent,
  classNameChildren,
  button1Str,
  button2Str,
  onButton1Click,
  onButton2Click,
  isMeasuring,
  measuringText = "Measuring",
  onclose = () => {},
}) => {
  const [numDots, setNumDots] = useS(0);

  useF(() => {
    if (isMeasuring) {
      measuringDotInterval = setInterval(() => {
        setNumDots((prev) => (prev + 1) % 4);
      }, 750);
    } else {
      clearInterval(measuringDotInterval);
      setNumDots(0);
    }
    return () => clearInterval(measuringDotInterval);
  }, [isMeasuring]);

  return (
    <Modal
      isOpen={useModal.isOpen}
      ariaHideApp={false}
      className={twMerge(" inset-0 t-zinc-600", className)}
      onRequestClose={useModal.close}
      // style={customStyles}
    >
      {/* MAIN CONTENT */}
      <div
        className={twMerge(
          "absolute drop-shadow-lg shadow-lg bg-modal_bg rounded-3xl left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2",
          classNameContent
        )}
      >
        {title && (
          <div className="rbc-10 rounded-t-3xl b-2 b-black bg-header_modal py-2 px-6">
            {title}
            <CloseModalIcon
              onClick={() => {
                useModal.close();
                onclose();
              }}
            />
          </div>
        )}
        <div
          className={twMerge(
            "ccc-8 px-6 pt-10 pb-5 t-modal_t b-b-2 b-l-2 b-r-2 b-black rounded-b-3xl",
            classNameChildren
          )}
        >
          {children}

          {isMeasuring && (
            <p className="t76 w-32 o-75">
              {measuringText}
              {Array.from({ length: numDots }).map((_, i) => (
                <span key={i}>.</span>
              ))}
            </p>
          )}

          {!isMeasuring && (
            <div className="wf rcc-10">
              {/*//! BUTTON 1 */}
              {button1Str && onButton1Click && (
                <MyButton
                  className={twMerge(
                    !button2Str || !onButton2Click
                      ? "w-full"
                      : "w-44 !bg-[#535353]"
                  )}
                  label={button1Str}
                  onClick={onButton1Click}
                />
              )}

              {/*//! BUTTON 2 */}
              {button2Str && onButton2Click && (
                <MyButton
                  className="w-44"
                  pX={3.0}
                  label={button2Str}
                  onClick={onButton2Click}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default MyModal;
