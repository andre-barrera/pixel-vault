"use client";

import Link from "next/link";
import { useTheme } from "@/src/hooks/useTheme";
import { useAuth } from "@/src/hooks/useAuth";
import { signOut } from "@/services/authService";
import { useRouter } from "next/navigation";


export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const { user } = useAuth();
    const router = useRouter();

    async function handleLogout() {
    await signOut();
    router.push("/");
}

    return (
        <nav className="border-b bg-black text-white">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <Link
                    href="/"
                    className="text-2xl font-bold"
                >
                    Pixel Vault
                </Link>

                <div className="flex gap-6">
                    <Link href="/">Home</Link>
                    <Link href="/gallery">Gallery</Link>
                    <Link href="/gallery/favorites">Favorites</Link>
                    <Link href="/tutorials">Tutorials</Link>
                    <Link href="/community">Community</Link>
                    <Link href="/upload">Upload</Link>

                    <button
                        onClick={toggleTheme}
                        className="px-3 py-2 border rounded-lg"
                    >
                        {theme === "dark"
                            ? "☀️ Light"
                            : "🌙 Dark"
                        }   
                    </button>

                    {user ? (
                        <div className="flex items-center gap-3">
                            <span className="text-sm">
                                {user.email}
                            </span>

                            <button
                                onClick={handleLogout}
                                className="px-3 py-2 border rounded-lg"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="bg-black text-white px-4 py-2 rounded-lg"
                        >
                            Login
                        </Link>
                    )}
                    
                    <Link
                        href="/signUp"
                        className="bg-black text-white px-4 py-2 rounded-lg">
                        Sign Up
                    </Link>
                </div>
            </div>
        </nav>
    );
}