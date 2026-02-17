import type { User } from "firebase/auth";
import { createContext } from "react";

import { Config } from "@/classes/Constants";
import { useUser } from "@/hooks/useUser";

import FCMWrapper from "./FCM_Wrapper";
import FHWrapper from "./FH_Wrapper";

export const UserContext = createContext({
  user: null as User | null,
  loadingUser: false as boolean,
});

interface UserWrapperProps {}

const UserWrapper: React.FC<UserWrapperProps> = ({}) => {
  //! USER
  const [user, loadingUser] = useUser();

  return (
    <UserContext value={{ user, loadingUser }}>
      {Config.hasFCM ? <FCMWrapper /> : <FHWrapper />}
    </UserContext>
  );
};

export default UserWrapper;
