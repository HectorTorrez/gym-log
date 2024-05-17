"use client";
import type {Set} from "@/types/exercise";
import type {CardBodyProps} from "@/types/historyWorkoutsType";

import {useMetric} from "@/app/metric-context";
import {convertWeight} from "@/lib/convertWeight";

export function CardBody({exercise}: CardBodyProps) {
  const {name, sets, metric} = exercise;
  const {metric: newMetric} = useMetric();

  const setsTyped = sets as unknown as Set[];

  return (
    <section className="flex flex-col ">
      <p>{name}</p>
      <section className="flex flex-col items-start gap-1">
        {setsTyped.map((set: Set) => {
          return (
            <section key={set.id} className="flex items-center gap-1">
              <p>{set.set}</p>
              <p>
                {convertWeight(set.weight, metric, newMetric)}
                {newMetric}
              </p>
              <p>x</p>
              <p>{set.reps}</p>
            </section>
          );
        })}
      </section>
    </section>
  );
}
