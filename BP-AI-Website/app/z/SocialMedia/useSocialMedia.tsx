import FH from "@/classes/FH";
import { useFHPagination } from "@/hooks/useFHPagination";
import { useFHWatchQuery } from "@/hooks/useFHWatchQuery";
import { useF, useS } from "@/hooks/useReactHooks";
import { limit, orderBy } from "firebase/firestore";
import { useLayoutEffect } from "react";

export default function useSocialMedia(count: number = 10) {
  const [numPosts, setNumPosts] = useS(count);
  const [initialized, setInitialized] = useS(false);

  const [posts, loadingPosts] = useFHWatchQuery(
    FH.SocialMediaPost,
    [numPosts],
    limit(numPosts),
    orderBy("created_at", "desc")
  );

  const handleScroll = () => {
    if (numPosts > postsLength) {
      return;
    }
    const leftScrollPixels =
      document.documentElement.scrollHeight -
      window.innerHeight -
      window.scrollY;

    if (leftScrollPixels < 100) {
      setNumPosts((prev) => prev + count);
    }
  };

  const postsLength = posts.length;

  useF(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("touchmove", handleScroll);
    window.addEventListener("wheel", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
      window.removeEventListener("wheel", handleScroll);
    };
  }, [numPosts, postsLength]);

  return {
    posts,
    numPosts,
    setNumPosts,
    postsLength,
  };
}

export type UseSocialMedia = ReturnType<typeof useSocialMedia>;
