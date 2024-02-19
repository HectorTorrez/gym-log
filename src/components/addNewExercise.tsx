import {Dialog, DialogContent, DialogTrigger, DialogClose} from "@/components/ui/dialog";
import ExercisePage from "@/app/exercises/page";

import {Button} from "./ui/button";
import {ToggleGroup, ToggleGroupItem} from "./ui/toggle-group";
import ExerciseList from "./exerciseList";

export default function AddNewExercise() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Add new exercise</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[300px]">
        <DialogClose asChild>
          <Button className="mt-5">Add</Button>
        </DialogClose>

        <ExerciseList className="mt-10">
          <ToggleGroup className="flex flex-col gap-5 " type="multiple">
            <ToggleGroupItem
              aria-label="toggle a"
              className="flex h-[50px] w-full flex-col border"
              value="a"
            >
              <p className="text-start">Incline Press (barbell)</p>
              <span>Chest</span>
            </ToggleGroupItem>
            <ToggleGroupItem className="flex h-[50px] w-full flex-col border" value="b">
              <p className="text-start">Squat (barbell)</p>
              <span>Legs</span>
            </ToggleGroupItem>
            <ToggleGroupItem className="flex h-[50px] w-full flex-col border" value="c">
              <p className="text-start">Row (barbell)</p>
              <span>Back</span>
            </ToggleGroupItem>
          </ToggleGroup>
        </ExerciseList>
      </DialogContent>
    </Dialog>
  );
}
