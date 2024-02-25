import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {Button} from "@/components/ui/button";

interface AlertDeleteProps {
  textButton: string | JSX.Element;
  textTitle: string;
  textDescription?: string;
  textCancel: string;
  textAction: string;
  variant:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  onClick: () => void;
}

export function AlertDelete({
  textButton,
  textTitle,
  textDescription,
  textCancel,
  textAction,
  variant,
  onClick,
}: AlertDeleteProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={variant}>{textButton}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{textTitle}</AlertDialogTitle>
          {textDescription ? (
            <AlertDialogDescription>{textDescription}</AlertDialogDescription>
          ) : null}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{textCancel}</AlertDialogCancel>
          <AlertDialogAction onClick={onClick}>{textAction}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
