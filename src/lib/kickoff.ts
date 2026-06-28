/** Returns the next 12:15:00 from `now`. If now >= 12:15, returns tomorrow. */
export function nextKickoff(now: Date): Date {
  const d = new Date(now);
  d.setHours(12, 15, 0, 0);
  if (now >= d) {
    d.setDate(d.getDate() + 1);
  }
  return d;
}

/** Formats remaining seconds as HH:MM:SS */
export function formatCountdown(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
}
