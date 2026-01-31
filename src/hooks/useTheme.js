import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState(
    localStorage.theme || "light"
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(theme);

    localStorage.theme = theme;
  }, [theme]);

  return { theme, setTheme };
}
