import { useState, useEffect } from "react";
import { useThemeStore } from "@/store/themeStore";
import { ThemeMode } from "@/enums";

interface UseThemeModeReturn {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  /** False on the first SSR render — prevents hydration mismatch */
  mounted: boolean;
}

/**
 * Encapsulates the mounted guard and document attribute sync required
 * to safely use the theme store in a Next.js client component.
 */
export function useThemeMode(): UseThemeModeReturn {
  const { theme, setTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme, mounted]);

  return { theme: theme as ThemeMode, setTheme, mounted };
}
