import { createFileRoute } from "@tanstack/react-router";
import { LayoutDashboard, BookOpen, Users, DollarSign, Star, MessageCircle, ShieldCheck, TrendingUp, Plus } from "lucide-react";
import { DashboardShell, StatCard } from "@/components/dashboard/Shell";
import { COURSES, REVENUE_DATA } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

export const Route = createFileRoute("/teacher")({ component: Teacher, head: () => ({ meta: [{ title: "Teacher Dashboard · TeachersPoints" }, { name: "robots", content: "noindex" }] }) });

const ITEMS = [
  { to: "/teacher", label: "Overview", icon: LayoutDashboard },
  { to: "/lms", label: "My Courses", icon: BookOpen },
  { to: "/messages", label: "Student Requests", icon: Users },
  { to: "/payments", label: "Earnings", icon: DollarSign },
  { to: "/reviews", label: "Reviews", icon: Star },
  { to: "/messages", label: "Messages", icon: MessageCircle },
];

function Teacher() {
  return (
    <DashboardShell items={ITEMS} title="Teacher">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
        <div>
          <h1 className="font-display font-extrabold text-2xl">Welcome, Emma</h1>
          <p className="text-muted-foreground text-sm flex items-center gap-2 mt-1"><ShieldCheck className="h-4 w-4 text-emerald-600" />Verified · Profile 92% complete</p>
        </div>
        <Button className="bg-gradient-primary"><Plus className="h-4 w-4 mr-2" />New course</Button>
      </div>
      <div className="bg-card border rounded-2xl p-4 mb-6">
        <div className="text-sm font-semibold mb-2">Profile completion</div>
        <Progress value={92} className="h-2" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Active students" value="412" change="+38 this week" icon={Users} />
        <StatCard label="Earnings (MTD)" value="$3,420" change="+12%" icon={DollarSign} color="from-emerald-400 to-teal-600" />
        <StatCard label="Avg. rating" value="4.9" icon={Star} color="from-amber-400 to-orange-500" />
        <StatCard label="Course views" value="8.2K" change="+5%" icon={TrendingUp} color="from-purple-400 to-fuchsia-600" />
      </div>
      <div className="grid lg:grid-cols-[2fr_1fr] gap-6">
        <div className="bg-card border rounded-2xl p-5">
          <h2 className="font-display font-bold mb-4">Earnings trend</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA}>
                <defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} /><stop offset="95%" stopColor="#6366f1" stopOpacity={0} /></linearGradient></defs>
                <XAxis dataKey="month" fontSize={12} /><YAxis fontSize={12} /><Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-card border rounded-2xl p-5">
          <h2 className="font-display font-bold mb-3">My top courses</h2>
          <div className="space-y-3">
            {COURSES.slice(0, 4).map((c) => (
              <div key={c.id} className="flex items-center gap-3">
                <div className="h-10 w-14 rounded-lg shrink-0" style={{ background: c.gradient }} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate">{c.title}</div>
                  <div className="text-xs text-muted-foreground">★ {c.rating} · {c.students.toLocaleString()} students</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
