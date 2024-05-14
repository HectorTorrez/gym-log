import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {Button} from "./ui/button";
import CreateExerciseForm from "./create-exercise-form";

export default function CreateExercise() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="border border-blue-400 text-blue-400" variant="ghost">
          Create new exercise
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            <CreateExerciseForm />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
