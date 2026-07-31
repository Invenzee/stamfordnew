import type { Metadata } from "next";
import {
  BookOpen,
  Droplets,
  Eye,
  Globe,
  Layers,
  LayoutGrid,
  LayoutTemplate,
  Monitor,
  Palette,
  PenLine,
  Smile,
  Sparkles,
} from "lucide-react";
import FeaturedWork from "@/components/FeaturedWork";
import ProfessionalServices from "@/components/ProfessionalServices";
import ServiceChannels from "@/components/ServiceChannels";
import ServiceGrowthSection from "@/components/ServiceGrowthSection";
import ServiceHero from "@/components/ServiceHero";
import ServiceLaunchCycle from "@/components/ServiceLaunchCycle";
import ServicePageCTA from "@/components/ServicePageCTA";

export const metadata: Metadata = {
  title: "Children's Book Publishing | Stamford Publishers",
  description:
    "Comprehensive publishing solutions for children's books with expert support, professional design, and global distribution from Stamford Publishers.",
};

const features = [
  { label: "Professional Editing & Design", icon: Palette },
  { label: "Expert Author Support", icon: BookOpen },
  { label: "Global Book Distribution", icon: Globe },
  { label: "Client Satisfaction Guaranteed", icon: LayoutTemplate },
];

const growthItems = [
  {
    number: "01",
    icon: Palette,
    title: "Custom Illustrations",
    description:
      "Working with world-class artists to create characters and worlds that children love and remember.",
  },
  {
    number: "02",
    icon: LayoutTemplate,
    title: "Strategic Design",
    description:
      "Layouts optimized for physical readability, visual engagement, and age-appropriate interaction.",
  },
];

const launchSteps = [
  {
    number: 1,
    icon: LayoutGrid,
    title: "Storyboarding",
    description:
      "Mapping out the narrative flow and key visual beats to ensure engagement on every page.",
  },
  {
    number: 2,
    icon: Palette,
    title: "Illustration",
    description:
      "Our artists bring your characters to life with vibrant colors and enchanting detail.",
  },
  {
    number: 3,
    icon: Sparkles,
    title: "Final Polish",
    description:
      "Typesetting and layout refinement to ensure your book is ready for global distribution.",
  },
  {
    number: 4,
    icon: Globe,
    title: "Global Publishing",
    description:
      "Navigating international retail platforms to get your book into the hands of young readers.",
  },
];

const channelItems = [
  {
    title: "Watercolor",
    description: "Soft, dreamy picture book art",
    icon: Droplets,
  },
  {
    title: "Digital Vector",
    description: "Clean, bold modern stories",
    icon: Monitor,
  },
  {
    title: "Hand-Drawn",
    description: "Classic pen and ink charm",
    icon: PenLine,
  },
  {
    title: "Cartoon",
    description: "Fun characters kids love",
    icon: Smile,
  },
  {
    title: "Realistic",
    description: "Detailed art for older readers",
    icon: Eye,
  },
  {
    title: "Mixed Media",
    description: "Collage and texture-rich art",
    icon: Layers,
  },
];

export default function ChildrensBooksPage() {
  return (
    <main className="flex flex-1 flex-col">
      <ServiceHero
        tagline="Children's Books"
        heading="Begin Your Publishing Journey"
        headingLine2="With Stamford Publishers"
        subheading="Whether you're publishing your first children's book or adding to your portfolio, Stamford Publishers delivers comprehensive publishing solutions designed around your unique goals."
        features={features}
        formTitle="Let's Get Started"
        formSubtitle="Special Offer: Up to 30% Off"
        formIdPrefix="childrens-books"
        callButtonLabel="Call Now"
      />
      <ServiceGrowthSection
        imageSrc="/children-books.jpg"
        imageAlt="Illustrator creating artwork for a children's picture book"
        badge={{
          top: "Children's Book Design",
          main: "100%",
          bottom: "Original Art",
        }}
        tagline="Writing Support"
        headingPrimary="Expert Writing Guidance"
        headingSecondary="Aligned with Your Goals"
        description="From developing your initial concept to refining the final manuscript, our team helps shape your children's book with clarity, structure, and attention to every important detail."
        items={growthItems}
      />
      <ServiceLaunchCycle
        tagline="Self-Publishing"
        headingPrimary="A Streamlined Path to"
        headingSecondary="Self-Publishing"
        description="Stamford Publishers provides a simple, flexible, and author-focused publishing experience tailored to your goals."
        steps={launchSteps}
      />
      <FeaturedWork
        tagline="Writing Support"
        heading="Expert Writing Guidance Aligned with Your Goals"
        description="At Stamford Publishers, we offer personalized writing support designed around your ideas, timeline, and publishing goals. From developing your initial concept to refining the final manuscript, our team helps shape your book with clarity, structure, and attention to every important detail."
      />
      <ServiceChannels
        tagline="Illustration Styles"
        headingPrimary="Art That"
        headingSecondary="Captivates"
        items={channelItems}
      />
      <ProfessionalServices />
      <ServicePageCTA
        tagline="Free Consultation"
        heading="Book a Free Consultation with Book Publishing Experts"
        description="Have questions about publishing your book? Schedule a free consultation with one of Stamford Publishers' publishing specialists. We'll provide clear guidance and help you take the next step in your publishing journey with confidence."
        imageAlt="Author working on manuscript"
      />
    </main>
  );
}
