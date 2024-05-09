import {AlertCircle} from "lucide-react";

import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";

export function AlertError({
  description,
  title,
  alertClassName,
  iconClassName,
}: {
  description: string;
  title: string;
  alertClassName?: string;
  iconClassName: string;
}) {
  return (
    <Alert className={alertClassName} variant="destructive">
      <AlertCircle className={iconClassName} />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
