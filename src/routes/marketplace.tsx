import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import techTools from "@/assets/marketplace/tech-tools.jpg";
import pythonCourse from "@/assets/marketplace/python-course.jpg";
import devToolkit from "@/assets/marketplace/dev-toolkit.jpg";
import googleBrand from "@/assets/marketplace/google-brand.jpg";
import googleCreator1 from "@/assets/marketplace/google-creator-1.jpg";
import googleCreator2 from "@/assets/marketplace/google-creator-2.jpg";
import googleCreator3 from "@/assets/marketplace/google-creator-3.jpg";
import googleCreator4 from "@/assets/marketplace/google-creator-4.jpg";
import googleCreator5 from "@/assets/marketplace/google-creator-5.jpg";
import aiToolsSuite from "@/assets/marketplace/ai-tools-suite.jpg";
import automationTools from "@/assets/marketplace/automation-tools.jpg";
import aiRobotics from "@/assets/marketplace/ai-robotics.jpg";
import vrCareer from "@/assets/marketplace/vr-career.jpg";
import digitalMarketing from "@/assets/marketplace/digital-marketing.jpg";
import futureLab from "@/assets/marketplace/future-lab.jpg";

export const Route = createFileRoute("/marketplace")({
  component: Market,
  head: () => ({
    meta: [
      { title: "Marketplace · TeachersPoints" },
      { name: "description", content: "Study materials, services and accommodation for students." },
    ],
  }),
});

const ITEMS = [
  {
    cat: "materials" as const,
    title: "Developer Toolkit & API Cheat Sheets",
    price: 12,
    by: "Mark Wilson",
    image: devToolkit,
    alt: "Developer toolkit promotional graphic",
  },
  {
    cat: "materials" as const,
    title: "Python Mastery Notes — Complete Bundle",
    price: 15,
    by: "Neha Iyer",
    image: pythonCourse,
    alt: "Python course instructor and logo",
  },
  {
    cat: "materials" as const,
    title: "Tech Stack Icons & Study Guide",
    price: 9,
    by: "TP Academy",
    image: techTools,
    alt: "Tech tools and platform icons",
  },
  {
    cat: "materials" as const,
    title: "Google Workspace for Students",
    price: 8,
    by: "TeachersPoints",
    image: googleBrand,
    alt: "Google logo",
  },
  {
    cat: "services" as const,
    title: "Google Career Certificate Mentorship",
    price: 45,
    by: "Verified Mentor",
    image: googleCreator1,
    alt: "Google career certificate mentor",
  },
  {
    cat: "services" as const,
    title: "1-on-1 Interview Coaching",
    price: 35,
    by: "Mentor Network",
    image: googleCreator2,
    alt: "Professional interview coach",
  },
  {
    cat: "services" as const,
    title: "Product Design Portfolio Review",
    price: 40,
    by: "Design Pro",
    image: googleCreator3,
    alt: "Product design mentor",
  },
  {
    cat: "services" as const,
    title: "Leadership Skills Workshop",
    price: 50,
    by: "TP Pro",
    image: googleCreator4,
    alt: "Leadership workshop instructor",
  },
  {
    cat: "services" as const,
    title: "Career Growth Coaching Session",
    price: 30,
    by: "Career Hub",
    image: googleCreator5,
    alt: "Career growth coach",
  },
  {
    cat: "services" as const,
    title: "AI Tools Masterclass (ChatGPT, Gemini, Copilot)",
    price: 55,
    by: "AI Academy",
    image: aiToolsSuite,
    alt: "AI tools masterclass with holographic interface",
  },
  {
    cat: "services" as const,
    title: "Workflow Automation with Zapier",
    price: 28,
    by: "Automation Lab",
    image: automationTools,
    alt: "Workflow automation course",
  },
  {
    cat: "services" as const,
    title: "Intro to AI & Robotics",
    price: 42,
    by: "Future Skills",
    image: aiRobotics,
    alt: "AI and robotics course graphic",
  },
  {
    cat: "services" as const,
    title: "VR & Immersive Learning Lab Access",
    price: 60,
    by: "Immersive EDU",
    image: vrCareer,
    alt: "VR learning lab collage",
  },
  {
    cat: "services" as const,
    title: "Digital Marketing Bootcamp",
    price: 48,
    by: "Growth School",
    image: digitalMarketing,
    alt: "Digital marketing bootcamp",
  },
  {
    cat: "accommodation" as const,
    title: "Innovation Hub · Co-living Space",
    price: 320,
    by: "Verified Host",
    image: futureLab,
    alt: "Futuristic co-living and innovation hub",
  },
];

type Item = (typeof ITEMS)[number];

function Card({ item }: { item: Item }) {
  return (
    <article className="bg-card border rounded-2xl overflow-hidden hover:shadow-card transition">
      <div className="aspect-video overflow-hidden bg-muted">
        <img src={item.image} alt={item.alt} className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="p-4">
        <Badge variant="secondary" className="capitalize">
          {item.cat}
        </Badge>
        <h3 className="font-display font-bold mt-2 leading-tight">{item.title}</h3>
        <p className="text-xs text-muted-foreground mt-1">By {item.by}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="font-display font-bold text-lg">${item.price}</span>
          <Button size="sm" className="bg-gradient-primary">
            Buy
          </Button>
        </div>
      </div>
    </article>
  );
}

function Market() {
  return (
    <section className="container mx-auto px-4 py-10">
      <h1 className="font-display font-extrabold text-3xl">Marketplace</h1>
      <p className="text-muted-foreground mt-1 mb-6">Study materials, services, and verified accommodation.</p>
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="materials">Study Materials</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="accommodation">Accommodation</TabsTrigger>
        </TabsList>
        {(["all", "materials", "services", "accommodation"] as const).map((c) => (
          <TabsContent key={c} value={c} className="mt-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {ITEMS.filter((i) => c === "all" || i.cat === c).map((item) => (
                <Card key={item.title} item={item} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}


