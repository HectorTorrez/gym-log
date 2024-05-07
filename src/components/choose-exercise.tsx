"use client";

import {useState} from "react";

import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {useGetExercises} from "@/hooks/useGetExercises";

import {Button} from "./ui/button";
import {Input} from "./ui/input";

export default function ChooseExercise() {
  const [searchExercise, setSearchExercise] = useState("");
  const [selectedExercises, setSelectedExercises] = useState<string[] | null>(null);

  const {data} = useGetExercises();

  const filteredData = data?.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchExercise.toLowerCase()),
  );

  const handleSelect = (value: string[]) => {
    setSelectedExercises(value);
  };

  return (
    <section>
      <section className="mb-3 mt-3 ">
        <h3 className="text-xl font-bold text-white">Choose exercise</h3>
        <form className="flex flex-col gap-2">
          <Input
            className="mt-2 w-full rounded-lg border border-gray-200 bg-white p-2
            placeholder-gray-400 placeholder:text-black focus:border-transparent focus:outline-none focus:ring-2
            focus:ring-gray-300
            "
            placeholder="Search exercise"
            type="text"
            value={searchExercise}
            onChange={(e) => setSearchExercise(e.target.value)}
          />
          <Button className="w-full bg-blue-300 ">Add exercise</Button>
        </form>
      </section>
      <section className="flex max-h-[400px] flex-col overflow-y-scroll">
        <ToggleGroup
          className="flex flex-col"
          type="multiple"
          variant="outline"
          onValueChange={(value) => handleSelect(value)}
        >
          {filteredData?.length === 0 && (
            <p className="text-center text-white">No exercises found</p>
          )}
          {filteredData?.map((exercise) => (
            <ToggleGroupItem key={exercise.id} className="w-full p-2" value={exercise.name}>
              {exercise.name}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </section>
    </section>
  );
}
