import CollectionCard from "./CollectionCard";
import { getCollections } from "@/services/collectionService";

export default async function FeaturedCollections() {

  const collections =
    await getCollections();

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold mb-8">
        Featured Collections
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {collections.map((collection) => (
          <CollectionCard
            key={collection.id}
            collection={collection}
          />
        ))}
      </div>
    </section>
  );
}