"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import ChooseExercise from "./choose-exercise";

export default function AddExercise() {
  return (
    <Dialog>
      <DialogTrigger className="w-full rounded-lg border border-gray-50 bg-white p-3 font-bold text-black">
        Add exercise
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mt-10">
          <DialogTitle />
          <DialogDescription>
            <ChooseExercise />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
