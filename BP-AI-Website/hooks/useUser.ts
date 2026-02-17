import { auth } from "@/app/firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export const useUser = (): [User | null, boolean] => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  //! User changes
  useEffect(() => {
    onAuthStateChanged(auth, (new_user) => {
      setUser(new_user);
      setLoading(false);
    });
  }, []);

  return [user, loading];
};
