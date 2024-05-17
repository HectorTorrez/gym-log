import type {HistoryWorkoutsCardProps} from "@/types/historyWorkoutsType";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {formatDate} from "@/lib/formatDate";

import {HistoryWorkoutsCard} from "./history-workouts-card";
import CreateTemplates from "./create-templates";

export const revalidate = 1;

export const dynamic = "force-dynamic";

export function HistoryWorkout(props: HistoryWorkoutsCardProps) {
  return (
    <Dialog>
      <DialogTrigger className="max-h-[200px] w-full max-w-[375px]  overflow-hidden rounded-lg  border p-6 text-start">
        <p className="text-xl font-bold text-white">{props.name}</p>
        <p>{formatDate(props.created_at)}</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <CreateTemplates
            isEditing
            isEditingExercises={props.exercise}
            isEditingTemplate={false}
            isEditingTemplateName={props.name}
            isReusable={false}
            templateId={props.id}
          />

          <DialogDescription>
            <HistoryWorkoutsCard
              {...props}
              className="text-start"
              contentClassName="flex flex-col gap-3 max-h-[300px] overflow-y-auto"
            />
          </DialogDescription>
          {/* <DialogFooter>
            <CreateTemplates isEditing />
          </DialogFooter> */}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
