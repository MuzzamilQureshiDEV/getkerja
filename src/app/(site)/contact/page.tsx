import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/shared/page-hero";
import { WhatsappIcon } from "@/components/shared/social-icons";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the getKerja team in Kuala Lumpur. Support for job seekers and employers by phone, email or WhatsApp.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const sp = await searchParams;
  const topic = typeof sp.topic === "string" ? sp.topic : undefined;
  const mapQuery = encodeURIComponent(`${SITE.address.street}, ${SITE.address.city}`);
  const items = [
    { Icon: MapPin, label: "Office", value: `${SITE.address.street}, ${SITE.address.postcode} ${SITE.address.city}, Malaysia`, href: `https://maps.google.com/?q=${mapQuery}` },
    { Icon: Phone, label: "Phone", value: SITE.phone, href: `tel:${SITE.phone.replace(/[^\d+]/g, "")}` },
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
          <Button asChild size="lg" className="bg-[#25D366] text-white hover:bg-[#1ebe5b]">
            <a href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Hi getKerja, I have a question about…")}`} target="_blank" rel="noopener noreferrer">
              <WhatsappIcon className="size-5" /> Chat on WhatsApp
            </a>
          </Button>
          <div className="overflow-hidden rounded-3xl border">
            <iframe
              title="getKerja office location on Google Maps"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="aspect-[4/3] w-full grayscale-[30%] dark:invert-[90%] dark:hue-rotate-180"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </aside>
      </div>
    </>
  );
}
