import {Suspense} from "react";

import {getExercises} from "@/api/route";
import CardExercise from "@/components/card-exercise";
import ExerciseList from "@/components/exerciseList";

import Loading from "./loading";

export const revalidate = 1;

export const dynamic = "force-dynamic";

export default async function ExercisePage() {
  const data = await getExercises();

  return (
    <>
      <ExerciseList />
      <section className="my-3 flex flex-col gap-3">
        <Suspense fallback={<Loading />}>
          <CardExercise exercise={data} />
        </Suspense>
      </section>
    </>
  );
}
