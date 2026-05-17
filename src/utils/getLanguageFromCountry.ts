/** Maps ISO 3166-1 alpha-2 country codes to i18next language codes. */
export function getLanguageFromCountry(countryCode?: string | null): string {
  if (!countryCode || typeof countryCode !== "string") return "en";

  const code = countryCode.trim().toLowerCase();
  if (!code) return "en";

  switch (code) {
    case "cn":
    case "hk":
    case "tw":
      return "zh";
    case "fr":
      return "fr";
    case "de":
      return "de";
    case "es":
      return "es";
    case "it":
      return "it";
    case "in":
    case "gb":
    case "us":
      return "en";
    default:
      return "en";
  }
}
