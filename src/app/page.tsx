import FeaturedWork from "@/components/FeaturedWork";
import GoldStandard from "@/components/GoldStandard";
import Hero from "@/components/Hero";
import KeyDifferentiators from "@/components/KeyDifferentiators";
import ServicePageCTA from "@/components/ServicePageCTA";
import Workflow from "@/components/Workflow";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Workflow />
      <GoldStandard />
      <FeaturedWork />
      <KeyDifferentiators />
      <ServicePageCTA
        tagline="Free Consultation"
        heading="Book a Free Consultation with Book Publishing Experts"
        description="Have questions about publishing your book? Want to see how our services can support your goals? Schedule a free consultation with one of Stamford Publishers' publishing specialists. We'll provide clear guidance, answer your questions, and help you take the next step in your publishing journey with confidence."
        imageAlt="Author working on manuscript"
      />
    </main>
  );
}
