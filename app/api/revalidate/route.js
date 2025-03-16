import { createServerClient } from "@supabase/ssr";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function POST(request) {
    try {
        const body = await request.json();
        const path = body.path;
        const cookieStore = await cookies();


        const supabase = createServerClient(
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

          const { data: { user } } = await supabase.auth.getUser();

            if(!user) {
                return new Response(JSON.stringify({ message: "Unauthorized" }), 
                { status: 401, 
                   headers: { "Content-Type": "application/json" }
                });
            }

            if(path) {
                revalidatePath(path);
                return new Response(JSON.stringify({ message: `Revalidated ${path}` }), 
                { status: 200, 
                   headers: { "Content-Type": "application/json" }
                });
            } else {
                return new Response(JSON.stringify({ message: "No path provided" }), 
                { status: 400, 
                   headers: { "Content-Type": "application/json" }
                });
            }
          
    } 
    catch (error) {
        return new Response(JSON.stringify({ message: error.message }), 
        { status: 500, 
           headers: { "Content-Type": "application/json" }
        });
    }
} 