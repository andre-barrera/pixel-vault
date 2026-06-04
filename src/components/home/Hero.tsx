import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="max-w-7xl mx-auto px-6 py-20">
            <div className="grid md:grid-cols-2 gap-10 items-center">
                <div>
                    <h1 className="text-lg text-gray-600 mb-8">
                        Discover Pixel Art
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Explore galleries, tutorials, and resources for pixel artists.
                    </p>
                    <div>
                        <Link
                            href="/gallery"
                            className="bg-black text-white px-6 py-3 rounded-lg">
                            Explore Gallery
                        </Link>
                        <Link
                            href="/tutorials"
                            className="border px-6 py-3 rounded-lg">
                            Browse Tutorials
                        </Link>
                    </div>
                    <div>
                        <Image
                            src="/images/hero-night.png"
                            alt="Pixel Art Showcase"
                            width={1500}
                            height={750}               
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}