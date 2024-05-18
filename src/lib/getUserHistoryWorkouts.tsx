import {auth} from "@clerk/nextjs";

import {supabase} from "@/db/api/server";

export const revalidate = 1;

export const dynamic = "force-dynamic";

export async function getUsersHistoryWorkouts() {
  const {userId} = auth();

  if (!userId) return null;
  try {
    const {data: template} = await supabase
      .from("template")
      .select("*, exercise(*, sets(*))")
      .eq("user_id", userId ? userId : "")
      .order("created_at", {ascending: false});

    if (template) {
      template.forEach((t) => {
        t.exercise.sort((a, b) => Number(a.order) - Number(b.order));
        t.exercise.forEach((e) => {
          e.sets.sort((a, b) => a.set - b.set);
        });
      });
    }

    return template;
  } catch (error) {
    console.error("Error fetching user history workouts", error);

    return null;
  }
}
