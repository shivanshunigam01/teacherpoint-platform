import { createFileRoute } from "@tanstack/react-router";
import {
  Hero, TrustStats, HowItWorks, TrendingCourses, LearnAI, FeaturedTutors,
  CareerBanner, IndustryExperts, SkillsGrid, ComboPacks, HowYouLearn,
  Certification, Comparison, Testimonials, VideoTestimonials, FAQSection, CTABand,
} from "@/components/home/Sections";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "TeacherPoint — Find the best tutors and online courses" },
      { name: "description", content: "Discover 12,500+ verified tutors and 5,000+ expert-led courses on TeacherPoint. Live 1-on-1, lifetime access, and certificates." },
      { property: "og:title", content: "TeacherPoint — Learn from the best" },
      { property: "og:description", content: "The trusted edtech marketplace for tutors and courses." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Home() {
  return (
    <>
      <Hero />
      <TrustStats />
      <HowItWorks />
      <TrendingCourses />
      <LearnAI />
      <FeaturedTutors />
      <CareerBanner />
      <IndustryExperts />
      <SkillsGrid />
      <ComboPacks />
      <Certification />
      <HowYouLearn />
      <Comparison />
      <Testimonials />
      <VideoTestimonials />
      <FAQSection />
      <CTABand />
    </>
  );
}
