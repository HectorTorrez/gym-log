import type {Types} from "@/types/exercise";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TypeSelectedProps {
  onTypeChange: (value: string) => void;
  options: Types[];
  isCreate: boolean;
}

export function TypeSelected({onTypeChange, options, isCreate}: TypeSelectedProps) {
  const uniqueOptions = options.filter((v, i, a) => a.findIndex((t) => t.type === v.type) === i);

  return (
    <Select onValueChange={onTypeChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a type" />
      </SelectTrigger>
      <SelectContent>
        {isCreate ? null : <SelectItem value="all">All</SelectItem>}
        {uniqueOptions.map((option) => {
          return (
            <SelectItem key={crypto.randomUUID()} value={option.type}>
              {option.type}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
