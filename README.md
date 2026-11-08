# getKerja: Remote Jobs for Malaysians

A responsive, SEO-friendly recruitment website for **remote jobs in Malaysia**, built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **shadcn/ui** and **Motion** (Framer Motion).

## How it works

There are **no user accounts**. The hiring process runs entirely by email:

1. **Fill the form with your CV.** The candidate enters their details and attaches a CV (PDF/DOC/DOCX, max 5 MB).
2. **Select the job.** They choose which remote role they're applying for.
3. **Get interviewed.** The application arrives in your recruitment inbox with the CV attached. Click **Reply**: it goes straight to the candidate, so you can send them a **Google Meet link**.
4. **Get selected.** Interview them online and send the offer by email.

Each application sends two emails:

| To | Contents |
|---|---|
| Your inbox (`APPLICATIONS_EMAIL`) | Candidate details, cover letter, job, **CV attached**. Reply-To is the candidate. |
| The candidate | Confirmation: "If you're shortlisted, we'll reply with a Google Meet link." |

---

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev                     # http://localhost:3000
```

Without `RESEND_API_KEY`, emails are **printed to the terminal** instead of sent, so you can test the flow locally.

### Receiving real applications

1. Create a free account at [resend.com](https://resend.com) and verify your domain.
2. In `.env.local` (and in your hosting provider's environment variables):
   ```bash
   RESEND_API_KEY=re_xxxxxxxx
   EMAIL_FROM="getKerja <careers@yourdomain.my>"
   APPLICATIONS_EMAIL=careers@yourdomain.my
   ```
3. Restart the server. Applications will now arrive in that inbox with the CV attached.

To use another provider (Gmail SMTP, AWS SES, Postmark…), replace the `fetch` call in `src/lib/email.ts`.

---

## Pages

| Page | What it does |
|---|---|
| `/` Home | Hero with search (keyword and job type), stats, remote job categories, featured jobs, **How it works** (4 steps), why choose us, testimonials, employer CTA, newsletter |
| `/jobs` | Remote job listings: keyword search, filters (category, job type, experience, minimum salary, date posted), sorting, pagination, empty state |
| `/jobs/[slug]` | Job details with JobPosting structured data marking it as remote work in Malaysia, share buttons, similar jobs, and an **Apply now** button |
| `/apply` | The single application form: details, CV upload, job selection, PDPA consent, confirmation screen. `/apply?job=<id>` preselects a job |
| `/employers` | "We hire for you" recruitment service, linking to the contact form for quotes |
| `/about`, `/contact`, `/blog`, `/faq`, `/privacy`, `/terms` | Content pages. The contact form is spam-protected; the privacy page includes a PDPA notice |

---

## Managing jobs

Jobs are defined in **`src/lib/data/seed.ts`** (`seedCompanies` and `jobSeeds`). To add, edit or remove a job, change that file and redeploy. Every job is treated as remote.

To manage jobs without touching code:
- **CMS:** move jobs into Sanity, Contentful, Strapi or a Google Sheet, and fetch them in `src/lib/db.ts`. Only that file reads job data.
- **Database:** `prisma/schema.prisma` provides an optional schema (companies, categories, jobs, application log). Run `npm i @prisma/client && npm i -D prisma`, set `DATABASE_URL`, run `npx prisma migrate dev`, then swap the functions in `db.ts` for Prisma queries. You can then edit jobs in Prisma Studio.

---

## Folder structure

```
src/
├─ app/
│  ├─ layout.tsx                # fonts, theme, Organization JSON-LD
│  ├─ globals.css               # design tokens (light/dark)
│  ├─ (site)/                   # all pages share navbar + footer
│  │  ├─ page.tsx               # home
│  │  ├─ jobs/ jobs/[slug]/     # listings + details
│  │  ├─ apply/                 # the application form
│  │  └─ employers/ about/ contact/ blog/ faq/ privacy/ terms/
│  └─ sitemap.ts robots.ts opengraph-image.tsx
├─ components/
│  ├─ home/ jobs/ layout/ forms/ shared/ ui/
├─ lib/
│  ├─ actions/apply.ts          # ← application → emails (CV attached)
│  ├─ actions/site.ts           # contact form, newsletter, language
│  ├─ email.ts                  # Resend adapter (console fallback)
│  ├─ data/seed.ts              # ← jobs, companies, blog, testimonials
│  ├─ db.ts                     # job search / data access
│  ├─ validation.ts             # zod schemas (Malaysian phone format…)
│  ├─ security.ts               # rate limiting, CV file validation
│  ├─ i18n/                     # English + Bahasa Malaysia strings
│  └─ constants.ts              # site info, categories, job types
```

---

## Security and spam protection

- **CV checks:** files are checked for size (5 MB), extension **and file signature**, so a renamed file is rejected.
- **Spam traps:** the application, contact and newsletter forms include a hidden honeypot field. The contact form also enforces a minimum fill time.
- **Rate limits:** limited per IP address (in memory; switch to Upstash Redis if you run several servers).
- **Optional:** add Cloudflare Turnstile. Verify the token in `src/lib/actions/apply.ts` and `site.ts`.
- **Security headers** are set in `next.config.ts`.

## Bilingual (Bahasa Malaysia)

The EN/BM switch in the navbar translates the navbar, hero and footer (`src/lib/i18n/en.ts` and `ms.ts`). To translate more text, add keys to both files and read them with `getT()`.

## Design system

The design was generated with the **UI/UX Pro Max** skill and then customised. See `design-system/getkerja/MASTER.md`:
- **Palette:** ink-indigo with a hibiscus-coral accent (after Malaysia's national flower), plus teal.
- **Fonts:** Outfit and DM Sans.
- **Signature details:** a songket-inspired pattern.
- **Light/dark mode**, accessible focus states and 44px touch targets.

## Deploying

The site runs on any Node host (Vercel, Hostinger Node.js, Railway, a VPS):

```bash
npm run build && npm start
```

Set `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `EMAIL_FROM` and `APPLICATIONS_EMAIL`. Have a Malaysian legal professional review `/privacy` (PDPA) and `/terms` before launch.

## Replacing placeholder content

| What | Where |
|---|---|
| Company name, address, phone, emails, socials | `src/lib/constants.ts` → `SITE` |
| Jobs, companies, blog posts, testimonials | `src/lib/data/seed.ts` |
| Homepage stats | `src/components/home/stats.tsx` |
| Company logos | Add `logo: "/logos/name.png"` to a company in `seed.ts` (file in `public/logos/`) |
| Logo and favicon | `src/components/shared/logo.tsx`, `src/app/icon.svg` |
