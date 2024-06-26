import React, {Suspense} from "react";
import {currentUser} from "@clerk/nextjs";

import {getExercises} from "@/lib/getExercises";
import CreateExercise from "@/components/create-exercise";

import ExerciseListClient from "./page.client";

export const revalidate = 1;

export const dynamic = "force-dynamic";

export default async function ExerciseListPage() {
  const user = await currentUser();

  if (!user) return null;
  const exercises = await getExercises(user.id);

  return (
    <section>
      <section className="mt-3">
        <CreateExercise />
      </section>
      <Suspense fallback={<div>Loading...</div>}>
        <ExerciseListClient exercises={exercises} />
      </Suspense>
    </section>
  );
}
