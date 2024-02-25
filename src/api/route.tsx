import {supabase} from "@/db/api/server";

export const fetchCache = "force-no-store";

export const revalidate = 0;

export const dynamic = "force-dynamic";

export async function getExercises() {
  const {data} = await supabase
    .from("exercise_list")
    .select()
    .order("created_at", {ascending: false});

  return data ?? [];
}
