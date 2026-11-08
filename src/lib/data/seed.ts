/**
 * Placeholder seed data. All companies, people and roles are fictional.
 * Every job is remote and open to candidates based in Malaysia.
 * Replace with CMS/database records — see README "Managing jobs".
 */
import type { CategorySlug, ExperienceLevel, JobType } from "../constants";
import type { BlogPost, Company, Job, Testimonial } from "../types";

export const seedCompanies: Company[] = [
  { id: "c1", slug: "lumina-tech", name: "Lumina Tech Sdn Bhd", industry: "Software & SaaS", size: "201–500", website: "https://example.com", verified: true, color: "#4F46E5", founded: 2014, about: "Lumina Tech builds cloud software used by over 3,000 SMEs across Southeast Asia, with a fully remote engineering team spread across Malaysia." },
  { id: "c2", slug: "harimau-fintech", name: "Harimau Fintech", industry: "Financial Services", size: "51–200", website: "https://example.com", verified: true, color: "#F97316", founded: 2018, about: "Harimau is a digital payments company making cashless payments simple for Malaysian merchants — remote-first since day one." },
  { id: "c3", slug: "selat-logistics", name: "Selat Logistics Berhad", industry: "Logistics & Freight", size: "1,000+", website: "https://example.com", verified: true, color: "#0D9488", founded: 1996, about: "Selat Logistics runs freight and last-mile delivery networks nationwide, with remote planning, analytics and support teams." },
  { id: "c4", slug: "bayu-health", name: "Bayu Health Group", industry: "Healthcare", size: "1,000+", website: "https://example.com", verified: true, color: "#E11D48", founded: 2002, about: "Bayu Health runs specialist hospitals and clinics, supported by a remote patient-services and medical records team." },
  { id: "c6", slug: "nusantara-engineering", name: "Nusantara Engineering", industry: "Engineering Consultancy", size: "201–500", website: "https://example.com", verified: true, color: "#CA8A04", founded: 2005, about: "Multidisciplinary engineering consultancy delivering infrastructure and renewable energy designs — our design studio works remotely." },
  { id: "c8", slug: "pelita-academy", name: "Pelita Academy", industry: "Online Education", size: "51–200", website: "https://example.com", verified: true, color: "#9333EA", founded: 2012, about: "Pelita Academy delivers live online classes and digital courses to students across Malaysia." },
  { id: "c10", slug: "cendana-retail", name: "Cendana Retail", industry: "Retail & E-commerce", size: "201–500", website: "https://example.com", verified: true, color: "#DB2777", founded: 2016, about: "Omnichannel lifestyle retailer with a fast-growing online marketplace business run by remote teams." },
  { id: "c11", slug: "arus-energy", name: "Arus Energy", industry: "Renewable Energy", size: "51–200", website: "https://example.com", verified: true, color: "#0891B2", founded: 2019, about: "Developer and operator of solar assets powering Malaysia's energy transition." },
  { id: "c12", slug: "kampung-kopi", name: "Kampung Kopi Co.", industry: "Food & Beverage", size: "201–500", website: "https://example.com", verified: true, color: "#78350F", founded: 2015, about: "Homegrown café chain serving Malaysian-roasted coffee, with a remote head-office team." },
];

type JobSeed = {
  title: string;
  company: string;
  category: CategorySlug;
  type: JobType;
  exp: ExperienceLevel;
  min?: number;
  max?: number;
  daysAgo: number;
  skills: string[];
  summary: string;
  featured?: boolean;
  urgent?: boolean;
};

const jobSeeds: JobSeed[] = [
  // ── Easy-start remote jobs (entry / junior, training provided) ──
  { title: "Content Writer (Entry Level)", company: "c10", category: "writing-content", type: "full-time", exp: "entry", min: 2500, max: 3500, daysAgo: 0, skills: ["Writing", "English", "Research", "Canva"], summary: "Write blog posts, product descriptions and social captions. Fresh grads welcome — we train you.", featured: true },
  { title: "Copywriter (Ads & Social Media)", company: "c1", category: "writing-content", type: "full-time", exp: "junior", min: 3200, max: 4500, daysAgo: 1, skills: ["Copywriting", "Social Media", "Meta Ads", "Bahasa Malaysia"], summary: "Write punchy ad copy, emails and landing pages for SME software campaigns.", featured: true },
  { title: "Freelance Blog Writer", company: "c8", category: "writing-content", type: "freelance", exp: "entry", min: 1000, max: 2500, daysAgo: 3, skills: ["Blogging", "SEO Basics", "Google Docs"], summary: "Write 4–8 study-tips articles a month at your own pace. Paid per article." },
  { title: "Customer Support Agent (Live Chat)", company: "c10", category: "customer-service", type: "full-time", exp: "entry", min: 2500, max: 3200, daysAgo: 0, skills: ["Live Chat", "English", "Bahasa Malaysia", "Typing"], summary: "Answer shopper questions via live chat and email. No experience needed — full training provided.", featured: true, urgent: true },
  { title: "Part-time Support Agent (Evenings)", company: "c2", category: "customer-service", type: "part-time", exp: "entry", min: 1400, max: 2000, daysAgo: 2, skills: ["Customer Service", "Email Support", "Patience"], summary: "Flexible evening shifts helping merchants by email — great for students." },
  { title: "HR & Admin Assistant", company: "c3", category: "hr-admin", type: "full-time", exp: "entry", min: 2400, max: 3200, daysAgo: 1, skills: ["Microsoft Office", "Google Sheets", "Scheduling", "Filing"], summary: "Support onboarding, leave records and scheduling for a nationwide team — all online.", featured: true },
  { title: "Data Entry Admin (Part-time)", company: "c4", category: "hr-admin", type: "part-time", exp: "entry", min: 1200, max: 1800, daysAgo: 4, skills: ["Typing", "Excel", "Attention to Detail"], summary: "Update records and spreadsheets accurately, 4 hours a day, from home." },
  { title: "UI Designer (Junior)", company: "c10", category: "design-creative", type: "full-time", exp: "junior", min: 3500, max: 5000, daysAgo: 1, skills: ["Figma", "UI Design", "Mobile Apps", "Design Systems"], summary: "Design clean screens for our shopping app and website with guidance from senior designers.", featured: true },
  { title: "Social Media Graphic Designer", company: "c12", category: "design-creative", type: "part-time", exp: "entry", min: 1500, max: 2400, daysAgo: 5, skills: ["Canva", "Photoshop", "Instagram", "TikTok"], summary: "Create eye-catching posts and short-video covers for our café brand." },
  { title: "Healthcare Admin Assistant", company: "c4", category: "healthcare", type: "full-time", exp: "entry", min: 2300, max: 3000, daysAgo: 0, skills: ["Patient Records", "Microsoft Office", "Phone & Email"], summary: "Manage patient appointment requests and records remotely. Training provided.", urgent: true },
  { title: "Patient Appointment Coordinator", company: "c4", category: "healthcare", type: "part-time", exp: "entry", min: 1500, max: 2200, daysAgo: 3, skills: ["Scheduling", "Customer Service", "Bahasa Malaysia"], summary: "Book and confirm clinic appointments by phone, WhatsApp and email." },
  { title: "Online Maths Tutor (Primary & Secondary)", company: "c8", category: "education", type: "part-time", exp: "entry", min: 1600, max: 2600, daysAgo: 1, skills: ["Mathematics", "Teaching", "Google Meet"], summary: "Teach small online classes after school hours. Lesson plans provided." },
  { title: "Online Class Coordinator", company: "c8", category: "education", type: "full-time", exp: "entry", min: 2500, max: 3200, daysAgo: 2, skills: ["Scheduling", "Google Workspace", "Communication"], summary: "Schedule online classes, support tutors and keep parents updated." },
  { title: "Senior Full-Stack Engineer (React / Node.js)", company: "c1", category: "it-software", type: "full-time", exp: "senior", min: 9000, max: 14000, daysAgo: 0, skills: ["React", "Next.js", "Node.js", "PostgreSQL", "AWS"], summary: "Lead features end-to-end on our SME accounting platform — fully remote, anywhere in Malaysia.", featured: true },
  { title: "Product Designer (UI/UX)", company: "c1", category: "design-creative", type: "full-time", exp: "mid", min: 6000, max: 9000, daysAgo: 2, skills: ["Figma", "Design Systems", "User Research", "Prototyping"], summary: "Shape delightful, accessible experiences for finance tools that SME owners love using.", featured: true },
  { title: "Mobile Engineer (Flutter)", company: "c2", category: "it-software", type: "contract", exp: "mid", min: 8000, max: 11000, daysAgo: 3, skills: ["Flutter", "Dart", "REST APIs", "CI/CD"], summary: "Build the merchant wallet app powering 120,000 daily transactions.", featured: true },
  { title: "DevOps Engineer", company: "c1", category: "it-software", type: "full-time", exp: "senior", min: 10000, max: 15000, daysAgo: 5, skills: ["Kubernetes", "Terraform", "AWS", "Observability"], summary: "Scale reliable, secure infrastructure for a platform processing millions of invoices." },
  { title: "Data Analyst Intern", company: "c11", category: "it-software", type: "internship", exp: "entry", min: 1500, max: 1800, daysAgo: 3, skills: ["Python", "SQL", "Power BI"], summary: "Analyse solar generation data to help optimise plant performance — 6-month remote internship." },
  { title: "Finance Executive", company: "c2", category: "finance-accounting", type: "full-time", exp: "junior", min: 3800, max: 5000, daysAgo: 1, skills: ["MFRS", "SST", "Reconciliation", "Excel"], summary: "Own month-end close, reconciliations and SST filings for a fast-growing payments company.", urgent: true },
  { title: "Accounts Payable Specialist", company: "c3", category: "finance-accounting", type: "contract", exp: "entry", min: 2800, max: 3400, daysAgo: 13, skills: ["SAP", "Invoice Processing", "Excel"], summary: "12-month remote contract with possibility of conversion to permanent." },
  { title: "Digital Marketing Specialist", company: "c10", category: "sales-marketing", type: "full-time", exp: "mid", min: 5000, max: 7000, daysAgo: 1, skills: ["Meta Ads", "Google Ads", "TikTok Shop", "GA4"], summary: "Drive growth across marketplaces and social commerce for a top Malaysian lifestyle brand.", featured: true },
  { title: "Bilingual Content Writer (BM / English)", company: "c10", category: "writing-content", type: "part-time", exp: "junior", min: 2200, max: 3000, daysAgo: 4, skills: ["Copywriting", "Bahasa Malaysia", "SEO"], summary: "Write product stories, emails and social captions in both BM and English." },
  { title: "Inside Sales Executive", company: "c1", category: "sales-marketing", type: "full-time", exp: "junior", min: 3500, max: 4500, daysAgo: 10, skills: ["B2B Sales", "CRM", "Cold Calling"], summary: "Help SMEs discover our software over video calls. Attractive commission scheme." },
  { title: "Freelance Brand Illustrator", company: "c12", category: "design-creative", type: "freelance", exp: "mid", daysAgo: 11, skills: ["Illustration", "Procreate", "Packaging"], summary: "Create seasonal packaging and in-store artwork celebrating Malaysian culture." },
  { title: "Solar PV Design Engineer", company: "c11", category: "engineering", type: "full-time", exp: "junior", min: 4500, max: 6500, daysAgo: 1, skills: ["PVsyst", "AutoCAD", "NEM", "Electrical Design"], summary: "Design rooftop solar systems for commercial clients under Malaysia's NEM programme.", featured: true },
  { title: "CAD Drafter (Civil & Structural)", company: "c6", category: "engineering", type: "contract", exp: "junior", min: 3500, max: 4800, daysAgo: 6, skills: ["AutoCAD", "Revit", "Tekla"], summary: "Produce detailed drawings for infrastructure projects from home." },
  { title: "Medical Coder (ICD-10)", company: "c4", category: "healthcare", type: "full-time", exp: "junior", min: 3200, max: 4500, daysAgo: 0, skills: ["ICD-10", "Medical Terminology", "Billing"], summary: "Code clinical records accurately for our hospital network — remote, with full training.", urgent: true },
  { title: "Supply Chain Analyst", company: "c3", category: "logistics", type: "full-time", exp: "junior", min: 4200, max: 6000, daysAgo: 6, skills: ["SQL", "Power BI", "Forecasting", "Excel"], summary: "Turn freight and warehouse data into insights that cut lead times across our network." },
  { title: "Online English Tutor", company: "c8", category: "education", type: "part-time", exp: "entry", min: 1800, max: 2800, daysAgo: 2, skills: ["English", "Lesson Planning", "Zoom"], summary: "Teach small live online classes to secondary students — flexible evening hours." },
  { title: "Instructional Designer", company: "c8", category: "education", type: "full-time", exp: "mid", min: 5000, max: 7000, daysAgo: 7, skills: ["Articulate", "Curriculum Design", "Canva"], summary: "Design engaging digital courses used by thousands of learners." },
  { title: "Customer Support Associate (Bilingual)", company: "c2", category: "customer-service", type: "full-time", exp: "entry", min: 2800, max: 3500, daysAgo: 0, skills: ["Bahasa Malaysia", "English", "Mandarin", "Zendesk"], summary: "Help merchants succeed via chat and email. Fresh graduates welcome!", urgent: true },
  { title: "Virtual Assistant", company: "c12", category: "hr-admin", type: "part-time", exp: "entry", min: 1500, max: 2200, daysAgo: 6, skills: ["Google Workspace", "Scheduling", "Communication"], summary: "Support our leadership team with calendars, documents and coordination." },
  { title: "Talent Acquisition Specialist", company: "c12", category: "hr-admin", type: "full-time", exp: "mid", min: 5000, max: 7000, daysAgo: 4, skills: ["Sourcing", "Interviewing", "LinkedIn Recruiter"], summary: "Recruit and interview great people for our growing café network — all via video." },
];

const categoryTemplates: Record<CategorySlug, { resp: string[]; req: string[] }> = {
  "writing-content": {
    resp: ["Write clear, engaging content for websites, blogs and social media", "Research topics and follow our tone-of-voice guide", "Edit and proofread your own and others’ work", "Meet weekly deadlines agreed with your editor"],
    req: ["Good written English (Bahasa Malaysia is a plus)", "A few writing samples — school or personal work is fine", "Comfortable with Google Docs", "Based in Malaysia with a reliable internet connection"],
  },
  "design-creative": {
    resp: ["Design screens, graphics and social media visuals", "Turn feedback into polished designs quickly", "Keep files organised and follow brand guidelines", "Collaborate with the team over chat and video calls"],
    req: ["A portfolio (personal or student projects welcome)", "Experience with Figma, Canva or Adobe tools", "An eye for clean layouts and colour", "Based in Malaysia with a reliable internet connection"],
  },
  "it-software": {
    resp: ["Design, build and ship high-quality features with a remote cross-functional squad", "Write clean, tested and well-documented code", "Participate in async code reviews and architecture discussions", "Monitor production systems and continuously improve performance"],
    req: ["Degree in Computer Science or equivalent practical experience", "Strong written communication in English", "Experience working in remote or distributed teams", "Based in Malaysia with a reliable internet connection"],
  },
  "finance-accounting": {
    resp: ["Prepare monthly management accounts and reconciliations", "Handle SST, withholding tax and statutory submissions", "Liaise with auditors and tax agents online", "Support budgeting and forecasting cycles"],
    req: ["Degree in Accounting / ACCA / CIMA (part-qualified welcome)", "Knowledge of MFRS and Malaysian tax regulations", "Proficient in Excel and cloud accounting software", "Based in Malaysia with a reliable internet connection"],
  },
  "sales-marketing": {
    resp: ["Plan and execute campaigns across digital channels", "Track performance and report on KPIs weekly", "Collaborate with creative, product and sales teams remotely", "Build strong relationships with partners and customers"],
    req: ["Diploma/Degree in Marketing, Business or related field", "Data-driven mindset with strong communication skills", "Fluency in Bahasa Malaysia and English; Mandarin is an advantage", "Based in Malaysia with a reliable internet connection"],
  },
  engineering: {
    resp: ["Prepare designs, calculations and technical drawings", "Coordinate with project teams over video calls", "Review designs for compliance with Malaysian standards", "Support project planning and documentation"],
    req: ["Diploma/Degree in a relevant engineering discipline", "Proficiency with relevant design software", "Self-managed and comfortable working remotely", "Based in Malaysia with a reliable internet connection"],
  },
  healthcare: {
    resp: ["Process clinical and administrative records accurately", "Maintain patient confidentiality at all times", "Work with clinical teams to resolve queries", "Meet quality and turnaround targets"],
    req: ["Diploma/Degree in a health-related field", "Strong attention to detail", "A quiet, private workspace at home", "Based in Malaysia with a reliable internet connection"],
  },
  logistics: {
    resp: ["Analyse inbound and outbound operations data", "Monitor KPIs and flag issues early", "Build dashboards for operations teams", "Collaborate with transport partners and customers"],
    req: ["Diploma/Degree in Logistics, Supply Chain or related", "Strong Excel / SQL skills", "Clear written communication", "Based in Malaysia with a reliable internet connection"],
  },
  education: {
    resp: ["Plan and deliver engaging online lessons", "Assess student progress and provide feedback", "Communicate with parents and guardians", "Create digital learning resources"],
    req: ["Degree in a relevant subject", "Passion for student-centred learning", "Excellent command of English", "Based in Malaysia with a reliable internet connection and webcam"],
  },
  "customer-service": {
    resp: ["Respond to customer queries via chat and email", "Resolve issues quickly and empathetically", "Log cases accurately in our helpdesk", "Share customer insights with product teams"],
    req: ["SPM/Diploma/Degree in any field", "Good command of Bahasa Malaysia and English", "Patient, positive and solution-oriented", "Based in Malaysia with a reliable internet connection"],
  },
  "hr-admin": {
    resp: ["Support recruitment, onboarding and coordination", "Maintain accurate records and documents", "Schedule meetings and interviews", "Coordinate with teams across time zones"],
    req: ["Diploma/Degree in HR, Business or related field", "Highly organised and proactive", "Proficient in Google Workspace / Microsoft Office", "Based in Malaysia with a reliable internet connection"],
  },
};

const BENEFITS = [
  "100% remote — work from anywhere in Malaysia",
  "EPF, SOCSO & EIS contributions",
  "Internet & equipment allowance",
  "Medical coverage",
  "Flexible working hours",
  "Annual leave from 16 days",
];

function slugFor(title: string, i: number) {
  return (
    title
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") + `-${1000 + i}`
  );
}

export function buildSeedJobs(now = Date.now()): Job[] {
  return jobSeeds.map((s, i) => {
    const t = categoryTemplates[s.category];
    const company = seedCompanies.find((c) => c.id === s.company)!;
    const posted = new Date(now - s.daysAgo * 86400000 - i * 3600000);
    const deadline = new Date(posted.getTime() + 45 * 86400000);
    return {
      id: `j${i + 1}`,
      slug: slugFor(s.title, i),
      title: s.title,
      companyId: s.company,
      category: s.category,
      type: s.type,
      experience: s.exp,
      salaryMin: s.min,
      salaryMax: s.max,
      salaryHidden: !s.min && !s.max,
      summary: s.summary,
      description: `${s.summary}\n\nThis is a fully remote role — you can work from anywhere in Malaysia. At ${company.name}, you'll join a team that values ownership, clear communication and doing right by our customers. Interviews are held online via Google Meet.`,
      responsibilities: t.resp,
      requirements: t.req,
      benefits: BENEFITS.slice(0, 4 + (i % 3)),
      skills: s.skills,
      postedAt: posted.toISOString(),
      deadline: deadline.toISOString(),
      status: "active",
      featured: s.featured,
      urgent: s.urgent,
    } satisfies Job;
  });
}

export const testimonials: Testimonial[] = [
  { name: "Nurul Aisyah", role: "Medical Coder", company: "Penang", quote: "I filled in the form on Monday, got an email with a Google Meet link on Wednesday, and had an offer the following week. No account, no hassle.", type: "candidate", rating: 5 },
  { name: "Daniel Lim", role: "Software Engineer", company: "Kuala Lumpur", quote: "Salary ranges on every listing saved me so much time. I found a remote role that actually matched my expectations.", type: "candidate", rating: 5 },
  { name: "Priya Ramasamy", role: "Fresh Graduate, Accounting", company: "Selangor", quote: "As a fresh grad I was nervous, but the process was so simple — one form, one online interview, and I landed my first remote role in 3 weeks.", type: "candidate", rating: 5 },
  { name: "Ahmad Faiz", role: "Head of Talent", company: "Logistics company, Selangor", quote: "getKerja screened and interviewed candidates for us online. We hired 6 remote analysts in a month.", type: "employer", rating: 5 },
  { name: "Grace Wong", role: "HR Director", company: "Healthcare group, Penang", quote: "Every candidate they sent us had already been interviewed. It saved our HR team weeks of work.", type: "employer", rating: 5 },
  { name: "Hafiz Rahman", role: "Founder", company: "Tech startup, KL", quote: "We sent them a job description on Monday and had a shortlist of remote engineers by Friday.", type: "employer", rating: 4 },
];

const longBody = (intro: string, sections: [string, string][]) =>
  `<p>${intro}</p>` + sections.map(([h, p]) => `<h2>${h}</h2>${p}`).join("");

export const blogPosts: BlogPost[] = [
  {
    slug: "malaysian-cv-guide-2026",
    title: "How to Write a CV That Gets Shortlisted in Malaysia (2026 Guide)",
    excerpt: "Recruiters spend under 10 seconds on a first scan. Here's how to structure your CV so the important bits land immediately.",
    category: "CV Writing",
    author: { name: "Siti Mariam", role: "Senior Talent Consultant" },
    publishedAt: "2026-10-28",
    readMinutes: 7,
    cover: "/images/blog/cv.svg",
    body: longBody("A strong CV is clear, scannable and tailored. Malaysian employers increasingly use applicant tracking systems (ATS), so formatting matters as much as content.", [
      ["Keep it to two pages", "<p>Unless you're a senior professional with 15+ years of experience, two pages is the sweet spot. Lead with a three-line professional summary that states your role, years of experience and biggest strength.</p>"],
      ["Personal details: less is more", "<p>Include your name, phone, email, LinkedIn and city. You <strong>do not</strong> need to include your IC number, religion, marital status or photo unless the employer specifically requests it — this also helps protect your personal data under the PDPA.</p>"],
      ["Show impact, not duties", "<ul><li>Instead of “Handled customer complaints”, write “Resolved 40+ cases weekly, raising CSAT from 82% to 94%”.</li><li>Use numbers: RM saved, % improved, team size, projects delivered.</li></ul>"],
      ["Tailor for every role", "<p>Mirror keywords from the job ad (e.g. “MFRS”, “SST”, “Kubernetes”) where they genuinely reflect your skills. ATS tools rank you higher, and human recruiters see an immediate fit.</p>"],
    ]),
  },
  {
    slug: "interview-questions-malaysia",
    title: "12 Interview Questions Malaysian Employers Love to Ask",
    excerpt: "From “Why should we hire you?” to expected salary — model answers and the thinking behind each one.",
    category: "Interview Tips",
    author: { name: "Jason Teh", role: "Career Coach" },
    publishedAt: "2026-10-20",
    readMinutes: 9,
    cover: "/images/blog/interview.svg",
    body: longBody("Preparation beats nerves. Most interviews in Malaysia follow a familiar pattern, so practising your answers out loud makes a real difference.", [
      ["“Tell me about yourself”", "<p>Use the present–past–future formula: what you do now, what you've achieved before, and why this role is your logical next step. Keep it under 90 seconds.</p>"],
      ["“What is your expected salary?”", "<p>Research the market range first (see our salary insights). Give a range anchored slightly above your target, and mention you're open to discussing the full package including EPF, allowances and bonus.</p>"],
      ["“Why are you leaving your current job?”", "<p>Stay positive and forward-looking. Focus on growth, scope or learning rather than criticising your current employer.</p>"],
      ["Questions to ask them", "<ol><li>What does success look like in the first 90 days?</li><li>How is performance reviewed?</li><li>What do you enjoy most about working here?</li></ol>"],
    ]),
  },
  {
    slug: "salary-guide-tech-malaysia-2026",
    title: "Malaysia Tech Salary Guide 2026: What Engineers Really Earn",
    excerpt: "Benchmark your pay with ranges for software, data and DevOps roles across Klang Valley, Penang and remote.",
    category: "Salary Insights",
    author: { name: "Aaron Chew", role: "Data & Insights Lead" },
    publishedAt: "2026-10-12",
    readMinutes: 6,
    cover: "/images/blog/salary.svg",
    body: longBody("Based on anonymised listings and placements on getKerja over the last 12 months, here's how monthly salaries compare. Figures are indicative placeholders — replace with your own market data.", [
      ["Software engineering", "<ul><li>Junior (1–3 yrs): RM 4,500 – RM 7,000</li><li>Mid (3–5 yrs): RM 7,000 – RM 11,000</li><li>Senior (5+ yrs): RM 11,000 – RM 18,000</li></ul>"],
      ["Data & analytics", "<ul><li>Analyst: RM 4,000 – RM 7,500</li><li>Data Engineer: RM 7,000 – RM 13,000</li></ul>"],
      ["Remote premium", "<p>Remote roles with regional companies pay on average 10–20% more, but often come with contract terms. Always check EPF and leave entitlements.</p>"],
    ]),
  },
  {
    slug: "hiring-trends-malaysia-2027",
    title: "5 Hiring Trends Shaping Malaysian Workplaces in 2027",
    excerpt: "Skills-based hiring, hybrid work, and the semiconductor boom in Penang and Kulim — what employers need to know.",
    category: "Hiring Trends",
    author: { name: "Farah Hanim", role: "Head of Employer Success" },
    publishedAt: "2026-10-02",
    readMinutes: 5,
    cover: "/images/blog/trends.svg",
    body: longBody("The Malaysian job market continues to evolve quickly. Here are the shifts we see across thousands of vacancies.", [
      ["1. Skills over degrees", "<p>More employers are dropping strict degree requirements in favour of demonstrable skills and portfolios — especially in tech and digital marketing.</p>"],
      ["2. Hybrid is the default", "<p>Over half of white-collar listings now offer hybrid arrangements. Candidates filter for it, so state your policy clearly.</p>"],
      ["3. Northern corridor growth", "<p>Semiconductor and electronics investments in Penang and Kedah are driving strong demand for engineers and technicians.</p>"],
      ["4. Salary transparency", "<p>Listings with salary ranges receive significantly more applications. Transparency builds trust.</p>"],
      ["5. Faster processes win", "<p>Top candidates are off the market within two weeks. Shorten your interview loop to secure talent.</p>"],
    ]),
  },
  {
    slug: "job-search-strategy-fresh-graduates",
    title: "A 30-Day Job Search Plan for Fresh Graduates",
    excerpt: "A week-by-week plan to go from graduation to job offer — with templates and daily habits that work.",
    category: "Job Search",
    author: { name: "Siti Mariam", role: "Senior Talent Consultant" },
    publishedAt: "2026-09-24",
    readMinutes: 8,
    cover: "/images/blog/search.svg",
    body: longBody("Landing your first job is a project. Treat it like one with clear weekly goals.", [
      ["Week 1: Foundations", "<p>Polish your CV, shortlist 10 remote roles that fit your skills, and set up a quiet, well-lit spot for online interviews.</p>"],
      ["Week 2: Apply with intent", "<p>Aim for 5 quality, tailored applications per day rather than 50 generic ones.</p>"],
      ["Week 3: Network", "<p>Reach out to alumni on LinkedIn, attend career fairs and ask for informational chats.</p>"],
      ["Week 4: Interview & negotiate", "<p>Practise common questions, research salaries and evaluate offers on the total package, not just basic pay.</p>"],
    ]),
  },
  {
    slug: "writing-job-ads-that-attract-talent",
    title: "Writing Job Ads That Attract the Right Talent",
    excerpt: "A practical checklist for employers: titles, salary ranges, inclusive language and the details candidates look for first.",
    category: "Hiring Trends",
    author: { name: "Farah Hanim", role: "Head of Employer Success" },
    publishedAt: "2026-09-15",
    readMinutes: 5,
    cover: "/images/blog/ads.svg",
    body: longBody("Your job ad is a marketing page for your company. Small changes can double your qualified applicants.", [
      ["Use searchable titles", "<p>“Senior Accountant” beats “Finance Ninja”. Candidates search for familiar titles.</p>"],
      ["Always include salary", "<p>Even a broad range helps candidates self-select and boosts application rates.</p>"],
      ["Separate must-haves from nice-to-haves", "<p>Long requirement lists discourage strong candidates — especially women and fresh grads — from applying.</p>"],
    ]),
  },
];
