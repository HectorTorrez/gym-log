import {supabase} from "@/db/api/server";

export const revalidate = 1;

export const dynamic = "force-dynamic";

export async function getCategory() {
  try {
    const {data: category} = await supabase.from("exercise_list").select("category");

    return category;
  } catch (error) {
    console.error("Error fetching user history workouts", error);

    return null;
  }
}
