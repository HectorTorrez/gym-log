import {CircleEllipsis} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {DeleteSet} from "./delete-set";

interface DeleteExerciseMenuProps {
  onRemove: () => void;
}

export function DeleteExerciseMenu({onRemove}: DeleteExerciseMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <CircleEllipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={(e) => e.preventDefault()}>
          {/* Delete */}
          <DeleteSet title="Delete" onRemove={onRemove} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
