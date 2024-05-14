"use client";
import type {Category, Types} from "@/types/exercise";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectComponentProps {
  options: Types[] | Category[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export function SelectComponent({options, value, onChange, placeholder}: SelectComponentProps) {
  const uniqueOptions = options.filter((option, index, self) => {
    const key = "type" in option ? option.type : option.category;

    return index === self.findIndex((o) => ("type" in o ? o.type : o.category) === key);
  });

  return (
    <select value={value} onChange={(e) => onChange(e.currentTarget.value)}>
      {uniqueOptions.map((option) => {
        const key = "type" in option ? option.type : option.category;

        return (
          <option key={crypto.randomUUID()} value={key}>
            {key}
          </option>
        );
      })}
    </select>
  );
}
