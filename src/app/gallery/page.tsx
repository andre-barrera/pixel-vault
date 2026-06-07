"use client";

import { useState } from "react";
import artworks from "@/src/data/artworks.json";
import ArtworkCard from "@/src/components/gallery/ArtworkCard";
import { useFavorites } from "@/src/hooks/useFavorites";

export default function GalleryPage() {

  const [search, setSearch] = useState("");
  const [style, setStyle] = useState("All");
  const [sortBy, setSortBy] = useState("title-asc");
  const [currentPage, setCurrentPage] = useState(1);
  const artworksPerPage = 6;

  const { favorites, toggleFavorite } = useFavorites();

  const styles = [
    "All",
    ...new Set(
        artworks.artworks.map(
            (artwork) => artwork.style
        )
    ),
  ];

  const filteredArtworks = artworks.artworks.filter((artwork) => {
    const query = search.toLowerCase();

    const matchesSearch = 
      artwork.title.toLowerCase().includes(query) ||
      artwork.artist.toLowerCase().includes(query) ||
      artwork.tags.some((tag) =>
        tag.toLowerCase().includes(query)
    );

     const matchesStyle =
      style === "All" ||
      artwork.style === style;

    return (
      matchesSearch &&
      matchesStyle
    );
    });

    const sortedArtworks = [...filteredArtworks].sort((a, b) => {

        switch (sortBy) {

            case "title-asc":
            return a.title.localeCompare(b.title);

            case "title-desc":
            return b.title.localeCompare(a.title);

            case "year-newest":
            return b.year - a.year;

            case "year-oldest":
            return a.year - b.year;

            default:
            return 0;
        }
    });

    {/* Pagination */}
    const totalPages = Math.ceil(
        sortedArtworks.length / artworksPerPage
    );

    const startIndex = (currentPage - 1) * artworksPerPage;

    const endIndex = startIndex + artworksPerPage

    const paginatedArtworks = sortedArtworks.slice(startIndex, endIndex)

    const pageNumbers = Array.from (
        { length: totalPages},
        (_, index) => index + 1 );



    return (
        <main className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl mb-6">Gallery</h1>

            <div className="flex flex-col md:flex-row gap-4 mb-6">

            <input
                type="text"
                placeholder="Search artworks..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                }}
                className="flex-1 p-3 border rounded-lg"
            />

            <select
                value={style}
                onChange={(e) => {
                    setStyle(e.target.value);
                    setCurrentPage(1);
                }}
                className="p-3 border rounded-lg"
            >
                {styles.map((styleOption) => (
                <option
                    key={styleOption}
                    value={styleOption}
                >
                    {styleOption}
                </option>
                ))}
            </select>

            <select
                value={sortBy}
                onChange={(e) => {
                    setStyle(e.target.value);
                    setCurrentPage(1);
                }}
                className="p-3 border rounded-lg"
            >
                <option value="title-asc">
                Title (A-Z)
                </option>

                <option value="title-desc">
                Title (Z-A)
                </option>

                <option value="year-newest">
                Newest First
                </option>

                <option value="year-oldest">
                Oldest First
                </option>
            </select>

            </div>
                
            <p className="mb-4 text-gray-600">
                Showing {filteredArtworks.length} artwork(s)
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedArtworks.map((artwork) => (
                    <ArtworkCard
                        key={artwork.id}
                        artwork={artwork}
                        isFavorite={favorites.includes(artwork.id
                        )}
                        onToggleFavorite={toggleFavorite}
                    />
                ))}
            </div>

            {/* Pagination */}    

            <div className="flex justify-center items-center gap-2 mt-8">

                <button
                    onClick={() =>
                    setCurrentPage((prev) =>
                        Math.max(prev - 1, 1)
                    )
                    }
                    disabled={currentPage === 1}
                    className="px-4 py-2 border rounded disabled:opacity-50"
                >
                    Previous
                </button>

                {pageNumbers.map((page) => (
                    <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded border ${
                        currentPage === page
                        ? "bg-black text-white"
                        : "bg-white"
                    }`}
                    >
                    {page}
                    </button>
                ))}

                <button
                    onClick={() =>
                    setCurrentPage((prev) =>
                        Math.min(prev + 1, totalPages)
                    )
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border rounded disabled:opacity-50"
                >
                    Next
                </button>

                </div>

                <span className="px-4 py-2 flex justify-center">
                   Page {currentPage} of {totalPages}
                </span>
        </main>
    );
}