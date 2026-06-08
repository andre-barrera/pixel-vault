import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import artworksData from "../src/data/artworks.json";

console.log(
  "URL:",
  process.env.NEXT_PUBLIC_SUPABASE_URL
);

console.log(
  "SERVICE:",
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function seed() {
  const artworks = artworksData.artworks.map(
    (artwork) => ({
      id: artwork.id,
      title: artwork.title,
      artist: artwork.artist,
      style: artwork.style,
      year: artwork.year,
      image: artwork.image,
      description: artwork.description,
    })
  );

  const { error } = await supabase
    .from("artworks")
    .insert(artworks);

  if (error) {
    console.error("Insert Error:", error);
    return;
  }

  console.log(
    "Artworks inserted successfully!"
  );
}

seed();