import { useF, useS } from "./useReactHooks";

export const useFullUrl = () => {
    const [fullUrl, setFullUrl] = useS("");

    useF(() => {
        if (typeof window !== "undefined") {
            setFullUrl(window.location.href);
        }
    }, []);

    return fullUrl;
};