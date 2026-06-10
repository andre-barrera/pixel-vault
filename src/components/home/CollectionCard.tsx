import Image from "next/image";
import { Collection } from "@/src/types/artwork";

interface CollectionCardProps {
    collection: Collection;
}

export default function CollectionCard({
    collection,
}: CollectionCardProps) {
    return (
        <div
            className="
                overflow-hidden
                rounded-xl
                shadow-lg
                hover:shadow-2xl
                transition-all
                duration-300
                hover:-translate-y-2
            "
        >
            <Image
                src={`/${collection.collection_image}`}
                alt={collection.collection_name}
                width={400}
                height={250}
                className="
                    w-full
                    h-56
                    object-cover
                "
            />

            <div className="p-5">
                <h3 className="text-xl mb-2 font-semibold">
                    {collection.collection_name}
                </h3>

                <p className="text-gray-500">
                    {collection.description}
                </p>
            </div>
        </div>
    );
}