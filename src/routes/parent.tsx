import { createFileRoute, Link } from "@tanstack/react-router";
import { LayoutDashboard, Heart, CreditCard, MessageCircle, BookOpen, TrendingUp, Award } from "lucide-react";
import { DashboardShell, StatCard } from "@/components/dashboard/Shell";
import { TUTORS, COURSES } from "@/data/mock";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/parent")({ component: Parent, head: () => ({ meta: [{ title: "Parent Dashboard · TeachersPoints" }, { name: "robots", content: "noindex" }] }) });

const ITEMS = [
  { to: "/parent", label: "Overview", icon: LayoutDashboard },
  { to: "/courses", label: "Child's Courses", icon: BookOpen },
  { to: "/tutors", label: "Saved Tutors", icon: Heart },
  { to: "/payments", label: "Payments", icon: CreditCard },
  { to: "/messages", label: "Messages", icon: MessageCircle },
];

function Parent() {
  return (
    <DashboardShell items={ITEMS} title="Parent">
      <h1 className="font-display font-extrabold text-2xl">Hi Ryan 👋</h1>
      <p className="text-muted-foreground text-sm mb-6">Here's what your child Liam is up to.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Hours this week" value="6.5h" change="+1.2h" icon={TrendingUp} />
        <StatCard label="Active courses" value="4" icon={BookOpen} color="from-purple-400 to-fuchsia-600" />
        <StatCard label="Test score avg" value="91%" change="↑ 3%" icon={Award} color="from-amber-400 to-orange-500" />
        <StatCard label="Spent (MTD)" value="$129" icon={CreditCard} color="from-emerald-400 to-teal-600" />
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card border rounded-2xl p-5">
          <h2 className="font-display font-bold mb-4">Liam's progress</h2>
          {COURSES.slice(0, 4).map((c, i) => (
            <div key={c.id} className="mb-3">
              <div className="flex justify-between text-sm">
                <span className="font-semibold truncate">{c.title}</span>
                <span className="text-muted-foreground">{[78, 45, 92, 30][i]}%</span>
              </div>
              <Progress value={[78, 45, 92, 30][i]} className="h-1.5 mt-1" />
            </div>
          ))}
        </div>
        <div className="bg-card border rounded-2xl p-5">
          <h2 className="font-display font-bold mb-3">Recommended tutors</h2>
          <div className="space-y-3">
            {TUTORS.slice(0, 4).map((t) => (
              <Link to="/tutors/$id" params={{ id: t.id }} key={t.id} className="flex items-center gap-3 hover:bg-muted/40 rounded-lg p-2">
                <div className="h-10 w-10 rounded-full grid place-items-center text-white font-bold text-sm" style={{ background: t.gradient }}>{t.initials}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.subject} · ${t.price}/hr</div>
                </div>
                <span className="text-xs text-amber-600">★ {t.rating}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
