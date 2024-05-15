import type {Database} from "../types";

import {createClient} from "@supabase/supabase-js";

// export const supabaseClient = async (supabaseAccessToken: string) => {
//   const supabase = createClient<Database>(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_KEY!,
//     {global: {headers: {Authorization: `Bearer ${supabaseAccessToken}`}}},
//   );

//   return supabase;
// };

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!,
);

console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log(process.env.SUPABASE_SERVICE_ROLE);
