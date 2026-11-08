import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShareButtons } from "@/components/jobs/share-buttons";
import { JsonLd } from "@/components/shared/json-ld";
import { blogPosts } from "@/lib/data/seed";
import { SITE } from "@/lib/constants";
import { formatDate } from "@/lib/format";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.excerpt, publishedTime: post.publishedAt, images: [post.cover] },
  };
}

export default async function ArticlePage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();
  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <article>
      <header className="bg-mesh">
        <div className="container-page max-w-4xl py-10 sm:py-14">
          <Button asChild variant="ghost" className="-ml-3 mb-6"><Link href="/blog"><ArrowLeft /> All articles</Link></Button>
          <Badge className="mb-4 bg-coral-soft text-coral">{post.category}</Badge>
          <h1 className="text-3xl font-bold sm:text-5xl">{post.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-primary to-coral text-xs font-bold text-white" aria-hidden>
                {post.author.name.split(" ").map((w) => w[0]).join("")}
              </span>
              <span><span className="block font-medium text-foreground">{post.author.name}</span>{post.author.role}</span>
            </span>
            <span>· <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time></span>
            <span className="flex items-center gap-1">· <Clock className="size-4" aria-hidden />{post.readMinutes} min read</span>
          </div>
        </div>
      </header>
      <div className="container-page max-w-4xl">
        <div className="relative -mt-2 aspect-[1200/630] overflow-hidden rounded-[28px] border">
          <Image src={post.cover} alt="" fill priority sizes="(min-width: 896px) 896px, 100vw" className="object-cover" />
        </div>
        {/* Body is trusted CMS content. If authors can submit HTML, sanitise it (e.g. with DOMPurify / sanitize-html) before rendering. */}
        <div className="prose-article mx-auto max-w-2xl py-12" dangerouslySetInnerHTML={{ __html: post.body }} />
        <div className="mx-auto flex max-w-2xl flex-col gap-3 border-t py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold">Found this helpful? Share it.</p>
          <ShareButtons url={`${SITE.url}/blog/${post.slug}`} title={post.title} />
        </div>
      </div>

      <section className="border-t bg-secondary/40 py-14" aria-labelledby="more">
        <div className="container-page">
          <h2 id="more" className="mb-8 text-2xl font-bold">Keep reading</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {related.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex flex-col overflow-hidden rounded-3xl border bg-card card-hover">
                <div className="relative aspect-[1200/630]"><Image src={p.cover} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" /></div>
                <div className="p-5">
                  <Badge variant="secondary" className="mb-2">{p.category}</Badge>
                  <h3 className="font-heading font-semibold group-hover:text-primary">{p.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          image: `${SITE.url}${post.cover}`,
          datePublished: post.publishedAt,
          author: { "@type": "Person", name: post.author.name },
          publisher: { "@type": "Organization", name: SITE.name },
        }}
      />
    </article>
  );
}
