import {MoreHorizontal, Plus} from "lucide-react";

import AddNewTemplateApp from "@/components/addNewTemplate";

export default function Workoutpage() {
  return (
    <section>
      <h2>Start Workout</h2>
      <section className="mt-3 w-full ">
        <AddNewTemplateApp />
      </section>
      <section className="mt-5 flex items-center justify-between">
        <p className="rounded-lg bg-gray-500 p-2">Templates</p>
        <p className="rounded-lg bg-gray-500 p-2">
          <Plus />
        </p>
      </section>

      <section>
        <section className="mt-3 flex max-w-[300px] justify-between rounded-lg border border-gray-300 px-2 py-2">
          <p className=" flex flex-col">
            Name template
            <span>Name exercise</span>
          </p>
          <p className="h-fit rounded-lg bg-gray-500">
            <MoreHorizontal />
          </p>
        </section>
      </section>
    </section>
  );
}
