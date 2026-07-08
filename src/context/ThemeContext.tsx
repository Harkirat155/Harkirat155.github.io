import { createContext, useCallback, useState, type ReactNode } from "react";

export type Theme = "mono" | "aurora";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: (origin?: { x: number; y: number }) => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

function readInitialTheme(): Theme {
  if (typeof document === "undefined") return "aurora";
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "mono" ? "mono" : "aurora";
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme === "aurora" ? "dark" : "light";
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // storage may be unavailable (private mode, blocked cookies) — theme still
    // applies for this session via the DOM attribute, it just won't persist.
  }
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readInitialTheme);

  const toggleTheme = useCallback(
    (origin?: { x: number; y: number }) => {
      const next: Theme = theme === "mono" ? "aurora" : "mono";

      const commit = () => {
        applyTheme(next);
        setThemeState(next);
      };

      const supportsViewTransition =
        typeof document.startViewTransition === "function";

      if (!supportsViewTransition || prefersReducedMotion()) {
        commit();
        return;
      }

      const x = origin?.x ?? window.innerWidth / 2;
      const y = origin?.y ?? window.innerHeight / 2;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      );

      const transition = document.startViewTransition(commit);
      void transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 700,
            easing: "cubic-bezier(0.65, 0, 0.35, 1)",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      });
    },
    [theme],
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
