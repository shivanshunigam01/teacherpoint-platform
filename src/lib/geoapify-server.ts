import type { LocationDetectResult } from "@/lib/geolocation-types";
import { parseGeoapifyIpResponse, parseGeoapifyReverseResponse } from "@/lib/geoapify-parse";
import type { GeoapifyReverseResponse } from "@/lib/geolocation-types";

/** Runtime key on Vercel/server (not baked into the client bundle). */
export function getGeoapifyApiKey(): string {
  return (
    process.env.GEOAPIFY_API_KEY?.trim() ||
    process.env.VITE_GEOAPIFY_API_KEY?.trim() ||
    ""
  );
}

export function clientIpFromRequest(request: Request): string | undefined {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || undefined;
}

export async function fetchGeoapifyIp(clientIp?: string): Promise<LocationDetectResult> {
  const key = getGeoapifyApiKey();
  if (!key) {
    console.error("[Geoapify] Missing GEOAPIFY_API_KEY or VITE_GEOAPIFY_API_KEY on server");
    return { location: null, geoapify: null };
  }

  const params = new URLSearchParams({ apiKey: key });
  if (clientIp) params.set("ip", clientIp);

  const url = `https://api.geoapify.com/v1/ipinfo?${params}`;
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error("[Geoapify] ipinfo failed", res.status, body.slice(0, 200));
    return { location: null, geoapify: null };
  }

  const data = (await res.json()) as Record<string, unknown>;
  return parseGeoapifyIpResponse(data);
}

export async function fetchGeoapifyReverse(lat: number, lon: number): Promise<LocationDetectResult> {
  const key = getGeoapifyApiKey();
  if (!key) {
    console.error("[Geoapify] Missing GEOAPIFY_API_KEY or VITE_GEOAPIFY_API_KEY on server");
    return { location: null, geoapify: null };
  }

  const params = new URLSearchParams({
    lat: String(lat),
    lon: String(lon),
    apiKey: key,
  });
  const res = await fetch(`https://api.geoapify.com/v1/geocode/reverse?${params}`);
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error("[Geoapify] reverse failed", res.status, body.slice(0, 200));
    return { location: null, geoapify: null };
  }

  const data = (await res.json()) as GeoapifyReverseResponse;
  return parseGeoapifyReverseResponse(data);
}
