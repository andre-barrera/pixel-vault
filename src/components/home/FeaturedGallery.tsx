import data from "@/src/data/artworks.json";
import CollectionCard from "./CollectionCard";

export default function FeaturedCollections() {
    return (
        <section className="max-w 7xl mx-auto px-6 py-16">
            <h2 className="text-4xl font-bold mb-8">
                Featured Collections
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {data.collections.map((collection) => (
                    <CollectionCard
                        key={collection.collectionName}
                        collection={collection}
                    />
                ))}
            </div>
        </section>
    )
}