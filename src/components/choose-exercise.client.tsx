"use client";

import type {ExerciseList} from "@/types/exercise";

import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {useUser} from "@clerk/nextjs";

import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {useGetTypes} from "@/hooks/useGetType";
import {useGetCategories} from "@/hooks/useGetCategories";
import {getExercise} from "@/queries/get-exercises";

import {Button} from "./ui/button";
import {Input} from "./ui/input";
import {DialogClose} from "./ui/dialog";
import {TypeSelected} from "./type-select";
import {CategorySelected} from "./type-category";

interface ChooseExercisesProps {
  handleListExercises: (exercises: ExerciseList[]) => void;
  // data?: DataType[];
}

export default function ChooseExercise({handleListExercises}: ChooseExercisesProps) {
  const [searchExercise, setSearchExercise] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [selectedExercises, setSelectedExercises] = useState<ExerciseList[]>([]);
  const [toggleSelected, setToggleSelected] = useState<string[]>([]);

  // const {data} = useGetExercises();
  const {user} = useUser();
  const {data} = useQuery({
    queryKey: ["exercise_list"],
    queryFn: async () => await getExercise(user?.id || ""),
  });

  const {data: types} = useGetTypes();
  const {data: categories} = useGetCategories();

  const filteredData = data?.filter((exercise) => {
    if (type === "all") setType("");
    if (category === "all") setCategory("");
    const byName = exercise.name.toLowerCase().includes(searchExercise.toLowerCase());
    const byType = exercise.type.toLowerCase().includes(type.toLowerCase());
    const byCategory = exercise.category.toLowerCase().includes(category.toLowerCase());

    return byName && byType && byCategory;
  });

  const handleAddExercise = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleListExercises(selectedExercises);
  };

  const onChangeType = (value: string) => {
    setType(value);
  };
  const onChangeCategory = (value: string) => {
    setCategory(value);
  };

  useEffect(() => {
    const flattenedToggleSelected = toggleSelected.flat();
    const newExercises = flattenedToggleSelected.map((exercise) => {
      return {id: crypto.randomUUID(), name: exercise};
    });

    setSelectedExercises(newExercises);
  }, [toggleSelected]);

  return (
    <section>
      <section className="mb-3 mt-3 ">
        <h3 className="text-xl font-bold ">Choose exercise</h3>
        <form className="flex flex-col gap-5" onSubmit={handleAddExercise}>
          <Input
            className="mt-2 w-full rounded-lg border 
            "
            placeholder="Search exercise"
            type="text"
            value={searchExercise}
            onChange={(e) => setSearchExercise(e.target.value)}
          />

          <TypeSelected isCreate={false} options={types || []} onTypeChange={onChangeType} />
          <CategorySelected
            isCreate={false}
            options={categories || []}
            onCategoryChange={onChangeCategory}
          />
          <DialogClose asChild>
            <Button
              className="w-full border border-blue-400 text-blue-400"
              type="submit"
              variant="ghost"
            >
              Add exercise
            </Button>
          </DialogClose>
        </form>
      </section>
      <section className="flex max-h-[400px] flex-col overflow-y-scroll">
        <ToggleGroup
          className="flex flex-col"
          type="multiple"
          variant="outline"
          // onValueChange={(value) => handleSelect(value)}
          onValueChange={(value) => setToggleSelected(value)}
        >
          {filteredData?.length === 0 && <p className="text-center ">No exercises found</p>}
          {filteredData?.map((exercise) => (
            <ToggleGroupItem
              key={exercise.id}
              className="w-full p-2"
              value={`${exercise.name} (${exercise.type})`}
            >
              {exercise.name}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </section>
    </section>
  );
}
