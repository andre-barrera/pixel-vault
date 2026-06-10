import { supabase } from "@/src/lib/supabase";

export async function createArtwork(
    title: string,
    artist: string,
    style: string,
    image: string,
    description: string
) {
    const { error } = await supabase
        .from("artworks")
        .insert({
            id: crypto.randomUUID(),
            title,
            artist,
            style,
            image,
            description,
            year: new Date().getFullYear(),
        });

    if (error) {
        throw error;
    }
}