import type { Transition, Variants } from "motion/react";
import type { Theme } from "../context/ThemeContext";

export function themeTransition(theme: Theme): Transition {
  return theme === "aurora"
    ? { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }
    : { duration: 0.5, ease: [0.22, 1, 0.36, 1] };
}

export function fadeUpVariants(theme: Theme): Variants {
  const y = theme === "aurora" ? 28 : 10;
  return {
    hidden: { opacity: 0, y },
    visible: { opacity: 1, y: 0, transition: themeTransition(theme) },
  };
}

export function staggerContainer(theme: Theme, stagger = 0.08): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: theme === "aurora" ? stagger * 1.3 : stagger,
        delayChildren: 0.1,
      },
    },
  };
}
