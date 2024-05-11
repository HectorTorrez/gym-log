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

export function HistoryWorkout(props: HistoryWorkoutsCardProps) {
  return (
    <Dialog>
      <DialogTrigger className="max-h-[200px] w-full max-w-[375px]  overflow-hidden rounded-lg  border p-6 text-start">
        <h3 className="text-xl font-bold text-white">{props.name}</h3>
        <p>{formatDate(props.created_at)}</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {/* <DialogTitle>Are you absolutely sure?</DialogTitle> */}
          <DialogDescription>
            <HistoryWorkoutsCard
              {...props}
              className="text-start"
              contentClassName="flex flex-col gap-3"
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
