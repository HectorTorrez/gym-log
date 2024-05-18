"use client";

import type {ExerciseList} from "@/types/exercise";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

import ChooseExercise from "./choose-exercise.client";
import CreateExercise from "./create-exercise";

interface AddExerciseProps {
  handleListExercises: (exercises: ExerciseList[]) => void;
}

export default function AddExercise({handleListExercises}: AddExerciseProps) {
  return (
    <Dialog>
      <DialogTrigger className="w-full rounded-lg border border-blue-400 p-3 font-bold  text-blue-400">
        Add exercise
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-10 mt-10">
          <CreateExercise />
          <DialogDescription>
            <ChooseExercise handleListExercises={handleListExercises} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
