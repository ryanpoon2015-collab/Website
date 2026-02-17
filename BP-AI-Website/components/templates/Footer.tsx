import { useContext } from "react";
import { twMerge } from "tailwind-merge";

import type { Pages } from "@/app/helpers/PageWrapper";
import { PageWrapperContext } from "@/app/helpers/PageWrapper";
import { MotionDiv } from "@/types/framer_motion_types";
import useModal from "@/hooks/useModal";
import MyModal from "./MyModal";
import MyButton from "./MyButton";
import signOutClick from "@/myfunctions/signOutClick";
import SignOutIcon from "./SignOutIcon";

interface FooterProps {
  pages?: { [key in Pages]?: React.ReactNode };
  className?: string;
  hasSignOut?: boolean;
}

const Footer: React.FC<FooterProps> = ({
  pages,
  className,
  hasSignOut = false,
}) => {
  const { page: currentPage } = useContext(PageWrapperContext);

  //! CONFIRM SIGN OUT MODAL
  const signOutModal = useModal();

  return pages && Object.keys(pages).includes(String(currentPage)) ? (
    <div
      className={twMerge(
        "ras fixed z-20 bottom-0 ws h-16 shadow-lg bg-footer",
        className
      )}
      onContextMenu={(e) => e.preventDefault()}
    >
      {Object.entries(pages).map(([page, icon]) => (
        <FooterIcon key={page} page={Number(page)} icon={icon} />
      ))}
      {hasSignOut && (
        <MotionDiv
          className="rcc wf hf cp"
          whileTap={{ scale: 0.8 }}
          style={{ opacity: 0.4 }}
          onClick={signOutModal.open}
        >
          {<SignOutIcon />}
        </MotionDiv>
      )}

      {/*//! CONFIRM SIGN OUT MODAL */}
      <MyModal useModal={signOutModal} title="Confirm Sign Out">
        <div className="csc-6">
          <p className="t33 o-75">Are you sure you want to sign out?</p>
          <div className="wf rec-4">
            <MyButton label="Cancel" outlined onClick={signOutModal.close} />
            <MyButton
              label="Sign Out"
              onClick={(e) => {
                signOutModal.close();
                signOutClick(e);
              }}
            />
          </div>
        </div>
      </MyModal>
    </div>
  ) : (
    <div />
  );
};

interface FooterIconProps {
  page: Pages;
  icon: React.ReactNode;
}
const FooterIcon: React.FC<FooterIconProps> = ({ page, icon }) => {
  const { page: currentPage, setPage } = useContext(PageWrapperContext);
  return (
    <MotionDiv
      className="rcc wf hf cp"
      whileTap={{ scale: 0.8 }}
      style={{ opacity: currentPage === page ? 1 : 0.4 }}
      onClick={() => setPage(page)}
    >
      {icon}
    </MotionDiv>
  );
};

export default Footer;
