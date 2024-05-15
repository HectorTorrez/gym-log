import type {Category, Types} from "@/types/exercise";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TypeCategoryProps {
  onCategoryChange: (value: string) => void;
  options: Category[];
  isCreate: boolean;
}

export function CategorySelected({onCategoryChange, options, isCreate}: TypeCategoryProps) {
  const uniqueOptions = options.filter(
    (v, i, a) => a.findIndex((t) => t.category === v.category) === i,
  );

  return (
    <Select onValueChange={onCategoryChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        {isCreate ? null : <SelectItem value="all">All</SelectItem>}
        {uniqueOptions.map((option) => {
          return (
            <SelectItem key={crypto.randomUUID()} value={option.category}>
              {option.category}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
