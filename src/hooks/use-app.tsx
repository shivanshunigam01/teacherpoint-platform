import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { DEMO_USERS, type Role } from "@/data/mock";
import { DEMO_USER_IDS } from "@/data/requirements-seed";

type Theme = "light" | "dark";

interface AppState {
  role: Role | null;
  user: { id: string; name: string; email: string } | null;
  theme: Theme;
  login: (role: Role) => void;
  logout: () => void;
  toggleTheme: () => void;
}

const Ctx = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role | null>(null);
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const r = localStorage.getItem("tp_role") as Role | null;
    const t = (localStorage.getItem("tp_theme") as Theme) || "light";
    if (r) setRole(r);
    setTheme(t);
    document.documentElement.classList.toggle("dark", t === "dark");
  }, []);

  const login = (r: Role) => {
    setRole(r);
    if (typeof window !== "undefined") localStorage.setItem("tp_role", r);
  };
  const logout = () => {
    setRole(null);
    if (typeof window !== "undefined") localStorage.removeItem("tp_role");
  };
  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("tp_theme", next);
      document.documentElement.classList.toggle("dark", next === "dark");
    }
  };

  const user = role
    ? {
        ...DEMO_USERS[role],
        id: role === "student" ? DEMO_USER_IDS.student : role === "teacher" ? DEMO_USER_IDS.teacher : role === "admin" ? DEMO_USER_IDS.admin : `demo-${role}`,
      }
    : null;

  return (
    <Ctx.Provider value={{ role, user, theme, login, logout, toggleTheme }}>
      {children}
    </Ctx.Provider>
  );
}

export function useApp() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useApp must be used inside AppProvider");
  return v;
}
