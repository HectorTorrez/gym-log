import type {HistoryWorkoutsCardProps} from "@/types/historyWorkoutsType";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {formatDate} from "@/lib/formatDate";

import {HistoryWorkoutsCard} from "./history-workouts-card";
import CreateTemplates from "./create-templates";

export function HistoryWorkout(props: HistoryWorkoutsCardProps) {
  return (
    <Dialog>
      <DialogTrigger className="max-h-[200px] w-full max-w-[375px]  overflow-hidden rounded-lg  border p-6 text-start">
        <h3 className="text-xl font-bold text-white">{props.name}</h3>
        <p>{formatDate(props.created_at)}</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <CreateTemplates
            isEditing
            isEditingExercises={props.exercise}
            isEditingTemplateName={props.name}
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
