import { motion } from "motion/react";
import type { MouseEvent } from "react";
import { useTheme } from "../hooks/useTheme";
import { useSound } from "../hooks/useSound";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { play } = useSound();
  const isAurora = theme === "aurora";

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    play("click");
    toggleTheme({ x: event.clientX, y: event.clientY });
  };

  return (
    <button
      type="button"
      aria-pressed={isAurora}
      aria-label={`Switch to ${isAurora ? "Mono" : "Aurora"} theme`}
      onClick={handleClick}
      className="relative h-8 w-[76px] shrink-0 rounded-pill border p-1"
      style={{ borderColor: "var(--border-strong)", backgroundColor: "var(--bg-elevated)" }}
    >
      <motion.span
        className="absolute top-1 h-6 w-9 rounded-pill"
        style={{ backgroundColor: "var(--accent)" }}
        animate={{ left: isAurora ? "calc(100% - 40px)" : "4px" }}
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
      />
      <span
        className="relative z-10 flex h-full items-center justify-between px-2 font-label text-[10px] font-medium uppercase tracking-[0.08em]"
        style={{ color: "var(--fg)" }}
      >
        <span style={{ opacity: isAurora ? 0.45 : 1 }}>M</span>
        <span style={{ opacity: isAurora ? 1 : 0.45 }}>A</span>
      </span>
    </button>
  );
}
