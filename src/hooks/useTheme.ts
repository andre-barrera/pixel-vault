"use  client";

import { useEffect, useState } from "react";

export function useTheme () {
    const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") {
        return "dark";
    }

    return localStorage.getItem("theme") || "dark";
    });

    useEffect (() => {
        localStorage.setItem("theme", theme);

        document.documentElement.classList.toggle("dark", theme === "dark");
        document.documentElement.classList.toggle("light", theme === "light");

    })

    const toggleTheme = () => {
        setTheme(
            theme === "dark" 
            ? "light"
            : "dark"
        );
    };

    return{
        theme,
        toggleTheme
    };
}