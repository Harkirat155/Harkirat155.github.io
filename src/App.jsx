import { useEffect, useState } from "react";

const highlights = [
  "Agentic systems and productized AI workflows",
  "Developer-first tools, API products, and automation",
  "Relentless focus on speed, quality, and market pull"
];

const signals = [
  { label: "GitHub", value: "harkirat155", href: "https://github.com/harkirat155" },
  {
    label: "LinkedIn",
    value: "Connect professionally",
    href: "https://linkedin.com/in/harkirat155"
  }
];

const specialProjects = [
  {
    name: "CC",
    repo: "cc",
    live: "https://harkirat155.github.io/cc/",
    github: "https://github.com/harkirat155/cc"
  },
  {
    name: "AI Native",
    repo: "ai-native",
    live: "https://harkirat155.github.io/ai-native/",
    github: "https://github.com/harkirat155/ai-native"
  },
  {
    name: "Aether",
    repo: "aether",
    live: "https://harkirat155.github.io/aether/",
    github: "https://github.com/harkirat155/aether"
  }
];

const focusAreas = [
  {
    title: "Build Velocity",
    text: "Turning concepts into shipped products quickly with sharp architecture and clean execution."
  },
  {
    title: "AI-Native Thinking",
    text: "Designing systems where AI is embedded in workflow, not bolted on as a feature."
  },
  {
    title: "Signal Over Noise",
    text: "Prioritizing high-impact work, clear communication, and measurable outcomes."
  }
];

export default function App() {
  const [projectsLoaded, setProjectsLoaded] = useState(false);
  const [repoData, setRepoData] = useState({});

  useEffect(() => {
    if (!projectsLoaded) return;
    let active = true;

    const loadRepos = async () => {
      const responses = await Promise.all(
        specialProjects.map(async (project) => {
          try {
            const res = await fetch(`https://api.github.com/repos/harkirat155/${project.repo}`);
            if (!res.ok) return [project.repo, null];
            const data = await res.json();
            return [
              project.repo,
              {
                stars: data.stargazers_count ?? 0,
                forks: data.forks_count ?? 0,
                updatedAt: data.updated_at ?? ""
              }
            ];
          } catch {
            return [project.repo, null];
          }
        })
      );
      if (active) setRepoData(Object.fromEntries(responses));
    };

    void loadRepos();
    return () => {
      active = false;
    };
  }, [projectsLoaded]);

  const formatUpdatedAt = (value) =>
    value ? new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "N/A";

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 sm:py-16 lg:px-8">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-aura backdrop-blur-xl sm:p-12">
        <p className="mb-4 inline-flex rounded-full border border-cyan-300/40 bg-cyan-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
          Harkirat Singh
        </p>
        <h1 className="text-4xl font-black leading-tight text-white sm:text-6xl">
          Building bold products with precision, taste, and momentum.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-200/90">
          I design and ship software that creates leverage. My work blends engineering depth,
          product instinct, and fast execution to move from idea to impact.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="https://github.com/harkirat155"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
          >
            Explore GitHub
          </a>
          <a
            href="https://linkedin.com/in/harkirat155"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-slate-300/30 px-6 py-3 text-sm font-bold text-slate-100 transition hover:border-slate-200/60 hover:bg-white/10"
          >
            Connect on LinkedIn
          </a>
        </div>
      </div>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {highlights.map((item) => (
          <article
            key={item}
            className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-5 text-slate-200"
          >
            {item}
          </article>
        ))}
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
          <h2 className="text-2xl font-bold text-white">What I optimize for</h2>
          <div className="mt-6 space-y-5">
            {focusAreas.map((area) => (
              <div key={area.title}>
                <h3 className="text-lg font-semibold text-cyan-200">{area.title}</h3>
                <p className="mt-1 text-slate-300">{area.text}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-3xl border border-cyan-200/20 bg-cyan-500/10 p-8">
          <h2 className="text-2xl font-bold text-white">Find me online</h2>
          <ul className="mt-6 space-y-4">
            {signals.map((signal) => (
              <li key={signal.label}>
                <a
                  href={signal.href}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-xl border border-cyan-200/30 bg-slate-950/50 p-4 transition hover:border-cyan-200/70"
                >
                  <p className="text-xs uppercase tracking-[0.14em] text-cyan-200/80">{signal.label}</p>
                  <p className="mt-1 font-semibold text-white">{signal.value}</p>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-cyan-100/85">
            Open to meaningful collaborations, high-agency roles, and ambitious builds.
          </p>
        </aside>
      </section>
    </main>
  );
}
