import { getArtworks } from "@/services/artworks";
import ArtworkCard from "@/src/components/gallery/ArtworkCard";

export default async function PopularArtworks() {

    const artwork = await getArtworks();

    const featuredArtworks =
        artwork.slice(0, 8);

    return (
        <section className="max-w-7xl mx-auto px-8 py-24">

            <h2 className="text-5xl text-center mb-12">
                Popular Artworks
            </h2>

            <div
                className="
                    grid
                    grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    gap-8
                "
            >
                {featuredArtworks.map((artwork) => (
                    <ArtworkCard
                        key={artwork.id}
                        artwork={artwork}
                    />
                ))}
            </div>

        </section>
    );
}