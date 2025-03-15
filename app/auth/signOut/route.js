import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
    const cookieStore = await cookies();

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookies) {
                    cookies.forEach(cookie => {
                        cookieStore.set(cookie);
                    });
                }
            }
        }
    )

    const { data: {session}} = await supabase.auth.getSession();

    if(session) {
        await supabase.auth.signOut();
    }

    return NextResponse.redirect(new URL("/", req.url), {
        status: 302,
    });
}