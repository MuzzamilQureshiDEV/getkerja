import "server-only";
import { headers } from "next/headers";
import { CV_MAX_BYTES, CV_MAX_MB } from "./constants";

/* ---------- Rate limiting (in-memory, per instance) ----------
 * For multi-instance production use Upstash Ratelimit / Redis. */
const g = globalThis as unknown as { __rl?: Map<string, number[]> };
const hits = (g.__rl ??= new Map());

export async function rateLimit(bucket: string, limit: number, windowMs: number) {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "local";
  const key = `${bucket}:${ip}`;
  const now = Date.now();
  const arr = (hits.get(key) ?? []).filter((t: number) => now - t < windowMs);
  if (arr.length >= limit) {
    hits.set(key, arr);
    return false;
  }
  arr.push(now);
  hits.set(key, arr);
  return true;
}

/* ---------- CV validation (size + extension + magic bytes) ---------- */
const CV_TYPES: Record<string, { magic: readonly number[] }> = {
  pdf: { magic: [0x25, 0x50, 0x44, 0x46] }, // %PDF
  docx: { magic: [0x50, 0x4b, 0x03, 0x04] }, // ZIP container
  doc: { magic: [0xd0, 0xcf, 0x11, 0xe0] }, // OLE
};

export async function validateCv(
  file: File | null,
): Promise<{ ok: true; bytes: Uint8Array; name: string } | { ok: false; error: string }> {
  if (!file || file.size === 0) return { ok: false, error: "Please upload your CV" };
  if (file.size > CV_MAX_BYTES) return { ok: false, error: `CV must be under ${CV_MAX_MB} MB` };
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  const t = CV_TYPES[ext];
  if (!t) return { ok: false, error: "Allowed formats: PDF, DOC, DOCX" };
  const bytes = new Uint8Array(await file.arrayBuffer());
  if (!t.magic.every((b, i) => bytes[i] === b)) return { ok: false, error: "The CV file appears to be corrupted or mislabelled" };
  return { ok: true, bytes, name: file.name.replace(/[^\w.\- ]+/g, "_").slice(0, 100) };
}
