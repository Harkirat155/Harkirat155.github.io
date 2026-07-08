import { SectionHeading } from "../components/SectionHeading";
import { SignalGraph } from "../components/SignalGraph";
import { signalDomains } from "../data/signal";

export function SignalMap() {
  return (
    <section id="systems" className="px-6 py-32 sm:px-10">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          kicker="Systems"
          title="Every node here is a real project."
          description="No self-rated skill bars — hover or focus a point to see exactly what it's connected to."
        />

        <div className="mt-16">
          <SignalGraph />

          <ul className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2">
            {signalDomains.map((domain) => (
              <li
                key={domain}
                className="font-label text-xs uppercase tracking-[0.14em]"
                style={{ color: "var(--fg-muted)" }}
              >
                {domain}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
