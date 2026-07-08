import { motion } from "motion/react";
import type { ReactNode } from "react";
import type { Project, ProjectLinks } from "../data/projects";
import { useTheme } from "../hooks/useTheme";
import { fadeUpVariants } from "../lib/motionVariants";
import { IconArrowUpRight, IconGithub, IconLock } from "./icons";

function renderLinks(links: ProjectLinks): ReactNode {
  switch (links.kind) {
    case "repo-and-live":
      return (
        <>
          <a
            href={links.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5"
            style={{ color: "var(--accent-ink)" }}
          >
            Live <IconArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <a
            href={links.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5"
            style={{ color: "var(--fg-muted)" }}
          >
            <IconGithub className="h-3.5 w-3.5" /> Source
          </a>
        </>
      );
    case "live-only":
      return (
        <>
          <a
            href={links.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5"
            style={{ color: "var(--accent-ink)" }}
          >
            Live <IconArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <span
            className="inline-flex items-center gap-1.5"
            style={{ color: "var(--fg-muted)" }}
            title="Source code is private"
          >
            <IconLock className="h-3.5 w-3.5" /> Private repo
          </span>
        </>
      );
    case "none":
      return (
        <span
          className="font-label rounded-pill border px-3 py-1 text-[10px] uppercase tracking-[0.1em]"
          style={{ borderColor: "var(--border)", color: "var(--fg-muted)" }}
        >
          Source coming soon
        </span>
      );
    default: {
      const exhaustive: never = links;
      return exhaustive;
    }
  }
}

export function ProjectCard({ project }: { project: Project }) {
  const { theme } = useTheme();

  return (
    <motion.article
      id={`project-${project.slug}`}
      variants={fadeUpVariants(theme)}
      className={`scroll-mt-28 flex flex-col justify-between rounded-card border p-6 ${
        project.featured ? "sm:col-span-2" : ""
      }`}
      style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-elevated)" }}
    >
      <div>
        <h3 className="font-display text-xl font-semibold" style={{ color: "var(--fg)" }}>
          {project.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
          {project.description}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="font-label rounded-pill border px-2.5 py-1 text-[10px] uppercase tracking-[0.08em]"
              style={{ borderColor: "var(--border)", color: "var(--fg-muted)" }}
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-medium">
        {renderLinks(project.links)}
      </div>
    </motion.article>
  );
}
