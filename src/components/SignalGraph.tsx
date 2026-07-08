import { motion } from "motion/react";
import { useState } from "react";
import { signalNodes } from "../data/signal";
import { useTheme } from "../hooks/useTheme";
import { useSound } from "../hooks/useSound";

const RADIUS = 38;

function position(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: 50 + RADIUS * Math.sin(rad),
    y: 50 - RADIUS * Math.cos(rad),
  };
}

export function SignalGraph() {
  const { theme } = useTheme();
  const { play } = useSound();
  const [activeId, setActiveId] = useState<string | null>(null);
  const isAurora = theme === "aurora";

  const clearIfActive = (id: string) =>
    setActiveId((current) => (current === id ? null : current));

  const activate = (id: string) => {
    setActiveId((current) => {
      if (current !== id) play("tick");
      return id;
    });
  };

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px] min-w-[320px]">
      <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        {signalNodes.map((node) => {
          const { x, y } = position(node.angle);
          const active = activeId === node.id;
          return (
            <motion.line
              key={node.id}
              x1={50}
              y1={50}
              x2={x}
              y2={y}
              stroke={active ? "var(--accent)" : "var(--border-strong)"}
              strokeWidth={active ? 0.6 : 0.3}
              animate={
                isAurora && !active
                  ? { opacity: [0.3, 0.65, 0.3] }
                  : { opacity: active ? 1 : 0.55 }
              }
              transition={
                isAurora && !active
                  ? { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.25 }
              }
            />
          );
        })}
        <circle cx={50} cy={50} r={5.5} fill="none" stroke="var(--border-strong)" strokeWidth={0.4} />
        <circle cx={50} cy={50} r={3.2} fill="var(--fg)" />
      </svg>

      {signalNodes.map((node, index) => {
        const { x, y } = position(node.angle);
        const active = activeId === node.id;
        return (
          <a
            key={node.id}
            href={node.href}
            target={node.external ? "_blank" : undefined}
            rel={node.external ? "noreferrer" : undefined}
            aria-label={`${node.label} — see ${node.projectLabel}`}
            onMouseEnter={() => activate(node.id)}
            onMouseLeave={() => clearIfActive(node.id)}
            onFocus={() => activate(node.id)}
            onBlur={() => clearIfActive(node.id)}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 text-center"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            {/* Breathing motion lives on this decorative dot only — never on the
                link itself, or its bounding box keeps changing and the target
                is unstable to hover/click (real users and Playwright agree). */}
            <motion.span
              aria-hidden="true"
              className="h-2.5 w-2.5 rounded-full"
              style={{
                backgroundColor: active ? "var(--accent)" : "var(--fg-muted)",
              }}
              animate={{
                scale: active ? 1.4 : isAurora ? [1, 1.3, 1] : 1,
              }}
              transition={
                active
                  ? { duration: 0.2 }
                  : isAurora
                    ? { duration: 2.4 + (index % 3) * 0.5, repeat: Infinity, ease: "easeInOut" }
                    : { duration: 0.2 }
              }
            />
            <span
              className="font-label whitespace-nowrap rounded-pill border px-2 py-1 text-[10px] uppercase tracking-[0.06em] transition-colors"
              style={{
                borderColor: active ? "var(--accent)" : "var(--border)",
                color: active ? "var(--accent-ink)" : "var(--fg-muted)",
                backgroundColor: "var(--bg-elevated)",
              }}
            >
              {node.label}
            </span>
            <span
              aria-hidden="true"
              className="font-label whitespace-nowrap text-[10px]"
              style={{ color: "var(--accent-ink)", opacity: active ? 1 : 0, height: active ? "auto" : 0 }}
            >
              → {node.projectLabel}
            </span>
          </a>
        );
      })}
    </div>
  );
}
