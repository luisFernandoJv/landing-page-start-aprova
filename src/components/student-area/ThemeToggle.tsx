import { Moon, Sun } from "lucide-react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "start-aprovacao-area-theme";

/** Lê a preferência salva; se não houver, respeita prefers-color-scheme. */
export function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function persistTheme(theme: Theme) {
  window.localStorage.setItem(STORAGE_KEY, theme);
}

export function ThemeToggle({
  theme,
  onChange,
}: {
  theme: Theme;
  onChange: (theme: Theme) => void;
}) {
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      className="sa-theme-toggle"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
      title={isDark ? "Tema claro" : "Tema escuro"}
      onClick={() => onChange(isDark ? "light" : "dark")}
    >
      <span className="sa-theme-toggle-track" aria-hidden="true">
        <Sun className="sa-theme-icon sa-theme-icon-sun" />
        <Moon className="sa-theme-icon sa-theme-icon-moon" />
        <span className="sa-theme-toggle-thumb" />
      </span>
    </button>
  );
}
