"use client"

import { useState } from "react";
import { DarkModeContext, DarkModeContextType } from "../contexts/darkModeContext";

type DarkModeProviderProps = {
    children: React.ReactNode;
};

export function DarkModeProvider({ children }: DarkModeProviderProps) {
    const [isDark, setIsDark] = useState(false);

    return (
        <DarkModeContext.Provider value={{ isDark, toggleDarkMode: setIsDark }}>
            {children}
        </DarkModeContext.Provider>
    );
}