import Image from "next/image";
import {Collection} from "@/src/types/artwork";

interface CollectionCardProps {
    collection: Collection;
}

export default function CollectionCard({
    collection,
}: CollectionCardProps) {
    return (
        <div className="overflow-hidden rounded-xl border shadow-sm hover:shadow-lg transition">
            <Image
                src={`/${collection.collection_image}`}
                alt={collection.collection_name}
                width={400}
                height={250}
                className="w-full h-52 object-cover"
            />
            <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                    {collection.collection_name}
                </h3>
                <p className="text-gray-600">
                    {collection.description}
                </p>
            </div>
        </div>
    );
}
