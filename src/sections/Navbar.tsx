import { ThemeToggle } from "../components/ThemeToggle";
import { SoundToggle } from "../components/SoundToggle";

const navLinks = [
  { label: "Systems", href: "#systems" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:px-4 focus:py-2"
        style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}
      >
        Skip to content
      </a>
      <header className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4 sm:pt-6">
        <nav
          aria-label="Primary"
          className="flex w-full max-w-3xl items-center justify-between rounded-pill border px-4 py-2 backdrop-blur-xl sm:px-6"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-elevated)" }}
        >
          <a
            href="#home"
            className="font-display text-sm font-semibold tracking-tight"
            style={{ color: "var(--fg)" }}
          >
            harkirat.
          </a>
          <ul className="flex items-center gap-5 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="transition-colors hover:opacity-100"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <SoundToggle />
            <ThemeToggle />
          </div>
        </nav>
      </header>
    </>
  );
}
