import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full h-[700px]">

      <Image
        src="/images/hero-night.png"
        alt="Pixel Art Showcase"
        width={1920}
        height={1080}
        priority
        className="w-full h-auto"
        loading="eager"
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-6">

          <h1 className="text-4xl md:text-6xl mb-6">
            PIXEL VAULT
          </h1>

          <p className="text-lg md:text-xl mb-8 max-w-2xl">
            Discover, upload and share amazing pixel art creations.
          </p>

          <div className="flex flex-wrap justify-center gap-4">

            <Link
              href="/gallery"
              className="bg-violet-600 hover:bg-violet-700 px-6 py-3 rounded-lg"
            >
              Explore Gallery
            </Link>

            <Link
              href="/tutorials"
              className="border border-white px-6 py-3 rounded-lg"
            >
              Tutorials
            </Link>

          </div>

        </div>
      </div>

    </section>
  );
}