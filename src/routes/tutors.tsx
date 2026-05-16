import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { TutorCard } from "@/components/cards/TutorCard";
import { TUTORS } from "@/data/mock";

export const Route = createFileRoute("/tutors")({
  component: TutorsPage,
  head: () => ({
    meta: [{ title: "Find a Tutor · TeachersPoints" }, { name: "description", content: "Browse 12,500+ verified tutors across subjects, languages and budgets." }],
    links: [{ rel: "canonical", href: "/tutors" }],
  }),
});

const SUBJECTS = ["Mathematics", "Physics", "Chemistry", "Biology", "English Literature", "Computer Science", "Economics", "Spanish", "Mandarin", "History", "Spoken English"];

function FilterPanel({ subject, setSubject, price, setPrice, rating, setRating, online, setOnline, verified, setVerified }: any) {
  return (
    <div className="space-y-6">
      <div>
        <Label className="text-xs uppercase tracking-wide text-muted-foreground">Subject</Label>
        <div className="mt-2 space-y-2 max-h-56 overflow-y-auto pr-2">
          {SUBJECTS.map((s) => (
            <label key={s} className="flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox checked={subject === s} onCheckedChange={(c) => setSubject(c ? s : "")} />{s}
            </label>
          ))}
        </div>
      </div>
      <div>
        <Label className="text-xs uppercase tracking-wide text-muted-foreground">Max price/hr · ${price[0]}</Label>
        <Slider value={price} onValueChange={setPrice} max={100} step={5} className="mt-3" />
      </div>
      <div>
        <Label className="text-xs uppercase tracking-wide text-muted-foreground">Min rating · {rating[0]}★</Label>
        <Slider value={rating} onValueChange={setRating} min={3} max={5} step={0.1} className="mt-3" />
      </div>
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm"><Checkbox checked={online} onCheckedChange={(c) => setOnline(!!c)} />Online tutors only</label>
        <label className="flex items-center gap-2 text-sm"><Checkbox checked={verified} onCheckedChange={(c) => setVerified(!!c)} />Verified only</label>
      </div>
    </div>
  );
}

function TutorsPage() {
  const [q, setQ] = useState("");
  const [subject, setSubject] = useState("");
  const [price, setPrice] = useState([100]);
  const [rating, setRating] = useState([3]);
  const [online, setOnline] = useState(false);
  const [verified, setVerified] = useState(false);

  const list = useMemo(
    () =>
      TUTORS.filter((t) => {
        if (q && !`${t.name} ${t.subject}`.toLowerCase().includes(q.toLowerCase())) return false;
        if (subject && t.subject !== subject) return false;
        if (t.price > price[0]) return false;
        if (t.rating < rating[0]) return false;
        if (online && !t.online) return false;
        if (verified && !t.verified) return false;
        return true;
      }),
    [q, subject, price, rating, online, verified],
  );

  const filterProps = { subject, setSubject, price, setPrice, rating, setRating, online, setOnline, verified, setVerified };

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="font-display font-extrabold text-3xl md:text-4xl">Find your perfect tutor</h1>
        <p className="text-muted-foreground mt-2">{list.length} verified tutors match your filters</p>
      </div>
      <div className="grid lg:grid-cols-[260px_1fr] gap-8">
        <aside className="hidden lg:block bg-card border rounded-2xl p-5 h-fit sticky top-24">
          <h3 className="font-display font-semibold mb-4">Filters</h3>
          <FilterPanel {...filterProps} />
        </aside>
        <div>
          <div className="flex gap-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search tutors by name or subject…" className="pl-10" />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden"><Filter className="h-4 w-4 mr-2" />Filters</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader><SheetTitle>Filters</SheetTitle></SheetHeader>
                <div className="mt-4"><FilterPanel {...filterProps} /></div>
              </SheetContent>
            </Sheet>
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {list.map((t) => <TutorCard key={t.id} tutor={t} />)}
          </div>
          {list.length === 0 && <div className="text-center py-20 text-muted-foreground">No tutors match — try widening your filters.</div>}
        </div>
      </div>
    </section>
  );
}
