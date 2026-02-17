import FHT from "@/classes/templates/FHT";
import {
  endBefore,
  limit,
  limitToLast,
  QueryConstraint,
  QueryDocumentSnapshot,
  startAfter,
  startAt,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export type FHPagination<T extends { id: string }> = {
  data: T[];
  loading: boolean;
  pageNum: number;
  next: () => void;
  prev: () => void;
  hasPrev: boolean;
  hasNext: boolean;
};

export const useFHPagination = <T extends { id: string }>(
  fht: FHT<T>,
  orderKey: keyof T,
  direction: "asc" | "desc",
  limit_per_page: number,
  dependencies: any[] = [],
  ...queries: QueryConstraint[]
): FHPagination<T> => {
  const [data, setData] = useState<T[]>([]);
  const [hasPrev, setHasPrev] = useState(true);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(true);
  const [willNext, setWillNext] = useState(false);
  const [willPrev, setWillPrev] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [firstDoc, setFirstDoc] = useState<QueryDocumentSnapshot<T> | null>(
    null
  );
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [customQueries, setCustomQueries] = useState<QueryConstraint[]>([
    limit(limit_per_page),
  ]);

  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<T> | null>(null);
  useEffect(() => {
    // console.log("USE EFFECT - MAIN");
    // console.log(queries);
    if (data.length < 1) setLoading(true);
    return fht.watchPagination(
      pageNum,
      (objs, firstDoc, lastDoc, hasPrev, hasNext) => {
        setData(objs);
        setLoading(false);
        setFirstDoc(firstDoc);
        setLastDoc(lastDoc);
        setHasPrev(hasPrev);
        setHasNext(hasNext);

        if (pageNum === 0) {
          setPageNum(1);
        }

        setWillNext(false);
        setWillPrev(false);
        const _isFirstPage = pageNum === 0 || (pageNum === 1 && !hasPrev);
        setIsFirstPage(_isFirstPage);
        setCustomQueries(
          _isFirstPage
            ? [limit(limit_per_page)]
            : [startAt(firstDoc), limit(limit_per_page)]
        );
      },
      orderKey,
      direction,
      ...customQueries,
      ...queries
    );
  }, [...dependencies, pageNum, isFirstPage]);

  //! PREV
  useEffect(() => {
    if (willPrev) {
      setPageNum(pageNum - 1);
      setData([]);
      setCustomQueries([endBefore(firstDoc), limitToLast(limit_per_page)]);
      setWillPrev(false);
    }
  }, [willPrev]);

  //! NEXT
  useEffect(() => {
    if (willNext) {
      setPageNum(pageNum + 1);
      setData([]);
      setCustomQueries([startAfter(lastDoc), limit(limit_per_page)]);
      setWillNext(false);
    }
  }, [willNext]);

  function next() {
    if (willNext || loading) return;
    setWillNext(true);
  }

  function prev() {
    if (willPrev || loading) return;
    setWillPrev(true);
  }

  return { data, pageNum, loading, next, prev, hasPrev, hasNext };
};
