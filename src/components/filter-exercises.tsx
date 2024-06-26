"use client";

import {useGetTypes} from "@/hooks/useGetType";
import {useGetCategories} from "@/hooks/useGetCategories";

import {Input} from "./ui/input";
import {TypeSelected} from "./type-select";
import {CategorySelected} from "./type-category";

interface FilterExercisesProps {
  onTypeChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  inputValue: string;
  onInputChange: (value: string) => void;
}

export default function FilterExercises({
  onTypeChange,
  onCategoryChange,
  inputValue,
  onInputChange,
}: FilterExercisesProps) {
  const {data: type} = useGetTypes();
  const {data: category} = useGetCategories();

  if (!type || !category) return null;

  return (
    <div className="mb-5 mt-5 flex flex-col gap-5">
      <Input
        placeholder="Search exercises"
        type="text"
        value={inputValue}
        onChange={(e) => onInputChange(e.target.value)}
      />
      <section className="flex flex-col gap-5 sm:flex-row">
        <section>
          <CategorySelected
            isCreate={false}
            options={category}
            onCategoryChange={onCategoryChange}
          />
        </section>
        <section>
          <TypeSelected isCreate={false} options={type} onTypeChange={onTypeChange} />
        </section>
      </section>
    </div>
  );
}
