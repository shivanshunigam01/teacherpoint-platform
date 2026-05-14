import { Link } from "@tanstack/react-router";
import { Star, MapPin, ShieldCheck, Crown, Wifi } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Tutor } from "@/data/mock";

export function TutorCard({ tutor }: { tutor: Tutor }) {
  return (
    <Link to="/tutors/$id" params={{ id: tutor.id }} className="group block">
      <article className="bg-card border rounded-2xl overflow-hidden h-full hover:shadow-card transition-all hover:-translate-y-1">
        <div className="h-24 relative" style={{ background: tutor.gradient }}>
          {tutor.topTen && (
            <Badge className="absolute top-3 right-3 bg-amber-400 text-amber-950 hover:bg-amber-400">
              <Crown className="h-3 w-3 mr-1" />Top 10%
            </Badge>
          )}
        </div>
        <div className="px-4 pb-4 -mt-8">
          <div className="h-16 w-16 rounded-2xl bg-card border-4 border-card grid place-items-center font-display font-bold text-xl text-white shadow-soft" style={{ background: tutor.gradient }}>
            {tutor.initials}
          </div>
          <div className="mt-3 flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-display font-bold truncate flex items-center gap-1">
                {tutor.name}
                {tutor.verified && <ShieldCheck className="h-4 w-4 text-sky" />}
              </h3>
              <p className="text-xs text-muted-foreground">{tutor.subject} · {tutor.experience}y exp</p>
            </div>
            <div className="text-right shrink-0">
              <div className="font-display font-bold">${tutor.price}<span className="text-xs text-muted-foreground font-normal">/hr</span></div>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1 text-amber-600">
              <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
              <span className="font-semibold text-foreground">{tutor.rating}</span>
              ({tutor.reviews})
            </span>
            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{tutor.location.split(",")[0]}</span>
            {tutor.online && <span className="flex items-center gap-1 text-emerald-600"><Wifi className="h-3 w-3" />Online</span>}
          </div>
          <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{tutor.bio}</p>
        </div>
      </article>
    </Link>
  );
}
