import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  // Every page is personalised (session in the navbar, locale cookie on <html lang>),
  // so we render dynamically. See README → "Performance & caching" for adopting
  // cacheComponents / "use cache" once you move session UI behind <Suspense>.
  cacheComponents: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Add your CMS / storage hosts here, e.g. { protocol: "https", hostname: "cdn.sanity.io" }
    remotePatterns: [],
  },
  experimental: {
    serverActions: { bodySizeLimit: "6mb" }, // CV uploads up to 5 MB
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
