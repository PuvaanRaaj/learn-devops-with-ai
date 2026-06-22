import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Public, build-time-inlined config. The anon key is safe to expose in the
// browser — row-level security in the database is what protects data.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** True only when both env vars are present; otherwise the app runs guest-only. */
export const isSupabaseEnabled = Boolean(url && anonKey);

/**
 * A single shared browser client, or null when Supabase isn't configured.
 * Persisting the session + detecting it in the URL lets OAuth / magic-link
 * redirects work on a purely static site.
 */
export const supabase: SupabaseClient | null = isSupabaseEnabled
  ? createClient(url as string, anonKey as string, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;
