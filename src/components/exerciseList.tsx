import {cn} from "@/lib/utils";

import {Input} from "./ui/input";
import SelectCategory from "./SelectCategory";

export default function ExerciseList({className, children}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("flex flex-col gap-5", className)}>
      <section>
        <Input placeholder="Search" />
      </section>
      <section className="mt-3">
        <SelectCategory />
      </section>
      <section className="mt-10">{children}</section>
    </section>
  );
}
