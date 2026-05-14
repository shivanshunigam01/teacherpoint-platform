import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Star, MapPin, ShieldCheck, Crown, Wifi, MessageCircle, Calendar, Award, Languages, GraduationCap, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TUTORS } from "@/data/mock";
import { TutorCard } from "@/components/cards/TutorCard";

export const Route = createFileRoute("/tutors/$id")({
  loader: ({ params }) => {
    const t = TUTORS.find((x) => x.id === params.id);
    if (!t) throw notFound();
    return t;
  },
  component: TutorDetail,
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name || "Tutor"} · ${loaderData?.subject || ""} · TeacherPoint` },
      { name: "description", content: loaderData?.bio || "" },
    ],
  }),
  errorComponent: ({ error }) => <div className="container mx-auto p-12 text-center"><h1>Error</h1><p>{error.message}</p></div>,
  notFoundComponent: () => <div className="container mx-auto p-12 text-center"><h1>Tutor not found</h1></div>,
});

function TutorDetail() {
  const t = Route.useLoaderData();
  const related = TUTORS.filter((x) => x.id !== t.id && x.subject === t.subject).slice(0, 4);

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="grid lg:grid-cols-[1fr_360px] gap-8">
        <div>
          <div className="bg-card border rounded-2xl overflow-hidden">
            <div className="h-32" style={{ background: t.gradient }} />
            <div className="p-6 -mt-12">
              <div className="flex flex-wrap gap-4 items-end">
                <div className="h-24 w-24 rounded-2xl border-4 border-card grid place-items-center text-white font-display text-3xl font-bold shadow-card" style={{ background: t.gradient }}>
                  {t.initials}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="font-display font-extrabold text-2xl md:text-3xl">{t.name}</h1>
                    {t.verified && <Badge className="bg-sky text-sky-foreground"><ShieldCheck className="h-3 w-3 mr-1" />Verified</Badge>}
                    {t.topTen && <Badge className="bg-amber-400 text-amber-950"><Crown className="h-3 w-3 mr-1" />Top 10%</Badge>}
                  </div>
                  <p className="text-muted-foreground mt-1">{t.subject} expert · {t.experience} years experience</p>
                  <div className="flex flex-wrap gap-4 mt-3 text-sm">
                    <span className="flex items-center gap-1 text-amber-600"><Star className="h-4 w-4 fill-amber-500 text-amber-500" /><strong className="text-foreground">{t.rating}</strong> ({t.reviews})</span>
                    <span className="flex items-center gap-1 text-muted-foreground"><MapPin className="h-4 w-4" />{t.location}</span>
                    <span className="flex items-center gap-1 text-muted-foreground"><Languages className="h-4 w-4" />{t.language.join(", ")}</span>
                    {t.online && <span className="flex items-center gap-1 text-emerald-600"><Wifi className="h-4 w-4" />Online available</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="about" className="mt-6">
            <TabsList>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({t.reviews})</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="mt-6 space-y-6">
              <div className="bg-card border rounded-2xl p-6">
                <h3 className="font-display font-bold mb-2">About me</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.bio} I focus on building strong fundamentals and exam confidence with hands-on practice and personalized study plans. Over the years I've worked with hundreds of students from middle school to university level.</p>
              </div>
              <div className="bg-card border rounded-2xl p-6">
                <h3 className="font-display font-bold mb-3">Teaching approach</h3>
                <ul className="space-y-2 text-sm">
                  {["Concept-first explanations", "Weekly homework + feedback", "Mock tests & exam prep", "Recorded sessions for review"].map((x) => (
                    <li key={x} className="flex items-center gap-2"><Award className="h-4 w-4 text-primary" />{x}</li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card border rounded-2xl p-5">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-primary text-white grid place-items-center font-bold">S{i}</div>
                    <div>
                      <div className="font-semibold text-sm">Student {i}</div>
                      <div className="flex">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-3 w-3 fill-amber-500 text-amber-500" />)}</div>
                    </div>
                    <span className="ml-auto text-xs text-muted-foreground">2 weeks ago</span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{t.name} is incredibly patient and explains every concept clearly. My grades improved within a month!</p>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="schedule" className="mt-6">
              <div className="bg-card border rounded-2xl p-6">
                <h3 className="font-display font-bold mb-1">Availability</h3>
                <p className="text-sm text-muted-foreground mb-4">{t.availability}</p>
                <div className="grid grid-cols-7 gap-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                    <div key={d} className="text-center text-xs">
                      <div className="font-semibold mb-1">{d}</div>
                      <div className="space-y-1">
                        {["10am", "2pm", "6pm"].map((t) => (
                          <button key={t} className="w-full rounded border py-1.5 hover:bg-primary hover:text-primary-foreground transition">{t}</button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <aside className="space-y-4">
          <div className="bg-card border rounded-2xl p-6 sticky top-24">
            <div className="text-3xl font-display font-extrabold">${t.price}<span className="text-sm font-normal text-muted-foreground">/hour</span></div>
            <div className="text-xs text-muted-foreground mt-1">First session is free · 7-day refund guarantee</div>
            <Button className="w-full mt-4 bg-gradient-primary"><Calendar className="h-4 w-4 mr-2" />Book a session</Button>
            <Button variant="outline" className="w-full mt-2"><MessageCircle className="h-4 w-4 mr-2" />Send a message</Button>
            <Button variant="ghost" className="w-full mt-2"><Heart className="h-4 w-4 mr-2" />Save tutor</Button>
            <ul className="mt-5 pt-5 border-t space-y-2 text-sm">
              <li className="flex items-center gap-2"><GraduationCap className="h-4 w-4 text-primary" />{t.experience}+ years teaching</li>
              <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-600" />ID & qualifications verified</li>
              <li className="flex items-center gap-2"><Star className="h-4 w-4 text-amber-500" />{t.reviews}+ student reviews</li>
            </ul>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display font-bold text-xl mb-6">More {t.subject} tutors</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((r) => <TutorCard key={r.id} tutor={r} />)}
          </div>
        </div>
      )}
    </section>
  );
}
