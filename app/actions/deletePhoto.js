'use server';

import { revalidatePath } from "next/cache";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

function extractFilePath(src) {
    const parts = src.split("/user_uploads/");
    if (parts.length < 2) {
        throw new Error("Invalid photo path");
    }

    let filePath = parts[1];
    if (filePath.includes("?")) {
        filePath = filePath.split("?")[0];
    }

    return `user_uploads/${filePath}`;
}

export async function deletePhoto(formData) {
    const src = formData.get("photoPath");
    const filePath = extractFilePath(src);
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

    const { error } = await supabase.storage.from("photos").remove([filePath]);

    if (error) {
        return {success: false, error: error.message};
    }

    revalidatePath("/photos");
    revalidatePath("/favorites");
    
    return {success: true};
}