"use client";

import { Link2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FacebookIcon, LinkedinIcon, WhatsappIcon, XIcon } from "@/components/shared/social-icons";

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { label: "WhatsApp", href: `https://wa.me/?text=${t}%20${u}`, Icon: WhatsappIcon },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, Icon: LinkedinIcon },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, Icon: FacebookIcon },
    { label: "X", href: `https://x.com/intent/post?url=${u}&text=${t}`, Icon: XIcon },
  ];

  const copy = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    } catch {
      /* user cancelled */
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {links.map(({ label, href, Icon }) => (
        <Button key={label} asChild variant="outline" size="icon" className="rounded-full">
          <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${label}`}>
            <Icon className="size-4" />
          </a>
        </Button>
      ))}
      <Button variant="outline" size="icon" className="rounded-full" onClick={copy} aria-label="Copy link or share">
        <Link2 className="size-4" />
      </Button>
    </div>
  );
}
