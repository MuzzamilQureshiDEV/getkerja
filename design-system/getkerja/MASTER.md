# getKerja Design System — MASTER

Generated with **UI/UX Pro Max** (`--design-system "job board recruitment platform premium modern trustworthy" --variance 6 --motion 4`), then customised for a distinctive Malaysian identity. Page-specific overrides go in `pages/<page>.md`.

## Direction
- **Pattern:** Funnel / conversion: hero search → categories → featured jobs → process → trust → CTA.
- **Style:** Flat-modern with soft depth: rounded cards (24–36px radius), subtle mesh gradients, thin borders, gentle hover lift. No heavy skeuomorphism.
- **Signature motif:** Songket-inspired eight-point star pattern (`SongketPattern`), used at 3–7% opacity behind heroes, CTAs and the footer. Abstract KL skyline in the hero.

## Colour tokens (`src/app/globals.css`)
| Token | Light | Dark | Use |
|---|---|---|---|
| `--primary` | oklch(0.43 0.19 277) ink-indigo | oklch(0.72 0.14 278) | Primary actions, links, focus |
| `--coral` | oklch(0.6 0.2 30) hibiscus | oklch(0.66 0.19 32) | Accent CTA (“Post a Job”, “Apply now”), highlights |
| `--teal` | oklch(0.55 0.1 185) | oklch(0.72 0.11 185) | Verified badges, salary, success-adjacent info |
| `--ink` | oklch(0.2 0.06 278) | oklch(0.12 0.03 278) | Dark feature sections, footer |
| `--success` / `--warning` / `--destructive` | reserved | reserved | Status only, always with icon + label |

The skill's default (#0369A1 blue + green) was replaced by the hibiscus-coral and ink-indigo pairing. The *bunga raya* (hibiscus) is Malaysia's national flower, which gives the brand a local identity.

## Typography
- **Headings:** Outfit (geometric, distinctive), `tracking-tight`, `text-wrap: balance`.
- **Body:** DM Sans, 16px base, line-height 1.5–1.7.
- Loaded via `next/font/google` (self-hosted, no layout shift).

## Components & rules
- Touch targets ≥ 44px (buttons `h-10`+, inputs `h-11`).
- Visible labels on every field; errors under the field with an icon; `aria-describedby` wired by `<Field>`.
- Icons: Lucide SVG only (no emoji). Brand icons are custom SVGs in `social-icons.tsx`.
- Motion: 150–300ms micro-interactions; staggered fade-up on scroll (`Reveal`, `Stagger`); respects `prefers-reduced-motion` via `MotionConfig reducedMotion="user"` + a CSS fallback.
- Charts (dashboards): single-hue bars, 4px rounded ends, text in text tokens, hover tooltip, `sr-only` table fallback.

## Anti-patterns to avoid
- Hidden filters on mobile without a clear trigger: use the Filters sheet with an active-count badge.
- Placeholder-only labels.
- Colour-only status (use `StatusBadge` with an icon).
- Raw hex values in components: use tokens.

## Pre-delivery checklist
- [x] No emoji icons · [x] cursor-pointer on interactive · [x] hover transitions 150–300ms
- [x] Contrast ≥ 4.5:1 for text · [x] Visible focus rings · [x] Reduced motion respected
- [x] Responsive at 375 / 768 / 1024 / 1440 (verified no horizontal scroll at 390px)
