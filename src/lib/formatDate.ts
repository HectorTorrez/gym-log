export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options = {
    year: "numeric" as const,
    month: "long" as const,
    day: "numeric" as const,
    hour: "numeric" as const,
    minute: "numeric" as const,
    weekday: "long" as const,
  };

  return date.toLocaleDateString(undefined, options);
}
