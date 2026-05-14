import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Github, ChromeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logo from "@/assets/teacherpoint-logo.png";
import { useApp } from "@/hooks/use-app";
import { DEMO_USERS, type Role } from "@/data/mock";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  component: Login,
  head: () => ({ meta: [{ title: "Log in · TeacherPoint" }, { name: "description", content: "Log in to your TeacherPoint account." }] }),
});

function Login() {
  const { login } = useApp();
  const nav = useNavigate();
  const [show, setShow] = useState(false);

  const demo = (role: Role) => {
    login(role);
    toast.success(`Welcome back, ${DEMO_USERS[role].name}!`);
    nav({ to: `/${role}` as any });
  };

  return (
    <section className="container mx-auto px-4 py-12 grid lg:grid-cols-2 gap-12 items-center max-w-6xl">
      <div className="hidden lg:block">
        <img src={logo} alt="TeacherPoint" className="h-12 w-12 rounded-xl mb-6" />
        <h1 className="font-display font-extrabold text-4xl leading-tight">Welcome back to <span className="text-gradient-primary">TeacherPoint</span></h1>
        <p className="mt-4 text-muted-foreground max-w-md">Pick up right where you left off. Live tutors, full courses, and your certificates — all in one place.</p>
        <div className="mt-8 grid grid-cols-2 gap-4 max-w-md">
          {[["12.5K+", "Tutors"], ["850K+", "Students"], ["5K+", "Courses"], ["4.9★", "Rating"]].map(([v, l]) => (
            <div key={l} className="bg-card border rounded-xl p-4">
              <div className="font-display font-bold text-2xl text-gradient-primary">{v}</div>
              <div className="text-xs text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card border rounded-2xl p-8 shadow-soft max-w-md w-full mx-auto">
        <h2 className="font-display font-bold text-2xl">Log in to your account</h2>
        <p className="text-sm text-muted-foreground mt-1">New here? <Link to="/role-select" className="text-primary font-semibold">Create an account</Link></p>

        <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); demo("student"); }}>
          <div>
            <Label htmlFor="email">Email</Label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="email" type="email" required placeholder="you@email.com" className="pl-10" />
            </div>
          </div>
          <div>
            <Label htmlFor="pwd">Password</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="pwd" type={show ? "text" : "password"} required placeholder="••••••••" className="pl-10 pr-10" />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-label="Toggle password">
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> Remember me</label>
            <a href="#" className="text-primary">Forgot?</a>
          </div>
          <Button type="submit" className="w-full bg-gradient-primary">Log in</Button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground"><div className="flex-1 h-px bg-border" />OR<div className="flex-1 h-px bg-border" /></div>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline"><ChromeIcon className="h-4 w-4 mr-2" />Google</Button>
          <Button variant="outline"><Github className="h-4 w-4 mr-2" />GitHub</Button>
        </div>

        <div className="mt-6 pt-6 border-t">
          <p className="text-xs text-muted-foreground mb-3 font-semibold uppercase tracking-wider">Demo logins (mock)</p>
          <div className="grid grid-cols-2 gap-2">
            {(["student", "teacher", "parent", "admin"] as Role[]).map((r) => (
              <Button key={r} size="sm" variant="secondary" className="capitalize" onClick={() => demo(r)}>{r}</Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
