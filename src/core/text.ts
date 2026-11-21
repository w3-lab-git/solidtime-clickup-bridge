/** Collapses runs of whitespace (incl. newlines) to single spaces and trims. */
export function collapseWhitespace(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

/** Shortens to at most `max` characters, marking the cut with "…". */
export function truncate(value: string, max: number): string {
  return value.length > max ? `${value.slice(0, max - 1)}…` : value;
}

/** Running-timer display, e.g. 754_000 → "0:12:34". */
export function formatElapsed(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${Math.floor(total / 3600)}:${pad(Math.floor((total % 3600) / 60))}:${pad(total % 60)}`;
}
