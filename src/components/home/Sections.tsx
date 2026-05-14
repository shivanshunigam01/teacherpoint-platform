import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Search, GraduationCap, Users, Briefcase, ShieldCheck, Sparkles, PlayCircle,
  CheckCircle2, X, Award, ArrowRight, Star, Quote, Bot, Target, Hammer,
  Code2, Palette, Table, BarChart3, Atom, Database, PieChart, Cloud, Image,
  Brain, FileText, MessageCircle, Megaphone, Languages, Code, Briefcase as Bcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CourseCard } from "@/components/cards/CourseCard";
import { TutorCard } from "@/components/cards/TutorCard";
import { SectionHeading } from "@/components/SectionHeading";
import {
  COURSES as COURSES_SEED, TUTORS as TUTORS_SEED, CATEGORIES, SKILLS, COMBOS as COMBOS_SEED, TESTIMONIALS, FAQS,
  COMPANIES, STATS, HOW_IT_WORKS, LEARNING_TIMELINE, COMPARISON,
} from "@/data/mock";
import { useAdminStore } from "@/hooks/use-admin-store";
import hero from "@/assets/hero-illustration.jpg";
import careerBanner from "@/assets/career-banner.jpg";
import { courseImage, tutorImage } from "@/data/images";

const ICONS: Record<string, any> = {
  Sparkles, Code, Brain, BarChart3, Palette, Briefcase: Bcase, Megaphone, Languages, GraduationCap,
  Search, MessageCircle, Bot, Code2, Table, Atom, Database, PieChart, Cloud, Image, FileText,
  PlayCircle, Target, Hammer, Award,
};

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-purple/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-sky/30 blur-3xl" />
      </div>
      <div className="container mx-auto px-4 py-12 md:py-20 grid lg:grid-cols-2 gap-10 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Badge className="mb-4 bg-purple-soft text-purple border-0">
            <Sparkles className="h-3 w-3 mr-1" />New: AI Learning Assistant is live
          </Badge>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
            Find the best <span className="text-gradient-primary">tutors</span> and<br />
            online <span className="text-gradient-primary">courses</span> with TeacherPoint
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-xl">
            12,500+ verified expert tutors. 850K+ students. Live 1-on-1 sessions, lifetime course access, and certificates that get you hired.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-gradient-primary"><Link to="/tutors"><Users className="h-4 w-4 mr-2" />Find Tutor</Link></Button>
            <Button asChild size="lg" variant="outline"><Link to="/courses"><GraduationCap className="h-4 w-4 mr-2" />Browse Courses</Link></Button>
            <Button asChild size="lg" variant="ghost"><Link to="/role-select"><Briefcase className="h-4 w-4 mr-2" />Become a Teacher</Link></Button>
          </div>
          <div className="mt-6 max-w-xl relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Try 'AI courses', 'JEE Math tutor', 'Spoken English'…" className="pl-11 h-12 rounded-full shadow-soft" />
            <Button size="sm" className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-gradient-primary">Search</Button>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-emerald-600" /> Verified tutors</span>
            <span className="flex items-center gap-1.5"><Award className="h-4 w-4 text-amber-500" /> Industry certificates</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-sky" /> 7-day refund</span>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="relative">
          <div className="relative rounded-3xl overflow-hidden shadow-card">
            <img src={hero} alt="Students learning with TeacherPoint" width={1536} height={1024} className="w-full h-auto" />
          </div>
          <div className="absolute -bottom-4 -left-4 bg-card border rounded-2xl p-4 shadow-card hidden md:block">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-primary grid place-items-center text-white"><Users className="h-5 w-5" /></div>
              <div>
                <div className="font-bold text-sm">850K+ students</div>
                <div className="text-xs text-muted-foreground">across 120 countries</div>
              </div>
            </div>
          </div>
          <div className="absolute -top-4 -right-4 bg-card border rounded-2xl p-4 shadow-card hidden md:block">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-amber-100 grid place-items-center"><Star className="h-5 w-5 fill-amber-500 text-amber-500" /></div>
              <div>
                <div className="font-bold text-sm">4.9 average</div>
                <div className="text-xs text-muted-foreground">from 280K reviews</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function TrustStats() {
  return (
    <section className="border-y bg-muted/30">
      <div className="container mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-display font-extrabold text-2xl md:text-3xl text-gradient-primary">{s.value}</div>
            <div className="text-xs md:text-sm text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-20">
      <SectionHeading eyebrow="How it works" title="Start learning in three simple steps" subtitle="From discovering the right tutor to earning a certificate — TeacherPoint makes it effortless." />
      <div className="grid md:grid-cols-3 gap-6">
        {HOW_IT_WORKS.map((s, i) => {
          const Icon = ICONS[s.icon];
          return (
            <motion.div key={s.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="relative bg-card border rounded-2xl p-6 hover:shadow-card transition h-full">
                <div className="text-7xl font-display font-extrabold text-primary/10 absolute top-2 right-4">{s.step}</div>
                <div className="h-12 w-12 rounded-xl bg-gradient-primary text-primary-foreground grid place-items-center mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display font-bold text-xl mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export function TrendingCourses() {
  const { courses: COURSES } = useAdminStore();
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <SectionHeading
        eyebrow="Trending"
        title="Courses students love right now"
        subtitle="Hand-picked, top-rated courses from our verified instructors."
        action={<Button asChild variant="ghost" className="hidden md:inline-flex"><Link to="/courses">View all <ArrowRight className="h-4 w-4 ml-1" /></Link></Button>}
      />
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-transparent h-auto flex-wrap justify-start gap-2 mb-6 p-0">
          {CATEGORIES.map((c) => (
            <TabsTrigger key={c.id} value={c.id} className="rounded-full border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-1.5">
              {c.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {CATEGORIES.map((c) => {
          const items = c.id === "all" ? COURSES.slice(0, 8) : COURSES.filter((x) => x.category.toLowerCase().includes(c.name.toLowerCase())).slice(0, 8);
          return (
            <TabsContent key={c.id} value={c.id}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {(items.length ? items : COURSES.slice(0, 4)).map((course) => <CourseCard key={course.id} course={course} />)}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </section>
  );
}

export function LearnAI() {
  const { courses: COURSES } = useAdminStore();
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500 text-white p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center relative">
        <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at 80% 20%, white, transparent 50%)" }} />
        <div className="relative">
          <Badge className="bg-white/20 border-0 mb-3"><Sparkles className="h-3 w-3 mr-1" />Trending</Badge>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl leading-tight">Learn AI. Build the future.</h2>
          <p className="mt-3 opacity-90 max-w-md">Hands-on courses on ChatGPT, LangChain, RAG, and AI Agents — taught by engineers building production AI.</p>
          <div className="mt-6 flex gap-3">
            <Button asChild size="lg" className="bg-white text-indigo-700 hover:bg-white/90"><Link to="/courses">Explore AI courses</Link></Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10"><Link to="/courses">Free intro lesson</Link></Button>
          </div>
        </div>
        <div className="relative grid grid-cols-2 gap-3">
          {COURSES.slice(0, 4).map((c) => (
            <div key={c.id} className="bg-white/10 backdrop-blur rounded-2xl p-3 hover:bg-white/20 transition overflow-hidden">
              <div className="h-24 rounded-lg mb-3 overflow-hidden relative" style={{ background: c.gradient }}>
                <img src={courseImage(c.id)} alt={c.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="text-sm font-semibold line-clamp-2">{c.title}</div>
              <div className="text-xs opacity-80 mt-1">⭐ {c.rating} · {c.duration}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturedTutors() {
  const { tutors: TUTORS } = useAdminStore();
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <SectionHeading
        eyebrow="Featured"
        title="Meet the teachers students rave about"
        subtitle="Verified, top-rated tutors across subjects, languages, and timezones."
        action={<Button asChild variant="ghost" className="hidden md:inline-flex"><Link to="/tutors">All tutors <ArrowRight className="h-4 w-4 ml-1" /></Link></Button>}
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {TUTORS.slice(0, 8).map((t) => <TutorCard key={t.id} tutor={t} />)}
      </div>
    </section>
  );
}

export function CareerBanner() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-white" style={{ backgroundImage: `url(${careerBanner})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-gradient-purple opacity-90" />
        <div className="relative max-w-2xl">
          <Badge className="bg-white/20 border-0 mb-4">Career growth</Badge>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl leading-tight">Reimagine your career with industry experts.</h2>
          <p className="mt-4 opacity-90 text-lg">Programs designed by hiring managers at Google, Microsoft, Adobe, and more — with placement support.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-white text-purple hover:bg-white/90"><Link to="/courses">Explore programs</Link></Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10"><Link to="/pricing">View pricing</Link></Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-6 opacity-80 text-sm">
            <span>Trusted by hiring teams at:</span>
            {COMPANIES.slice(0, 5).map((c) => <span key={c} className="font-semibold">{c}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}

export function IndustryExperts() {
  const { courses: COURSES } = useAdminStore();
  return (
    <section className="bg-purple-soft/40 dark:bg-purple-soft/20 py-16 md:py-20">
      <div className="container mx-auto px-4">
        <SectionHeading eyebrow="Industry led" title="Courses created by working professionals" subtitle="Every TeacherPoint course is built and taught by people doing the job today — not yesterday." />
        <div className="grid md:grid-cols-3 gap-5">
          {COURSES.slice(2, 5).map((c) => (
            <article key={c.id} className="bg-card border rounded-2xl overflow-hidden hover:shadow-card transition">
              <div className="aspect-[16/10] relative overflow-hidden" style={{ background: c.gradient }}>
                <img src={courseImage(c.id)} alt={c.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <Badge variant="secondary" className="mb-3">{c.category}</Badge>
                <h3 className="font-display font-bold text-lg leading-snug">{c.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{c.description}</p>
                <div className="mt-4 flex items-center gap-3 pt-4 border-t">
                  <div className="h-9 w-9 rounded-full overflow-hidden bg-gradient-primary">
                    <img src={tutorImage("t" + ((parseInt(c.id.slice(1)) % 12) + 1))} alt={c.instructor} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{c.instructor}</div>
                    <div className="text-xs text-muted-foreground">Senior Engineer · 8+ yrs</div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SkillsGrid() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-20">
      <SectionHeading eyebrow="Hot skills" title="Master the tools that matter" subtitle="Job-ready training on the platforms employers actually use." />
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        {SKILLS.map((s) => {
          const Icon = ICONS[s.icon] || Sparkles;
          return (
            <Link to="/courses" key={s.name} className="group">
              <div className="bg-card border rounded-2xl p-4 text-center hover:shadow-card hover:-translate-y-1 transition">
                <div className={`h-12 w-12 mx-auto rounded-xl bg-gradient-to-br ${s.color} grid place-items-center text-white mb-2`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-sm font-semibold">{s.name}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function ComboPacks() {
  const { combos: COMBOS } = useAdminStore();
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <SectionHeading eyebrow="Save more" title="Combo packs — bundles built for outcomes" subtitle="Curated multi-course paths at unbeatable prices." />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {COMBOS.map((k) => (
          <article key={k.id} className="rounded-2xl overflow-hidden border bg-card hover:shadow-card hover:-translate-y-1 transition">
            <div className="h-3" style={{ background: k.gradient }} />
            <div className="p-5">
              <Badge className="mb-3 bg-amber-400 text-amber-950 hover:bg-amber-400">Combo</Badge>
              <h3 className="font-display font-bold text-lg leading-tight">{k.title}</h3>
              <div className="text-xs text-muted-foreground mt-1">{k.courses} courses · {k.hours} hours</div>
              <ul className="mt-3 space-y-1.5">
                {k.includes.map((i) => (
                  <li key={i} className="text-xs flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-emerald-600" />{i}</li>
                ))}
              </ul>
              <div className="mt-4 flex items-end gap-2 pt-4 border-t">
                <span className="font-display font-bold text-2xl">${k.price}</span>
                <span className="text-sm text-muted-foreground line-through">${k.oldPrice}</span>
                <Button size="sm" className="ml-auto bg-gradient-primary">Get</Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function HowYouLearn() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-20">
      <SectionHeading eyebrow="Methodology" title="How you will learn" subtitle="A proven 5-step framework that takes you from zero to hired." />
      <div className="grid md:grid-cols-5 gap-4 relative">
        <div className="hidden md:block absolute top-6 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-purple to-emerald-500" />
        {LEARNING_TIMELINE.map((s, i) => {
          const Icon = ICONS[s.icon];
          return (
            <div key={s.title} className="relative bg-card border rounded-2xl p-5 text-center hover:shadow-card transition">
              <div className="h-12 w-12 mx-auto rounded-full bg-gradient-primary text-white grid place-items-center mb-3 relative z-10">
                <Icon className="h-6 w-6" />
              </div>
              <div className="text-xs font-bold text-primary mb-1">STEP {i + 1}</div>
              <h3 className="font-display font-bold text-base">{s.title}</h3>
              <p className="text-xs text-muted-foreground mt-2">{s.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function Certification() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <Badge className="mb-3 bg-emerald-100 text-emerald-700 border-0 dark:bg-emerald-900/40 dark:text-emerald-300">Industry recognized</Badge>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl">Certificates that actually open doors.</h2>
          <p className="mt-4 text-muted-foreground">Add verified TeacherPoint certificates to your LinkedIn and resume. Co-signed by industry partners and endorsed by hiring managers.</p>
          <ul className="mt-6 space-y-2">
            {["Verified blockchain credential", "LinkedIn-ready", "Shareable & permanent", "Co-branded with partners"].map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-emerald-600" />{f}</li>
            ))}
          </ul>
          <Button asChild className="mt-6 bg-gradient-primary"><Link to="/courses">Browse certified courses</Link></Button>
        </div>
        <div className="relative">
          <div className="bg-card border rounded-3xl p-8 shadow-card">
            <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center">
              <Award className="h-16 w-16 mx-auto text-amber-500" />
              <div className="text-xs uppercase tracking-widest text-muted-foreground mt-4">Certificate of Completion</div>
              <h3 className="font-display font-bold text-2xl mt-2">Aarav Patel</h3>
              <p className="text-sm text-muted-foreground mt-1">has successfully completed</p>
              <p className="font-display font-bold text-lg mt-2">Python Complete Bootcamp</p>
              <div className="mt-4 flex justify-between text-xs text-muted-foreground">
                <span>Issued · May 2026</span>
                <span>ID · TP-94821</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Comparison() {
  return (
    <section className="bg-muted/30 py-16 md:py-20">
      <div className="container mx-auto px-4">
        <SectionHeading eyebrow="Why TeacherPoint" title="See how we stack up" subtitle="A quick look at what makes TeacherPoint different from typical platforms." />
        <div className="bg-card border rounded-2xl overflow-hidden max-w-3xl mx-auto">
          <div className="grid grid-cols-3 bg-muted/40 px-6 py-4 text-sm font-semibold">
            <div>Feature</div>
            <div className="text-center text-primary">TeacherPoint</div>
            <div className="text-center text-muted-foreground">Others</div>
          </div>
          {COMPARISON.map((row, i) => (
            <div key={row.feature} className={`grid grid-cols-3 px-6 py-3 text-sm items-center ${i % 2 === 0 ? "bg-card" : "bg-muted/30"}`}>
              <div>{row.feature}</div>
              <div className="text-center">
                {row.us ? <CheckCircle2 className="h-5 w-5 text-emerald-600 mx-auto" /> : <X className="h-5 w-5 text-muted-foreground mx-auto" />}
              </div>
              <div className="text-center">
                {row.others ? <CheckCircle2 className="h-5 w-5 text-muted-foreground mx-auto" /> : <X className="h-5 w-5 text-muted-foreground mx-auto" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-20">
      <SectionHeading eyebrow="Loved by 850K+" title="What our students say" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {TESTIMONIALS.map((t) => (
          <article key={t.id} className="bg-card border rounded-2xl p-6 hover:shadow-card transition">
            <Quote className="h-7 w-7 text-primary/30" />
            <p className="text-sm mt-3 leading-relaxed">"{t.text}"</p>
            <div className="mt-4 flex items-center gap-3 pt-4 border-t">
              <div className="h-10 w-10 rounded-full overflow-hidden bg-gradient-primary">
                <img src={tutorImage("t" + ((parseInt(t.id.slice(1)) % 12) + 1))} alt={t.name} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
              <div className="flex">
                {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />)}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function VideoTestimonials() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <SectionHeading eyebrow="Watch their stories" title="Real students. Real results." />
      <div className="grid md:grid-cols-3 gap-5">
        {TESTIMONIALS.slice(0, 3).map((t, i) => (
          <button key={t.id} className="group relative rounded-2xl overflow-hidden aspect-video border bg-gradient-to-br from-slate-700 to-slate-900 text-left hover:shadow-card transition">
            <div className="absolute inset-0" style={{ background: ["linear-gradient(135deg,#1e3a8a,#7c3aed)", "linear-gradient(135deg,#7c3aed,#ec4899)", "linear-gradient(135deg,#0ea5e9,#1e3a8a)"][i] }} />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="h-16 w-16 rounded-full bg-white/90 grid place-items-center group-hover:scale-110 transition">
                <PlayCircle className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <div className="font-semibold">{t.name}</div>
              <div className="text-xs opacity-80">{t.role}</div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

export function FAQSection() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-20 max-w-3xl">
      <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
      <Accordion type="single" collapsible className="bg-card border rounded-2xl px-6">
        {FAQS.map((f, i) => (
          <AccordionItem key={i} value={`f${i}`}>
            <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

export function CTABand() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="rounded-3xl bg-gradient-primary text-primary-foreground p-10 md:p-16 text-center">
        <h2 className="font-display font-extrabold text-3xl md:text-4xl">Start your learning journey today</h2>
        <p className="mt-3 opacity-90 max-w-xl mx-auto">Join 850K+ learners worldwide. Your first session is free.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90"><Link to="/role-select">Get started — free</Link></Button>
          <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10"><Link to="/courses">Explore courses</Link></Button>
        </div>
      </div>
    </section>
  );
}
