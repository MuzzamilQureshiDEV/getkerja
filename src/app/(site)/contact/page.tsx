import type { Metadata } from "next";
import { Clock, Mail } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/shared/page-hero";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the getKerja team. Support for job seekers and employers by email or through our contact form.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const sp = await searchParams;
  const topic = typeof sp.topic === "string" ? sp.topic : undefined;
  const items = [
    { Icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
    { Icon: Clock, label: "Office hours", value: "Mon – Fri, 9:00am – 6:00pm (MYT)" },
  ];

  return (
    <>
      <PageHero eyebrow="Contact" title="We'd love to hear from you" description="Questions about a job, your application or hiring with us? Our team replies within one business day." />
      <div className="container-page grid gap-8 py-12 lg:grid-cols-[1fr_400px] lg:py-16">
        <div className="rounded-3xl border bg-card p-5 sm:p-8">
          <h2 className="mb-6 text-2xl font-semibold">Send us a message</h2>
          <ContactForm defaultTopic={topic} />
        </div>
        <aside className="flex flex-col gap-4">
          <ul className="flex flex-col gap-3 rounded-3xl border bg-card p-6">
            {items.map(({ Icon, label, value, href }) => (
              <li key={label} className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-secondary text-primary"><Icon className="size-5" aria-hidden /></span>
                <div>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  {href ? <a href={href} className="font-medium hover:text-primary" target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">{value}</a> : <p className="font-medium">{value}</p>}
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
}
