export type {
  UserLocation,
  GeoapifyReverseResponse,
  LocationDetectResult,
} from "@/lib/geolocation-types";

import type { LocationDetectResult } from "@/lib/geolocation-types";

async function fetchLocationApi(path: string): Promise<LocationDetectResult> {
  try {
    const res = await fetch(path, { credentials: "same-origin" });
    if (!res.ok) {
      console.warn("[location] API error", path, res.status);
      return { location: null, geoapify: null };
    }
    return (await res.json()) as LocationDetectResult;
  } catch (err) {
    console.warn("[location] API request failed", path, err);
    return { location: null, geoapify: null };
  }
}

export async function geolocateByIp(): Promise<LocationDetectResult> {
  return fetchLocationApi("/api/geolocation/ip");
}

export async function reverseGeocode(lat: number, lon: number): Promise<LocationDetectResult> {
  const params = new URLSearchParams({ lat: String(lat), lon: String(lon) });
  return fetchLocationApi(`/api/geolocation/reverse?${params}`);
}

export function requestBrowserPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      reject(new Error("Geolocation not supported"));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: false,
      timeout: 10_000,
      maximumAge: 300_000,
    });
  });
}

/** IP lookup first (server + Geoapify), then optional GPS refinement. */
export async function detectUserLocation(): Promise<LocationDetectResult> {
  const fromIp = await geolocateByIp();
  if (fromIp.location) {
    try {
      const pos = await requestBrowserPosition();
      const fromGps = await reverseGeocode(pos.coords.latitude, pos.coords.longitude);
      if (fromGps.location) return fromGps;
    } catch {
      /* permission denied or timeout — keep IP result */
    }
    return fromIp;
  }

  try {
    const pos = await requestBrowserPosition();
    return await reverseGeocode(pos.coords.latitude, pos.coords.longitude);
  } catch {
    return fromIp;
  }
}

export function getCountryCodeFromGeoapify(
  data?: import("@/lib/geolocation-types").GeoapifyReverseResponse | null,
): string | undefined {
  const code = data?.features?.[0]?.properties?.country_code;
  return code ? code.toLowerCase() : undefined;
}
