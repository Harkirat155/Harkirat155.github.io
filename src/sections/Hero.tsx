import { motion } from "motion/react";
import { useTheme } from "../hooks/useTheme";
import { fadeUpVariants, staggerContainer } from "../lib/motionVariants";

export function Hero() {
  const { theme } = useTheme();
  const item = fadeUpVariants(theme);

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-start justify-center px-6 pt-32 pb-24 sm:px-10"
    >
      <motion.div
        variants={staggerContainer(theme)}
        initial="hidden"
        animate="visible"
        className="mx-auto w-full max-w-4xl"
      >
        <motion.p
          variants={item}
          className="font-label inline-flex items-center gap-2 rounded-pill border px-3 py-1 text-xs uppercase tracking-[0.18em]"
          style={{ borderColor: "var(--border)", color: "var(--fg-muted)" }}
        >
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: "var(--accent)" }}
          />
          Systems · Realtime · Small Languages
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-8 font-display font-extrabold tracking-tight"
          style={{
            color: "var(--fg)",
            fontSize: "clamp(3rem, 8vw, 7.5rem)",
            lineHeight: 0.98,
          }}
        >
          I build systems
          <br />
          that don&apos;t fall over.
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-8 max-w-2xl text-lg leading-relaxed sm:text-xl"
          style={{ color: "var(--fg-muted)" }}
        >
          I design distributed systems, realtime multiplayer infrastructure, and
          small programming languages — mostly for fun, occasionally for keeps.
          Lately: what agentic coding tools need from the machines underneath them.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#systems"
            className="rounded-lg px-6 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5"
            style={{ backgroundColor: "var(--fg)", color: "var(--bg)" }}
          >
            See the systems
          </a>
          <a
            href="#contact"
            className="rounded-lg border px-6 py-3 text-sm font-semibold transition-colors"
            style={{ borderColor: "var(--border-strong)", color: "var(--fg)" }}
          >
            Say hello
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        variants={item}
        initial="hidden"
        animate="visible"
        aria-hidden="true"
        className="font-label absolute bottom-10 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[11px] uppercase tracking-[0.2em] sm:flex"
        style={{ color: "var(--fg-muted)" }}
      >
        Scroll
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}
