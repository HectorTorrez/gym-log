import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {Input} from "./ui/input";

export default function SelectCategory() {
  return (
    <section className="flex w-[50%] flex-col gap-10 md:flex-row">
      <Input className="w-[180px] max-w-[500px] md:w-[100%]" placeholder="Search" />
      <Select>
        <SelectTrigger className="w-[180px] md:w-[100%]">
          <SelectValue placeholder="Filter by Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Chest</SelectItem>
          <SelectItem value="dark">Legs</SelectItem>
          <SelectItem value="system">Arms</SelectItem>
          <SelectItem value="system">Shoulder</SelectItem>
          <SelectItem value="system">Back</SelectItem>
        </SelectContent>
      </Select>
    </section>
  );
}
