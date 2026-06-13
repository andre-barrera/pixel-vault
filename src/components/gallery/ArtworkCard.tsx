"use client";

import Image from "next/image";
import { Artwork } from "@/src/types/artwork";
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
      <div
        className="
          group
          overflow-hidden
          rounded-xl
          bg-slate-900
          transition-all duration-300
          hover:-translate-y-2
          hover:border-violet-500
          hover:shadow-[0_0_25px_rgba(168,85,247,0.35)]
        "
      >
        {/* Image */}
        <div className="overflow-hidden">
          <Image
            src={
              artwork.image.startsWith("http")
                ? artwork.image
                : `/${artwork.image}`
            }
            alt={artwork.title}
            width={400}
            height={300}
            className="
              w-full
              h-full
              object-cover
              transition-transform duration-500
              group-hover:scale-105
            "
          />
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title + Favorite */}
          <div className="flex items-start justify-between gap-2">
            <h2
              className="
                text-lg
                font-semibold
                text-white
                transition-colors
                group-hover:text-violet-400
              "
            >
              {artwork.title}
            </h2>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleFavorite?.(artwork.id);
              }}
              className="
                text-xl
                hover:scale-110
                transition-all duration-200
              "
            >
              {isFavorite ? "❤️" : "🤍"}
            </button>
          </div>

          {/* Artist */}
          <p className="text-sm text-slate-300 mt-1">
            {artwork.artist}
          </p>

          {/* Style */}
          <p className="text-xs uppercase tracking-wider text-slate-400 mt-1">
            {artwork.style}
          </p>

          {/* Description */}
          <p className="text-sm text-slate-300 mt-3 line-clamp-2">
            {artwork.description}
          </p>
        </div>
      </div>
    </Link>
  );
}