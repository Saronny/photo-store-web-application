'use server';

import { createServerClient } from "@supabase/ssr";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function addOrRemoveFavorite(formData) {
    const photoName = formData.get("photoName");
    const isFavorited = formData.get("isFavorited") === "true";
    const cookiesStore = await cookies();
    
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                getAll: () => cookiesStore.getAll(),
                setAll: (cookiesToSet) => {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookiesStore.set(name, value, options)
                        );
                    } catch {
                        // Ignore if called in a Server Component where setting cookies is not allowed
                    }
                },
            },
        }
    );

    const { data:{user}} = await supabase.auth.getUser();

    if (!user) return { success: false, error: "User not authenticated" };
    
    if (isFavorited) {
        const { error } = await supabase
            .from("favorites")
            .delete()
            .match({ user_id: user.id, photo_name: photoName });
        
        if (error) {
            return { success: false, error: error.message };
        }
    } else {
        const { error } = await supabase
            .from("favorites")
            .insert([{ user_id: user.id, photo_name: photoName }]);
        
        if (error) {
            return { success: false, error: error.message };
        }
    }

    revalidatePath("/photos");
    revalidatePath("/favorites");
    
    return { success: true };
}