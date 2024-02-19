import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function HomePage() {
  return (
    <section>
      <p className="mb-9 text-xl font-bold">History</p>
      <p className="mb-3">Date</p>
      <Dialog>
        <DialogTrigger asChild className="w-full">
          <Button className="flex h-fit w-full flex-col" variant="outline">
            <section>
              <p className="text-xl font-bold">Legs</p>
              <span>Monday, 19 feb</span>
            </section>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle className="text-xl font-bold">Leg</DialogTitle>
          <DialogDescription>Monday, 19 feb</DialogDescription>
          <section>
            <p className="text-lg font-bold">Squat (Barbell)</p>
            <ol>
              <li>20 kg x 10</li>
              <li>20 kg x 10</li>
              <li>20 kg x 10</li>
            </ol>
          </section>
        </DialogContent>
      </Dialog>
    </section>
  );
}
