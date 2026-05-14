## TeacherPoint — Full Frontend Build Plan

A production-quality edtech marketplace inspired by Udemy + Tutedude, using your TeacherPoint logo and a blue/sky/white + purple accent palette. All frontend, mock data only, ready for backend integration later.

Stack: TanStack Start (React 19, file-based routing — Next.js-compatible patterns), Tailwind v4, shadcn/ui, Framer Motion, Lucide icons. Light + dark mode, fully responsive, SEO meta per route.

### 1. Brand & Design System
- Add logo to `src/assets/teacherpoint-logo.png`
- Tokens in `src/styles.css`: primary blue `#1E3A8A`, sky `#38BDF8`, accent purple `#7C3AED`, soft surfaces, rounded-2xl cards, soft shadows
- Typography: Plus Jakarta Sans (headings) + Inter (body)
- Dark mode via `.dark` class + toggle in header
- Reusable primitives: `CourseCard`, `TutorCard`, `SectionHeading`, `StatPill`, `Badge` (Verified, Top 10%), `PriceTag`

### 2. Routes (file-based under `src/routes/`)
Public:
- `/` Home
- `/login`, `/register`, `/role-select`
- `/tutors`, `/tutors/$id`
- `/courses`, `/courses/$id`
- `/marketplace`, `/post-requirement`
- `/about`, `/contact`, `/faq`, `/pricing`

Authenticated layout `_authenticated/`:
- `/student` dashboard (saved tutors, enrolled, progress, certificates, messages, tickets)
- `/teacher` dashboard (profile, courses, requests, earnings, reviews, verification)
- `/parent` dashboard (child progress, saved tutors, payments)
- `/admin` dashboard with sidebar (users, tutors, students, parents, courses, approvals, jobs, banners, ads, geo CMS, reports, revenue, commissions, tickets, notifications, settings)
- `/lms` (course creation, curriculum builder, lessons, quiz, assignments, certificate preview)
- `/messages`, `/reviews`, `/support`, `/payments`

Role switching via mock auth context stored in localStorage; demo logins for each role.

### 3. Home Page Sections (in order)
1. Top promo bar
2. Sticky header: logo, nav (Categories, Tutors, Courses, LMS, Marketplace), search w/ autocomplete, language (EN/HI), dark toggle, login/signup
3. Hero banner — "Find the best tutors and online courses with TeacherPoint" + 3 CTAs
4. Trust stats strip (500+ students, 4.9★, verified, secure payment)
5. How It Works (Search → Contact → Learn)
6. Category tabs + Trending Courses carousel (Udemy-style cards)
7. Learn AI / Learn Skills feature band
8. Featured Tutors grid
9. Reimagine Your Career banner (purple Tutedude-style)
10. Courses by Industry Experts section
11. Skills/Tools grid cards
12. Combo Packs / learning bundles
13. Certification preview section
14. Top Subjects / Popular Skills chips
15. Comparison table (TeacherPoint vs others)
16. Testimonials cards + Video testimonials row
17. FAQ accordion
18. CTA band + Dark footer (link columns, socials, newsletter)

### 4. Global Features
- Floating AI chatbot widget (open/close, quick questions, WhatsApp button)
- Mobile bottom nav (Home, Tutors, Courses, Messages, Profile)
- Sticky mobile search FAB
- Voice search button (UI only)
- Onboarding tooltip overlay (first visit)
- Gamification badge components

### 5. Search & Filters
- Tutor filters: subject, price, experience, rating, location, mode, verified, language, gender, availability
- Course filters: category, level, price, rating, duration, certificate, language
- All working against mock data with URL search params

### 6. Mock Data (`src/data/`)
- `tutors.ts` (Emma, Sarah, Mark, Anna + 12 more)
- `courses.ts` (AI Agents, PMP, Python, Data Science, etc. + 16 more)
- `categories.ts`, `testimonials.ts`, `faqs.ts`, `combos.ts`, `skills.ts`
- `users.ts` for role demo logins
- `notifications.ts`, `tickets.ts`, `payments.ts`

### 7. Dashboards
Each role gets a sidebar layout with cards, charts (Recharts), tables (shadcn Table), and tabbed views. Admin gets richest UI with approval actions, revenue chart, commission breakdown, push notification composer, geo CMS uploader (mock).

### 8. LMS
Course builder with drag-style curriculum sections, lesson list, quiz builder UI, assignment upload, progress tracker, certificate preview card.

### 9. Payments UI
Plan cards (Free/Pro/Premium), checkout modal with Razorpay/Stripe/PayPal logos, currency switcher, invoice card, commission tracking table.

### 10. SEO & Accessibility
- `head()` per route with title/description/og tags
- One `<h1>` per page, semantic `<main>`, alt text everywhere
- `aria-label` on icon buttons, focus rings, keyboard-nav modals
- `public/robots.txt`, `public/sitemap.xml` placeholders

### 11. Images
- Generated hero/banner images (3–4 premium gradient/edtech scenes) into `src/assets/`
- Tutor avatars + course thumbnails as gradient cards with initials/icons (no external URLs needed, fully offline)

### Technical notes
- TanStack Start (the project's framework) — Next.js-compatible component patterns; if you later migrate to Next.js, components transfer cleanly since logic is plain React + Tailwind.
- All state is local/mock; no backend calls. Auth is a `useAuth()` context with role switcher.
- Framer Motion for hero, card hovers, section reveals.
- Build is large (~25 routes, ~60 components); will be delivered in one pass with clean folder structure.

### Folder structure
```text
src/
  routes/                 # all pages
  components/
    layout/               # Header, Footer, MobileNav, Sidebar
    home/                 # Hero, Trending, Combos, Comparison, FAQ...
    cards/                # CourseCard, TutorCard, ComboCard
    dashboard/            # shared dashboard widgets
    admin/                # admin tables, charts
    lms/                  # builder, quiz, certificate
    chat/                 # AI widget
    ui/                   # shadcn (existing)
  data/                   # mock data
  hooks/                  # useAuth, useTheme, useLanguage
  lib/                    # utils, formatters
  assets/                 # logo + generated images
```

Ready to build on approval.