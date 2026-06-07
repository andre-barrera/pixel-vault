"use client";

import Image from "next/image";
import {Artwork} from "@/src/types/artwork";
import Link from "next/link";

interface ArtworkCardProps {
    artwork: Artwork;
    isFavorite?: boolean;
    onToggleFavorite?: (id: string) => void;
}

export default function ArtworkCard({
    artwork,
    isFavorite = false,
    onToggleFavorite,
}: ArtworkCardProps) {
    return (
        <Link href={`/gallery/${artwork.id}`}>
            <div className="overflow-hidden rounded-xl border shadow-sm hover:shadow-lg transition">
                <Image
                    src={ `/${artwork.image}`}
                    alt={artwork.title}
                    width={500}
                    height={300}
                    className="w-full h-60 object-cover"
                />
                <div className="p-4">
                    <h2 className="text-xl font-semibold">
                        {artwork.title}
                    </h2>

                    <p className="text-gray-500">
                        {artwork.artist}
                    </p>

                    <p className="text-sm text-gray-600 mt-2">
                        {artwork.style}
                    </p>

                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold">
                            {artwork.title}
                        </h2>

                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onToggleFavorite?.(artwork.id)
                            }}
                            className="text-2xl"
                        >
                            {isFavorite ? "❤️" : "🤍"}
                        </button>

                    </div>
                </div>
            </div>
        </Link>
    );
}