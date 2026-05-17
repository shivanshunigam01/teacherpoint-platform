import { useEffect, useRef } from "react";
import i18n from "i18next";
import { getCountryCodeFromGeoapify, type GeoapifyReverseResponse } from "@/lib/geolocation";
import { getLanguageFromCountry } from "@/utils/getLanguageFromCountry";

const STORAGE_KEY = "selectedLanguage";

function resolveCountryCode(input?: string | null | GeoapifyReverseResponse): string | null | undefined {
  if (input === undefined) return undefined;
  if (input === null) return null;
  if (typeof input === "string") return input;
  return getCountryCodeFromGeoapify(input) ?? null;
}

/**
 * Applies language from Geoapify country_code when the user has not chosen one manually.
 * Pass `undefined` while location is still loading to avoid premature changes.
 */
export function useAutoLanguageFromLocation(countryCodeOrGeo?: string | null | GeoapifyReverseResponse) {
  const lastApplied = useRef<string | null>(null);
  const countryCode = resolveCountryCode(countryCodeOrGeo);

  useEffect(() => {
    if (countryCode === undefined) return;

    const manual = localStorage.getItem(STORAGE_KEY);
    if (manual) {
      if (i18n.language !== manual) {
        void i18n.changeLanguage(manual);
      }
      return;
    }

    const mapped = getLanguageFromCountry(countryCode);
    if (lastApplied.current === mapped && i18n.language === mapped) return;

    lastApplied.current = mapped;
    void i18n.changeLanguage(mapped).then(() => {
      localStorage.setItem(STORAGE_KEY, mapped);
    });
  }, [countryCode]);
}
