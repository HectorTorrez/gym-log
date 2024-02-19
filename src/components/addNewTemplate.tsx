import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import {Button} from "./ui/button";
import {Input} from "./ui/input";
import AddNewExercise from "./addNewExercise";

export default function AddNewTemplateApp() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" variant="outline">
          Add new workout
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[300px]">
        <DialogHeader>
          <DialogTitle>
            <Input
              className="w-[90%] max-w-[200px] border-none outline-none active:border-none"
              value="Example name"
            />
          </DialogTitle>
          <DialogDescription>
            <section className="mt-10 flex flex-col gap-10">
              <AddNewExercise />
              <DialogClose asChild>
                <Button className="bg-red-100 text-red-400" variant="ghost">
                  Cancel Workout
                </Button>
              </DialogClose>
            </section>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
