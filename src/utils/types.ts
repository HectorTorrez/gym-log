import type {Database} from "@/db/types";
import type {SupabaseClient} from "@supabase/supabase-js";

export type TypedSupabaseClient = SupabaseClient<Database>;
