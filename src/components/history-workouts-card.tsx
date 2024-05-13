import type {
  CardBodyProps,
  HistoryWorkoutsCardPropsWithClassName,
} from "@/types/historyWorkoutsType";
import type {Set} from "@/types/exercise";

import React from "react";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {formatDate} from "@/lib/formatDate";

export function HistoryWorkoutsCard(props: HistoryWorkoutsCardPropsWithClassName) {
  const {created_at, name, exercise} = props;

  return (
    <Card className={props.className}>
      <CardHeader className={props.headerClassName}>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{formatDate(created_at)}</CardDescription>
      </CardHeader>
      <CardContent className={props.contentClassName}>
        {exercise.map((exercise) => {
          return <CardBody key={exercise.id} exercise={exercise} />;
        })}
      </CardContent>
    </Card>
  );
}

export function CardBody({exercise}: CardBodyProps) {
  const {name, sets} = exercise;

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
                {set.weight}
                kg
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
