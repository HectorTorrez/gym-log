/* eslint-disable @typescript-eslint/no-empty-function */
"use client";

import {createContext, useContext, useEffect, useState} from "react";

interface MetricContext {
  metric: "lbs" | "kg";
  handleChangeMetric: (value: string) => void;
}
const MetricContext = createContext<MetricContext>({
  metric: "kg",
  handleChangeMetric: () => {},
});

export function MetricProvider({children}: {children: React.ReactNode}) {
  const [metric, setMetric] = useState<"lbs" | "kg">(() => {
    const metric = localStorage.getItem("metric") as "lbs" | "kg";

    return metric;
  });

  const handleChangeMetric = (value: string) => {
    setMetric(value as "lbs" | "kg");
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    localStorage.setItem("metric", metric ?? "kg");
  }, [metric]);

  return (
    <MetricContext.Provider value={{metric, handleChangeMetric}}>{children}</MetricContext.Provider>
  );
}

export const useMetric = () => useContext(MetricContext);
