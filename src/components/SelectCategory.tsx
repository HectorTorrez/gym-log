import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectCategory() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
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
  );
}
