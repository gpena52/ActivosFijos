"use client"

import { useEffect, useState } from "react";
import { DarkModeContext, DarkModeContextType } from "../contexts/darkModeContext";

type DarkModeProviderProps = {
    children: React.ReactNode;
};

export function DarkModeProvider({ children }: DarkModeProviderProps) {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("darkMode");

        if (savedTheme) {
            toggleDarkMode(savedTheme === "true");
        } else {
            const media = window.matchMedia('(prefers-color-scheme: dark)');

            toggleDarkMode(media.matches);

            const listener = (event: MediaQueryListEvent) => {
                toggleDarkMode(event.matches);
            };

            media.addEventListener('change', listener);

            return () => {
                media.removeEventListener('change', listener);
            }
        }
    }, []);

    const toggleDarkMode = (value: boolean) => {
        localStorage.setItem("darkMode", value.toString());
        setIsDark(value);
    }

    return (
        <DarkModeContext.Provider value={{ isDark, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
}