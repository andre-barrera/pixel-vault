import data from "@/src/data/artworks.json"
import Image from "next/image";
import Link from "next/link";

interface ArtworkPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ArtworkPage({
  params,
}: ArtworkPageProps) {

  const { id } = await params;

  const artwork = data.artworks.find(
    (art) => art.id === id
  );

  if (!artwork) {
    return (
      <main className="p-6">
        <h1>Artwork not found</h1>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">
        {artwork.title}
      </h1>

    <Image
      src={`/${artwork.image}`}
      alt={artwork.title}
      width={900}
      height={600}
      className="rounded-xl mb-6"
      />

      <div className="space-y-3">
        <p>
          <strong>Artist:</strong> {artwork.artist}
        </p>

        <p>
          <strong>Style:</strong> {artwork.style}
        </p>

        <p>
          <strong>Year:</strong> {artwork.year}
        </p>
        
        <p>
          <strong>Description:</strong> 
          {" "}
          {artwork.description}
        </p>

        <div className="flex gap-2 flex-wrap">
          {artwork.tags.map((tag) => (
          <span
            key={tag}
            className="bg-gray-200 px-3 py-1 rounded-full text-sm"
          >
            {tag}
          </span>
            ))}
        </div>
      </div>
    </main>  
  );
}