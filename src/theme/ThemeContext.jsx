import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  ACCENTS,
  applyTheme,
  defaultTheme,
  loadTheme,
} from "./theme.js";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(loadTheme);

  useEffect(() => applyTheme(theme), [theme]);

  const value = useMemo(
    () => ({
      ...theme,
      accent: ACCENTS[theme.accentId],
      setMode: (mode) => setTheme((t) => ({ ...t, mode })),
      toggleMode: () =>
        setTheme((t) => ({ ...t, mode: t.mode === "dark" ? "light" : "dark" })),
      setAccent: (accentId) => setTheme((t) => ({ ...t, accentId, custom: "" })),
      setCustomColor: (custom) => setTheme((t) => ({ ...t, custom })),
      reset: () => setTheme(defaultTheme()),
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}
