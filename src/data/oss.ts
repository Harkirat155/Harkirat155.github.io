export interface OssEntry {
  name: string;
  org: string;
  stars: string;
  description: string;
  url: string;
}

export const ossContributions: OssEntry[] = [
  {
    name: "PySyft",
    org: "OpenMined",
    stars: "9.9k★",
    description: "Privacy-preserving ML infrastructure for decentralized data science.",
    url: "https://github.com/OpenMined/PySyft",
  },
  {
    name: "YAPF",
    org: "Google",
    stars: "14k★",
    description: "Python code formatter — AST parsing robustness and formatting fixes.",
    url: "https://github.com/google/yapf",
  },
];
