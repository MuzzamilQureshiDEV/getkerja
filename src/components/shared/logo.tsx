import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  // Eight-point star motif inspired by Malay songket weaving.
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={cn("size-9", className)}>
      <defs>
        <linearGradient id="lg-kh" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--primary)" />
          <stop offset="1" stopColor="var(--coral)" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="12" fill="url(#lg-kh)" />
      <g fill="white">
        <path d="M20 7l3.2 7.8L31 18l-7.8 3.2L20 29l-3.2-7.8L9 18l7.8-3.2z" opacity=".95" />
        <circle cx="20" cy="18" r="2.6" fill="url(#lg-kh)" />
        <rect x="11" y="31" width="18" height="2.4" rx="1.2" opacity=".8" />
      </g>
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("group flex items-center gap-2.5 rounded-lg", className)} aria-label="getKerja home">
      <LogoMark className="transition-transform duration-300 group-hover:rotate-[8deg]" />
      <span className="font-heading text-xl font-bold tracking-tight">
        get<span className="text-coral">Kerja</span>
      </span>
    </Link>
  );
}
