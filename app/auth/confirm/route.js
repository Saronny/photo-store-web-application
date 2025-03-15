import { createServerClient } from "@supabase/ssr";
import next from "next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const token_hash = searchParams.get("token_hash");
    const type = searchParams.get("type");
    const next = searchParams.get("next");
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

    if (token_hash && type ) { 
        const { error } = await supabase.auth.verifyOtp({
            token_hash,
            type,
        })

        if(error) {
            console.log(error);
            debugger;
        }
    

        if(!error) {
            return NextResponse.redirect(next)
        }
    }

    return NextResponse.redirect(new URL("/auth/confirm", request.url));    
}