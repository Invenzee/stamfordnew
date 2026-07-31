import type { Metadata } from "next";
import {
  Globe,
  Headphones,
  Mic,
  Percent,
  SlidersHorizontal,
  User,
  Users,
  UserPen,
  Waves,
} from "lucide-react";
import ProfessionalServices from "@/components/ProfessionalServices";
import ServiceChannels from "@/components/ServiceChannels";
import ServiceGrowthSection from "@/components/ServiceGrowthSection";
import ServiceHero from "@/components/ServiceHero";
import ServiceLaunchCycle from "@/components/ServiceLaunchCycle";
import ServicePageCTA from "@/components/ServicePageCTA";

export const metadata: Metadata = {
  title: "Audio Book Production | Stamford Publishers",
  description:
    "Bring your story to life in audio format and reach more listeners through professional audiobook production with Stamford Publishers.",
};

const features = [
  { label: "Professional Audiobook Production", icon: Mic },
  { label: "Expert Author Support", icon: Waves },
  { label: "Global Book Distribution", icon: Globe },
  { label: "100% Author Ownership", icon: Percent },
];

const growthItems = [
  {
    number: "01",
    icon: Mic,
    title: "Casting & Recording",
    description:
      "Professional voice actors who specialize in your book's genre and bring your characters to life.",
  },
  {
    number: "02",
    icon: Headphones,
    title: "Mastering & Engineering",
    description:
      "Pristine audio engineering for a balanced, immersive, and retail-ready listening experience.",
  },
];

const launchSteps = [
  {
    number: 1,
    icon: User,
    title: "Casting",
    description:
      "Reviewing auditions to find the perfect voice that embodies your book's unique spirit.",
  },
  {
    number: 2,
    icon: Mic,
    title: "Recording",
    description:
      "Studio-grade narration sessions with real-time monitoring and meticulous quality control.",
  },
  {
    number: 3,
    icon: SlidersHorizontal,
    title: "Mastering",
    description:
      "Meticulous editing and mastering to meet global distribution standards.",
  },
  {
    number: 4,
    icon: Globe,
    title: "Distribution",
    description: "Global synchronization and launch across major platforms.",
  },
];

const channelItems = [
  {
    title: "Solo Narration",
    description: "One dedicated voice artist brings your entire book to life.",
    icon: Mic,
    tag: "Popular",
  },
  {
    title: "Multi-Voice Cast",
    description: "Multiple narrators for dialogue-heavy fiction.",
    icon: Users,
    tag: "Premium",
  },
  {
    title: "Author Narration",
    description: "Record your own with our professional studio direction.",
    icon: UserPen,
    tag: "Personal",
  },
];

export default function AudiobookPage() {
  return (
    <main className="flex flex-1 flex-col">
      <ServiceHero
        tagline="Audiobook Production"
        heading="Bring Your Story to Life"
        headingLine2="In Audio Format"
        subheading="Bring your story to life in audio format and reach more listeners through professional audiobook production."
        features={features}
        formTitle="Let's Get Started"
        formSubtitle="Special Offer: Up to 30% Off"
        formIdPrefix="audiobook"
        callButtonLabel="Call Now"
      />
      <ServiceGrowthSection
        imageSrc="/audiobook-1.webp"
        imageAlt="Voice actor recording an audiobook in a professional studio"
        badge={{
          top: "Recording Session",
          main: "HD",
          bottom: "Studio Quality",
        }}
        tagline="Audiobook Production"
        headingPrimary="Reach More Listeners"
        headingSecondary="Through Professional Audio"
        description="Stamford Publishers provides end-to-end audiobook production services, helping you reach more listeners while keeping your creative vision at the center."
        items={growthItems}
      />
      <ServiceLaunchCycle
        tagline="Production Workflow"
        headingPrimary="The Path to"
        headingSecondary="Global Ears"
        description="A meticulous recording and editing cycle to ensure your audiobook is as professional as your written manuscript."
        steps={launchSteps}
      />
      <ServiceChannels
        tagline="Narration Options"
        headingPrimary="Voice & Style"
        headingSecondary="Selection"
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
