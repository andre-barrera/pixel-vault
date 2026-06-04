import Image from "next/image";
import {Artwork} from "@/src/types/artwork";
import Link from "next/link";

interface ArtworkCardProps {
    artwork: Artwork;
}

export default function ArtworkCard({
    artwork
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
                </div>
            </div>
        </Link>
    );
}