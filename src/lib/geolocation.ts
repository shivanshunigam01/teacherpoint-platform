export type UserLocation = {
  country: string;
  countryCode: string;
  city: string;
  state?: string;
  formatted?: string;
};

export type GeoapifyReverseResponse = {
  type?: string;
  features?: Array<{
    type?: string;
    properties?: {
      country?: string;
      country_code?: string;
      city?: string;
      state?: string;
      formatted?: string;
    };
  }>;
};

export type LocationDetectResult = {
  location: UserLocation | null;
  geoapify: GeoapifyReverseResponse | null;
};

type GeoapifyProps = NonNullable<GeoapifyReverseResponse["features"]>[number]["properties"];

function apiKey() {
  return import.meta.env.VITE_GEOAPIFY_API_KEY ?? "";
}

function fromProps(props: GeoapifyProps): UserLocation | null {
  if (!props?.country) return null;
  return {
    country: props.country,
    countryCode: (props.country_code ?? "").toUpperCase(),
    city: props.city ?? props.state ?? "",
    state: props.state,
    formatted: props.formatted,
  };
}

export async function reverseGeocode(lat: number, lon: number): Promise<LocationDetectResult> {
  const key = apiKey();
  if (!key) return { location: null, geoapify: null };
  const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${key}`;
  const res = await fetch(url);
  if (!res.ok) return { location: null, geoapify: null };
  const data = (await res.json()) as GeoapifyReverseResponse;
  const props = data.features?.[0]?.properties;
  return { location: props ? fromProps(props) : null, geoapify: data };
}

export async function geolocateByIp(): Promise<LocationDetectResult> {
  const key = apiKey();
  if (!key) {
    console.warn("[Geoapify] VITE_GEOAPIFY_API_KEY is missing — location, language, and regional ads are disabled.");
    return { location: null, geoapify: null };
  }
  const res = await fetch(`https://api.geoapify.com/v1/ipinfo?apiKey=${key}`);
  if (!res.ok) return { location: null, geoapify: null };
  const data = await res.json();

  if (typeof data.country === "string") {
    const props = data as GeoapifyProps;
    return {
      location: fromProps(props),
      geoapify: {
        features: [{ properties: props }],
      },
    };
  }

  const featureProps = data.features?.[0]?.properties as GeoapifyProps | undefined;
  if (featureProps?.country) {
    return { location: fromProps(featureProps), geoapify: data as GeoapifyReverseResponse };
  }

  const countryName = data.country?.name;
  if (!countryName) return { location: null, geoapify: null };

  const cityRaw = data.city?.name ?? data.city;
  const props: GeoapifyProps = {
    country: countryName,
    country_code: String(data.country?.iso_code ?? data.country?.iso_alpha2 ?? "").toLowerCase(),
    city: typeof cityRaw === "string" ? cityRaw : "",
    state: typeof data.state === "object" ? data.state?.name : data.state,
  };

  return {
    location: fromProps(props),
    geoapify: { features: [{ properties: props }] },
  };
}

export function requestBrowserPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation not supported"));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: false,
      timeout: 12_000,
      maximumAge: 300_000,
    });
  });
}

export async function detectUserLocation(): Promise<LocationDetectResult> {
  try {
    const pos = await requestBrowserPosition();
    const fromGps = await reverseGeocode(pos.coords.latitude, pos.coords.longitude);
    if (fromGps.location) return fromGps;
  } catch {
    /* fall through to IP */
  }
  return geolocateByIp();
}

/** Read country_code from a Geoapify reverse geocode payload. */
export function getCountryCodeFromGeoapify(data?: GeoapifyReverseResponse | null): string | undefined {
  const code = data?.features?.[0]?.properties?.country_code;
  return code ? code.toLowerCase() : undefined;
}
