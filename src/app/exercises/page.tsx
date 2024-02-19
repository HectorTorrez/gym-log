import ExerciseList from "@/components/exerciseList";
import {Card, CardDescription, CardTitle} from "@/components/ui/card";

export default function ExercisePage() {
  return (
    <ExerciseList>
      <Card>
        <CardTitle>Squat</CardTitle>
        <CardDescription>Legs</CardDescription>
      </Card>
    </ExerciseList>
  );
}
