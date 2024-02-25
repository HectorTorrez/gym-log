import {supabase} from "@/db/api/server";

export const revalidate = 0;

export async function getExercises() {
  const {data} = await supabase
    .from("exercise_list")
    .select()
    .order("created_at", {ascending: false});

  return data ?? [];
}
