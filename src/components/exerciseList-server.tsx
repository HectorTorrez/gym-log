import {getExercises} from "@/api/getExercises";

import CardExercise from "./card-exercise";

export default async function ExerciseListServer() {
  const data = await getExercises();

  return <CardExercise exercise={data} />;
}
