import type { User } from "firebase/auth";
import { sendEmailVerification } from "firebase/auth";

import { Config } from "@/classes/Constants";
import EmailIcon from "@/components/svg/icon/EmailIcon";
import MyButton from "@/components/templates/MyButton";
import { useS } from "@/hooks/useReactHooks";
import signOutClick from "@/myfunctions/signOutClick";

interface EmailVerificationPageProps {
  user: User;
}

const EmailVerificationPage: React.FC<EmailVerificationPageProps> = ({
  user,
}) => {
  const [resent, setResent] = useS(false);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log(user.emailVerified);
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, [user.emailVerified]);

  return (
    <div className="bg-gray-900 pt-20 t-white csc-8 ws hs">
      <div className="o-50 csc-2">
        <EmailIcon size={109} />
        <p className="t33">{user.email}</p>
      </div>

      <p className="t6">Please verify your email address to continue</p>

      {/* //! RESEND VERIFICATION */}
      {resent ? (
        <p>Email sent!</p>
      ) : (
        <MyButton
          className="m-0 w-min bg-emerald-400"
          label="Resend Verification Email"
          onClick={() => {
            sendEmailVerification(user, {
              url: Config.hostingWebsite,
            });
            setResent(true);
          }}
        />
      )}

      {/* //! SIGN OUT */}
      <MyButton
        className="m-0 w-min bg-red-400"
        label="Sign Out"
        onClick={signOutClick}
      />
    </div>
  );
};

export default EmailVerificationPage;
