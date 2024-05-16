/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";
import {useRouter} from "next/navigation";

import CreateTemplates from "@/components/create-templates";
import {DeleteExerciseMenu} from "@/components/delete-exercise-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {supabase} from "@/db/api/server";

interface ReusableTemplatesProps {
  created_at: string;
  id: string;
  name: string;
  user_id: string;
  reusable_exercise: {
    created_at: string;
    id: string;
    name: string;
    template_id: string;
  }[];
}

export function ReusableTemplates(props: ReusableTemplatesProps) {
  const {name, reusable_exercise, id} = props;

  const router = useRouter();

  const handleDelete = async () => {
    await supabase.from("reusables_templates").delete().eq("id", id);
    router.refresh();
  };

  const handleDeleteExercise = async (id: string) => {
    await supabase.from("reusable_exercise").delete().eq("id", id);
    router.refresh();
  };

  return (
    <Dialog>
      <DialogTrigger className="max-h-[200px] w-full max-w-[375px]  overflow-hidden rounded-lg  border p-6 text-start">
        <p className="text-xl font-bold text-white">{name}</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-5 mt-5 flex items-center justify-between">
            <CreateTemplates
              isEditing
              editButton="Use this template"
              isEditingExercises={reusable_exercise}
              isEditingTemplate={false}
              isEditingTemplateName={name}
              templateId={id}
            />
            <DeleteExerciseMenu
              isReusableTemplate
              handleDeleteExercise={handleDeleteExercise}
              isEditingExercises={reusable_exercise}
              isEditingTemplateName={name}
              templateId={id}
              onRemove={handleDelete}
            />
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-3">
            {reusable_exercise.map((exercise) => {
              return (
                <section key={exercise.id}>
                  <p className="rounded-lg border p-2 text-xl font-bold">{exercise.name}</p>
                </section>
              );
            })}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
