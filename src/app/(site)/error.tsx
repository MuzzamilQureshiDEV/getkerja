"use client";

import { useEffect } from "react";
import { RotateCcw, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="container-page flex min-h-[60dvh] flex-col items-center justify-center gap-4 py-20 text-center" role="alert">
      <span className="grid size-16 place-items-center rounded-2xl bg-destructive/10 text-destructive"><TriangleAlert className="size-8" aria-hidden /></span>
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="max-w-md text-muted-foreground">We hit an unexpected error. Please try again — if it keeps happening, contact support{error.digest ? ` (ref: ${error.digest})` : ""}.</p>
      <Button onClick={reset} size="lg"><RotateCcw /> Try again</Button>
    </div>
  );
}
