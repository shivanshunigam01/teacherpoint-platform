import type { SupportedLanguage } from "@/i18n";
import type { UserLocation } from "@/lib/geolocation";

const GLOBAL_LANGUAGES: SupportedLanguage[] = ["en", "zh", "fr", "de", "es", "it", "hi", "ar"];

/** Languages offered in the switcher for a detected country / city (Geoapify). */
export function getLanguageOptionsForLocation(location: UserLocation | null): SupportedLanguage[] {
  if (!location) return GLOBAL_LANGUAGES;

  const country = location.countryCode?.toLowerCase() ?? "";
  const city = (location.city ?? "").toLowerCase();

  if (country === "in") return ["en", "hi"];
  if (country === "ae" || city.includes("dubai") || city.includes("abu dhabi")) return ["en", "ar"];
  if (country === "sa" || country === "qa" || country === "kw" || country === "bh" || country === "om") {
    return ["en", "ar"];
  }
  if (country === "cn" || country === "hk" || country === "tw") return ["en", "zh"];
  if (country === "fr") return ["en", "fr"];
  if (country === "de") return ["en", "de"];
  if (country === "es") return ["en", "es"];
  if (country === "it") return ["en", "it"];

  return GLOBAL_LANGUAGES;
}

/** Default language applied on first visit (no manual choice in localStorage). */
export function getDefaultLanguageForLocation(location: UserLocation | null): SupportedLanguage {
  if (!location) return "en";

  const country = location.countryCode?.toLowerCase() ?? "";
  const city = (location.city ?? "").toLowerCase();

  if (country === "in") return "en";
  if (country === "ae" || city.includes("dubai") || city.includes("abu dhabi")) return "ar";
  if (country === "sa" || country === "qa" || country === "kw" || country === "bh" || country === "om") return "ar";
  if (country === "cn" || country === "hk" || country === "tw") return "zh";
  if (country === "fr") return "fr";
  if (country === "de") return "de";
  if (country === "es") return "es";
  if (country === "it") return "it";

  return "en";
}

export function isRtlLanguage(code: string): boolean {
  return code === "ar";
}
