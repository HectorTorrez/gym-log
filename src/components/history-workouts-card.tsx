import type {HistoryWorkoutsCardPropsWithClassName} from "@/types/historyWorkoutsType";

import React from "react";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {formatDate} from "@/lib/formatDate";

import {CardBody} from "./workouts-card-body";

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
