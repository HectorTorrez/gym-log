import type {ExerciseList} from "@/types/exercise";

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
import CreateTemplates from "./create-templates";

interface DeleteExerciseMenuProps {
  onRemove: () => void;
  isEditingExercises?: ExerciseList[];
  isEditingTemplateName?: string;
  templateId?: string;
  handleDeleteExercise?: (id: string) => void;
  isReusableTemplate?: boolean;
}

export function DeleteExerciseMenu({
  onRemove,
  isEditingExercises,
  isEditingTemplateName,
  templateId,
  handleDeleteExercise,
  isReusableTemplate,
}: DeleteExerciseMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <CircleEllipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isReusableTemplate ? (
          <CreateTemplates
            isEditing
            isEditingTemplate
            editButton="Edit template"
            isEditingClassName="p-2 text-[14px] "
            isEditingExercises={isEditingExercises}
            isEditingTemplateName={isEditingTemplateName}
            isReusable={false}
            templateId={templateId}
            onDeleteReusableExercise={handleDeleteExercise}
          />
        ) : null}

        <DropdownMenuItem onClick={(e) => e.preventDefault()}>
          {/* Delete */}
          <DeleteSet title="Delete" onRemove={onRemove} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
