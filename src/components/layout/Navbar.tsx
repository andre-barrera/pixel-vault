"use client";

import Link from "next/link";
import { useTheme } from "@/src/context/ThemeProvider";
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
    <nav
      className={`
        sticky top-0 z-50
        ${theme === "dark"
          ? "bg-[#050932]/80"
          : "bg-[#74beea]/80"
        }
        text-gray-900 dark:text-white
      `}
    >
      <div className="w-full px-8 lg:px-12 py-4 flex justify-between items-center">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-3">

          {/* THEME BUTTON */}
          <button
            onClick={toggleTheme}
            className="hover:scale-110 transition-transform duration-200"
          >
            {theme === "dark" ? (
              <img
                src="/images/moon-icon.webp"
                alt="Dark Mode"
                className="w-12 h-12"
              />
            ) : (
              <img
                src="/images/sun-icon.webp"
                alt="Light Mode"
                className="w-12 h-12"
              />
            )}
          </button>

          {/* LOGO */}
          <Link href="/" className="text-xl font-bold">
            Pixel Vault
          </Link>
        </div>

        {/* CENTER / LINKS */}
        <div className="flex items-center gap-6 text-sm">

          <Link className="hover:text-red-400 transition-colors" href="/">
            Home
          </Link>

          <Link className="hover:text-red-400 transition-colors" href="/gallery">
            Gallery
          </Link>

          <Link className="hover:text-red-400 transition-colors" href="/gallery/favorites">
            Favorites
          </Link>

          <Link className="hover:text-red-400 transition-colors" href="/upload">
            Upload
          </Link>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-6">

          {user ? (
            <div className="flex items-center gap-3 text-sm">

              <Link href="/profile" className="flex items-center gap-2 hover:underline">

                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full object-cover border"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-xs">
                    {(profile?.username || user.email || "?")
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                )}

                <span>
                  {profile?.username || user.email}
                </span>

              </Link>

              <button
                onClick={handleLogout}
                className="px-3 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition"
              >
                Logout
              </button>

            </div>
          ) : (
            <div className="flex items-center gap-3">

              <Link
                href="/login"
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition"
              >
                Login
              </Link>

              <Link
                href="/signUp"
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition"
              >
                Sign Up
              </Link>

            </div>
          )}

        </div>

      </div>
    </nav>
  );
}