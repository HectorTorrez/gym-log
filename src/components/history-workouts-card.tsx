import type {
  CardBodyProps,
  HistoryWorkoutsCardPropsWithClassName,
} from "@/types/historyWorkoutsType";

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

  return (
    <section className="flex flex-col ">
      <p>{name}</p>
      <section className="flex items-center gap-1">
        <p>{sets?.set}</p>
        <p>
          {sets?.weight}
          kg
        </p>
        <p>x</p>
        <p>{sets?.reps}</p>
      </section>
    </section>
  );
}
