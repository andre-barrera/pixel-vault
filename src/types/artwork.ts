export interface Artwork {
    id: string;
    title: string;
    artist: string;
    style: string;
    year: number;
    image: string;
    description: string;
    tags: string[];
}

export interface Collection {
    collection_name: string;
    collection_image: string;
    description: string;
    
}

