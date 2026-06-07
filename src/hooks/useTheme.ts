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

        document.documentElement.classList.remove(
            "light",
            "dark"
        );

        document.documentElement.classList.add(theme);
    }, [theme]);

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