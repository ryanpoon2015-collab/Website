import { useState } from "react";

import GoogleLogo from "@/components/svg/icon/GoogleLogo";
import VisibilityIcon from "@/components/svg/icon_animated/visibility/VisibilityIcon";
import Logo from "@/components/templates/Logo";
import MyButton from "@/components/templates/MyButton";
import MyInput from "@/components/templates/MyInput";
import SizedBox from "@/components/templates/SizedBox";
import Title from "@/components/templates/Title";
import Txt from "@/components/templates/Txt";
import useSignInPage, { SignInType } from "@/hooks/useSignIn";
import { MotionDiv } from "@/types/framer_motion_types";

const SignInPage: React.FC = () => {
  const {
    type,
    toggleType,
    login,
    signup,
    forgotPassword,
    emailInput,
    passwordInput,
    isSigningIn,
    googleSignIn,
  } = useSignInPage();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="wf">
      <div
        className="wf bg-aspect-ratio px-10 pb-12 ccc-8 min-h-screen"
        style={{
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* //! HEADER */}
        <div className="mt-8" />
        <Logo />
        <Title />

        {/* //! FORM */}
        <form
          className="ccc-10 wf"
          onSubmit={type === SignInType.signUp ? signup : login}
        >
          {/* //! EMAIL */}
          <div className="!w-80">
            <MyInput placeholder="Email" inputField={emailInput} className="" />
          </div>

          {/* //! PASSWORD */}
          <div className="relative max-w-sm !w-80">
            <MyInput
              placeholder="Password"
              className="pr-12"
              type={showPassword ? "text" : "password"}
              inputField={passwordInput}
            />
            <div className="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2">
              <VisibilityIcon
                isOpen={showPassword}
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>

          {/* //! SUBMIT - BUTTON */}
          <MyButton
            type="submit"
            label={type === SignInType.signUp ? "SIGN UP" : "LOGIN"}
            disabled={isSigningIn}
          />
        </form>

        {/* //! FORGOT PASSWORD */}
        <div className="h-8 rse">
          {type == SignInType.logIn && (
            <p
              className="fit-content m-auto t-link t2 cp"
              onClick={forgotPassword}
            >
              FORGOT PASSWORD&#63;
            </p>
          )}
        </div>

        {/* //! DONT HAVE AN ACCOUNT */}
        <div className="rcc">
          <p className="fit-content m-0 t-gray-400 t2">
            {type == SignInType.logIn
              ? "DON'T HAVE AN ACOUNT?"
              : "ALREADY HAVE AN ACCOUNT?"}
          </p>
          <SizedBox width={10} />
          <p onClick={toggleType} className="fit-content m-0 t-link t2 cp">
            {type == SignInType.logIn ? "CREATE ONE" : "LOGIN"}
          </p>
        </div>

        {/* //! GMAIL */}
        <div className="rcc wf">
          <Txt.p>or</Txt.p>
        </div>
        <MotionDiv
          className="bg-slate-800 m-auto w-min rounded-full px-4 py-2 rsc-2 cp"
          whileTap={{ scale: 0.85 }}
          onClick={googleSignIn}
        >
          <GoogleLogo />
          <Txt.p className="whitespace-nowrap">Sign in with Google</Txt.p>
        </MotionDiv>
      </div>
    </div>
  );
};

export default SignInPage;
