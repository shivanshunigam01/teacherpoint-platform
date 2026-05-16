import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { GraduationCap, BookOpen, Heart, ShieldCheck } from "lucide-react";
import { useApp } from "@/hooks/use-app";
import type { Role } from "@/data/mock";
import { toast } from "sonner";

export const Route = createFileRoute("/role-select")({
  component: RoleSelect,
  head: () => ({ meta: [{ title: "Choose your role · TeachersPoints" }] }),
});

const ROLES: { id: Role; title: string; desc: string; icon: any; color: string }[] = [
  { id: "student", title: "I'm a Student", desc: "Find tutors, take courses, earn certificates.", icon: GraduationCap, color: "from-sky-400 to-blue-600" },
  { id: "teacher", title: "I'm a Teacher", desc: "Create courses, mentor students, earn money.", icon: BookOpen, color: "from-purple-400 to-fuchsia-600" },
  { id: "parent", title: "I'm a Parent", desc: "Track your child's learning and progress.", icon: Heart, color: "from-pink-400 to-rose-600" },
  { id: "admin", title: "Platform Admin", desc: "Manage users, content, and analytics.", icon: ShieldCheck, color: "from-emerald-400 to-teal-600" },
];

function RoleSelect() {
  const { login } = useApp();
  const nav = useNavigate();
  const pick = (r: Role) => { login(r); toast.success(`Signed in as ${r}`); nav({ to: `/${r}` as any }); };
  return (
    <section className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-10">
        <h1 className="font-display font-extrabold text-3xl md:text-4xl">Welcome — let's personalize TeachersPoints for you</h1>
        <p className="mt-3 text-muted-foreground">Pick the role that best describes you. You can change this later.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        {ROLES.map((r) => (
          <button key={r.id} onClick={() => pick(r.id)} className="bg-card border rounded-2xl p-6 text-left hover:shadow-card hover:-translate-y-1 transition group">
            <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${r.color} text-white grid place-items-center mb-4 group-hover:scale-110 transition`}>
              <r.icon className="h-7 w-7" />
            </div>
            <h3 className="font-display font-bold text-xl">{r.title}</h3>
            <p className="text-sm text-muted-foreground mt-2">{r.desc}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
