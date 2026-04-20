import { useEffect, useState } from "react";

const TARGET_KEY = "fastmotors_v2_deadline";
const DURATION_MS = 9 * 60 * 1000 + 47 * 1000; // 9m 47s

export const getDeadline = () => {
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

export const useCountdown = () => {
  const [deadline] = useState<number>(() => getDeadline());
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const diff = Math.max(0, deadline - now);
  return {
    hours: Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    diff,
  };
};

export const pad = (n: number) => String(n).padStart(2, "0");
