import type { Dispatch, SetStateAction } from "react";
import { createContext } from "react";
import { ToastContainer } from "react-toastify";

import { Config } from "@/classes/Constants";
import { useS } from "@/hooks/useReactHooks";

import PageWrapper from "../helpers/PageWrapper";
import LoadingPage from "./LoadingPage";
import UserWrapper from "./User_Wrapper";

// ? ----------------------
// ? LOADING PAGE
// ? TOAST
// ? ----------------------

export const LoadingContext = createContext({
  loading: false,
  setLoading: {} as Dispatch<SetStateAction<boolean>>,
});

interface ConstantsWrapperProps {}

const ConstantsWrapper: React.FC<ConstantsWrapperProps> = ({}) => {
  const [loading, setLoading] = useS(false);

  return (
    <>
      {/* //! FH WRAPPER PAGE */}
      <LoadingContext value={{ loading, setLoading }}>
        {Config.hasFirebase ? <UserWrapper /> : <PageWrapper />}
      </LoadingContext>

      {/* //! LOADING PAGE */}
      {loading && <LoadingPage />}

      {/* //! TOAST */}
      <ToastContainer
        className="toast-custom csc-3"
        toastClassName="wf"
        theme="dark"
        autoClose={2000}
        closeButton={false}
      />
    </>
  );
};

export default ConstantsWrapper;
