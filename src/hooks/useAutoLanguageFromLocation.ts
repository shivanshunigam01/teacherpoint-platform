import { useEffect, useRef } from "react";
import i18n from "i18next";
import type { UserLocation } from "@/lib/geolocation";
import { getDefaultLanguageForLocation } from "@/lib/country-languages";

const STORAGE_KEY = "selectedLanguage";

/**
 * Applies language from Geoapify country/city when the user has not chosen one manually.
 * Pass `undefined` while location is still loading to avoid premature changes.
 */
export function useAutoLanguageFromLocation(location: UserLocation | null | undefined) {
  const lastApplied = useRef<string | null>(null);

  useEffect(() => {
    if (location === undefined) return;

    const manual = localStorage.getItem(STORAGE_KEY);
    if (manual) {
      if (i18n.language !== manual) {
        void i18n.changeLanguage(manual);
      }
      return;
    }

    const mapped = getDefaultLanguageForLocation(location);
    if (lastApplied.current === mapped && i18n.language === mapped) return;

    lastApplied.current = mapped;
    void i18n.changeLanguage(mapped).then(() => {
      localStorage.setItem(STORAGE_KEY, mapped);
    });
  }, [location?.countryCode, location?.city, location?.country]);
}
