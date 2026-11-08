import { Hero } from "@/components/home/hero";
import { Stats } from "@/components/home/stats";
import { Categories } from "@/components/home/categories";
import { FeaturedJobs } from "@/components/home/featured-jobs";
import { EasyJobs } from "@/components/home/easy-jobs";
import { HowItWorks } from "@/components/home/how-it-works";
import { WhyChoose } from "@/components/home/why-choose";
import { EmployerCta } from "@/components/home/employer-cta";
import { Newsletter } from "@/components/home/newsletter";
import { JsonLd } from "@/components/shared/json-ld";
import { SITE } from "@/lib/constants";
import { db } from "@/lib/db";
import { getT } from "@/lib/i18n/server";

export default async function HomePage() {
  const { t } = await getT();

  return (
    <>
      <Hero t={t.hero} />
      <Stats />
      <EasyJobs jobs={db.jobs.easy(6)} />
      <Categories counts={db.jobs.countByCategory()} />
      <FeaturedJobs jobs={db.jobs.featured(6)} />
      <HowItWorks />
      <WhyChoose />
      <EmployerCta />
      <Newsletter />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE.name,
          url: SITE.url,
          potentialAction: {
            "@type": "SearchAction",
            target: { "@type": "EntryPoint", urlTemplate: `${SITE.url}/jobs?q={search_term_string}` },
            "query-input": "required name=search_term_string",
          },
        }}
      />
    </>
  );
}
