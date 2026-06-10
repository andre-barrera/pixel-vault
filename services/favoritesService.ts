import { supabase } from "@/src/lib/supabase";

export async function getFavorites(userId: string) {
    const { data, error } = await supabase
        .from("favorites")
        .select("artwork_id")
        .eq("user_id", userId);

    if (error) {
        throw error;
    }

    return data;
}

export async function addFavorite(
    userId: string,
    artworkId: string
) {
    const { error } = await supabase
        .from("favorites")
        .insert({
            user_id: userId,
            artwork_id: artworkId,
        });

    if (error) {
        throw error;
    }
}

export async function removeFavorite(
    userId: string,
    artworkId: string
) {
    const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", userId)
        .eq("artwork_id", artworkId);

    if (error) {
        throw error;
    }
}