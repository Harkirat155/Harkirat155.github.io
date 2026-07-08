import { motion } from "motion/react";
import { fadeUpVariants } from "../lib/motionVariants";
import { useTheme } from "../hooks/useTheme";

interface SectionHeadingProps {
  kicker: string;
  title: string;
  description?: string;
}

export function SectionHeading({ kicker, title, description }: SectionHeadingProps) {
  const { theme } = useTheme();
  return (
    <motion.div
      variants={fadeUpVariants(theme)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="max-w-2xl"
    >
      <p
        className="font-label text-xs uppercase tracking-[0.2em]"
        style={{ color: "var(--accent-ink)" }}
      >
        {kicker}
      </p>
      <h2
        className="mt-3 font-display text-3xl font-semibold sm:text-4xl"
        style={{ color: "var(--fg)" }}
      >
        {title}
      </h2>
      {description ? (
        <p
          className="mt-4 text-base leading-relaxed"
          style={{ color: "var(--fg-muted)" }}
        >
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}
