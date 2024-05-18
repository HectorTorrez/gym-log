import type {HistoryWorkoutsCardProps} from "@/types/historyWorkoutsType";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
        <DialogTitle>
          <div>
            <span className="text-xl font-bold text-white">{props.name}</span>
          </div>
          <span className="text-[1rem] text-gray-500">{formatDate(props.created_at)}</span>
        </DialogTitle>
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
