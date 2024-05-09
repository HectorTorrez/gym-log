"use client";
import type {ExerciseList} from "@/types/exercise";

import {useState} from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {Input} from "./ui/input";
import AddExercise from "./add-exercise";
import {ExerciseForm} from "./exercises-form";

export default function CreateTemplates() {
  const [templateName, setTemplateName] = useState("Template name");
  const [exercisesList, setExercisesList] = useState<ExerciseList[]>([]);
  const handleListExercises = (exercises: ExerciseList[]) => {
    setExercisesList([...exercisesList, ...exercises]);
  };

  const handleDeleteExercise = (id: string) => {
    const newExercisesList = exercisesList.filter((exercise) => exercise.id === id);

    setExercisesList(newExercisesList);
  };

  return (
    <Dialog>
      <DialogTrigger className="mt-3 w-full rounded-lg border border-gray-50 p-3">
        Create template
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mt-10 flex flex-col gap-7">
          <DialogTitle>
            <Input
              required
              className="w-full border border-b-2 border-l-0 border-r-0 border-t-0 "
              placeholder="Template name"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
            />
          </DialogTitle>
          <DialogDescription>
            <AddExercise handleListExercises={handleListExercises} />

            <ExerciseForm
              exercisesList={exercisesList}
              handleDeleteExercise={handleDeleteExercise}
              templateName={templateName}
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
