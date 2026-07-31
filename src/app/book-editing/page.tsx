import type { Metadata } from "next";
import { MessageSquareQuote, Search, SpellCheck } from "lucide-react";
import EditingBeforeAfter from "@/components/EditingBeforeAfter";
import EditingCycle from "@/components/EditingCycle";
import EditingKeyDeliverables from "@/components/EditingKeyDeliverables";
import ServicePageCTA from "@/components/ServicePageCTA";
import ProfessionalServices from "@/components/ProfessionalServices";
import ServiceGrowthSection from "@/components/ServiceGrowthSection";
import ServiceHero from "@/components/ServiceHero";

export const metadata: Metadata = {
  title: "Book Editing & Proofreading | Stamford Publishers",
  description:
    "Strengthen your manuscript with professional editing services that improve clarity, structure, flow, and quality.",
};

const features = [
  { label: "Professional Editing & Design" },
  { label: "Clarity, Structure & Flow" },
  { label: "Expert Author Support" },
  { label: "Client Satisfaction Guaranteed" },
];

const growthItems = [
  {
    number: "01",
    icon: Search,
    title: "Developmental Edit",
    description:
      "Improving the big picture: plot, structure, and character arcs for maximum impact.",
  },
  {
    number: "02",
    icon: MessageSquareQuote,
    title: "Line Editing",
    description:
      "Refining sentence flow, tone, and clarity while preserving your unique voice.",
  },
  {
    number: "03",
    icon: SpellCheck,
    title: "Proofreading",
    description:
      "A final polish to catch typos, punctuation errors, and formatting inconsistencies.",
  },
];

export default function BookEditingPage() {
  return (
    <main className="flex flex-1 flex-col">
      <ServiceHero
        tagline="Book Editing"
        heading="Strengthen Your Manuscript"
        headingLine2="With Professional Editing"
        subheading="Strengthen your manuscript with professional editing services that improve clarity, structure, flow, and quality."
        features={features}
        formTitle="Let's Get Started"
        formSubtitle="Special Offer: Up to 30% Off"
        formIdPrefix="editing"
      />
      <ProfessionalServices />
      <ServiceGrowthSection
        imageSrc="/book-editing.webp"
        imageAlt="Editor reviewing a printed manuscript with a pen"
        badge={{ main: "10k+", bottom: "Books Polished" }}
        tagline="Quality Assurance"
        headingPrimary="Beyond Simple"
        headingSecondary="Grammar Correction"
        description="Stamford Publishers strengthens your manuscript with professional editing services that improve clarity, structure, flow, and quality while preserving your unique voice."
        items={growthItems}
      />
      <EditingKeyDeliverables />
      <EditingCycle />
      <EditingBeforeAfter />
      <ServicePageCTA
        tagline="Free Consultation"
        heading="Book a Free Consultation with Book Publishing Experts"
        description="Have questions about publishing your book? Schedule a free consultation with one of Stamford Publishers' publishing specialists. We'll provide clear guidance and help you take the next step in your publishing journey with confidence."
        borderedButtons
      />
    </main>
  );
}
