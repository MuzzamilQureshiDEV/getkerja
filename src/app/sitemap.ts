import type { MetadataRoute } from "next";
import { CATEGORIES, SITE } from "@/lib/constants";
import { blogPosts } from "@/lib/data/seed";
import { db } from "@/lib/db";

export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = SITE.url;
  const statics = ["", "/jobs", "/apply", "/employers", "/about", "/contact", "/blog", "/faq", "/privacy", "/terms"].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: p === "/jobs" || p === "" ? ("hourly" as const) : ("monthly" as const),
    priority: p === "" ? 1 : p === "/jobs" ? 0.9 : 0.5,
  }));
  const jobs = db.jobs.active().map((j) => ({ url: `${base}/jobs/${j.slug}`, lastModified: new Date(j.postedAt), changeFrequency: "daily" as const, priority: 0.8 }));
  const facets = CATEGORIES.map((c) => ({ url: `${base}/jobs?category=${c.slug}`, lastModified: now, changeFrequency: "daily" as const, priority: 0.6 }));
  const posts = blogPosts.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: new Date(p.publishedAt), changeFrequency: "monthly" as const, priority: 0.5 }));
  return [...statics, ...jobs, ...facets, ...posts];
}
