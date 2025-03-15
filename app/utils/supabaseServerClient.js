import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export default async function createSupabaseServerClient() {
  const cookieStore = await cookies(); // Get request-specific cookies
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => cookieStore.getAll(), // Read cookies from the request
        setAll: (cookiesToSet) => {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Ignore if called in a Server Component where setting cookies is not allowed
          }
        },
      },
    }
  );
}
