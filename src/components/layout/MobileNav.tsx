import { Link, useRouterState } from "@tanstack/react-router";
import { Home, BookOpen, Users, MessageCircle, User } from "lucide-react";
import { useApp } from "@/hooks/use-app";

const ITEMS = [
  { to: "/", label: "Home", icon: Home },
  { to: "/courses", label: "Courses", icon: BookOpen },
  { to: "/tutors", label: "Tutors", icon: Users },
  { to: "/messages", label: "Messages", icon: MessageCircle },
] as const;

export function MobileNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { role } = useApp();
  const profileTo = role ? (`/${role}` as const) : "/login";

  const isDashboard =
    path.startsWith("/admin") ||
    path.startsWith("/student") ||
    path.startsWith("/teacher") ||
    path.startsWith("/parent") ||
    path.startsWith("/lms");

  if (isDashboard) return null;

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 border-t bg-background/95 backdrop-blur-md safe-bottom lg:hidden"
      aria-label="Mobile navigation"
    >
      <div className="grid grid-cols-5">
        {ITEMS.map((i) => {
          const active = path === i.to || (i.to !== "/" && path.startsWith(i.to));
          return (
            <Link
              key={i.to}
              to={i.to}
              className={`flex min-h-[3.25rem] flex-col items-center justify-center gap-0.5 px-1 py-2 text-[10px] font-medium sm:text-xs ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <i.icon className="h-5 w-5" strokeWidth={active ? 2.25 : 2} />
              <span>{i.label}</span>
            </Link>
          );
        })}
        <Link
          to={profileTo}
          className={`flex min-h-[3.25rem] flex-col items-center justify-center gap-0.5 px-1 py-2 text-[10px] font-medium sm:text-xs ${
            path === profileTo || (profileTo !== "/login" && path.startsWith(profileTo))
              ? "text-primary"
              : "text-muted-foreground"
          }`}
        >
          <User className="h-5 w-5" />
          <span>{role ? "Account" : "Log in"}</span>
        </Link>
      </div>
    </nav>
  );
}
