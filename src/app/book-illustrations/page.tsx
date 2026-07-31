import type { Metadata } from "next";
import {
  BookImage,
  CheckCheck,
  Droplets,
  FileArchive,
  GraduationCap,
  Image,
  Lightbulb,
  Monitor,
  Palette,
  PenLine,
  Sparkles,
  SquarePen,
  User,
  WandSparkles,
} from "lucide-react";
import ProfessionalServices from "@/components/ProfessionalServices";
import ServiceChannels from "@/components/ServiceChannels";
import ServiceGrowthSection from "@/components/ServiceGrowthSection";
import ServiceHero from "@/components/ServiceHero";
import ServiceLaunchCycle from "@/components/ServiceLaunchCycle";
import ServicePageCTA from "@/components/ServicePageCTA";

export const metadata: Metadata = {
  title: "Book Illustrations | Stamford Publishers",
  description:
    "Professional editing and design services from Stamford Publishers, including original illustrations and interior artwork for your book.",
};

const features = [
  { label: "Professional Editing & Design", icon: PenLine },
  { label: "Print-Ready High-Resolution Artwork", icon: Image },
  { label: "Expert Author Support", icon: BookImage },
  { label: "Client Satisfaction Guaranteed", icon: CheckCheck },
];

const growthItems = [
  {
    number: "01",
    icon: PenLine,
    title: "Custom Illustrations",
    description:
      "Original character, scene, and cover artwork tailored to your story, audience, and genre.",
  },
  {
    number: "02",
    icon: BookImage,
    title: "Interior Artwork",
    description:
      "Professionally illustrated pages designed to elevate your book and create an engaging reading experience.",
  },
];

const launchSteps = [
  {
    number: 1,
    icon: Lightbulb,
    title: "Discovery & Planning",
    description:
      "We discuss your story, characters, preferred art style, and creative vision to establish a detailed illustration brief.",
  },
  {
    number: 2,
    icon: SquarePen,
    title: "Sketch Development",
    description:
      "Our illustrators create preliminary sketches and concepts for your review, ensuring every scene aligns with your vision.",
  },
  {
    number: 3,
    icon: Palette,
    title: "Illustration & Refinement",
    description:
      "We add color, details, and finishing touches while incorporating your feedback until every illustration is perfected.",
  },
  {
    number: 4,
    icon: FileArchive,
    title: "Final Delivery",
    description:
      "Receive high-resolution, print-ready, and digital artwork files optimized for publishing, marketing, and e-book platforms.",
  },
];

const channelItems = [
  {
    title: "Children's Books",
    description: "Playful, colorful artwork that sparks imagination.",
    icon: Sparkles,
  },
  {
    title: "Character Design",
    description: "Expressive characters crafted to match your story.",
    icon: User,
  },
  {
    title: "Fantasy Worlds",
    description: "Immersive settings filled with wonder and detail.",
    icon: WandSparkles,
  },
  {
    title: "Watercolor Art",
    description: "Soft, artistic illustrations with a timeless appeal.",
    icon: Droplets,
  },
  {
    title: "Digital Painting",
    description: "High-quality modern artwork for print and e-books.",
    icon: Monitor,
  },
  {
    title: "Educational Books",
    description: "Engaging visuals that make learning more enjoyable.",
    icon: GraduationCap,
  },
];

export default function BookIllustrationsPage() {
  return (
    <main className="flex flex-1 flex-col">
      <ServiceHero
        tagline="Professional Design"
        heading="Illustrations That Bring"
        headingLine2="Your Story to Life"
        subheading="Stamford Publishers provides professional illustration services that support your creative vision and help your book connect with readers."
        features={features}
        formTitle="Let's Get Started"
        formSubtitle="Special Offer: Up to 30% Off"
        formIdPrefix="illustrations"
      />
      <ServiceGrowthSection
        imageSrc="/illustration.jpg"
        imageAlt="Illustrator sketching character artwork for a children's book"
        badge={{ main: "100%", bottom: "Hand-Drawn" }}
        tagline="Professional Design"
        headingPrimary="Professional Editing"
        headingSecondary="& Design"
        description="From developing your initial concept to refining the final artwork, Stamford Publishers helps shape your book's visual identity with clarity, creativity, and attention to every important detail."
        items={growthItems}
      />
      <ServiceLaunchCycle
        tagline="Our Illustration Process"
        headingPrimary="From Idea"
        headingSecondary="to Artwork"
        description="A collaborative illustration journey designed to transform your story into captivating visuals that engage readers."
        steps={launchSteps}
      />
      <ServiceChannels
        tagline="Illustration Styles"
        headingPrimary="Art Styles We"
        headingSecondary="Specialize In"
        items={channelItems}
      />
      <ProfessionalServices
        tagline="Our Services"
        headingPrimary="Comprehensive Publishing"
        headingSecondary="Services"
        description="Stamford Publishers offers a complete, author-focused publishing experience, supporting writers through manuscript development, editing, publishing, and promotion with expert guidance and dedicated support."
        serviceOrder={[1, 2, 3, 4, 5, 6, 0]}
      />
      <ServicePageCTA
        tagline="Free Consultation"
        heading="Book a Free Consultation with Book Publishing Experts"
        description="Have questions about publishing your book? Schedule a free consultation with one of Stamford Publishers' publishing specialists. We'll provide clear guidance and help you take the next step in your publishing journey with confidence."
        imageAlt="Author working on manuscript"
      />
    </main>
  );
}
