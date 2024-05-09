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

import ChooseExercise from "./choose-exercise";

interface AddExerciseProps {
  handleListExercises: (exercises: ExerciseList[]) => void;
}

export default function AddExercise({handleListExercises}: AddExerciseProps) {
  return (
    <Dialog>
      <DialogTrigger className="w-full rounded-lg border border-gray-50 bg-white p-3 font-bold text-black">
        Add exercise
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mt-10">
          <DialogTitle />
          <DialogDescription>
            <ChooseExercise handleListExercises={handleListExercises} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
