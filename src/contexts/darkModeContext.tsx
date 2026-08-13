"use client"

import { createContext } from "react";

export interface DarkModeContextType {
    isDark: boolean;
    toggleDarkMode: (isDark: boolean) => void;
}

export const DarkModeContext = createContext<DarkModeContextType | null>(null);