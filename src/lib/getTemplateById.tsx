import {auth} from "@clerk/nextjs";

import {supabase} from "@/db/api/server";

export const revalidate = 1;

export const dynamic = "force-dynamic";

export async function getTemplateById(id: string) {
  if (!id) return null;
  try {
    const {data: template} = await supabase
      .from("template")
      .select("*, exercise(*, sets(*))")
      .eq("id", id ? id : "");

    return template;
  } catch (error) {
    console.error("Error fetching user history workouts", error);

    return null;
  }
}
