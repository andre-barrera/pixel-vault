"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/src/hooks/useAuth";
import {
    getProfile,
    updateProfile,
    updateAvatar,
} from "@/services/profileService";
import { uploadAvatar } from "@/services/avatarStorageService";

export default function ProfilePage() {
    const { user } = useAuth();

    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [loading, setLoading] = useState(true);

    const [avatarUrl, setAvatarUrl] =
        useState("");

    const [avatarFile, setAvatarFile] =
        useState<File | null>(null);

    useEffect(() => {
        async function loadProfile() {
            if (!user) return;

            try {
                const profile =
                    await getProfile(user.id);

                if (profile) {
                    setUsername(
                        profile.username || ""
                    );

                    setBio(
                        profile.bio || ""
                    );

                    setAvatarUrl(
                        profile.avatar_url || ""
                    );
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        loadProfile();
    }, [user]);

    async function handleAvatarUpload() {
        if (!user || !avatarFile) {
            alert(
                "Please select an image first."
            );
            return;
        }

        try {
            const url =
                await uploadAvatar(
                    avatarFile
                );

            await updateAvatar(
                user.id,
                url
            );

            setAvatarUrl(url);

            alert(
                "Avatar updated!"
            );

        } catch (error) {
            console.error(error);

            alert(
                "Failed to upload avatar."
            );
        }
    }

    async function handleSave() {
        if (!user) return;

        try {
            await updateProfile(
                user.id,
                username,
                bio
            );

            alert(
                "Profile updated!"
            );

        } catch (error) {
            console.error(error);

            alert(
                "Failed to update profile."
            );
        }
    }

    if (!user) {
        return (
            <main className="max-w-2xl mx-auto p-6">
                <h1 className="text-3xl font-bold">
                    Please login first
                </h1>
            </main>
        );
    }

    if (loading) {
        return (
            <main className="max-w-2xl mx-auto p-6">
                Loading...
            </main>
        );
    }

    return (
        <main className="max-w-2xl mx-auto p-6">

            <h1 className="text-3xl font-bold mb-6">
                My Profile
            </h1>

            <div className="space-y-6">

                {/* Avatar Section */}

                <div className="space-y-4">

                    {avatarUrl && (
                        <img
                            src={avatarUrl}
                            alt="Avatar"
                            className="w-32 h-32 rounded-full object-cover border"
                        />
                    )}

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setAvatarFile(
                                e.target.files?.[0] ||
                                null
                            )
                        }
                        className="w-full p-3 border rounded"
                    />

                    <button
                        type="button"
                        onClick={
                            handleAvatarUpload
                        }
                        className="px-4 py-2 bg-gray-800 text-white rounded"
                    >
                        Upload Avatar
                    </button>

                </div>

                {/* Username */}

                <div>
                    <label className="block mb-2">
                        Username
                    </label>

                    <input
                        type="text"
                        value={username}
                        onChange={(e) =>
                            setUsername(
                                e.target.value
                            )
                        }
                        className="w-full p-3 border rounded"
                    />
                </div>

                {/* Bio */}

                <div>
                    <label className="block mb-2">
                        Bio
                    </label>

                    <textarea
                        value={bio}
                        onChange={(e) =>
                            setBio(
                                e.target.value
                            )
                        }
                        rows={4}
                        className="w-full p-3 border rounded"
                    />
                </div>

                <button
                    onClick={handleSave}
                    className="px-4 py-3 bg-black text-white rounded"
                >
                    Save Profile
                </button>

            </div>

        </main>
    );
}