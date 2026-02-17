import FHT from "@/classes/templates/FHT";
import { FirebaseError } from "firebase/app";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const useFHWatch = <T extends { id: string }>(
  fht: FHT<T>,
  id?: string,
  dependency?: any[]
): [T | null, boolean, Dispatch<SetStateAction<boolean>>] => {
  const [obj, setObj] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    try {
      const unsubscribe = fht.watch(id, (obj) => {
        setObj(obj);
        setLoading(false);
      });
      return () => {
        unsubscribe();
      };
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code !== "invalid-argument")
          console.log(`${error.code} - ${error.message}`);
      } else {
        console.log(error);
      }
      setLoading(false);
    }
  }, [id, ...(dependency || [])]);

  return [obj, loading, setLoading];
};
