import type { Metadata } from "next";
import {
  CheckCheck,
  FileText,
  Layers,
  Palette,
  PenLine,
} from "lucide-react";
import CoverDesignCategories from "@/components/CoverDesignCategories";
import CoverDesignLoop from "@/components/CoverDesignLoop";
import ServicePageCTA from "@/components/ServicePageCTA";
import CoverDesignShowcase from "@/components/CoverDesignShowcase";
import ProfessionalServices from "@/components/ProfessionalServices";
import ServiceGrowthSection from "@/components/ServiceGrowthSection";
import ServiceHero from "@/components/ServiceHero";

export const metadata: Metadata = {
  title: "Book Cover Design | Stamford Publishers",
  description:
    "Professional editing and design services from Stamford Publishers to help your book stand out with compelling visual storytelling.",
};

const features = [
  { label: "Professional Editing & Design", icon: PenLine },
  { label: "Print-Ready & E-book Formats", icon: Layers },
  { label: "Expert Author Support", icon: Palette },
  { label: "Client Satisfaction Guaranteed", icon: CheckCheck },
];

const growthItems = [
  {
    number: "01",
    icon: PenLine,
    title: "Original Art",
    description:
      "Custom illustrations and high-end composite designs tailored to your genre.",
  },
  {
    number: "02",
    icon: FileText,
    title: "Interior Design",
    description:
      "Professional typesetting and layout for a seamless reading experience.",
  },
];

export default function BookCoverDesignPage() {
  return (
    <main className="flex flex-1 flex-col">
      <ServiceHero
        tagline="Professional Design"
        heading="Professional Editing & Design"
        headingLine2="That Sells Your Story"
        subheading="Stamford Publishers helps your book stand out with professional design that captures your story and connects with readers."
        features={features}
        formTitle="Let's Get Started"
        formSubtitle="Special Offer: Up to 30% Off"
        formIdPrefix="cover-design"
      />
      <ServiceGrowthSection
        imageSrc="/hero-image-1.webp"
        imageAlt="Designers collaborating on book cover concepts in a modern studio"
        badge={{ main: "500+", bottom: "Covers Designed" }}
        tagline="Creative Excellence"
        headingPrimary="Visual Branding for"
        headingSecondary="Modern Authors"
        description="In a saturated market, your cover is your most powerful marketing tool. We build brands that resonate with your target readers."
        items={growthItems}
      />
      <CoverDesignShowcase />
      <CoverDesignLoop />
      <CoverDesignCategories />
      <ProfessionalServices className="bg-about-section-bg pt-0 pb-16 lg:pb-20" />
      <ServicePageCTA
        tagline="Free Consultation"
        heading="Book a Free Consultation with Book Publishing Experts"
        description="Have questions about publishing your book? Schedule a free consultation with one of Stamford Publishers' publishing specialists. We'll provide clear guidance and help you take the next step in your publishing journey with confidence."
        imageAlt="Author working on manuscript"
      />
    </main>
  );
}
