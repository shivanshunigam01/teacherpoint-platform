import { createFileRoute } from "@tanstack/react-router";
import { LayoutDashboard, Users, BookOpen, ShieldCheck, BarChart3, DollarSign, Bell, Image, Settings, Globe2, LifeBuoy, MoreVertical } from "lucide-react";
import { DashboardShell, StatCard } from "@/components/dashboard/Shell";
import { ADMIN_USERS, REVENUE_DATA, ENROLLMENT_DATA } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, AreaChart, Area } from "recharts";

export const Route = createFileRoute("/admin")({ component: Admin, head: () => ({ meta: [{ title: "Admin Dashboard · TeacherPoint" }, { name: "robots", content: "noindex" }] }) });

const ITEMS = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard },
  { to: "/admin", label: "Users", icon: Users },
  { to: "/admin", label: "Courses", icon: BookOpen },
  { to: "/admin", label: "Approvals", icon: ShieldCheck },
  { to: "/admin", label: "Reports", icon: BarChart3 },
  { to: "/admin", label: "Revenue", icon: DollarSign },
  { to: "/admin", label: "Notifications", icon: Bell },
  { to: "/admin", label: "Banners", icon: Image },
  { to: "/admin", label: "Geo CMS", icon: Globe2 },
  { to: "/admin", label: "Tickets", icon: LifeBuoy },
  { to: "/admin", label: "Settings", icon: Settings },
];

function Admin() {
  return (
    <DashboardShell items={ITEMS} title="Admin">
      <h1 className="font-display font-extrabold text-2xl mb-6">Platform overview</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total users" value="852,431" change="+1.2K today" icon={Users} />
        <StatCard label="Active courses" value="5,124" change="+24 this week" icon={BookOpen} color="from-purple-400 to-fuchsia-600" />
        <StatCard label="Revenue (MTD)" value="$184K" change="+18%" icon={DollarSign} color="from-emerald-400 to-teal-600" />
        <StatCard label="Pending approvals" value="42" icon={ShieldCheck} color="from-amber-400 to-orange-500" />
      </div>
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-card border rounded-2xl p-5">
          <h2 className="font-display font-bold mb-4">Revenue & payouts</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA}>
                <defs>
                  <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} /><stop offset="95%" stopColor="#6366f1" stopOpacity={0} /></linearGradient>
                  <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.4} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient>
                </defs>
                <XAxis dataKey="month" fontSize={12} /><YAxis fontSize={12} /><Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" fill="url(#rg)" />
                <Area type="monotone" dataKey="payouts" stroke="#10b981" fill="url(#pg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-card border rounded-2xl p-5">
          <h2 className="font-display font-bold mb-4">Daily enrollments</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ENROLLMENT_DATA}>
                <XAxis dataKey="day" fontSize={12} /><YAxis fontSize={12} /><Tooltip />
                <Bar dataKey="count" fill="#7c3aed" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="bg-card border rounded-2xl p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-display font-bold">Recent users</h2>
          <Button size="sm" variant="outline">Export</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow><TableHead>Name</TableHead><TableHead>Role</TableHead><TableHead>Email</TableHead><TableHead>Joined</TableHead><TableHead>Status</TableHead><TableHead></TableHead></TableRow>
          </TableHeader>
          <TableBody>
            {ADMIN_USERS.map((u) => (
              <TableRow key={u.id}>
                <TableCell className="font-semibold">{u.name}</TableCell>
                <TableCell><Badge variant="secondary">{u.role}</Badge></TableCell>
                <TableCell className="text-muted-foreground text-sm">{u.email}</TableCell>
                <TableCell className="text-sm">{u.joined}</TableCell>
                <TableCell><Badge className={u.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}>{u.status}</Badge></TableCell>
                <TableCell><Button size="icon" variant="ghost" aria-label="More"><MoreVertical className="h-4 w-4" /></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DashboardShell>
  );
}
