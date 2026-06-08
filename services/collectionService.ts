import { supabase } from "@/src/lib/supabase";

export async function getCollections() {
  const { data, error } = await supabase
    .from("collections")
    .select("*");

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}