import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/jobs/*/apply"] }],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
