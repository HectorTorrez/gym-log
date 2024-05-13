"use client";
import type {ExerciseList} from "@/types/exercise";

import {useEffect, useState} from "react";
import {DialogClose} from "@radix-ui/react-dialog";

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

interface CreateTemplatesProps {
  isEditing: boolean;
  templateId?: string;
  isEditingTemplateName?: string;
  isEditingExercises?: ExerciseList[];
}

export default function CreateTemplates({
  isEditing,
  isEditingExercises,
  isEditingTemplateName,
}: CreateTemplatesProps) {
  const [templateName, setTemplateName] = useState("Template name");
  const [exercisesList, setExercisesList] = useState<ExerciseList[]>([]);

  const [open, setOpen] = useState(false);

  const handleListExercises = (exercises: ExerciseList[]) => {
    setExercisesList([...exercisesList, ...exercises]);
  };

  const handleDeleteExercise = (id: string) => {
    const newExercisesList = exercisesList.filter((exercise) => exercise.id === id);

    setExercisesList(newExercisesList);
  };

  const handleClearTemplate = () => {
    setTemplateName("Template name");
    setExercisesList([]);
  };

  useEffect(() => {
    if (isEditing && isEditingTemplateName && isEditingExercises) {
      setTemplateName(isEditingTemplateName);
      setExercisesList(isEditingExercises);
    }
  }, [isEditing, isEditingTemplateName, isEditingExercises]);

  useEffect(() => {
    if (!open && !isEditing) {
      handleClearTemplate();
    }
  }, [open, isEditing]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {isEditing ? (
        <DialogTrigger className="w-[100px]   text-blue-400">Edit template</DialogTrigger>
      ) : (
        <DialogTrigger className="mt-3 w-full rounded-lg border border-gray-50 p-3">
          Create template
        </DialogTrigger>
      )}

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
              exercisesList={isEditing ? isEditingExercises ?? exercisesList : exercisesList}
              handleClearTemplate={handleClearTemplate}
              handleDeleteExercise={handleDeleteExercise}
              isEditing={isEditing}
              open={open}
              setOpen={setOpen}
              templateName={templateName}
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
