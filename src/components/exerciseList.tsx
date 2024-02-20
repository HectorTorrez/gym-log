"use client";

import {cn} from "@/lib/utils";

import {Input} from "./ui/input";
import {Dialog, DialogContent, DialogTrigger, DialogFooter} from "./ui/dialog";
import {Button} from "./ui/button";
import SelectCategory from "./SelectCategory";
import FormAddExercise from "./formAddExercise";

export default function ExerciseList({className, children}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("flex flex-col gap-5", className)}>
      <section>
        <Input placeholder="Search" />
      </section>
      <section className="mt-3 flex justify-between">
        <SelectCategory />
        <Dialog>
          <DialogTrigger asChild>
            <Button>New</Button>
          </DialogTrigger>
          <DialogContent className="py-16">
            <FormAddExercise />
          </DialogContent>
        </Dialog>
      </section>
      <section className="mt-10">{children}</section>
    </section>
  );
}
