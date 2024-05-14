"use client";
import {Suspense, useState} from "react";

import {ExercisesList} from "@/components/exercises-list";
import FilterExercises from "@/components/filter-exercises";

interface ExerciseListClientProps {
  exercises:
    | {
        category: string;
        created_at: string;
        id: string;
        name: string;
        role: string | null;
        type: string;
        user_id: string | null;
      }[]
    | null;
}

export default function ExerciseListClient({exercises}: ExerciseListClientProps) {
  const [selectedType, setSelectedType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [inputValue, setInputValue] = useState("");

  const onTypeChange = (value: string) => {
    setSelectedType(value);
  };

  const onCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const onInputChange = (value: string) => {
    setInputValue(value);
  };

  const filteredExercises = exercises?.filter((exercise) => {
    if (selectedType === "all") setSelectedType("");
    if (selectedCategory === "all") setSelectedCategory("");
    const byName = exercise.name.toLowerCase().includes(inputValue.toLowerCase());
    const byType = exercise.type.toLowerCase().includes(selectedType.toLowerCase());
    const byCategory = exercise.category.toLowerCase().includes(selectedCategory.toLowerCase());

    return byName && byType && byCategory;
  });

  return (
    <section>
      <FilterExercises
        inputValue={inputValue}
        onCategoryChange={onCategoryChange}
        onInputChange={onInputChange}
        onTypeChange={onTypeChange}
      />
      <section className="flex max-h-[calc(100vh-400px)] flex-col gap-5 overflow-y-auto">
        {!filteredExercises?.length && <div>No exercises found</div>}
        {filteredExercises?.map((exercise) => {
          return (
            <Suspense key={exercise.id} fallback={<div>Loading...</div>}>
              <ExercisesList {...exercise} />
            </Suspense>
          );
        })}
      </section>
    </section>
  );
}
