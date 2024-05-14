import React from "react";
import {currentUser} from "@clerk/nextjs";

import {getExercises} from "@/lib/getExercises";

import ExerciseListClient from "./page.client";

export const revalidate = 1;

export const dynamic = "force-dynamic";

export default async function ExerciseListPage() {
  const user = await currentUser();

  if (!user) return null;
  const exercises = await getExercises(user.id);

  return <ExerciseListClient exercises={exercises} />;
}
