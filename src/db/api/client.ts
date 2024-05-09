"use client";
import type {Database} from "../types";

import {createClient} from "@supabase/supabase-js";
declare global {
  interface Window {
    Clerk: any;
  }
}

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!,
  {
    global: {
      // Get the Supabase token with a custom fetch method
      fetch: async (url, options = {}) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        const clerkToken = await window.Clerk.session?.getToken({
          template: "supabase",
        });

        // Construct fetch headers
        const headers = new Headers(options.headers);

        headers.set("Authorization", `Bearer ${clerkToken}`);

        // Now call the default fetch
        return fetch(url, {
          ...options,
          headers,
        });
      },
    },
  },
);

export default supabase;
