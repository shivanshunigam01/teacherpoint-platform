import { Link } from "@tanstack/react-router";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const POPULAR_SKILLS = [
  "Python", "Excel", "ChatGPT", "Data Science", "PMP", "Spoken English",
  "JEE Math", "Web Dev", "UI/UX", "Digital Marketing", "AWS", "PowerBI",
  "React", "SQL", "Figma", "Tableau", "TensorFlow", "Spanish", "NEET", "Mandarin",
];

export function Footer() {
  const { t } = useTranslation("common");

  const cols = [
    {
      title: t("footer.learn"),
      links: [
        { to: "/courses", label: t("footer.allCourses") },
        { to: "/tutors", label: t("footer.findTutor") },
        { to: "/marketplace", label: t("footer.marketplace") },
        { to: "/pricing", label: t("footer.pricing") },
      ],
    },
    {
      title: t("footer.brand"),
      links: [
        { to: "/about", label: t("footer.about") },
        { to: "/contact", label: t("footer.contact") },
        { to: "/faq", label: t("footer.faq") },
        { to: "/post-requirement", label: t("footer.postRequirement") },
        { to: "/role-select", label: t("footer.becomeTeacher") },
      ],
    },
    {
      title: t("footer.supportTitle"),
      links: [
        { to: "/support", label: t("footer.helpCenter") },
        { to: "/reviews", label: t("footer.reviews") },
        { to: "/messages", label: t("nav.messages") },
        { to: "/contact", label: t("footer.reportIssue") },
      ],
    },
  ];

  return (
    <footer className="mt-16 bg-[#0b1220] text-slate-300">
      <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-12">
          <h3 className="text-white font-display text-lg mb-4">{t("footer.popularSkills")}</h3>
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
            <p className="text-sm text-slate-400 max-w-sm mb-4">{t("footer.tagline")}</p>
            <div className="flex items-center gap-3 text-slate-400">
              <a href="#" aria-label="Facebook" className="hover:text-white"><Facebook className="h-4 w-4" /></a>
              <a href="#" aria-label="Twitter" className="hover:text-white"><Twitter className="h-4 w-4" /></a>
              <a href="#" aria-label="Instagram" className="hover:text-white"><Instagram className="h-4 w-4" /></a>
              <a href="#" aria-label="LinkedIn" className="hover:text-white"><Linkedin className="h-4 w-4" /></a>
              <a href="#" aria-label="YouTube" className="hover:text-white"><Youtube className="h-4 w-4" /></a>
            </div>
          </div>

          {cols.map((c) => (
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
            <h4 className="text-white font-semibold mb-2">{t("footer.newsletterTitle")}</h4>
            <p className="text-sm text-slate-400">{t("footer.newsletterDesc")}</p>
          </div>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <div className="relative flex-1">
              <Mail className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <Input
                type="email"
                placeholder={t("footer.emailPlaceholder")}
                required
                className="ps-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500"
              />
            </div>
            <Button type="submit" className="bg-gradient-primary">{t("footer.subscribe")}</Button>
          </form>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row gap-4 items-center justify-between text-xs text-slate-500">
          <p>{t("footer.copyright")}</p>
          <div className="flex gap-4">
            <a href="#">{t("footer.privacy")}</a>
            <a href="#">{t("footer.terms")}</a>
            <a href="#">{t("footer.cookies")}</a>
            <a href="#">{t("footer.sitemap")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
