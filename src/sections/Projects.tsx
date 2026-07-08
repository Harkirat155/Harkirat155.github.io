import { motion } from "motion/react";
import { projects } from "../data/projects";
import { ossContributions } from "../data/oss";
import { useTheme } from "../hooks/useTheme";
import { fadeUpVariants, staggerContainer } from "../lib/motionVariants";
import { SectionHeading } from "../components/SectionHeading";
import { ProjectCard } from "../components/ProjectCard";
import { IconArrowUpRight } from "../components/icons";

export function Projects() {
  const { theme } = useTheme();
  const item = fadeUpVariants(theme);

  return (
    <section id="work" className="px-6 py-32 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          kicker="Work"
          title="Things I've shipped on my own time."
          description="Personal projects, built and maintained outside of any day job."
        />

        <motion.div
          variants={staggerContainer(theme)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid gap-5 sm:grid-cols-2"
        >
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </motion.div>

        <div className="mt-16 border-t pt-12" style={{ borderColor: "var(--border)" }}>
          <h3
            className="font-label text-xs uppercase tracking-[0.2em]"
            style={{ color: "var(--fg-muted)" }}
          >
            Open source
          </h3>

          <motion.div
            variants={staggerContainer(theme)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-6 grid gap-4 sm:grid-cols-2"
          >
            {ossContributions.map((entry) => (
              <motion.a
                key={entry.name}
                variants={item}
                href={entry.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-start justify-between gap-4 rounded-card border p-5"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-elevated)" }}
              >
                <span>
                  <span className="font-display font-semibold" style={{ color: "var(--fg)" }}>
                    {entry.name}
                  </span>
                  <span className="font-label ml-2 text-xs" style={{ color: "var(--accent-ink)" }}>
                    {entry.stars}
                  </span>
                  <p className="mt-1 text-sm" style={{ color: "var(--fg-muted)" }}>
                    {entry.description}
                  </p>
                </span>
                <IconArrowUpRight
                  className="mt-1 h-4 w-4 shrink-0"
                  style={{ color: "var(--fg-muted)" }}
                />
              </motion.a>
            ))}
          </motion.div>

          <p className="mt-6 text-sm" style={{ color: "var(--fg-muted)" }}>
            Also shipped:{" "}
            <strong style={{ color: "var(--fg)" }}>PyStatDP</strong> (PyPI package) ·{" "}
            <strong style={{ color: "var(--fg)" }}>CVM</strong>, a Rust config/version
            manager · a diabetic-retinopathy classifier at 87% accuracy on Kaggle.
          </p>
        </div>
      </div>
    </section>
  );
}
