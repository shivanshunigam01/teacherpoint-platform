import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Moon, Sun, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useApp } from "@/hooks/use-app";
import { BrandLogo } from "@/components/BrandLogo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

export interface NavItem {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function DashboardShell({
  items,
  title,
  children,
}: {
  items: NavItem[];
  title: string;
  children: ReactNode;
}) {
  const { user, role, theme, toggleTheme, logout } = useApp();
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  return (
    <SidebarProvider className="flex min-h-[100dvh] w-full flex-col">
      <header className="z-50 flex h-16 shrink-0 items-center gap-3 border-b bg-background px-4">
        <SidebarTrigger className="shrink-0" />
        <Link to={`/${role}` as "/"} className="flex shrink-0 items-center" aria-label="Dashboard home">
          <BrandLogo size="header" />
        </Link>
        <span className="hidden text-sm font-semibold sm:inline">{title}</span>
        <div className="ms-auto flex items-center gap-1">
          <Button variant="ghost" size="icon" aria-label={t("nav.toggleTheme")} onClick={toggleTheme}>
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <LanguageSwitcher />
          {user && (
            <span className="hidden max-w-[8rem] truncate text-sm text-muted-foreground md:inline">{user.name}</span>
          )}
          <Button variant="ghost" size="sm" className="gap-1.5" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">{t("nav.logout")}</span>
          </Button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <Sidebar collapsible="icon" className="!top-16 !bottom-0 !h-[calc(100dvh-4rem)]">
          <SidebarContent className="py-3">
            <SidebarGroup>
              <SidebarGroupLabel className="capitalize">{role} menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((i) => (
                    <SidebarMenuItem key={i.to}>
                      <SidebarMenuButton asChild isActive={path === i.to}>
                        <Link to={i.to as any}>
                          <i.icon className="h-4 w-4" />
                          <span>{i.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <SidebarInset className="min-h-0 min-w-0 flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto bg-muted/20 p-4 md:p-6">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

export function StatCard({ label, value, change, icon: Icon, color = "from-sky-400 to-blue-600" }: any) {
  return (
    <div className="bg-card border rounded-2xl p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs text-muted-foreground">{label}</div>
          <div className="font-display font-extrabold text-2xl mt-1">{value}</div>
          {change && <div className="text-xs text-emerald-600 mt-1">{change}</div>}
        </div>
        <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${color} text-white grid place-items-center`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
