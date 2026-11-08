const rm = new Intl.NumberFormat("en-MY", { maximumFractionDigits: 0 });

export function formatRM(n: number) {
  if (n >= 1000) {
    const k = n / 1000;
    return `RM ${Number.isInteger(k) ? k : k.toFixed(1)}k`;
  }
  return `RM ${rm.format(n)}`;
}

export function formatSalary(min?: number, max?: number, hidden?: boolean) {
  if (hidden || (!min && !max)) return "Salary negotiable";
  if (min && max) return `${formatRM(min)} – ${formatRM(max)} / month`;
  if (min) return `From ${formatRM(min)} / month`;
  return `Up to ${formatRM(max!)} / month`;
}

export function timeAgo(iso: string, now = Date.now()) {
  const diff = Math.max(0, now - new Date(iso).getTime());
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return mins <= 1 ? "Just now" : `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  return months === 1 ? "1 month ago" : `${months} months ago`;
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-MY", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter((w) => /^[A-Za-z0-9]/.test(w))
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}

export function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

export const compactNumber = new Intl.NumberFormat("en", { notation: "compact" });
