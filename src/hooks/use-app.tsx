import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { DEMO_USERS, type Role } from "@/data/mock";

type Lang = "en" | "hi";
type Theme = "light" | "dark";

interface AppState {
  role: Role | null;
  user: { name: string; email: string } | null;
  lang: Lang;
  theme: Theme;
  login: (role: Role) => void;
  logout: () => void;
  setLang: (l: Lang) => void;
  toggleTheme: () => void;
}

const Ctx = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role | null>(null);
  const [lang, setLangState] = useState<Lang>("en");
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const r = localStorage.getItem("tp_role") as Role | null;
    const l = (localStorage.getItem("tp_lang") as Lang) || "en";
    const t = (localStorage.getItem("tp_theme") as Theme) || "light";
    if (r) setRole(r);
    setLangState(l);
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
  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("tp_lang", l);
  };
  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("tp_theme", next);
      document.documentElement.classList.toggle("dark", next === "dark");
    }
  };

  return (
    <Ctx.Provider value={{ role, user: role ? DEMO_USERS[role] : null, lang, theme, login, logout, setLang, toggleTheme }}>
      {children}
    </Ctx.Provider>
  );
}

export function useApp() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useApp must be used inside AppProvider");
  return v;
}
