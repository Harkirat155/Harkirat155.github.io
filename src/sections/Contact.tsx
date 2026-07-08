import { motion } from "motion/react";
import { socialLinks } from "../data/social";
import { useTheme } from "../hooks/useTheme";
import { fadeUpVariants, staggerContainer } from "../lib/motionVariants";
import { SectionHeading } from "../components/SectionHeading";

export function Contact() {
  const { theme } = useTheme();
  const item = fadeUpVariants(theme);

  return (
    <section id="contact" className="px-6 py-32 sm:px-10">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          kicker="Contact"
          title="Open to interesting problems."
          description="No forms, no gatekeeping — just reach out directly. I read everything that lands in these."
        />

        <motion.ul
          variants={staggerContainer(theme)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid gap-4 sm:grid-cols-2"
        >
          {socialLinks.map((link) => (
            <motion.li key={link.label} variants={item}>
              <a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="flex items-center gap-4 rounded-card border p-5 transition-transform hover:-translate-y-0.5"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-elevated)" }}
              >
                <link.icon className="h-5 w-5 shrink-0" style={{ color: "var(--accent-ink)" }} />
                <span>
                  <span
                    className="font-label block text-xs uppercase tracking-[0.14em]"
                    style={{ color: "var(--fg-muted)" }}
                  >
                    {link.label}
                  </span>
                  <span className="mt-1 block font-medium" style={{ color: "var(--fg)" }}>
                    {link.handle}
                  </span>
                </span>
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
