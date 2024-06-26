/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";
import type {ExerciseList} from "@/types/exercise";

import {useEffect, useState} from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import supabase from "@/db/api/client";
import {cn} from "@/lib/utils";

import {Input} from "./ui/input";
import AddExercise from "./add-exercise";
import {ExerciseForm} from "./exercises-form";

interface CreateTemplatesProps {
  isEditing: boolean;
  templateId?: string;
  isEditingTemplateName?: string;
  isEditingExercises?: ExerciseList[];
  editButton?: string;
  isEditingTemplate: boolean;
  onDeleteReusableExercise?: (id: string) => void;
  isEditingClassName?: string;
  isReusable: boolean;
}

export default function CreateTemplates({
  isEditing,
  isEditingExercises,
  isEditingTemplateName,
  editButton,
  isEditingTemplate,
  onDeleteReusableExercise,
  isEditingClassName,
  isReusable,
}: CreateTemplatesProps) {
  const [templateName, setTemplateName] = useState("Template name");
  const [exercisesList, setExercisesList] = useState<ExerciseList[]>([]);

  const [open, setOpen] = useState(false);

  const handleListExercises = (exercises: ExerciseList[]) => {
    setExercisesList([...exercisesList, ...exercises]);
  };

  const handleDeleteExercise = async (id: string) => {
    await supabase.from("exercise").delete().eq("id", id);

    const newExercisesList = exercisesList.filter((exercise) => exercise.id !== id);

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
        <DialogTrigger
          className={cn("flex items-center justify-start text-blue-400", isEditingClassName)}
        >
          {editButton ? editButton : "Edit template"}
        </DialogTrigger>
      ) : (
        <DialogTrigger className="mt-3 w-full max-w-lg rounded-lg border border-blue-400 p-3 text-blue-400">
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
              editButton={editButton}
              exercisesList={exercisesList}
              handleClearTemplate={handleClearTemplate}
              handleDeleteExercise={handleDeleteExercise}
              isEditing={isEditing}
              isEditingTemplate={isEditingTemplate}
              isReusable={isReusable}
              open={open}
              setOpen={setOpen}
              templateName={templateName}
              onDeleteReusableExercise={onDeleteReusableExercise}
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
