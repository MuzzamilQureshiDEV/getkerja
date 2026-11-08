import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";

/** Legacy URL: forwards to the single application form with this job preselected. */
export default async function JobApplyRedirect({ params }: PageProps<"/jobs/[slug]/apply">) {
  const { slug } = await params;
  const job = db.jobs.bySlug(slug);
  if (!job) notFound();
  redirect(`/apply?job=${job.id}`);
}
