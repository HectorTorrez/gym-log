import {supabase} from "@/db/api/server";

export async function getExercises() {
  const {data} = await supabase.from("exercise_list").select();

  return data ?? [];
}
