"use client";

import { useEffect, useState } from "react";

export function useFavorites () {
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        const savedFavorites = localStorage.getItem("favorites");

        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
    }, []);

    const toggleFavorite = (artworkId: string) => {
        let updatedFavorites: string [];

        if (favorites.includes(artworkId)) {
            updatedFavorites = favorites.filter((id) =>
            id !== artworkId);
        } 
        
        else {
            updatedFavorites = [...favorites, artworkId];
        }

        setFavorites(updatedFavorites);

        localStorage.setItem(
            "favorites", 
            JSON.stringify(updatedFavorites)
        );
    };

    return {
        favorites,
        toggleFavorite
    }
}