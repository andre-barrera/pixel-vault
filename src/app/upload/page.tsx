"use client";

import { useState } from "react";
import { useAuth } from "@/src/hooks/useAuth";
import { createArtwork } from "@/services/submissionService";
import { uploadArtworkImage } from "@/services/storageService";
import { getProfile } from "@/services/profileService";

export default function UploadPage() {
    const { user } = useAuth();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [style, setStyle] = useState("");

    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState("");

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        if (!user) {
            alert("Please login first.");
            return;
        }

        if (!file) {
            alert("Please select an image.");
            return;
        }

        try {
            // Upload image to Supabase Storage
            const imageUrl =
                await uploadArtworkImage(file);

            // Get user's profile
            const profile =
                await getProfile(user.id);

            const artist =
                profile?.username ||
                user.email ||
                "Anonymous";

            // Insert directly into artworks table
            await createArtwork(
                title,
                artist,
                style,
                imageUrl,
                description
            );

            alert("Artwork uploaded successfully!");

            // Reset form
            setTitle("");
            setDescription("");
            setStyle("");
            setFile(null);
            setPreviewUrl("");

        } catch (error) {
            console.error(error);
            alert("Failed to upload artwork.");
        }
    }

    return (
        <main className="max-w-2xl mx-auto p-6">

            <h1 className="text-3xl font-bold mb-6">
                Submit Artwork
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >

                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                    className="w-full p-3 border rounded"
                    required
                />

                <input
                    type="text"
                    placeholder="Style"
                    value={style}
                    onChange={(e) =>
                        setStyle(e.target.value)
                    }
                    className="w-full p-3 border rounded"
                    required
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const selected =
                            e.target.files?.[0];

                        if (!selected) return;

                        setFile(selected);

                        setPreviewUrl(
                            URL.createObjectURL(
                                selected
                            )
                        );
                    }}
                    className="w-full p-3 border rounded"
                    required
                />

                {previewUrl && (
                    <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full rounded-lg border"
                    />
                )}

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) =>
                        setDescription(
                            e.target.value
                        )
                    }
                    rows={5}
                    className="w-full p-3 border rounded"
                />

                <button
                    type="submit"
                    className="px-4 py-3 bg-black text-white rounded"
                >
                    Submit Artwork
                </button>

            </form>

        </main>
    );
}