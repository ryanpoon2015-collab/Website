import FHT from "@/classes/templates/FHT";
import { useEffect, useState } from "react";
import { useFHWatch } from "./useFHWatch";
import DH, { MonthAbbrev } from "@/classes/templates/DH";

export type UseBarChartMonthly = {
  data: {
    month: MonthAbbrev;
    year: number;
    value: number;
  }[];
  lastShownYear: number;
  maxHeight: number;
  prev: () => void;
  next: () => void;
};

export function useBarChartMonthly<
  T extends {
    id: string;
  } & { [key in MonthAbbrev]?: number }
>(
  fht: FHT<T>,
  monthsShownLength: number = 5,
  minHeight: number = 10
): UseBarChartMonthly {
  //! CURRENT YEAR CHART
  const [lastShownYear, setLastShownYear] = useState(new Date().getFullYear());
  const [currentYear, loadingCurrentYear] = useFHWatch(fht, `${lastShownYear}`);

  //! lAST YEAR CHART
  const [lastYear, loadingLastYear] = useFHWatch(fht, `${lastShownYear - 1}`);

  //! LAST SHOWN MONTH CHART
  const [lastShownMonth, setLastShownMonth] = useState(
    DH.getLastMonthAbbrev(currentYear)
  );

  //! INITIALLY LOADED
  const [initiallyLoaded, setInitiallyLoaded] = useState(false);

  useEffect(() => {
    if (initiallyLoaded) return;

    if (currentYear) {
      setLastShownMonth(DH.getLastMonthAbbrev(currentYear));
      setInitiallyLoaded(true);
    }
  }, [currentYear, initiallyLoaded]);

  //! CHART DATA
  const [data, setData] = useState(
    [] as { month: MonthAbbrev; year: number; value: number }[]
  );

  useEffect(() => {
    if (loadingCurrentYear || loadingLastYear) return;
    if (
      currentYear?.id !== undefined &&
      lastShownYear !== Number(currentYear.id)
    )
      return;

    const data: {
      month: MonthAbbrev;
      year: number;
      value: number;
    }[] = [];

    let month = lastShownMonth;
    let year = lastShownYear;
    let currentYearAnalytics = currentYear;

    for (let i = 0; i < monthsShownLength; i++) {
      const monthAnalytics = {
        month,
        year,
        value: currentYearAnalytics?.[month] ?? 0,
      };
      data.unshift(monthAnalytics);

      month = DH.getPrevMonthAbbrev(month);
      if (month === "Dec") {
        year--;
        currentYearAnalytics = lastYear;
      }
    }

    setData(data);
  }, [
    currentYear,
    lastYear,
    lastShownMonth,
    loadingCurrentYear,
    loadingLastYear,
  ]);

  //! MAX HEIGHT
  const maxHeight = Math.max(minHeight, ...data.map((data) => data.value));

  //! PREV LAST SHOWN MONTH
  function prev() {
    const monthIndex = DH.monthAbbrev.indexOf(lastShownMonth);
    if (monthIndex === 0) {
      setLastShownMonth("Dec");
      setLastShownYear(lastShownYear - 1);
    } else {
      setLastShownMonth(DH.monthAbbrev[monthIndex - 1]);
    }
  }

  //! NEXT LAST SHOWN MONTH
  function next() {
    const monthIndex = DH.monthAbbrev.indexOf(lastShownMonth);
    if (monthIndex === 11) {
      setLastShownMonth("Jan");
      setLastShownYear(lastShownYear + 1);
    } else {
      setLastShownMonth(DH.monthAbbrev[monthIndex + 1]);
    }
  }

  return { data, lastShownYear, maxHeight, prev, next };
}
