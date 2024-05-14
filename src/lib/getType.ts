import {supabase} from "@/db/api/server";

export const revalidate = 1;

export const dynamic = "force-dynamic";

export async function getType() {
  try {
    const {data: type} = await supabase.from("exercise_list").select("type");

    return type;
  } catch (error) {
    console.error("Error fetching user history workouts", error);

    return null;
  }
}
