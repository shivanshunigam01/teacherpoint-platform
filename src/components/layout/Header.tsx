import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Search, Moon, Sun, Menu, X, Bell, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApp } from "@/hooks/use-app";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
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

const NAV_PATHS = [
  { to: "/courses", key: "nav.courses" },
  { to: "/tutors", key: "nav.tutors" },
  { to: "/marketplace", key: "nav.marketplace" },
] as const;

export function Header() {
  const { theme, toggleTheme, role, user, logout } = useApp();
  const { t } = useTranslation("common");
  const [mobileOpen, setMobileOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  const tc = (categoryName: string) => {
    const key = `category.${categoryName}`;
    const translated = t(key);
    return translated === key ? categoryName : translated;
  };

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <div className="border-b bg-muted/50 text-center text-xs sm:text-sm text-muted-foreground py-2 px-4">
        {t("promo.sale")}{" "}
        <Link to="/courses" className="font-medium text-primary underline-offset-2 hover:underline">
          {t("promo.browse")}
        </Link>
      </div>

      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto flex h-16 items-center gap-2 px-4 sm:gap-3 sm:px-6">
          <Link to="/" className="flex shrink-0 items-center" aria-label="TeachersPoints home">
            <BrandLogo size="header" />
          </Link>

          <div className="relative hidden min-w-0 flex-1 md:block md:max-w-md lg:max-w-xl">
            <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={t("nav.search")}
              className="h-10 rounded-lg border-border/80 bg-muted/50 ps-10"
              aria-label={t("nav.search")}
            />
          </div>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1 font-medium">
                  {t("nav.categories")} <ChevronDown className="h-4 w-4 opacity-60" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-52">
                <DropdownMenuLabel>{t("nav.browseTopics")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {CATEGORIES.slice(1).map((c) => (
                  <DropdownMenuItem key={c.id} asChild>
                    <Link to="/courses" search={{ category: c.name } as any}>
                      {tc(c.name)}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {NAV_PATHS.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  path.startsWith(n.to) ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t(n.key)}
              </Link>
            ))}
            <Link
              to="/post-requirement"
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                path.startsWith("/post-requirement") ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("nav.postJob")}
            </Link>
          </nav>

          <div className="ms-auto flex items-center gap-1 sm:gap-1.5">
            <Button variant="ghost" size="icon" className="shrink-0" aria-label={t("nav.toggleTheme")} onClick={toggleTheme}>
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <LanguageSwitcher />
            <Button variant="ghost" size="icon" className="relative hidden shrink-0 md:flex" aria-label={t("nav.notifications")}>
              <Bell className="h-4 w-4" />
              <span className="absolute end-2 top-2 h-1.5 w-1.5 rounded-full bg-destructive" />
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
                    <Link to={`/${role}` as any}>{t("nav.dashboard")}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/messages">{t("nav.messages")}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/support">{t("nav.support")}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>{t("nav.logout")}</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
                  <Link to="/login">{t("nav.login")}</Link>
                </Button>
                <Button asChild size="sm" className="hidden bg-primary sm:inline-flex">
                  <Link to="/role-select">{t("nav.signup")}</Link>
                </Button>
              </>
            )}

            <Button
              variant="outline"
              size="icon"
              className="shrink-0 lg:hidden"
              aria-label={mobileOpen ? t("nav.closeMenu") : t("nav.openMenu")}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileOpen && (
          <div className="xl:hidden border-t bg-background">
            <div className="container mx-auto space-y-1 px-4 py-4">
              <div className="relative mb-3 md:hidden">
                <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder={t("nav.searchShort")} className="rounded-full bg-muted/40 ps-10" />
              </div>
              {NAV_PATHS.map((n) => (
                <Link key={n.to} to={n.to} onClick={() => setMobileOpen(false)} className="block rounded-md px-3 py-2 hover:bg-accent">
                  {t(n.key)}
                </Link>
              ))}
              <Link
                to="/post-requirement"
                onClick={() => setMobileOpen(false)}
                className="block rounded-md px-3 py-2 hover:bg-accent"
              >
                {t("nav.postJob")}
              </Link>
              {!role && (
                <Link to="/login" onClick={() => setMobileOpen(false)} className="block rounded-md px-3 py-2 hover:bg-accent">
                  {t("nav.login")}
                </Link>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
