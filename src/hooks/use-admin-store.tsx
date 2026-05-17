import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { COURSES, TUTORS, COMBOS, GRADIENTS, type Course, type Tutor } from "@/data/mock";

export type Combo = (typeof COMBOS)[number];

export type RegionalAdTarget = "global" | "country" | "city";

export type RegionalAd = {
  id: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  imageUrl?: string;
  targetType: RegionalAdTarget;
  /** e.g. India, IN, Mumbai, Germany, DE */
  targetValue: string;
  active: boolean;
  createdAt: string;
};

type Store = {
  courses: Course[];
  tutors: Tutor[];
  combos: Combo[];
  regionalAds: RegionalAd[];
};

type AdminStore = Store & {
  addCourse: (c: Partial<Course>) => void;
  updateCourse: (id: string, patch: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  addTutor: (t: Partial<Tutor>) => void;
  updateTutor: (id: string, patch: Partial<Tutor>) => void;
  deleteTutor: (id: string) => void;
  addCombo: (k: Partial<Combo>) => void;
  updateCombo: (id: string, patch: Partial<Combo>) => void;
  deleteCombo: (id: string) => void;
  addRegionalAd: (ad: Partial<RegionalAd>) => void;
  updateRegionalAd: (id: string, patch: Partial<RegionalAd>) => void;
  deleteRegionalAd: (id: string) => void;
  reset: () => void;
};

const KEY = "tp_admin_store_v2";
const LEGACY_KEY = "tp_admin_store_v1";
const Ctx = createContext<AdminStore | null>(null);

const DEFAULT_REGIONAL_ADS: RegionalAd[] = [
  {
    id: "ad-welcome-global",
    title: "Welcome to TeachersPoints",
    description: "Explore thousands of courses and book verified tutors — your first discovery session is free.",
    ctaText: "Get started",
    ctaLink: "/role-select",
    targetType: "global",
    targetValue: "*",
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "ad-india-spring",
    title: "India learners: Spring sale",
    description: "Up to 40% off NEET, JEE, and spoken English courses — limited time for students in India.",
    ctaText: "Browse Indian deals",
    ctaLink: "/courses",
    targetType: "country",
    targetValue: "India",
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "ad-germany-tech",
    title: "Tech upskilling week",
    description: "German learners save 25% on AI, data science, and web development programs this week.",
    ctaText: "See tech courses",
    ctaLink: "/courses",
    targetType: "country",
    targetValue: "Germany",
    active: true,
    createdAt: new Date().toISOString(),
  },
];

const initial = (): Store => ({
  courses: COURSES.map((c) => ({ ...c })),
  tutors: TUTORS.map((t) => ({ ...t })),
  combos: COMBOS.map((k) => ({ ...k })),
  regionalAds: DEFAULT_REGIONAL_ADS.map((a) => ({ ...a })),
});

const rid = (p: string) => p + Math.random().toString(36).slice(2, 8);

function parseStore(raw: string): Store {
  const parsed = JSON.parse(raw) as Partial<Store>;
  const base = initial();
  return {
    courses: parsed.courses ?? base.courses,
    tutors: parsed.tutors ?? base.tutors,
    combos: parsed.combos ?? base.combos,
    regionalAds: parsed.regionalAds?.length ? parsed.regionalAds : base.regionalAds,
  };
}

export function AdminStoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Store>(initial);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem(KEY) ?? localStorage.getItem(LEGACY_KEY);
    if (raw) {
      try {
        setState(parseStore(raw));
      } catch {
        /* ignore */
      }
    }
  }, []);

  const persist = (next: Store) => {
    setState(next);
    if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(next));
  };

  const value: AdminStore = {
    ...state,
    addCourse: (c) =>
      persist({
        ...state,
        courses: [
          {
            id: rid("c"),
            title: "New course",
            instructor: "TBD",
            category: "Development",
            level: "Beginner",
            rating: 4.5,
            reviews: 0,
            price: 19,
            oldPrice: 49,
            duration: "10h",
            lessons: 20,
            students: 0,
            certificate: true,
            language: "English",
            gradient: GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)],
            description: "Course description",
            ...c,
          } as Course,
          ...state.courses,
        ],
      }),
    updateCourse: (id, patch) =>
      persist({
        ...state,
        courses: state.courses.map((c) => (c.id === id ? { ...c, ...patch } : c)),
      }),
    deleteCourse: (id) => persist({ ...state, courses: state.courses.filter((c) => c.id !== id) }),
    addTutor: (t) =>
      persist({
        ...state,
        tutors: [
          {
            id: rid("t"),
            name: "New Tutor",
            subject: "Mathematics",
            location: "Remote",
            rating: 4.5,
            reviews: 0,
            experience: 1,
            price: 20,
            verified: false,
            online: true,
            language: ["English"],
            gender: "female",
            bio: "Tutor bio",
            initials: "NT",
            gradient: GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)],
            availability: "Flexible",
            ...t,
          } as Tutor,
          ...state.tutors,
        ],
      }),
    updateTutor: (id, patch) =>
      persist({
        ...state,
        tutors: state.tutors.map((t) => (t.id === id ? { ...t, ...patch } : t)),
      }),
    deleteTutor: (id) => persist({ ...state, tutors: state.tutors.filter((t) => t.id !== id) }),
    addCombo: (k) =>
      persist({
        ...state,
        combos: [
          {
            id: rid("k"),
            title: "New Combo",
            courses: 3,
            hours: 30,
            price: 29,
            oldPrice: 99,
            includes: ["Course A", "Course B"],
            gradient: GRADIENTS[0],
            ...k,
          } as Combo,
          ...state.combos,
        ],
      }),
    updateCombo: (id, patch) =>
      persist({
        ...state,
        combos: state.combos.map((k) => (k.id === id ? { ...k, ...patch } : k)),
      }),
    deleteCombo: (id) => persist({ ...state, combos: state.combos.filter((k) => k.id !== id) }),
    addRegionalAd: (ad) =>
      persist({
        ...state,
        regionalAds: [
          {
            id: rid("ad"),
            title: "New promotion",
            description: "Describe your offer for this region.",
            ctaText: "Learn more",
            ctaLink: "/courses",
            targetType: "country",
            targetValue: "India",
            active: true,
            createdAt: new Date().toISOString(),
            ...ad,
          },
          ...state.regionalAds,
        ],
      }),
    updateRegionalAd: (id, patch) =>
      persist({
        ...state,
        regionalAds: state.regionalAds.map((a) => (a.id === id ? { ...a, ...patch } : a)),
      }),
    deleteRegionalAd: (id) =>
      persist({ ...state, regionalAds: state.regionalAds.filter((a) => a.id !== id) }),
    reset: () => persist(initial()),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAdminStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAdminStore must be used inside AdminStoreProvider");
  return v;
}
