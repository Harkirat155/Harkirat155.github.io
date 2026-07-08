export type ProjectLinks =
  | { kind: "repo-and-live"; repoUrl: string; liveUrl: string }
  | { kind: "live-only"; liveUrl: string }
  | { kind: "none" };

export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  links: ProjectLinks;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: "crisscross",
    title: "CrissCross",
    description:
      "Real-time multiplayer game platform — Tic-Tac-Toe, Connect Four, and Checkers on one pluggable rules engine, with WebRTC voice chat between players.",
    tags: ["React", "Socket.IO", "WebRTC", "Fly.io"],
    links: {
      kind: "repo-and-live",
      repoUrl: "https://github.com/Harkirat155/cc",
      liveUrl: "https://harkirat155.github.io/cc/",
    },
    featured: true,
  },
  {
    slug: "supplypulse",
    title: "SupplyPulse",
    description:
      "Crowd-sourced utility-outage map. Reports feed a decaying consensus score per geographic hex cell, computed in real time.",
    tags: ["Go", "H3 Geospatial", "Expo", "Cloudflare Workers"],
    links: {
      kind: "live-only",
      liveUrl: "https://supplypulse.harkirat-hira.workers.dev",
    },
  },
  {
    slug: "ai-native",
    title: "ai-native",
    description:
      "A JSON-RPC bridge that turns VS Code into an execution environment for coding agents — tasks, diagnostics, and refactors, fully programmable.",
    tags: ["TypeScript", "JSON-RPC", "VS Code API"],
    links: {
      kind: "repo-and-live",
      repoUrl: "https://github.com/Harkirat155/ai-native",
      liveUrl: "https://harkirat155.github.io/ai-native/",
    },
  },
  {
    slug: "aether",
    title: "Aether",
    description:
      "A from-scratch programming language for agentic coding — first-class agents, effects and capabilities, deterministic replay.",
    tags: ["Rust", "Language Design"],
    links: {
      kind: "repo-and-live",
      repoUrl: "https://github.com/Harkirat155/Aether",
      liveUrl: "https://harkirat155.github.io/Aether/",
    },
  },
  {
    slug: "animations",
    title: "animations",
    description:
      "A generative-art pipeline — 26 seeded templates spanning math and nature, plus a composer UI to preview and tweak every parameter live.",
    tags: ["Python", "FastAPI", "React"],
    links: { kind: "none" },
  },
];
