import type { Metadata } from "next";
import {
  BookOpen,
  Briefcase,
  CheckCheck,
  ClipboardList,
  Feather,
  GraduationCap,
  Heart,
  MessageCircle,
  Mic,
  PenLine,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import ProfessionalServices from "@/components/ProfessionalServices";
import ServiceChannels from "@/components/ServiceChannels";
import ServiceGrowthSection from "@/components/ServiceGrowthSection";
import ServiceHero from "@/components/ServiceHero";
import ServiceLaunchCycle from "@/components/ServiceLaunchCycle";
import ServicePageCTA from "@/components/ServicePageCTA";

export const metadata: Metadata = {
  title: "Book Writing | Stamford Publishers",
  description:
    "Expert writing guidance aligned with your goals. Stamford Publishers offers personalized writing support from initial concept to final manuscript.",
};

const features = [
  { label: "Expert Author Support", icon: ClipboardList },
  { label: "100% Author Ownership", icon: ShieldCheck },
  { label: "Personalized Writing Guidance", icon: MessageCircle },
  { label: "Client Satisfaction Guaranteed", icon: PenLine },
];

const growthItems = [
  {
    number: "01",
    icon: BookOpen,
    title: "Memoirs & Biographies",
    description:
      "Personalized writing support designed around your ideas, timeline, and publishing goals.",
  },
  {
    number: "02",
    icon: Briefcase,
    title: "Business & Leadership",
    description:
      "Expert guidance to shape your book with clarity, structure, and attention to every important detail.",
  },
];

const launchSteps = [
  {
    number: 1,
    icon: Mic,
    title: "Consultation",
    description:
      "Share your goals with Stamford Publishers and receive a personalized publishing roadmap.",
  },
  {
    number: 2,
    icon: PenLine,
    title: "Development",
    description:
      "We support manuscript development while keeping your vision at the center of every chapter.",
  },
  {
    number: 3,
    icon: Sparkles,
    title: "Production",
    description:
      "Professional editing and refinement to ensure clarity, flow, and quality throughout your manuscript.",
  },
  {
    number: 4,
    icon: CheckCheck,
    title: "Launch",
    description:
      "Your completed manuscript is prepared for publishing, distribution, and promotion.",
  },
];

const channelItems = [
  {
    title: "Memoirs",
    description: "Life stories told with sensitivity",
    icon: Heart,
  },
  {
    title: "Business",
    description: "Thought leadership content",
    icon: Briefcase,
  },
  {
    title: "Self-Help",
    description: "Transformative guidance books",
    icon: Feather,
  },
  {
    title: "Fiction",
    description: "Novels across all genres",
    icon: BookOpen,
  },
  {
    title: "Academic",
    description: "Research-backed publications",
    icon: GraduationCap,
  },
  {
    title: "Children's",
    description: "Age-appropriate storytelling",
    icon: Users,
  },
];

export default function BookWritingPage() {
  return (
    <main className="flex flex-1 flex-col">
      <ServiceHero
        tagline="Writing Support"
        heading="Expert Writing Guidance"
        headingLine2="Aligned with Your Goals"
        subheading="At Stamford Publishers, we offer personalized writing support designed around your ideas, timeline, and publishing goals."
        features={features}
        formTitle="Let's Get Started"
        formSubtitle="Special Offer: Up to 30% Off"
        formIdPrefix="writing"
        callButtonLabel="(562) 573-2551"
      />
      <ServiceGrowthSection
        imageSrc="/writing.jpg"
        imageAlt="Writer working on a manuscript at a desk"
        badge={{ main: "Expert", bottom: "Storytellers" }}
        tagline="Writing Support"
        headingPrimary="Expert Writing Guidance"
        headingSecondary="Aligned with Your Goals"
        description="From developing your initial concept to refining the final manuscript, our team helps shape your book with clarity, structure, and attention to every important detail."
        items={growthItems}
      />
      <ServiceLaunchCycle
        tagline="Self-Publishing"
        headingPrimary="A Streamlined Path to"
        headingSecondary="Self-Publishing"
        description="Stamford Publishers provides a simple, flexible, and author-focused writing experience tailored to your goals, with expert support at every stage."
        steps={launchSteps}
      />
      <ServiceChannels
        tagline="Genres We Cover"
        headingPrimary="Writing"
        headingSecondary="Expertise"
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
