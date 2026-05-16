import { createFileRoute, Link } from "@tanstack/react-router";
import { LayoutDashboard, BookOpen, Heart, Award, MessageCircle, LifeBuoy, Settings, GraduationCap, Clock, TrendingUp } from "lucide-react";
import { DashboardShell, StatCard } from "@/components/dashboard/Shell";
import { COURSES, TUTORS, NOTIFICATIONS } from "@/data/mock";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/student")({ component: Student, head: () => ({ meta: [{ title: "Student Dashboard · TeachersPoints" }, { name: "robots", content: "noindex" }] }) });

const ITEMS = [
  { to: "/student", label: "Overview", icon: LayoutDashboard },
  { to: "/courses", label: "My Courses", icon: BookOpen },
  { to: "/tutors", label: "Saved Tutors", icon: Heart },
  { to: "/lms", label: "Certificates", icon: Award },
  { to: "/messages", label: "Messages", icon: MessageCircle },
  { to: "/support", label: "Support", icon: LifeBuoy },
];

function Student() {
  return (
    <DashboardShell items={ITEMS} title="Student">
      <h1 className="font-display font-extrabold text-2xl mb-1">Hi Aarav 👋</h1>
      <p className="text-muted-foreground mb-6 text-sm">You're on a 12-day learning streak. Keep going!</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Enrolled" value="6" change="+2 this month" icon={BookOpen} />
        <StatCard label="Hours learned" value="42h" change="+8h this week" icon={Clock} color="from-purple-400 to-fuchsia-600" />
        <StatCard label="Certificates" value="3" icon={Award} color="from-amber-400 to-orange-600" />
        <StatCard label="Avg. score" value="87%" change="+4%" icon={TrendingUp} color="from-emerald-400 to-teal-600" />
      </div>

      <div className="grid lg:grid-cols-[2fr_1fr] gap-6 mt-6">
        <div className="bg-card border rounded-2xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-display font-bold">Continue learning</h2>
            <Link to="/courses" className="text-sm text-primary">Browse all</Link>
          </div>
          <div className="space-y-4">
            {COURSES.slice(0, 3).map((c, i) => (
              <div key={c.id} className="flex gap-4 items-center">
                <div className="h-16 w-24 rounded-lg shrink-0" style={{ background: c.gradient }} />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate">{c.title}</div>
                  <div className="text-xs text-muted-foreground">By {c.instructor}</div>
                  <Progress value={[35, 68, 12][i]} className="mt-2 h-1.5" />
                </div>
                <Button size="sm" asChild><Link to="/courses/$id" params={{ id: c.id }}>Resume</Link></Button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card border rounded-2xl p-5">
            <h2 className="font-display font-bold mb-3">Saved tutors</h2>
            <div className="space-y-3">
              {TUTORS.slice(0, 3).map((t) => (
                <Link to="/tutors/$id" params={{ id: t.id }} key={t.id} className="flex items-center gap-3 hover:bg-muted/50 rounded-lg p-2 -mx-2">
                  <div className="h-10 w-10 rounded-full grid place-items-center text-white font-bold text-sm" style={{ background: t.gradient }}>{t.initials}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.subject}</div>
                  </div>
                  <span className="text-xs text-amber-600">★ {t.rating}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="bg-card border rounded-2xl p-5">
            <h2 className="font-display font-bold mb-3">Notifications</h2>
            <ul className="space-y-3">
              {NOTIFICATIONS.slice(0, 3).map((n) => (
                <li key={n.id} className="text-sm">
                  <div className="font-semibold flex items-center gap-2">{n.title}{n.unread && <Badge className="bg-primary h-1.5 w-1.5 p-0 rounded-full" />}</div>
                  <div className="text-xs text-muted-foreground">{n.body} · {n.time}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
