"use client";

import Link from "next/link";
import { useTheme } from "@/src/hooks/useTheme";
import { useAuth } from "@/src/hooks/useAuth";
import { signOut } from "@/services/authService";
import { getProfile } from "@/services/profileService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const { user } = useAuth();
    const router = useRouter();

    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        async function loadProfile() {
            if (!user) {
                setProfile(null);
                return;
            }

            try {
                const data = await getProfile(user.id);
                setProfile(data);
            } catch (error) {
                console.error("Failed to load profile:", error);
            }
        }

        loadProfile();
    }, [user]);

    async function handleLogout() {
        await signOut();
        router.push("/");
    }

    return (
        <nav className="bg-[#050932]/80 backdrop-blur-lg text-white sticky top-0 z-50 ">
            <div className="w-full px-8 lg:px-12 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">

                    <button
                        onClick={toggleTheme}
                        className="
                            hover:scale-110
                            transition-transform
                            duration-200
                        "
                    >
                        {theme === "dark" ? (
                            <img
                                src="/images/moon-icon.webp"
                                alt="Light Mode"
                                className="w-12 h-12"
                            />
                        ) : (
                            <img
                                src="./images/moon-icon.webp"
                                alt="Dark Mode"
                                className="w-12 h-12"
                            />
                        )}
                    </button>

                    <Link
                        href="/"
                        className="text-xl font-bold"
                    >
                        Pixel Vault
                    </Link>

                </div>

                <div className="flex items-center gap-6">

                    <Link href="/" className=" text-m hover:text-red-400 transition-colors duration-300">
                        Home
                    </Link>

                    <Link href="/gallery" className=" text-m hover:text-red-400 transition-colors duration-300">
                        Gallery
                    </Link>

                    <Link href="/gallery/favorites" className=" text-m hover:text-red-400 transition-colors duration-300">
                        Favorites
                    </Link>

                    <Link href="/upload" className=" text-m hover:text-red-400 transition-colors duration-300">
                        Upload
                    </Link>

                    {user ? (
                        <div className="flex items-center gap-3 text-sm">

                            <Link
                                href="/profile"
                                className="flex items-center gap-2 hover:underline"
                            >

                                {profile?.avatar_url ? (
                                    <img
                                        src={profile.avatar_url}
                                        alt="Avatar"
                                        className="w-8 h-8 rounded-full object-cover border"
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-xs">
                                        {(profile?.username || user.email || "?")
                                            .charAt(0)
                                            .toUpperCase()}
                                    </div>
                                )}

                                <span className="text-sm">
                                    {profile?.username || user.email}
                                </span>

                            </Link>

                            <button
                                onClick={handleLogout}
                                className="px-3 py-2 border rounded-lg"
                            >
                                Logout
                            </button>

                        </div>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="px-4 py-2 border rounded-lg"
                            >
                                Login
                            </Link>

                            <Link
                                href="/signUp"
                                className="px-4 py-2 border rounded-lg"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}

                </div>
            </div>
        </nav>
    );
}