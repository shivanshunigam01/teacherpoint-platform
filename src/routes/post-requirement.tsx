import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Clock,
  ShieldCheck,
  Sparkles,
  Users,
  BookOpen,
  MapPin,
  DollarSign,
  Calendar,
  FileText,
  Send,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const SUBJECTS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "English",
  "Computer Science",
  "Data Science",
  "Languages",
  "Test Prep (SAT/ACT)",
  "Business & Finance",
];

const STEPS = [
  {
    step: "01",
    title: "Describe what you need",
    desc: "Subject, level, and goals — the more detail, the better the match.",
    icon: FileText,
  },
  {
    step: "02",
    title: "Set your preferences",
    desc: "Budget, online or in-person, and how often you want to meet.",
    icon: Calendar,
  },
  {
    step: "03",
    title: "Get matched fast",
    desc: "Verified tutors apply within hours. You pick who fits best.",
    icon: MessageCircle,
  },
];

const PERKS = [
  { icon: ShieldCheck, text: "Background-checked tutors only" },
  { icon: Clock, text: "Typical response in under 4 hours" },
  { icon: Users, text: "12,500+ active tutors worldwide" },
  { icon: Sparkles, text: "Free to post — pay only when you book" },
];

export const Route = createFileRoute("/post-requirement")({
  component: Post,
  head: () => ({
    meta: [
      { title: "Post a Tutoring Requirement · TeachersPoints" },
      {
        name: "description",
        content:
          "Post your tutoring need and get matched with verified teachers. Set subject, budget, and schedule in minutes.",
      },
    ],
    links: [{ rel: "canonical", href: "/post-requirement" }],
  }),
});

function Post() {
  return (
    <div className="min-h-full">
      {/* Hero */}
      <div className="relative overflow-hidden border-b bg-gradient-hero">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-40 blur-3xl"
          style={{ background: "var(--gradient-card-1)" }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-16 left-1/4 h-56 w-56 rounded-full opacity-30 blur-3xl"
          style={{ background: "var(--gradient-card-5)" }}
          aria-hidden
        />
        <div className="container relative mx-auto px-4 py-10 sm:px-6 md:py-14">
          <Badge variant="secondary" className="mb-4 border-primary/20 bg-primary/5 text-primary">
            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            Free to post
          </Badge>
          <h1 className="max-w-2xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Post a tutoring requirement
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Tell us what you&apos;re looking for — verified tutors will reach out with tailored offers,
            usually within a few hours.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 rounded-full border bg-background/80 px-3 py-1.5 backdrop-blur-sm">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              No commitment until you book
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border bg-background/80 px-3 py-1.5 backdrop-blur-sm">
              <Clock className="h-4 w-4 text-primary" />
              Avg. 4h first response
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 sm:px-6 md:py-14">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] lg:gap-14 xl:grid-cols-[1fr_520px]">
          {/* Left — story & trust */}
          <div className="space-y-10 lg:sticky lg:top-24">
            <div>
              <h2 className="font-display text-xl font-bold sm:text-2xl">How it works</h2>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                Three simple steps from posting to your first lesson.
              </p>
              <ol className="mt-6 space-y-4">
                {STEPS.map((s) => (
                  <li
                    key={s.step}
                    className="group flex gap-4 rounded-2xl border bg-card p-4 transition-shadow hover:shadow-soft"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <s.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                        Step {s.step}
                      </span>
                      <h3 className="mt-0.5 font-display font-bold">{s.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {PERKS.map((p) => (
                <li
                  key={p.text}
                  className="flex items-center gap-3 rounded-xl border border-dashed bg-muted/30 px-4 py-3 text-sm"
                >
                  <p.icon className="h-5 w-5 shrink-0 text-primary" />
                  {p.text}
                </li>
              ))}
            </ul>

            <div className="rounded-2xl border bg-gradient-to-br from-primary/5 via-background to-purple-soft/30 p-5">
              <p className="text-sm font-medium text-muted-foreground">Recent match</p>
              <p className="mt-2 font-display text-lg font-bold">
                &ldquo;Found an IELTS tutor in 2 hours — exactly my budget.&rdquo;
              </p>
              <p className="mt-2 text-sm text-muted-foreground">— Priya S., Mumbai</p>
            </div>
          </div>

          {/* Right — form */}
          <div className="relative">
            <div
              className="absolute -inset-px rounded-3xl opacity-60 blur-sm"
              style={{ background: "var(--gradient-primary)" }}
              aria-hidden
            />
            <form
              className="relative space-y-6 rounded-3xl border bg-card p-6 shadow-card sm:p-8"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Requirement posted! Tutors will reach out shortly.");
              }}
            >
              <div className="border-b pb-5">
                <h2 className="font-display text-xl font-bold">Your requirement</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Fields marked with <span className="text-destructive">*</span> are required.
                </p>
              </div>

              <fieldset className="space-y-4">
                <legend className="mb-1 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <BookOpen className="h-4 w-4 text-primary" />
                  Basics
                </legend>
                <div>
                  <Label htmlFor="req-title">
                    Title <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="req-title"
                    placeholder="e.g. Class 10 Math tutor for board exams"
                    required
                    className="mt-1.5 h-11 rounded-lg"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label>Subject</Label>
                    <Select defaultValue="Mathematics">
                      <SelectTrigger className="mt-1.5 h-11 rounded-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {SUBJECTS.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Level</Label>
                    <Select defaultValue="high">
                      <SelectTrigger className="mt-1.5 h-11 rounded-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="elem">Elementary</SelectItem>
                        <SelectItem value="middle">Middle school</SelectItem>
                        <SelectItem value="high">High school</SelectItem>
                        <SelectItem value="college">College / University</SelectItem>
                        <SelectItem value="pro">Professional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </fieldset>

              <fieldset className="space-y-4">
                <legend className="mb-1 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  Format & schedule
                </legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label>Mode</Label>
                    <Select defaultValue="online">
                      <SelectTrigger className="mt-1.5 h-11 rounded-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="online">Online</SelectItem>
                        <SelectItem value="offline">In-person</SelectItem>
                        <SelectItem value="both">Either works</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Sessions per week</Label>
                    <Select defaultValue="3">
                      <SelectTrigger className="mt-1.5 h-11 rounded-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <SelectItem key={n} value={String(n)}>
                            {n}× per week
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="req-location">City / timezone (optional)</Label>
                  <Input
                    id="req-location"
                    placeholder="e.g. New York · EST"
                    className="mt-1.5 h-11 rounded-lg"
                  />
                </div>
              </fieldset>

              <fieldset className="space-y-4">
                <legend className="mb-1 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <DollarSign className="h-4 w-4 text-primary" />
                  Budget
                </legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="req-budget">Budget per hour (USD)</Label>
                    <div className="relative mt-1.5">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        $
                      </span>
                      <Input id="req-budget" type="number" defaultValue={30} min={5} className="h-11 rounded-lg pl-7" />
                    </div>
                  </div>
                  <div>
                    <Label>Duration</Label>
                    <Select defaultValue="ongoing">
                      <SelectTrigger className="mt-1.5 h-11 rounded-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="once">One-time session</SelectItem>
                        <SelectItem value="month">About a month</SelectItem>
                        <SelectItem value="semester">One semester</SelectItem>
                        <SelectItem value="ongoing">Ongoing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </fieldset>

              <fieldset className="space-y-4">
                <legend className="mb-1 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <FileText className="h-4 w-4 text-primary" />
                  Details
                </legend>
                <div>
                  <Label htmlFor="req-details">
                    Tell tutors more <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="req-details"
                    required
                    placeholder="Goals, current level, preferred times, exam dates, teaching style…"
                    className="mt-1.5 min-h-[140px] resize-y rounded-lg"
                  />
                </div>
              </fieldset>

              <Button type="submit" size="lg" className="h-12 w-full rounded-xl bg-gradient-primary text-base font-semibold shadow-soft">
                <Send className="mr-2 h-4 w-4" />
                Post requirement — it&apos;s free
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                By posting, you agree to our{" "}
                <Link to="/faq" className="font-medium text-primary underline-offset-2 hover:underline">
                  terms
                </Link>
                . You can edit or remove your post anytime.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

