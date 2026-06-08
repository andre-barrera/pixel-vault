import { supabase } from "../src/lib/supabase";
import { Artwork } from "@/src/types/artwork";

export async function getArtworks(): Promise<Artwork[]> {
  const { data, error } = await supabase
    .from("artworks")
    .select("*");

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];

}

export async function getArtworkById(
  id: string
): Promise<Artwork | null> {
  const { data, error } = await supabase
    .from("artworks")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}