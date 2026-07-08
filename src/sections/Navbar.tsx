import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ThemeToggle } from "../components/ThemeToggle";
import { SoundToggle } from "../components/SoundToggle";
import { IconClose, IconMenu } from "../components/icons";

const navLinks = [
  { label: "Systems", href: "#systems" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

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
        <div className="w-full max-w-3xl">
          <nav
            aria-label="Primary"
            className="flex items-center justify-between rounded-pill border px-4 py-2 backdrop-blur-xl sm:px-6"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--bg-elevated)",
            }}
          >
            <a
              href="#home"
              onClick={() => setOpen(false)}
              className="font-display text-sm font-semibold tracking-tight"
              style={{ color: "var(--fg)" }}
            >
              Harkirat
            </a>

            <ul className="hidden items-center gap-5 text-sm font-medium md:flex">
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
              <button
                type="button"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((v) => !v)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border md:hidden"
                style={{ borderColor: "var(--border-strong)", color: "var(--fg)" }}
              >
                {open ? <IconClose className="h-4 w-4" /> : <IconMenu className="h-4 w-4" />}
              </button>
            </div>
          </nav>

          <AnimatePresence>
            {open && (
              <motion.div
                id="mobile-menu"
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="mt-2 overflow-hidden rounded-2xl border backdrop-blur-xl md:hidden"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-elevated)" }}
              >
                <ul className="flex flex-col">
                  {navLinks.map((link) => (
                    <li key={link.href} className="border-b last:border-b-0" style={{ borderColor: "var(--border)" }}>
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="block px-5 py-4 text-base font-medium"
                        style={{ color: "var(--fg)" }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
}
