"use client";

import artworks from "@/src/data/artworks.json"
import ArtworkCard from "@/src/components/gallery/ArtworkCard";
import { useFavorites } from "@/src/hooks/useFavorites";

export default function FavoritesPage() {

    const { favorites, toggleFavorite, } = useFavorites();
    
    const favoriteArtworks =
        artworks.artworks.filter((artwork) =>
            favorites.includes(artwork.id)
        );

    return (
        <main className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">
                My Favorites
            </h1>

            {favoriteArtworks.length === 0 ? (
                <p>
                    You haven't added any favorites yet.
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        favoriteArtworks.map((artwork) => (
                            <ArtworkCard
                                key={artwork.id}
                                artwork={artwork}
                                isFavorite={true}
                                onToggleFavorite={toggleFavorite}
                            />
                        ))
                    }
                </div>
            )}
        </main>
    )
}
