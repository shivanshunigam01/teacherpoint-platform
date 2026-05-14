import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger,
} from "@/components/ui/sidebar";
import { useApp } from "@/hooks/use-app";
import logo from "@/assets/teacherpoint-logo.png";

export interface NavItem { to: string; label: string; icon: any; }

export function DashboardShell({ items, title, children }: { items: NavItem[]; title: string; children: ReactNode }) {
  const { user, role } = useApp();
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-[calc(100vh-4rem)]">
        <Sidebar collapsible="icon">
          <SidebarContent>
            <div className="px-4 py-4 flex items-center gap-2 border-b">
              <img src={logo} alt="" className="h-8 w-8 rounded-lg" />
              <div className="font-display font-bold">{title}</div>
            </div>
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
        <div className="flex-1 flex flex-col">
          <div className="h-12 border-b flex items-center px-4 gap-3 bg-background sticky top-16 z-20">
            <SidebarTrigger />
            <div className="text-sm font-semibold">{title}</div>
            <div className="ml-auto text-sm text-muted-foreground hidden sm:block">{user?.name}</div>
          </div>
          <div className="flex-1 p-4 md:p-6 bg-muted/20">{children}</div>
        </div>
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
