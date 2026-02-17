import { useEffect, useState } from "react";

export type FetchStatus = "success" | "loading" | "error";

export default function usePost<T>(
  path: string,
  body: any,
  contentType = "application/json"
): [T | null, FetchStatus] {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<FetchStatus>("loading");
  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      setStatus("loading");

      const res = await fetch(`/api/${path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!isMounted) return;

      if (!res.ok) {
        setStatus("error");
        setData(null);
        return;
      }

      if (contentType === "application/json") {
        let response = (await res.json()) as { response: T };
        setData(response.response);
      } else if (contentType === "audio/mpeg") {
        let response = (await res.arrayBuffer()) as T;
        setData(response);
      }

      setStatus("success");
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [path, JSON.stringify(body)]);

  return [data, status];
}
