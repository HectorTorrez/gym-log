import {supabase} from "@/db/api/server";

export const revalidate = 1;

export const dynamic = "force-dynamic";

export async function getExercises(id: string) {
  if (!id) return null;
  try {
    let {data: exercises} = await supabase.from("exercise_list").select("*").eq("user_id", id);

    if (!exercises?.length) {
      const {data: nullExercises} = await supabase
        .from("exercise_list")
        .select("*")
        .is("user_id", null);

      exercises = nullExercises;
    }

    return exercises;
  } catch (error) {
    console.error("Error fetching user history workouts", error);

    return null;
  }
}
