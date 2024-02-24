"use client";
import {useState} from "react";

import {cn} from "@/lib/utils";

import {Input} from "./ui/input";
import {Dialog, DialogContent, DialogTrigger} from "./ui/dialog";
import {Button} from "./ui/button";
import SelectCategory from "./SelectCategory";
import FormAddExercise from "./formAddExercise";
import Scroll from "./scroll";

export default function ExerciseList({className, children}: React.HTMLAttributes<HTMLElement>) {
  const [open, setOpen] = useState(false);

  return (
    <section className={cn("relative flex flex-col gap-5", className)}>
      <section>
        <Input placeholder="Search" />
      </section>
      <section className="mt-3 flex justify-between">
        <SelectCategory />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>New</Button>
          </DialogTrigger>
          <DialogContent className="py-16">
            <FormAddExercise setOpen={setOpen} />
          </DialogContent>
        </Dialog>
      </section>
      <section className="fixed bottom-3 right-4 flex flex-col gap-2">
        <Scroll direction="up" />
        <Scroll direction="down" />
      </section>
      <section className="mt-10 flex flex-col gap-5">{children}</section>
    </section>
  );
}
