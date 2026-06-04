import Hero from "@/src/components/home/Hero";
import FeaturedCollections from "@/src/components/home/FeaturedGallery"
import PopularArtworks from "../components/home/PopularArtworks";

export default function Homepage() {
  return (
    <>
      <Hero />
      <FeaturedCollections />
      <PopularArtworks />
    </>
  )
}
