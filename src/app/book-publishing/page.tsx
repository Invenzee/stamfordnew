import type { Metadata } from "next";
import {
  BookOpen,
  FileCheck,
  FileText,
  Globe,
  Library,
  Monitor,
  Percent,
  Rocket,
  Settings,
  ShoppingCart,
  Smartphone,
  Store,
  Tags,
} from "lucide-react";
import ProfessionalServices from "@/components/ProfessionalServices";
import ServiceChannels from "@/components/ServiceChannels";
import ServiceGrowthSection from "@/components/ServiceGrowthSection";
import ServiceHero from "@/components/ServiceHero";
import ServiceLaunchCycle from "@/components/ServiceLaunchCycle";
import ServicePageCTA from "@/components/ServicePageCTA";

export const metadata: Metadata = {
  title: "Book Publishing | Stamford Publishers",
  description:
    "Turn your manuscript into a professionally prepared book, ready for printing, publishing, and distribution with Stamford Publishers.",
};

const features = [
  { label: "Global Book Distribution", icon: Store },
  { label: "Professional Editing & Design", icon: FileText },
  { label: "100% Author Ownership", icon: Percent },
  { label: "Client Satisfaction Guaranteed", icon: FileCheck },
];

const growthItems = [
  {
    number: "01",
    icon: FileText,
    title: "Master Formatting",
    description:
      "Technically sound files for all major e-readers and premium print standards worldwide.",
  },
  {
    number: "02",
    icon: FileCheck,
    title: "ISBN & Legal",
    description:
      "Handling registration filing assistance, and barcode generation for your work.",
  },
];

const launchSteps = [
  {
    number: 1,
    icon: Settings,
    title: "Consultation",
    description:
      "Share your publishing goals and receive a personalized roadmap from Stamford Publishers.",
  },
  {
    number: 2,
    icon: Tags,
    title: "Development",
    description:
      "We support manuscript development, editing, and design while keeping your vision at the center.",
  },
  {
    number: 3,
    icon: Rocket,
    title: "Production",
    description:
      "Your book is professionally prepared for printing, publishing, and distribution.",
  },
  {
    number: 4,
    icon: Globe,
    title: "Launch",
    description:
      "We help you publish, distribute, and promote your book to reach the right readers.",
  },
];

const channelItems = [
  {
    title: "Direct Online Sales",
    description: "Print & E-book",
    icon: ShoppingCart,
    tag: "PRINT & E-BOOK",
  },
  {
    title: "Major Digital Stores",
    description: "Worldwide distribution",
    icon: BookOpen,
    tag: "WORLDWIDE",
  },
  {
    title: "Expanded Network",
    description: "Thousands of retail outlets",
    icon: Globe,
    tag: "RETAIL",
  },
  {
    title: "Mobile Ecosystems",
    description: "Digital platform readers",
    icon: Smartphone,
    tag: "MOBILE",
  },
  {
    title: "International Markets",
    description: "Global reach and visibility",
    icon: Monitor,
    tag: "GLOBAL",
  },
  {
    title: "Library Systems",
    description: "Educational & public access",
    icon: Library,
    tag: "LIBRARY",
  },
];

export default function BookPublishingPage() {
  return (
    <main className="flex flex-1 flex-col">
      <ServiceHero
        tagline="Book Publishing"
        heading="Turn Your Manuscript Into a"
        headingLine2="Professionally Prepared Book"
        subheading="Stamford Publishers delivers comprehensive publishing solutions designed around your unique goals, guiding you through every stage with expert support."
        features={features}
        formTitle="Let's Get Started"
        formSubtitle="Special Offer: Up to 30% Off"
        formIdPrefix="publishing"
        callButtonLabel="Call Now"
      />
      <ServiceGrowthSection
        imageSrc="/publishing.jpg"
        imageAlt="Publishing consultant reviewing a manuscript on a laptop"
        badge={{ main: "100%", bottom: "Author Ownership" }}
        tagline="Book Publishing"
        headingPrimary="Global Book"
        headingSecondary="Distribution"
        description="From manuscript development to publishing, distribution, and marketing, Stamford Publishers supports you throughout the process while keeping your creative vision at the center of every step."
        items={growthItems}
      />
      <ServiceLaunchCycle
        tagline="Self-Publishing"
        headingPrimary="A Streamlined Path to"
        headingSecondary="Self-Publishing"
        description="A simple, flexible, and author-focused publishing experience tailored to your goals."
        steps={launchSteps}
      />
      <ServiceChannels
        tagline="Distribution"
        headingPrimary="Distribution"
        headingSecondary="Channels"
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
