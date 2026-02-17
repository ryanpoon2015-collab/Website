import { auth } from "@/app/firebase";
import isValidEmail from "@/myfunctions/is_valid_email";
import notify from "@/myfunctions/notify";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import {
  FormEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { useInputField } from "./useInputField";
import useLocalStorage from "./useLocalStorage";
import { Config } from "@/classes/Constants";

function useSignInPage() {
  const [type, setType] = useState(SignInType.signUp);
  const emailInput = useInputField((email) => [
    [!email, "Please Enter your Email"],
    [!isValidEmail(email!), "Invalid Email"],
  ]);

  const passwordInput = useInputField((password) => [
    [!password, "Please Enter a Password"],
    [password!.length < 6, "Password should be at least 6 characters long"],
  ]);

  const [isSigningIn, setIsSigningIn] = useState(false);

  const [signedInBefore, updateSignedInBefore] = useLocalStorage(
    "signedIn",
    false
  );

  useEffect(() => {
    if (signedInBefore) {
      setType(SignInType.logIn);
    }
  }, []);

  function toggleType() {
    setType(type === SignInType.signUp ? SignInType.logIn : SignInType.signUp);
  }

  const login: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!emailInput.verify()) return;
    if (!passwordInput.verify()) return;

    const email = emailInput.getValue()!;
    const password = passwordInput.getValue()!;

    setIsSigningIn(true);
    signInWithEmailAndPassword(auth, email!, password!)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        // ...
        updateSignedInBefore(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`${errorCode}:: ${errorMessage}`);

        if (errorCode === "auth/weak-password") {
          notify("Password should be at least 6 characters long");
          passwordInput.setError(true);
          return;
        }

        if (errorCode === "auth/invalid-login-credentials") {
          signup(e);
          return;
        }

        notify("Invalid Email or Password");
        emailInput.setError(true);
        passwordInput.setError(true);
      })
      .finally(() => {
        setIsSigningIn(false);
      });
  };

  const signup: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!emailInput.verify()) return;
    if (!passwordInput.verify()) return;

    const email = emailInput.getValue()!;
    const password = passwordInput.getValue()!;

    //! Check if an account already exists with an email and login instead

    setIsSigningIn(true);
    createUserWithEmailAndPassword(auth, email!, password!)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateSignedInBefore(true);
        if (Config.hasEmailVerification) {
          sendEmailVerification(user, { url: Config.hostingWebsite });
        }
      })
      .catch((error) => {
        const errorCode = error.code;

        if (errorCode === "auth/weak-password") {
          notify("Password should be at least 6 characters long");
          passwordInput.setError(true);
        } else if (errorCode === "auth/email-already-in-use") {
          login(e);
        } else {
          const errorMessage = error.message;
          console.log(`${errorCode}:: ${errorMessage}`);
          notify("Invalid Email or Password");
          emailInput.setError(true);
          passwordInput.setError(true);
        }
      })
      .finally(() => {
        setIsSigningIn(false);
      });
  };

  const googleSignIn: MouseEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();
    setIsSigningIn(true);
    try {
      // Sign in using a popup.
      const provider = new GoogleAuthProvider();
      provider.addScope("profile");
      provider.addScope("email");
      const result = await signInWithPopup(auth, provider);

      // The signed-in user info.
      const user = result.user;
      updateSignedInBefore(true);

      // This gives you a Google Access Token.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
    } catch (error) {
      console.log(error);
      notify("An error occured while signing in with Google");
    }

    setIsSigningIn(false);
  };

  const forgotPassword: MouseEventHandler<HTMLParagraphElement> = (e) => {
    e.preventDefault();

    if (!emailInput.verify()) return;
    const email = emailInput.getValue()!;

    sendPasswordResetEmail(auth, email!)
      .then(() => {
        // Password reset email sent!
        // ..
        notify("Password Reset Email sent!", { type: "success" });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`${errorCode}:: ${errorMessage}`);
        notify("Password Reset Error");
      });
  };

  return {
    type,
    toggleType,
    login,
    signup,
    forgotPassword,
    emailInput,
    passwordInput,
    isSigningIn,
    googleSignIn,
  };
}

export enum SignInType {
  signUp,
  logIn,
}

export default useSignInPage;
