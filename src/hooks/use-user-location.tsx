import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { detectUserLocation, type GeoapifyReverseResponse, type UserLocation } from "@/lib/geolocation";

type LocationStatus = "idle" | "loading" | "ready" | "error";

type LocationContextValue = {
  location: UserLocation | null;
  /** Lowercase ISO country code from Geoapify (e.g. de, cn). Undefined while loading. */
  countryCode: string | undefined;
  geoapify: GeoapifyReverseResponse | null;
  status: LocationStatus;
  isLoading: boolean;
};

const LocationCtx = createContext<LocationContextValue | null>(null);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [geoapify, setGeoapify] = useState<GeoapifyReverseResponse | null>(null);
  const [status, setStatus] = useState<LocationStatus>("idle");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");

    detectUserLocation()
      .then((result) => {
        if (cancelled) return;
        setLocation(result.location);
        setGeoapify(result.geoapify);
        setStatus(result.location ? "ready" : "error");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const countryCode = status === "loading" ? undefined : (location?.countryCode?.toLowerCase() ?? null);

  return (
    <LocationCtx.Provider
      value={{
        location,
        countryCode,
        geoapify,
        status,
        isLoading: status === "loading",
      }}
    >
      {children}
    </LocationCtx.Provider>
  );
}

export function useLocationContext() {
  const ctx = useContext(LocationCtx);
  if (!ctx) throw new Error("useLocationContext must be used within LocationProvider");
  return ctx;
}

/** @deprecated Use useLocationContext */
export function useUserLocation() {
  const { location, status, isLoading } = useLocationContext();
  return { location, status, isLoading };
}
