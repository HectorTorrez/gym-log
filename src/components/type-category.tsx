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
}

export function CategorySelected({onCategoryChange, options}: TypeCategoryProps) {
  const uniqueOptions = options.filter(
    (v, i, a) => a.findIndex((t) => t.category === v.category) === i,
  );

  return (
    <Select onValueChange={onCategoryChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
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
