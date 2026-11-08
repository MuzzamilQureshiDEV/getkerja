import Image from "next/image";
import { initials } from "@/lib/format";
import type { Company } from "@/lib/types";
import { cn } from "@/lib/utils";

const sizes = { sm: "size-10 text-sm rounded-xl", md: "size-12 text-base rounded-2xl", lg: "size-16 text-xl rounded-2xl" };

const px = { sm: 40, md: 48, lg: 64 };

/** Company logo: uses `company.logo` (an image in /public) when set, otherwise a branded monogram. */
export function CompanyLogo({ company, size = "md", className }: { company: Pick<Company, "name" | "color" | "logo">; size?: keyof typeof sizes; className?: string }) {
  if (company.logo) {
    return (
      <Image
        src={company.logo}
        alt={`${company.name} logo`}
        width={px[size]}
        height={px[size]}
        className={cn("shrink-0 border bg-white object-contain p-1", sizes[size], className)}
      />
    );
  }
  return (
    <div
      aria-hidden
      className={cn("relative grid shrink-0 place-items-center overflow-hidden font-heading font-bold text-white shadow-sm", sizes[size], className)}
      style={{ background: `linear-gradient(135deg, ${company.color}, color-mix(in oklch, ${company.color} 55%, black))` }}
    >
      <span className="relative z-10">{initials(company.name)}</span>
      <span className="absolute -right-2 -bottom-2 size-6 rounded-full bg-white/15" />
    </div>
  );
}
