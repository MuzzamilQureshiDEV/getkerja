import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SongketPattern } from "@/components/shared/songket-pattern";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <SongketPattern id="nf-songket" className="text-primary/[0.06] [mask-image:radial-gradient(60%_60%_at_50%_40%,black,transparent)]" />
      <div className="relative container-page flex min-h-[70dvh] flex-col items-center justify-center gap-5 py-20 text-center">
        <span className="grid size-20 place-items-center rounded-3xl bg-gradient-to-br from-primary to-coral text-white"><Compass className="size-10" aria-hidden /></span>
        <p className="font-heading text-7xl font-bold text-gradient">404</p>
        <h1 className="text-3xl font-bold">This page has moved on to a new opportunity</h1>
        <p className="max-w-md text-muted-foreground">The page or job you’re looking for doesn’t exist or is no longer available.</p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button asChild size="lg"><Link href="/jobs">Browse jobs</Link></Button>
          <Button asChild size="lg" variant="outline"><Link href="/">Back to home</Link></Button>
        </div>
      </div>
    </section>
  );
}
