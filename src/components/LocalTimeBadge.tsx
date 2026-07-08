import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: "Asia/Kolkata",
});

function readTime() {
  return formatter.format(new Date());
}

export function LocalTimeBadge() {
  const [time, setTime] = useState(readTime);

  useEffect(() => {
    const id = window.setInterval(() => setTime(readTime()), 15_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="font-label inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.1em]">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
      {time} in India
    </span>
  );
}
