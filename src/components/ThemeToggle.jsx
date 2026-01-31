import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    const isDark = document.documentElement.classList.contains("dark");
    setDarkMode(isDark);

    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700
      bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
    >
      {/* add sun icon and moon icon svg */}
      {darkMode ? (
        <span className="material-symbols-outlined p-0.5">light_mode</span>
      ) : (
        <span className="material-symbols-outlined p-0.5">dark_mode</span>
      )}
    </button>
  );
};

export default ThemeToggle;