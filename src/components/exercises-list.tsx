/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";
import {useUser} from "@clerk/nextjs";
import React from "react";
import {useRouter} from "next/navigation";

import supabase from "@/db/api/client";

import {DeleteExerciseMenu} from "./delete-exercise-menu";

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
  const {name, category, type, user_id, id} = props;

  const {user} = useUser();
  const router = useRouter();

  const onRemove = async () => {
    try {
      const {error} = await supabase.from("exercise_list").delete().eq("id", id);

      if (error === null) {
        router.refresh();
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <section className="rounded-lg border p-3">
      <section className="flex items-start justify-between">
        <p className="flex flex-wrap items-center gap-2">
          {name}
          <span>({type})</span>
        </p>
        {user?.id === user_id && <DeleteExerciseMenu onRemove={onRemove} />}
      </section>
      <p>{category}</p>
    </section>
  );
}
