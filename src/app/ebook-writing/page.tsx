import type { Metadata } from "next";
import {
  BookMarked,
  BookOpen,
  Briefcase,
  ClipboardList,
  Feather,
  FileArchive,
  GraduationCap,
  Lightbulb,
  Magnet,
  MessageCircle,
  PenLine,
  SpellCheck,
  Sparkles,
} from "lucide-react";
import ProfessionalServices from "@/components/ProfessionalServices";
import ServiceChannels from "@/components/ServiceChannels";
import ServiceGrowthSection from "@/components/ServiceGrowthSection";
import ServiceHero from "@/components/ServiceHero";
import ServiceLaunchCycle from "@/components/ServiceLaunchCycle";
import ServicePageCTA from "@/components/ServicePageCTA";

export const metadata: Metadata = {
  title: "E-Book Writing | Stamford Publishers",
  description:
    "Personalized writing support designed around your ideas, timeline, and publishing goals. Expert e-book writing from Stamford Publishers.",
};

const features = [
  { label: "Expert Author Support", icon: PenLine },
  { label: "Personalized Writing Guidance", icon: ClipboardList },
  { label: "Client Satisfaction Guaranteed", icon: MessageCircle },
  { label: "100% Author Ownership", icon: BookMarked },
];

const growthItems = [
  {
    number: "01",
    icon: Briefcase,
    title: "E-Books for Businesses",
    description:
      "Professional lead magnets, industry guides, and brand-building content.",
  },
  {
    number: "02",
    icon: BookOpen,
    title: "Author E-Books",
    description:
      "Engaging fiction and nonfiction titles optimized for digital readers.",
  },
];

const launchSteps = [
  {
    number: 1,
    icon: Lightbulb,
    title: "Discovery",
    description:
      "We discuss your objectives, target audience, and content ideas.",
  },
  {
    number: 2,
    icon: PenLine,
    title: "Content Creation",
    description:
      "Our writers develop engaging chapters tailored to your voice.",
  },
  {
    number: 3,
    icon: SpellCheck,
    title: "Editing & Optimization",
    description:
      "We refine the manuscript for readability, flow, and consistency.",
  },
  {
    number: 4,
    icon: FileArchive,
    title: "E-Book Formatting",
    description:
      "Your e-book is professionally formatted for Kindle, EPUB, PDF, and other major platforms.",
  },
];

const channelItems = [
  {
    title: "Business Guides",
    description: "Life stories told with sensitivity",
    icon: Briefcase,
  },
  {
    title: "Lead Magnet E-Books",
    description: "Thought leadership content",
    icon: Magnet,
  },
  {
    title: "Self-Help Titles",
    description: "Transformative guidance books",
    icon: Feather,
  },
  {
    title: "Fiction E-Books",
    description: "Novels across all genres",
    icon: BookOpen,
  },
  {
    title: "Educational Content",
    description: "Research-backed publications",
    icon: GraduationCap,
  },
  {
    title: "Children's Digital Books",
    description: "Age-appropriate storytelling",
    icon: Sparkles,
  },
];

export default function EbookWritingPage() {
  return (
    <main className="flex flex-1 flex-col">
      <ServiceHero
        tagline="Writing Support"
        heading="Expert Writing Guidance"
        headingLine2="For Your E-Book"
        subheading="At Stamford Publishers, we offer personalized writing support designed around your ideas, timeline, and publishing goals."
        features={features}
        formTitle="Let's Get Started"
        formSubtitle="Special Offer: Up to 30% Off"
        formIdPrefix="ebook-writing"
        callButtonLabel="Call Now"
      />
      <ServiceGrowthSection
        imageSrc="/ebook.jpg"
        imageAlt="Writer developing an e-book manuscript on a laptop"
        badge={{
          top: "Writing Support",
          main: "100%",
          bottom: "Author Ownership",
        }}
        tagline="Writing Support"
        headingPrimary="Expert Writing Guidance"
        headingSecondary="Aligned with Your Goals"
        description="From developing your initial concept to refining the final manuscript, our team helps shape your e-book with clarity, structure, and attention to every important detail."
        items={growthItems}
      />
      <ServiceLaunchCycle
        tagline="The E-Book Journey"
        headingPrimary="From Concept to"
        headingSecondary="Digital Publication"
        description="How we transform your thoughts into a professional manuscript through a structured and iterative writing cycle."
        steps={launchSteps}
      />
      <ServiceChannels
        tagline="E-Books We Create"
        headingPrimary="Our Digital"
        headingSecondary="Expertise"
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
