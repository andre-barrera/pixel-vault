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

  const relatedArtorks = data.artworks.filter(
    (art) =>
      art.id !== artwork?.id && art.style === artwork?.style).slice(0,3);


  return (
    <main className="max-w-5xl mx-auto p-6">

      <Link 
        href="/gallery"
        className="inline-block mb-6 text-blue-600 hover:underline">
          Back to Gallery
        </Link>
      
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

      {/*related artworks section */}
      
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">
          Related Artwoks
        </h2>

      <div className="grid grid-cols-1 md:grid-cols3 gap6">
        {relatedArtorks.map((related) => (
          <Link
            key={related.id}
            href={`/gallery/${related.id}`}
          >
            <div className="border rounded-lg p-4 hover:shadow-lg transition">
              <h3 className="font.semibold">
                {related.title}
              </h3>
              <p className="text-gray-500">
                {related.artist}
              </p>
            </div>
          </Link>
        ))}
      </div>
      </section>
    </main>  
  );
}