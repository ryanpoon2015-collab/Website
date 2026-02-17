import nodemcuFetch from "@/myfunctions/nodemcuFetch";
import { useEffect, useState } from "react";

export interface HeltecState {
  name: string;
  type: "continuous" | "single";
}

function useHeltec(states: HeltecState[]) {
  const [state, setState] = useState<HeltecState>(states[0]);
  const [data, setData] = useState("");
  useEffect(() => {
    let isMounted = true;

    function fetchData() {
      if (!isMounted) return;

      nodemcuFetch(
        state.name,
        (res) => {
          //   console.log(`${state.name} : ${res}`);
          //   const [line, angle] = res.split(",").map(Number);
          setData(res);

          if (state.type === "single") {
            setState(states[0]);
          }
        },
        {},
        () => {
          fetchData();
        }
      );
    }
    fetchData();

    return () => {
      isMounted = false;
    };
  }, [state]);

  return { data, state, setState };
}

export default useHeltec;
