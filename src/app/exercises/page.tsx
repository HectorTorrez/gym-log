import {getExercises} from "@/api/getExercises";
import CardExercise from "@/components/card-exercise";
import ExerciseList from "@/components/exerciseList";

export default async function ExercisePage() {
  const data = await getExercises();

  return (
    <>
      <ExerciseList />
      <section className="my-3 flex flex-col gap-3">
        <CardExercise exercise={data} />
      </section>
    </>
  );
}
