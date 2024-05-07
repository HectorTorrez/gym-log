"use client";
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

export default function CreateTemplates() {
  const [templateName, setTemplateName] = useState("");

  return (
    <Dialog>
      <DialogTrigger className="mt-3 w-full rounded-lg border border-gray-50 p-3">
        Create template
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mt-10 flex flex-col gap-7">
          <DialogTitle>
            <Input
              className="w-full outline-none "
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
            />
          </DialogTitle>
          <DialogDescription>
            <AddExercise />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
