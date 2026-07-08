export interface SignalNode {
  id: string;
  label: string;
  domain: string;
  angle: number;
  href: string;
  projectLabel: string;
  external?: boolean;
}

/**
 * Every node here must resolve to a real, clickable personal project or OSS repo —
 * no employer-derived buzzwords standing in for evidence (see plan: an earlier draft
 * of this arc used Kafka/Spark/Kubernetes, none of which trace to a personal project).
 */
export const signalDomains = [
  "Systems & Infra",
  "Realtime & Multiplayer",
  "Languages & Runtimes",
  "Privacy-Preserving ML",
] as const;

export const signalNodes: SignalNode[] = [
  { id: "go", label: "Go", domain: "Systems & Infra", angle: 0, href: "#project-supplypulse", projectLabel: "SupplyPulse" },
  { id: "geospatial", label: "Geospatial indexing", domain: "Systems & Infra", angle: 40, href: "#project-supplypulse", projectLabel: "SupplyPulse" },
  { id: "docker-ci", label: "Docker & CI", domain: "Systems & Infra", angle: 80, href: "https://pypi.org/project/pystatdp/", projectLabel: "PyStatDP", external: true },
  { id: "webrtc", label: "WebRTC", domain: "Realtime & Multiplayer", angle: 120, href: "#project-crisscross", projectLabel: "CrissCross" },
  { id: "realtime-sync", label: "Realtime sync", domain: "Realtime & Multiplayer", angle: 160, href: "#project-crisscross", projectLabel: "CrissCross" },
  { id: "lang-design", label: "Language design", domain: "Languages & Runtimes", angle: 200, href: "#project-aether", projectLabel: "Aether" },
  { id: "typescript", label: "TypeScript tooling", domain: "Languages & Runtimes", angle: 240, href: "#project-ai-native", projectLabel: "ai-native" },
  { id: "diff-privacy", label: "Differential privacy", domain: "Privacy-Preserving ML", angle: 280, href: "https://github.com/OpenMined/PySyft", projectLabel: "PySyft", external: true },
  { id: "ast-tooling", label: "AST & code tooling", domain: "Privacy-Preserving ML", angle: 320, href: "https://github.com/google/yapf", projectLabel: "YAPF", external: true },
];
