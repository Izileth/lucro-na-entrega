import { useEffect, useState } from "react";

const TARGET_KEY = "promota_offer_deadline";
const DURATION_MS = 24 * 60 * 60 * 1000; // 24h

const getDeadline = () => {
  if (typeof window === "undefined") return Date.now() + DURATION_MS;
  const stored = window.localStorage.getItem(TARGET_KEY);
  if (stored) {
    const t = parseInt(stored, 10);
    if (!Number.isNaN(t) && t > Date.now()) return t;
  }
  const next = Date.now() + DURATION_MS;
  window.localStorage.setItem(TARGET_KEY, String(next));
  return next;
};

const pad = (n: number) => String(n).padStart(2, "0");

const CountdownTimer = () => {
  const [deadline] = useState<number>(() => getDeadline());
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const diff = Math.max(0, deadline - now);
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const blocks = [
    { label: "Horas", value: pad(hours) },
    { label: "Min", value: pad(minutes) },
    { label: "Seg", value: pad(seconds) },
  ];

  return (
    <div className="rounded-2xl border border-accent/30 bg-primary-foreground/5 p-5">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
        </span>
        <p className="text-xs font-bold uppercase tracking-widest text-accent">
          Oferta termina em
        </p>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3" role="timer" aria-live="polite">
        {blocks.map((b) => (
          <div
            key={b.label}
            className="rounded-xl border border-primary-foreground/10 bg-primary px-3 py-3 text-center tabular-nums"
          >
            <div className="font-display text-3xl font-bold leading-none text-accent md:text-4xl">
              {b.value}
            </div>
            <div className="mt-1.5 text-[10px] font-semibold uppercase tracking-widest text-primary-foreground/60">
              {b.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
