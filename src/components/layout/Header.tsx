import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Moon, Sun, Globe, Menu, X, ShoppingCart, Bell, ChevronDown, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApp } from "@/hooks/use-app";
import logo from "@/assets/teacherpoint-logo.png";
import { CATEGORIES } from "@/data/mock";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
  DropdownMenuLabel, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const NAV = [
  { to: "/courses", label: "Courses" },
  { to: "/tutors", label: "Tutors" },
  { to: "/lms", label: "LMS" },
  { to: "/marketplace", label: "Marketplace" },
  { to: "/post-requirement", label: "Post Job" },
];

export function Header() {
  const { theme, toggleTheme, lang, setLang, role, user, logout } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <>
      {/* promo bar */}
      <div className="bg-gradient-primary text-primary-foreground text-xs sm:text-sm py-2 px-4 text-center font-medium">
        🎓 Mid-year sale — courses from $9.99 · ends in 2 days. <Link to="/courses" className="underline ml-1">Shop now</Link>
      </div>

      <header className="sticky top-0 z-40 bg-background/85 backdrop-blur border-b">
        <div className="container mx-auto px-4 h-16 flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="TeacherPoint home">
            <img src={logo} alt="TeacherPoint logo" className="h-9 w-9 rounded-lg object-contain" />
            <span className="font-display font-bold text-lg hidden sm:block">TeacherPoint</span>
          </Link>

          <DropdownMenu open={catOpen} onOpenChange={setCatOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hidden lg:flex gap-1">
                Categories <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Browse</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {CATEGORIES.slice(1).map((c) => (
                <DropdownMenuItem key={c.id} asChild>
                  <Link to="/courses" search={{ category: c.name } as any}>{c.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="hidden md:flex flex-1 max-w-2xl relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses, tutors, skills…"
              className="pl-10 pr-10 rounded-full bg-muted/40"
              aria-label="Search"
            />
            <button aria-label="Voice search" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary">
              <Mic className="h-4 w-4" />
            </button>
          </div>

          <nav className="hidden xl:flex items-center gap-1 ml-2">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={`px-3 py-1.5 text-sm rounded-md hover:bg-accent transition ${path.startsWith(n.to) ? "text-primary font-semibold" : ""}`}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 ml-auto">
            <Button variant="ghost" size="icon" aria-label="Toggle dark mode" onClick={toggleTheme}>
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Language" className="hidden sm:flex">
                  <Globe className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLang("en")}>{lang === "en" && "✓ "}English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang("hi")}>{lang === "hi" && "✓ "}हिंदी</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon" aria-label="Notifications" className="hidden sm:flex relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Cart" className="hidden sm:flex">
              <ShoppingCart className="h-4 w-4" />
            </Button>

            {role && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <div className="h-7 w-7 rounded-full bg-gradient-primary text-primary-foreground grid place-items-center text-xs font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <span className="hidden md:inline text-sm capitalize">{role}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuLabel className="capitalize">{user.name} · {role}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild><Link to={`/${role}` as any}>Dashboard</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link to="/messages">Messages</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link to="/support">Support</Link></DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm" className="hidden sm:flex"><Link to="/login">Log in</Link></Button>
                <Button asChild size="sm" className="bg-gradient-primary"><Link to="/role-select">Sign up</Link></Button>
              </>
            )}

            <Button variant="ghost" size="icon" className="xl:hidden" aria-label="Menu" onClick={() => setMobileOpen(!mobileOpen)}>
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
