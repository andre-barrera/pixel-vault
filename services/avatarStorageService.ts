import { supabase } from "@/src/lib/supabase";

export async function uploadAvatar(
    file: File
) {
    const fileExt =
        file.name.split(".").pop();

    const fileName =
        `${Date.now()}.${fileExt}`;

    const { error } =
        await supabase.storage
            .from("avatars")
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
        .from("avatars")
        .getPublicUrl(
            fileName
        );

    return publicUrl;
}