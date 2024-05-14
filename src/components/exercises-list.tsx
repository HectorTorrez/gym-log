import React from "react";

interface ExerciseListProps {
  category: string;
  created_at: string;
  id: string;
  name: string;
  role: string | null;
  type: string;
  user_id: string | null;
}

export function ExercisesList(props: ExerciseListProps) {
  const {name, category, type} = props;

  return (
    <section className="rounded-lg border p-3">
      <p className="flex items-center gap-2">
        {name}
        <span>({type})</span>
      </p>
      <p>{category}</p>
    </section>
  );
}
