"use client";

import { useState } from "react";
import artworks from "@/src/data/artworks.json";
import ArtworkCard from "@/src/components/gallery/ArtworkCard";

export default function GalleryPage() {

  const [search, setSearch] = useState("");

  const filteredArtworks = artworks.artworks.filter((artwork) => {
    const query = search.toLowerCase();

    return (
      artwork.title.toLowerCase().includes(query) ||
      artwork.artist.toLowerCase().includes(query) ||
      artwork.tags.some((tag) =>
        tag.toLowerCase().includes(query)
      )
      );
    });

    
    return (
        <main className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl mb-6">Gallery</h1>

            <input
            type="text"
            placeholder="Search artworks, artists, or tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 border rounded-lg mb-6">
            </input>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArtworks.map((artwork) => (
                    <ArtworkCard
                        key={artwork.id}
                        artwork={artwork}
                    />
                ))}
            </div>
        </main>
    );
}