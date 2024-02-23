import ExerciseList from "@/components/exerciseList";
import ExerciseListServer from "@/components/exerciseList-server";

export default function ExercisePage() {
  return (
    <ExerciseList>
      <ExerciseListServer />
    </ExerciseList>
  );
}
