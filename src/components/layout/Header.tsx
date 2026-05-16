import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Search, Moon, Sun, Globe, Menu, X, Bell, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApp } from "@/hooks/use-app";
import { BrandLogo } from "@/components/BrandLogo";
import { CATEGORIES } from "@/data/mock";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const NAV = [
  { to: "/courses", label: "Courses" },
  { to: "/tutors", label: "Tutors" },
  { to: "/lms", label: "LMS" },
  { to: "/marketplace", label: "Marketplace" },
];

export function Header() {
  const { theme, toggleTheme, lang, setLang, role, user, logout } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navLinkClass = (to: string) =>
    `block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
      path === to || (to !== "/" && path.startsWith(to))
        ? "bg-primary/10 text-primary"
        : "text-foreground hover:bg-muted"
    }`;

  return (
    <>
      <div className="border-b bg-muted/50 text-center text-xs sm:text-sm text-muted-foreground py-2 px-4">
        Spring sale on select courses —{" "}
        <Link to="/courses" className="font-medium text-primary underline-offset-2 hover:underline">
          Browse deals
        </Link>
      </div>

      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto flex h-16 items-center gap-2 px-4 sm:gap-3 sm:px-6">
          <Link to="/" className="flex shrink-0 items-center" aria-label="TeachersPoints home">
            <BrandLogo size="header" />
          </Link>

          <div className="relative hidden min-w-0 flex-1 md:block md:max-w-md lg:max-w-xl">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search courses or tutors…"
              className="h-10 rounded-lg border-border/80 bg-muted/50 pl-10"
              aria-label="Search"
            />
          </div>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1 font-medium">
                  Categories <ChevronDown className="h-4 w-4 opacity-60" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-52">
                <DropdownMenuLabel>Browse by topic</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {CATEGORIES.slice(1).map((c) => (
                  <DropdownMenuItem key={c.id} asChild>
                    <Link to="/courses" search={{ category: c.name } as any}>
                      {c.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  path.startsWith(n.to) ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/post-requirement"
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                path.startsWith("/post-requirement") ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Post a job
            </Link>
          </nav>

          <div className="ml-auto flex items-center gap-1 sm:gap-1.5">
            <Button variant="ghost" size="icon" className="shrink-0" aria-label="Toggle theme" onClick={toggleTheme}>
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden shrink-0 sm:flex" aria-label="Language">
                  <Globe className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLang("en")}>{lang === "en" ? "✓ " : ""}English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang("hi")}>{lang === "hi" ? "✓ " : ""}हिंदी</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon" className="relative hidden shrink-0 md:flex" aria-label="Notifications">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-destructive" />
            </Button>

            {role && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="hidden gap-2 sm:flex">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                      {user.name.charAt(0)}
                    </span>
                    <span className="max-w-[5rem] truncate capitalize">{role}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to={`/${role}` as any}>Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/messages">Messages</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/support">Support</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
                  <Link to="/login">Log in</Link>
                </Button>
                <Button asChild size="sm" className="hidden bg-primary sm:inline-flex">
                  <Link to="/role-select">Sign up</Link>
                </Button>
              </>
            )}

            <Button
              variant="outline"
              size="icon"
              className="shrink-0 lg:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileOpen && (
          <div className="xl:hidden border-t bg-background">
            <div className="container mx-auto px-4 py-4 space-y-1">
              <div className="md:hidden relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search…" className="pl-10 rounded-full bg-muted/40" />
              </div>
              {NAV.map((n) => (
                <Link key={n.to} to={n.to} onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-md hover:bg-accent">
                  {n.label}
                </Link>
              ))}
              {!role && (
                <Link to="/login" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-md hover:bg-accent">Log in</Link>
              )}
            </div>
          </div>
              )}
      </header>
    </>
  );
}
