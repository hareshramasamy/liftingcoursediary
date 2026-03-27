"use client"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeContextType = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "system",
  setTheme: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system")

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null
    if (stored === "dark" || stored === "light" || stored === "system") {
      setThemeState(stored)
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement

    const apply = (t: Theme) => {
      if (t === "dark") {
        root.classList.add("dark")
      } else if (t === "light") {
        root.classList.remove("dark")
      } else {
        root.classList.toggle("dark", window.matchMedia("(prefers-color-scheme: dark)").matches)
      }
    }

    apply(theme)

    if (theme === "system") {
      const media = window.matchMedia("(prefers-color-scheme: dark)")
      const handler = (e: MediaQueryListEvent) => root.classList.toggle("dark", e.matches)
      media.addEventListener("change", handler)
      return () => media.removeEventListener("change", handler)
    }
  }, [theme])

  const setTheme = (t: Theme) => {
    localStorage.setItem("theme", t)
    setThemeState(t)
  }

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
