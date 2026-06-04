import data from "@/src/data/artworks.json";
import ArtworkCard from "@/src/components/gallery/ArtworkCard";


export default function PopularArtworks() {

    const featuredArtworks = data.artworks.slice(0, 6);

    return (
        <section className="max-w-7xl mx-auto px-6 py-16">
            <h2 className="text-4xl font-bold mb-8">
                Popular Artworks
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap8">
                {featuredArtworks.map((artwork) => (
                    <ArtworkCard
                        key={artwork.id}
                        artwork={artwork}
                    />
                ))}
            </div>
        </section>
    )
}