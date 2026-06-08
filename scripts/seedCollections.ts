import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import data from "../src/data/artworks.json";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function seedCollections() {
  const collections = data.collections.map(
    (collection) => ({
      collection_name:
        collection.collectionName,
      collection_image:
        collection.collectionImage,
      description:
        collection.description,
    })
  );

  const { error } = await supabase
    .from("collections")
    .insert(collections);

  if (error) {
    console.error(error);
    return;
  }

  console.log(
    "Collections inserted successfully!"
  );
}

seedCollections();