import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Mail, Lock, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp } from "@/hooks/use-app";
import { toast } from "sonner";

export const Route = createFileRoute("/register")({
  component: Register,
  head: () => ({ meta: [{ title: "Create account · TeachersPoints" }, { name: "description", content: "Sign up free for TeachersPoints." }] }),
});

function Register() {
  const { login } = useApp();
  const nav = useNavigate();
  return (
    <section className="container mx-auto px-4 py-12 max-w-md">
      <div className="bg-card border rounded-2xl p-8 shadow-soft">
        <h1 className="font-display font-bold text-2xl">Create your account</h1>
        <p className="text-sm text-muted-foreground mt-1">Already have one? <Link to="/login" className="text-primary font-semibold">Log in</Link></p>
        <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); login("student"); toast.success("Welcome to TeachersPoints!"); nav({ to: "/student" }); }}>
          <div><Label>Full name</Label><div className="relative mt-1"><UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input required className="pl-10" placeholder="Jane Doe" /></div></div>
          <div><Label>Email</Label><div className="relative mt-1"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input required type="email" className="pl-10" placeholder="you@email.com" /></div></div>
          <div><Label>Password</Label><div className="relative mt-1"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input required type="password" className="pl-10" placeholder="At least 8 chars" /></div></div>
          <Button type="submit" className="w-full bg-gradient-primary">Create account</Button>
          <p className="text-xs text-muted-foreground text-center">By continuing you agree to our Terms and Privacy Policy.</p>
        </form>
      </div>
    </section>
  );
}
