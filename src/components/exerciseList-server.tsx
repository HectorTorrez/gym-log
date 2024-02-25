import {getExercises} from "@/api/route";

import CardExercise from "./card-exercise";

export default async function ExerciseListServer() {
  const data = await getExercises();

  return <CardExercise exercise={data} />;
}
