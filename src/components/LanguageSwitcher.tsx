import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { SupportedLanguage } from "@/i18n";
import { useLocationContext } from "@/hooks/use-user-location";
import { getLanguageOptionsForLocation } from "@/lib/country-languages";

const LABEL_KEYS: Record<SupportedLanguage, string> = {
  en: "lang.en",
  zh: "lang.zh",
  fr: "lang.fr",
  de: "lang.de",
  es: "lang.es",
  it: "lang.it",
  hi: "lang.hi",
  ar: "lang.ar",
};

const STORAGE_KEY = "selectedLanguage";

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation("common");
  const { location, isLoading } = useLocationContext();

  const languages = useMemo(
    () => getLanguageOptionsForLocation(isLoading ? null : location),
    [location, isLoading],
  );

  const regionLabel = location
    ? [location.city, location.country].filter(Boolean).join(", ")
    : null;

  const selectLanguage = (code: SupportedLanguage) => {
    localStorage.setItem(STORAGE_KEY, code);
    void i18n.changeLanguage(code);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="shrink-0 sm:flex" aria-label={t("nav.language")}>
          <Globe className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        {regionLabel && (
          <>
            <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
              {t("lang.forRegion", { region: regionLabel })}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        {languages.map((code) => (
          <DropdownMenuItem key={code} onClick={() => selectLanguage(code)}>
            {i18n.language === code ? "✓ " : ""}
            {t(LABEL_KEYS[code])}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
