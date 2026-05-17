import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { SupportedLanguage } from "@/i18n";

const LANGUAGES: { code: SupportedLanguage; labelKey: string }[] = [
  { code: "en", labelKey: "lang.en" },
  { code: "zh", labelKey: "lang.zh" },
  { code: "fr", labelKey: "lang.fr" },
  { code: "de", labelKey: "lang.de" },
  { code: "es", labelKey: "lang.es" },
  { code: "it", labelKey: "lang.it" },
];

const STORAGE_KEY = "selectedLanguage";

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation("common");

  const selectLanguage = (code: SupportedLanguage) => {
    localStorage.setItem(STORAGE_KEY, code);
    void i18n.changeLanguage(code);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="hidden shrink-0 sm:flex" aria-label={t("nav.language")}>
          <Globe className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LANGUAGES.map(({ code, labelKey }) => (
          <DropdownMenuItem key={code} onClick={() => selectLanguage(code)}>
            {i18n.language === code ? "✓ " : ""}
            {t(labelKey)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
