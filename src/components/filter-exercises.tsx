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
    <form className="mb-5 mt-5 flex flex-col gap-5">
      <Input
        placeholder="Search exercises"
        type="text"
        value={inputValue}
        onChange={(e) => onInputChange(e.target.value)}
      />
      <section className="flex gap-5">
        <section>
          <CategorySelected options={category} onCategoryChange={onCategoryChange} />
        </section>
        <section>
          <TypeSelected options={type} onTypeChange={onTypeChange} />
        </section>
      </section>
    </form>
  );
}
