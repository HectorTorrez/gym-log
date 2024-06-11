import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { CoachExercise, CoachSet, Exercise } from "@/types/client-workout";
import CreateTemplates from "../create-templates";

interface CardWorkoutProps {
  name: string;
  coach_exercise: CoachExercise[];
}

export function CardWorkout({ coach_exercise, name }: CardWorkoutProps) {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="accept"
          className=" border border-blue-400 text-white bg-blue-400 w-full max-w-[270px]  hover:bg-blue-600"
        >
          {name}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <CreateTemplates
            isEditing
            isReusable
            editButton="Use this template"
            isEditingExercises={coach_exercise}
            isEditingTemplate={false}
            isEditingTemplateName={name}
            // templateId={id}
          />
          <DialogTitle>{name}</DialogTitle>
          {/* <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription> */}
        </DialogHeader>
        <ul>
          {coach_exercise.map((coach_exerci) => (
            <li key={coach_exerci.id}>
              <CardBody coach_sets={coach_exerci.coach_sets} name={coach_exerci.name}/>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}

export function CardBody({ coach_sets, name }: { coach_sets: CoachSet[], name: string}) {

  return (
    <>
      {
        coach_sets.map((coach_set) => (
          <div key={coach_set.id} className="flex justify-between">
            <p>{coach_set.set} x {name} </p>
          </div>
        ))
      }
    </>
  );
}
