import { LocalTimeBadge } from "../components/LocalTimeBadge";

export function Footer() {
  return (
    <footer className="px-6 py-10 sm:px-10">
      <div
        className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-3 border-t pt-8 text-sm sm:flex-row"
        style={{ borderColor: "var(--border)", color: "var(--fg-muted)" }}
      >
        <p>© {new Date().getFullYear()} Harkirat Singh</p>
        <LocalTimeBadge />
        <p className="font-label text-xs uppercase tracking-[0.16em]">
          Built with React, Tailwind &amp; motion
        </p>
      </div>
    </footer>
  );
}
