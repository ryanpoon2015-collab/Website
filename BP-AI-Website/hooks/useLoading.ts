import { LoadingContext } from "@/app/templates/Constants_Wrapper";
import { useContext, useEffect } from "react";

export const useLoading = (...loadingConditions: boolean[]) => {
  const { setLoading } = useContext(LoadingContext);

  const loading = loadingConditions.some((condition) => condition);

  useEffect(() => {
    setLoading(loading);
  }, [loading, setLoading]);

  return loading;
};
