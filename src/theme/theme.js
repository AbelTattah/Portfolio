// Central theme definition: two modes, named accent presets, optional custom accent.
export const MODES = [
  { id: "dark", label: "Dark", icon: "las la-moon" },
  { id: "light", label: "Light", icon: "las la-sun" },
];

export const ACCENTS = [
  { name: "Green", dark: "#28e98c", light: "#0f9b5e" },
  { name: "Gold", dark: "#e4af12", light: "#a87b00" },
  { name: "Orange", dark: "#fe6f1d", light: "#c24e00" },
  { name: "Cyan", dark: "#14c5fd", light: "#0077a8" },
  { name: "Silver", dark: "#c0c0c0", light: "#6b6b6b" },
  { name: "Blue", dark: "#1338f3", light: "#1d3fbf" },
  { name: "Red", dark: "#f31313", light: "#c41e1e" },
  { name: "Pink", dark: "#ff99cc", light: "#c2528b" },
];

export const STORAGE_KEY = "abel-theme";

export const defaultTheme = () => ({ mode: "light", accentId: 0, custom: "" });

export function loadTheme() {
  const fallback = defaultTheme();
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!saved || typeof saved !== "object") return fallback;
    return {
      mode: saved.mode === "dark" ? "dark" : "light",
      accentId:
        Number.isInteger(saved.accentId) &&
        saved.accentId >= 0 &&
        saved.accentId < ACCENTS.length
          ? saved.accentId
          : fallback.accentId,
      custom: /^#[0-9a-f]{6}$/i.test(saved.custom || "") ? saved.custom : "",
    };
  } catch {
    return fallback;
  }
}

function darken(hex, factor) {
  const n = parseInt(hex.slice(1), 16);
  const channel = (shift) =>
    Math.round(((n >> shift) & 255) * factor)
      .toString(16)
      .padStart(2, "0");
  return `#${channel(16)}${channel(8)}${channel(0)}`;
}

export function accentColor(theme) {
  if (theme.custom) {
    return theme.mode === "light" ? darken(theme.custom, 0.72) : theme.custom;
  }
  return ACCENTS[theme.accentId][theme.mode];
}

export function applyTheme(theme) {
  const root = document.documentElement;
  root.dataset.theme = theme.mode;
  root.classList.toggle("light-mode", theme.mode === "light");
  root.style.setProperty("--primary_color", accentColor(theme));
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
  } catch {
    /* storage may be unavailable (private mode) */
  }
}
