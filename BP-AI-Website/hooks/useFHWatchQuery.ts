import FHT from "@/classes/templates/FHT";
import { FirebaseError } from "firebase/app";
import {
  QueryCompositeFilterConstraint,
  QueryConstraint,
  QueryFieldFilterConstraint,
} from "firebase/firestore";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

/**
 *   See Cielo for example
 */
export const useFHWatchQuery = <T extends { id: string }>(
  fht: FHT<T>,
  dependency: any[],
  // compoundQuery?: QueryCompositeFilterConstraint,
  ...query: QueryConstraint[]
): [T[], boolean, Dispatch<SetStateAction<boolean>>] => {
  const [obj, setObj] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    try {
      const unsubscribe = fht.watchQuery(
        (obj) => {
          setObj(obj);
          setLoading(false);
        },
        // compoundQuery,
        undefined,
        ...query
      );
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
  }, [...dependency]);

  return [obj, loading, setLoading];
};
