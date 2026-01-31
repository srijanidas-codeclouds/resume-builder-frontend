export const useAccentStyles = (accentColor = "#2563eb") => {
  return {
    accentColor,

    /* ===== TEXT ===== */
    text: {
      color: accentColor,
    },

    mutedText: {
      color: `${accentColor}AA`, // 66% opacity
    },

    /* ===== BORDERS ===== */
    border: {
      borderColor: accentColor,
    },

    softBorder: {
      borderColor: `${accentColor}55`,
    },

    /* ===== BACKGROUNDS ===== */
    softBg: {
      backgroundColor: `${accentColor}15`,
    },

    /* ===== LINKS ===== */
    link: {
      color: accentColor,
      textDecoration: "none",
    },

    /* ===== MATERIAL ICONS ===== */
    icon: {
      color: accentColor,
      fontVariationSettings: `"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 20`,
    },

    /* ===== SECTION HEADERS ===== */
    sectionTitle: {
      color: accentColor,
      borderBottomColor: accentColor,
    },
  };
};
export default useAccentStyles;