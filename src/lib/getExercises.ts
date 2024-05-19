import supabase from "@/db/api/server";

export const revalidate = 1;

export const dynamic = "force-dynamic";

export async function getExercises(id: string) {
  if (!id) return null;
  try {
    const {data: userExercises} = await supabase
      .from("exercise_list")
      .select("*")
      .eq("user_id", id);
    const {data: nullExercises} = await supabase
      .from("exercise_list")
      .select("*")
      .is("user_id", null);

    const exercises = [...(userExercises || []), ...(nullExercises || [])];

    return exercises;
  } catch (error) {
    console.error("Error fetching user history workouts", error);

    return null;
  }
}
