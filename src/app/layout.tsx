import type { Metadata, Viewport } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import { Providers } from "@/components/providers";
import { JsonLd } from "@/components/shared/json-ld";
import { SITE } from "@/lib/constants";
import { getLocale } from "@/lib/i18n/server";
import "./globals.css";

const display = Outfit({ variable: "--font-display", subsets: ["latin"], display: "swap" });
const body = DM_Sans({ variable: "--font-body", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Find Jobs in Malaysia | Hire Top Malaysian Talent`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: ["jobs in Malaysia", "kerja kosong", "job vacancies Kuala Lumpur", "Selangor jobs", "Penang jobs", "Johor jobs", "recruitment Malaysia", "hire in Malaysia"],
  openGraph: {
    type: "website",
    locale: "en_MY",
    siteName: SITE.name,
    title: `${SITE.name} — Find Your Next Career Opportunity in Malaysia`,
    description: SITE.description,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbfe" },
    { media: "(prefers-color-scheme: dark)", color: "#13121f" },
  ],
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await getLocale();
  return (
    <html lang={locale === "ms" ? "ms-MY" : "en-MY"} suppressHydrationWarning className={`${display.variable} ${body.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-[100] rounded-lg bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: SITE.name,
            url: SITE.url,
            email: SITE.email,
            address: {
              "@type": "PostalAddress",
              streetAddress: SITE.address.street,
              addressLocality: SITE.address.city,
              postalCode: SITE.address.postcode,
              addressCountry: SITE.address.country,
            },
          }}
        />
      </body>
    </html>
  );
}
