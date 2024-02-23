"use client";

import type {Exercise} from "@/types/exercise";

import {Card, CardDescription, CardTitle} from "./ui/card";

export default function CardExercise({exercise}: {exercise: Exercise[]}) {
  return (
    <>
      {exercise.map((item) => {
        return (
          <Card key={item.id} className="flex flex-col gap-3 px-4 py-4">
            <CardTitle>
              {item.name} <span>({item.type})</span>
            </CardTitle>
            <CardDescription>{item.category}</CardDescription>
          </Card>
        );
      })}
    </>
  );
}
