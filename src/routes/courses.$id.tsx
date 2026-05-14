import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Star, Clock, BookOpen, Users, Award, PlayCircle, Globe, CheckCircle2, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { COURSES } from "@/data/mock";
import { CourseCard } from "@/components/cards/CourseCard";

export const Route = createFileRoute("/courses/$id")({
  loader: ({ params }) => {
    const c = COURSES.find((x) => x.id === params.id);
    if (!c) throw notFound();
    return c;
  },
  component: CourseDetail,
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title || "Course"} · TeacherPoint` },
      { name: "description", content: loaderData?.description || "" },
    ],
  }),
  errorComponent: ({ error }) => <div className="container p-12 text-center">{error.message}</div>,
  notFoundComponent: () => <div className="container p-12 text-center">Course not found</div>,
});

const CURRICULUM = [
  { title: "Getting Started", lessons: ["Welcome & overview", "Setup your environment", "How to use this course"] },
  { title: "Core Concepts", lessons: ["Foundations", "Hands-on lab 1", "Hands-on lab 2", "Quiz 1"] },
  { title: "Advanced Topics", lessons: ["Real-world patterns", "Case study", "Quiz 2"] },
  { title: "Capstone Project", lessons: ["Project brief", "Build it live", "Get certified"] },
];

function CourseDetail() {
  const c = Route.useLoaderData();
  const related = COURSES.filter((x) => x.id !== c.id && x.category === c.category).slice(0, 4);

  return (
    <>
      <section className="bg-gradient-to-br from-slate-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 py-12 grid lg:grid-cols-[1fr_380px] gap-10">
          <div>
            {c.bestseller && <Badge className="bg-amber-400 text-amber-950 mb-3">Bestseller</Badge>}
            <h1 className="font-display font-extrabold text-3xl md:text-5xl leading-tight">{c.title}</h1>
            <p className="mt-3 text-lg text-slate-200 max-w-2xl">{c.description}</p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <span className="flex items-center gap-1 text-amber-300"><Star className="h-4 w-4 fill-amber-400 text-amber-400" /><strong>{c.rating}</strong>({c.reviews.toLocaleString()})</span>
              <span className="flex items-center gap-1"><Users className="h-4 w-4" />{c.students.toLocaleString()} students</span>
              <span className="flex items-center gap-1"><Globe className="h-4 w-4" />{c.language}</span>
              <span>Created by <strong className="text-amber-300">{c.instructor}</strong></span>
            </div>
          </div>
          <div className="lg:row-span-2"></div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10 grid lg:grid-cols-[1fr_380px] gap-10">
        <div>
          <div className="bg-card border rounded-2xl p-6 mb-6">
            <h2 className="font-display font-bold text-xl mb-4">What you'll learn</h2>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
              {["Production-ready skills", "Real-world projects", "Interview prep included", "Lifetime access", "Certificate of completion", "Mentor support"].map((x) => (
                <li key={x} className="flex items-start gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />{x}</li>
              ))}
            </ul>
          </div>

          <Tabs defaultValue="curriculum">
            <TabsList>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="curriculum" className="mt-6">
              <Accordion type="single" collapsible defaultValue="m0" className="bg-card border rounded-2xl px-4">
                {CURRICULUM.map((m, i) => (
                  <AccordionItem key={i} value={`m${i}`}>
                    <AccordionTrigger className="text-left"><span><span className="font-bold mr-2">Module {i + 1}:</span>{m.title}</span></AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {m.lessons.map((l) => (
                          <li key={l} className="flex items-center gap-2 text-sm"><PlayCircle className="h-4 w-4 text-primary" />{l}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
            <TabsContent value="instructor" className="mt-6">
              <div className="bg-card border rounded-2xl p-6 flex gap-4">
                <div className="h-16 w-16 rounded-full bg-gradient-primary text-white grid place-items-center font-display font-bold text-xl">{c.instructor[0]}</div>
                <div>
                  <h3 className="font-display font-bold text-lg">{c.instructor}</h3>
                  <p className="text-sm text-muted-foreground">Senior Engineer · 8+ years industry experience</p>
                  <p className="text-sm mt-3">Hands-on practitioner who has trained 30K+ students worldwide. Loves making complex topics simple.</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card border rounded-2xl p-5">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-primary text-white grid place-items-center font-bold">U{i}</div>
                    <div>
                      <div className="font-semibold text-sm">User {i}</div>
                      <div className="flex">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-3 w-3 fill-amber-500 text-amber-500" />)}</div>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">Best course I've taken on this topic. Hands-on projects made all the difference.</p>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        <aside className="lg:-mt-48">
          <div className="bg-card border rounded-2xl shadow-card sticky top-24 overflow-hidden">
            <div className="aspect-video relative" style={{ background: c.gradient }}>
              <div className="absolute inset-0 grid place-items-center"><PlayCircle className="h-16 w-16 text-white/90" /></div>
            </div>
            <div className="p-5">
              <div className="flex items-end gap-2"><span className="font-display font-extrabold text-3xl">${c.price}</span><span className="text-sm text-muted-foreground line-through">${c.oldPrice}</span><Badge className="ml-auto bg-emerald-100 text-emerald-700">{Math.round((1 - c.price / c.oldPrice) * 100)}% off</Badge></div>
              <Button className="w-full mt-4 bg-gradient-primary"><ShoppingCart className="h-4 w-4 mr-2" />Enroll now</Button>
              <Button variant="outline" className="w-full mt-2"><Heart className="h-4 w-4 mr-2" />Add to wishlist</Button>
              <ul className="mt-5 pt-5 border-t space-y-2 text-sm">
                <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" />{c.duration} on-demand video</li>
                <li className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-primary" />{c.lessons} lessons</li>
                <li className="flex items-center gap-2"><Award className="h-4 w-4 text-primary" />Certificate included</li>
                <li className="flex items-center gap-2"><Globe className="h-4 w-4 text-primary" />{c.language}</li>
              </ul>
            </div>
          </div>
        </aside>
      </section>

      {related.length > 0 && (
        <section className="container mx-auto px-4 py-10">
          <h2 className="font-display font-bold text-xl mb-6">Students also bought</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((r) => <CourseCard key={r.id} course={r} />)}
          </div>
        </section>
      )}
    </>
  );
}
