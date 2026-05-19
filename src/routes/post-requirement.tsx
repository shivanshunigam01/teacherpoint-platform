import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Clock,
  ShieldCheck,
  Sparkles,
  Users,
  BookOpen,
  MapPin,
  DollarSign,
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
import { useApp } from "@/hooks/use-app";
import { useRequirementStore } from "@/hooks/use-requirement-store";
import { DEMO_USER_IDS } from "@/data/requirements-seed";
import type { PreferredMode } from "@/types/requirements";

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
    desc: "Budget, online or in-person, and language preference.",
    icon: MapPin,
  },
  {
    step: "03",
    title: "Admin review, then tutors apply",
    desc: "Your post is reviewed first. Once approved, verified tutors send proposals.",
    icon: MessageCircle,
  },
];

const PERKS = [
  { icon: ShieldCheck, text: "Background-checked tutors only" },
  { icon: Clock, text: "Admin review typically within 24 hours" },
  { icon: Users, text: "12,500+ active tutors worldwide" },
  { icon: Sparkles, text: "Contact unlocks only after you pay" },
];

const CLASS_LEVELS: Record<string, string> = {
  elem: "Elementary",
  middle: "Middle school",
  high: "High school",
  college: "College / University",
  pro: "Professional",
};

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
  const { user, role, login } = useApp();
  const store = useRequirementStore();
  const [submitted, setSubmitted] = useState(false);

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("Mathematics");
  const [classLevelKey, setClassLevelKey] = useState("high");
  const [description, setDescription] = useState("");
  const [preferredMode, setPreferredMode] = useState<PreferredMode>("online");
  const [location, setLocation] = useState("");
  const [language, setLanguage] = useState("English");
  const [budget, setBudget] = useState(30);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let studentId = user?.id;
    let studentName = user?.name;

    if (!studentId || role !== "student") {
      login("student");
      studentId = DEMO_USER_IDS.student;
      studentName = "Aarav Patel";
    }

    store.createRequirementPost({
      studentId,
      studentName: studentName ?? "Demo Student",
      title,
      subject,
      description,
      classLevel: CLASS_LEVELS[classLevelKey] ?? classLevelKey,
      budget,
      preferredMode,
      location: location || "Not specified",
      language,
    });

    setSubmitted(true);
    toast.success("Requirement submitted for admin approval.");
  };

  if (submitted) {
    return (
      <div className="container mx-auto max-w-lg px-4 py-20 text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-600" />
        <h1 className="mt-6 font-display text-2xl font-bold">Submitted successfully</h1>
        <p className="mt-3 text-muted-foreground">
          Your requirement has been submitted and is waiting for admin approval. Tutors will not see
          it until it is approved.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild className="bg-gradient-primary">
            <Link to="/student">View my requirements</Link>
          </Button>
          <Button variant="outline" onClick={() => setSubmitted(false)}>
            Post another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full">
      <div className="relative overflow-hidden border-b bg-gradient-hero">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-40 blur-3xl"
          style={{ background: "var(--gradient-card-1)" }}
          aria-hidden
        />
        <div className="container relative mx-auto px-4 py-10 sm:px-6 md:py-14">
          <Badge variant="secondary" className="mb-4 border-primary/20 bg-primary/5 text-primary">
            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            Admin-reviewed posts
          </Badge>
          <h1 className="max-w-2xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Post a learning requirement
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Tell us what you need. After admin approval, verified tutors send proposals. Pay to unlock
            contact details.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 sm:px-6 md:py-14">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] lg:gap-14">
          <div className="space-y-10 lg:sticky lg:top-24">
            <div>
              <h2 className="font-display text-xl font-bold sm:text-2xl">How it works</h2>
              <ol className="mt-6 space-y-4">
                {STEPS.map((s) => (
                  <li
                    key={s.step}
                    className="flex gap-4 rounded-2xl border bg-card p-4 transition-shadow hover:shadow-soft"
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
            <ul className="grid gap-3">
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
          </div>

          <form
            className="space-y-6 rounded-3xl border bg-card p-6 shadow-card sm:p-8"
            onSubmit={handleSubmit}
          >
            <div className="border-b pb-5">
              <h2 className="font-display text-xl font-bold">Your requirement</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Status after submit: <strong>Pending approval</strong>
              </p>
            </div>

            <div>
              <Label htmlFor="req-title">Requirement title *</Label>
              <Input
                id="req-title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Class 12 Physics tutor for board exams"
                className="mt-1.5 h-11 rounded-lg"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Subject *</Label>
                <Select value={subject} onValueChange={setSubject}>
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
                <Label>Class / level *</Label>
                <Select value={classLevelKey} onValueChange={setClassLevelKey}>
                  <SelectTrigger className="mt-1.5 h-11 rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(CLASS_LEVELS).map(([k, v]) => (
                      <SelectItem key={k} value={k}>
                        {v}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="req-details">Description *</Label>
              <Textarea
                id="req-details"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Goals, current level, preferred times, exam dates…"
                className="mt-1.5 min-h-[120px] resize-y rounded-lg"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Online / offline mode *</Label>
                <Select value={preferredMode} onValueChange={(v) => setPreferredMode(v as PreferredMode)}>
                  <SelectTrigger className="mt-1.5 h-11 rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="offline">In-person</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="req-budget">Budget per hour (USD) *</Label>
                <div className="relative mt-1.5">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    $
                  </span>
                  <Input
                    id="req-budget"
                    type="number"
                    min={5}
                    required
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="h-11 rounded-lg pl-7"
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="req-location">Location</Label>
                <Input
                  id="req-location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, country"
                  className="mt-1.5 h-11 rounded-lg"
                />
              </div>
              <div>
                <Label htmlFor="req-lang">Language preference</Label>
                <Input
                  id="req-lang"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  placeholder="e.g. English, Hindi"
                  className="mt-1.5 h-11 rounded-lg"
                />
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="h-12 w-full rounded-xl bg-gradient-primary text-base font-semibold shadow-soft"
            >
              <Send className="mr-2 h-4 w-4" />
              Submit for admin approval
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              Your requirement has been submitted and is waiting for admin approval. Tutors cannot
              view it until approved.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
