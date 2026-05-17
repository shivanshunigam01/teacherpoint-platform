import type { UserLocation } from "@/lib/geolocation";
import { getDefaultLanguageForLocation } from "@/lib/country-languages";

/** @deprecated Prefer getDefaultLanguageForLocation with full Geoapify location. */
export function getLanguageFromCountry(countryCode?: string | null): string {
  if (!countryCode) return "en";
  const location: UserLocation = {
    country: "",
    countryCode: countryCode.toUpperCase(),
    city: "",
  };
  return getDefaultLanguageForLocation(location);
}
