import type {TypedSupabaseClient} from "@/utils/types";

import {supabase} from "@/db/api/server";

export const revalidate = 1;

export const dynamic = "force-dynamic";

export async function getReusableTemplates(user_id: string) {
  const {data, error} = await supabase
    .from("reusables_templates")
    .select("*, reusable_exercise(*)")
    .filter("user_id", "eq", user_id)
    .order("created_at", {ascending: false});

  return data;
}
