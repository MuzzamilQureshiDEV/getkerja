import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Loading jobs">
      <div className="border-b bg-mesh">
        <div className="container-page flex flex-col gap-4 py-14 sm:py-20">
          <Skeleton className="h-6 w-28 rounded-full" />
          <Skeleton className="h-12 w-2/3 max-w-xl" />
          <Skeleton className="h-6 w-1/2 max-w-lg" />
        </div>
      </div>
      <div className="container-page grid gap-8 py-10 lg:grid-cols-[280px_1fr]">
        <Skeleton className="hidden h-[560px] rounded-3xl lg:block" />
        <div className="flex flex-col gap-4">
          <Skeleton className="h-12 rounded-2xl" />
          {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-40 rounded-3xl" />)}
        </div>
      </div>
    </div>
  );
}
