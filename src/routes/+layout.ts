// export const prerender = false;

// src/routes/+layout.ts
import {
  PUBLIC_SUPABASE_ANON_KEY,
  PUBLIC_SUPABASE_URL,
} from "$env/static/public";
import { createSupabaseLoadClient } from "@supabase/auth-helpers-sveltekit";
import type { LayoutLoad } from "./$types";
import type { Database } from './../DatabaseDefinitions';
import { redirect } from "@sveltejs/kit";


export const load: LayoutLoad = async ({ url, fetch, data, depends }) => {
  depends("supabase:auth");

  const supabase = createSupabaseLoadClient<Database>({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    event: { fetch },
    serverSession: data.session,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    const path = url.pathname;
    if (!path.includes('/authentication')) throw redirect(302, '/authentication');
    else return { data, supabase, session: undefined };
  }

  return { data, supabase, session };
};