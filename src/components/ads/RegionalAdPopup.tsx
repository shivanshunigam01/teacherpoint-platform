import { useEffect, useMemo, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { MapPin, Sparkles, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAdminStore } from "@/hooks/use-admin-store";
import { useLocationContext } from "@/hooks/use-user-location";
import { pickRegionalAd } from "@/lib/regional-ads";

const DISMISS_KEY = "tp_dismissed_regional_ads";

function loadDismissed(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = sessionStorage.getItem(DISMISS_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

function dismissAd(id: string) {
  const set = loadDismissed();
  set.add(id);
  sessionStorage.setItem(DISMISS_KEY, JSON.stringify([...set]));
}

export function RegionalAdPopup() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { regionalAds } = useAdminStore();
  const { location, isLoading } = useLocationContext();
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(loadDismissed);

  const isPublic =
    !path.startsWith("/admin") &&
    !path.startsWith("/student") &&
    !path.startsWith("/teacher") &&
    !path.startsWith("/parent") &&
    !path.startsWith("/lms");

  const ad = useMemo(
    () => (isLoading ? null : pickRegionalAd(regionalAds, location, dismissed)),
    [regionalAds, location, dismissed, isLoading],
  );

  useEffect(() => {
    if (!isPublic || isLoading || !ad) {
      setOpen(false);
      return;
    }
    const t = window.setTimeout(() => setOpen(true), 600);
    return () => window.clearTimeout(t);
  }, [isPublic, isLoading, ad?.id]);

  if (!isPublic || !ad) return null;

  const handleClose = () => {
    dismissAd(ad.id);
    setDismissed(loadDismissed());
    setOpen(false);
  };

  const locationLabel = location
    ? [location.city, location.country].filter(Boolean).join(", ")
    : "your region";

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="max-w-md gap-0 overflow-hidden p-0 sm:max-w-lg">
        <div
          className="relative px-6 pb-2 pt-8 text-primary-foreground"
          style={{ background: "var(--gradient-primary)" }}
        >
          <button
            type="button"
            onClick={handleClose}
            className="absolute right-3 top-3 rounded-full p-1.5 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
          <Badge className="mb-3 border-white/25 bg-white/15 text-white hover:bg-white/15">
            <Sparkles className="mr-1 h-3 w-3" />
            Offer for {locationLabel}
          </Badge>
          <DialogHeader className="space-y-2 text-left">
            <DialogTitle className="font-display text-2xl font-bold text-white">{ad.title}</DialogTitle>
            <DialogDescription className="text-sm text-white/85">{ad.description}</DialogDescription>
          </DialogHeader>
          {ad.imageUrl && (
            <img
              src={ad.imageUrl}
              alt=""
              className="mt-4 w-full rounded-xl border border-white/20 object-cover max-h-40"
            />
          )}
        </div>

        <div className="space-y-4 bg-card px-6 py-5">
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
            Shown because you&apos;re browsing from{" "}
            <span className="font-medium text-foreground">{locationLabel}</span>
          </p>
          <DialogFooter className="flex-col gap-2 sm:flex-col">
            <Button asChild size="lg" className="w-full bg-gradient-primary" onClick={handleClose}>
              <Link to={ad.ctaLink as "/"}>{ad.ctaText}</Link>
            </Button>
            <Button type="button" variant="ghost" className="w-full text-muted-foreground" onClick={handleClose}>
              Maybe later
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}


