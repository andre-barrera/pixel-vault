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
    collectionName: string;
    collectionImage: string;
    description: string;
    
}

