import { createFileRoute } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQS } from "@/data/mock";

export const Route = createFileRoute("/faq")({
  component: FAQ,
  head: () => ({
    meta: [{ title: "FAQ · TeacherPoint" }, { name: "description", content: "Common questions about TeacherPoint." }],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }),
    }],
  }),
});

function FAQ() {
  return (
    <section className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="font-display font-extrabold text-4xl">Frequently asked questions</h1>
      <p className="text-muted-foreground mt-3 mb-8">Everything you need to know about TeacherPoint.</p>
      <Accordion type="single" collapsible className="bg-card border rounded-2xl px-6">
        {FAQS.map((f, i) => (
          <AccordionItem key={i} value={`f${i}`}>
            <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
