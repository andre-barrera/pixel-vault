import { supabase } from "@/src/lib/supabase";

export async function uploadArtworkImage(
    file: File
) {
    const fileExt =
        file.name.split(".").pop();

    const fileName =
        `${Date.now()}.${fileExt}`;

    const { error } =
        await supabase.storage
            .from("artworks")
            .upload(
                fileName,
                file
            );

    if (error) {
        throw error;
    }

    const {
        data: { publicUrl },
    } = supabase.storage
        .from("artworks")
        .getPublicUrl(
            fileName
        );

    return publicUrl;
}