// import type {ExerciseList} from "@/types/exercise";

// import React from "react";
// import {currentUser} from "@clerk/nextjs";

// import {getExercises} from "@/lib/getExercises";

// import ChooseExercise from "./choose-exercise.client";

// interface ChooseExerciseProps {
//   handleListExercises: (exercises: ExerciseList[]) => void;
// }

// export default async function ChooseExerciseServer({handleListExercises}: ChooseExerciseProps) {
//   const user = await currentUser();

//   if (!user) return;
//   const data = await getExercises(user.id);

//   return <ChooseExercise data={data || []} handleListExercises={handleListExercises} />;
// }
