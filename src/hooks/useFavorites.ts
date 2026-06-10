"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/src/hooks/useAuth";
import { getFavorites, addFavorite, removeFavorite } from "@/services/favoritesService";

export function useFavorites() {
    const { user } = useAuth();

    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        async function loadFavorites() {
            if (!user) {
                setFavorites([]);
                return;
            }

            try {
                const data = await getFavorites(user.id);

                setFavorites(
                    data.map(
                        (favorite) => favorite.artwork_id
                    )
                );
            } catch (error) {
                console.error(error);
            }
        }

        loadFavorites();
    }, [user]);

    async function toggleFavorite(
        artworkId: string
    ) {
        if (!user) {
            alert(
                "Please login to save favorites."
            );
            return;
        }

        try {
            if (favorites.includes(artworkId)) {

                await removeFavorite(
                    user.id,
                    artworkId
                );

                setFavorites((prev) =>
                    prev.filter(
                        (id) => id !== artworkId
                    )
                );

            } else {

                await addFavorite(
                    user.id,
                    artworkId
                );

                setFavorites((prev) => [
                    ...prev,
                    artworkId,
                ]);
            }

        } catch (error) {
            console.error(error);
        }
    }

    return {
        favorites,
        toggleFavorite,
    };
}