import { Link, useRouterState } from "@tanstack/react-router";
import { Home, BookOpen, Users, MessageCircle, User } from "lucide-react";

const ITEMS = [
  { to: "/", label: "Home", icon: Home },
  { to: "/courses", label: "Courses", icon: BookOpen },
  { to: "/tutors", label: "Tutors", icon: Users },
  { to: "/messages", label: "Chat", icon: MessageCircle },
  { to: "/login", label: "Profile", icon: User },
];

export function MobileNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-background/95 backdrop-blur border-t">
      <div className="grid grid-cols-5">
        {ITEMS.map((i) => {
          const active = path === i.to || (i.to !== "/" && path.startsWith(i.to));
          return (
            <Link key={i.to} to={i.to} className={`flex flex-col items-center gap-1 py-2 text-[11px] ${active ? "text-primary" : "text-muted-foreground"}`}>
              <i.icon className="h-5 w-5" />
              {i.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
