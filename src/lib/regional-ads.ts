import type { RegionalAd } from "@/hooks/use-admin-store";
import type { UserLocation } from "@/lib/geolocation";

const norm = (s: string) => s.trim().toLowerCase();

export function adMatchesLocation(ad: RegionalAd, location: UserLocation | null): boolean {
  if (!ad.active) return false;
  if (ad.targetType === "global") return true;
  if (!location) return false;

  const target = norm(ad.targetValue);

  if (ad.targetType === "country") {
    const country = norm(location.country);
    const code = norm(location.countryCode);
    return (
      country === target ||
      code === target ||
      country.includes(target) ||
      target.includes(country) ||
      target === code ||
      (target.length === 2 && code === target)
    );
  }

  if (ad.targetType === "city") {
    const city = norm(location.city);
    return city === target || city.includes(target) || target.includes(city);
  }

  return false;
}

const targetPriority = (ad: RegionalAd) =>
  ad.targetType === "city" ? 3 : ad.targetType === "country" ? 2 : 1;

export function pickRegionalAd(ads: RegionalAd[], location: UserLocation | null, dismissed: Set<string>) {
  return (
    ads
      .filter((ad) => adMatchesLocation(ad, location) && !dismissed.has(ad.id))
      .sort((a, b) => {
        const byTarget = targetPriority(b) - targetPriority(a);
        if (byTarget !== 0) return byTarget;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      })[0] ?? null
  );
}
