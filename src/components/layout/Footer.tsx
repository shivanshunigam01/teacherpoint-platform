import { Link } from "@tanstack/react-router";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const COLS = [
  {
    title: "Learn",
    links: [
      { to: "/courses", label: "All Courses" },
      { to: "/tutors", label: "Find a Tutor" },
      { to: "/lms", label: "LMS Dashboard" },
      { to: "/marketplace", label: "Marketplace" },
      { to: "/pricing", label: "Plans & Pricing" },
    ],
  },
  {
    title: "TeachersPoints",
    links: [
      { to: "/about", label: "About" },
      { to: "/contact", label: "Contact" },
      { to: "/faq", label: "FAQ" },
      { to: "/post-requirement", label: "Post a Requirement" },
      { to: "/role-select", label: "Become a Teacher" },
    ],
  },
  {
    title: "Support",
    links: [
      { to: "/support", label: "Help Center" },
      { to: "/reviews", label: "Reviews" },
      { to: "/messages", label: "Messages" },
      { to: "/contact", label: "Report Issue" },
    ],
  },
];

const POPULAR_SKILLS = [
  "Python", "Excel", "ChatGPT", "Data Science", "PMP", "Spoken English",
  "JEE Math", "Web Dev", "UI/UX", "Digital Marketing", "AWS", "PowerBI",
  "React", "SQL", "Figma", "Tableau", "TensorFlow", "Spanish", "NEET", "Mandarin",
];

export function Footer() {
  return (
    <footer className="mt-16 bg-[#0b1220] text-slate-300">
      <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16">
        {/* Popular skills */}
        <div className="mb-12">
          <h3 className="text-white font-display text-lg mb-4">Popular skills students are learning</h3>
          <div className="flex flex-wrap gap-2">
            {POPULAR_SKILLS.map((s) => (
              <Link key={s} to="/courses" className="text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 transition">
                {s}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <div className="mb-4">
              <BrandLogo size="footer" />
            </div>
            <p className="text-sm text-slate-400 max-w-sm mb-4">
              The trusted edtech marketplace connecting students, parents, and the world's best tutors.
            </p>
            <div className="flex items-center gap-3 text-slate-400">
              <a href="#" aria-label="Facebook" className="hover:text-white"><Facebook className="h-4 w-4" /></a>
              <a href="#" aria-label="Twitter" className="hover:text-white"><Twitter className="h-4 w-4" /></a>
              <a href="#" aria-label="Instagram" className="hover:text-white"><Instagram className="h-4 w-4" /></a>
              <a href="#" aria-label="LinkedIn" className="hover:text-white"><Linkedin className="h-4 w-4" /></a>
              <a href="#" aria-label="YouTube" className="hover:text-white"><Youtube className="h-4 w-4" /></a>
            </div>
          </div>

          {COLS.map((c) => (
            <div key={c.title}>
              <h4 className="text-white font-semibold mb-4 text-sm">{c.title}</h4>
              <ul className="space-y-2">
                {c.links.map((l) => (
                  <li key={l.to + l.label}>
                    <Link to={l.to as any} className="text-sm text-slate-400 hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h4 className="text-white font-semibold mb-2">Get learning tips in your inbox</h4>
            <p className="text-sm text-slate-400">Weekly tutor picks, course discounts, and study guides.</p>
          </div>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <Input type="email" placeholder="you@email.com" required className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500" />
            </div>
            <Button type="submit" className="bg-gradient-primary">Subscribe</Button>
          </form>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row gap-4 items-center justify-between text-xs text-slate-500">
          <p>© 2026 TeachersPoints. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookie Settings</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
