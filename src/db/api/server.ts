import type {Database} from "../types";

import {createClient} from "@supabase/supabase-js";

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!,

  // process.env.NEXT_PUBLIC_SUPABASE_KEY,
);

export default supabase;
