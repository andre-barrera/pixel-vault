"use client";

import { useRequireAuth } from "@/src/hooks/useRequireAuth";

export default function Uploadpage() {
    const {loading} = useRequireAuth();

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <main className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">
                Upload Artwork
            </h1>

            <p>
                Artwork form coming soon.
            </p>
        </main>
    );
}