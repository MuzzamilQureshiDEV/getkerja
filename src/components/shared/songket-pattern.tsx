import { cn } from "@/lib/utils";

/**
 * Decorative geometric pattern inspired by songket & batik motifs.
 * Purely decorative: aria-hidden, uses currentColor so it adapts to theme.
 */
export function SongketPattern({ className, id = "songket" }: { className?: string; id?: string }) {
  return (
    <svg aria-hidden="true" className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}>
      <defs>
        <pattern id={id} width="56" height="56" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M28 6l6 16 16 6-16 6-6 16-6-16-16-6 16-6z" />
            <path d="M28 18l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
            <circle cx="0" cy="0" r="3" />
            <circle cx="56" cy="0" r="3" />
            <circle cx="0" cy="56" r="3" />
            <circle cx="56" cy="56" r="3" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
