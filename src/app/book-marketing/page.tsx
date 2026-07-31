import type { Metadata } from "next";
import {
  BarChart3,
  Inbox,
  Infinity,
  Megaphone,
  Newspaper,
  Rocket,
  Search,
  Share2,
  ShoppingCart,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import ProfessionalServices from "@/components/ProfessionalServices";
import ServiceChannels from "@/components/ServiceChannels";
import ServiceGrowthSection from "@/components/ServiceGrowthSection";
import ServiceHero from "@/components/ServiceHero";
import ServiceLaunchCycle from "@/components/ServiceLaunchCycle";
import ServicePageCTA from "@/components/ServicePageCTA";

export const metadata: Metadata = {
  title: "Book Marketing | Stamford Publishers",
  description:
    "Expand your reach with Stamford Publishers. Customized marketing solutions including social media, email outreach, and influencer partnerships.",
};

const features = [
  { label: "Social Media Marketing", icon: Megaphone },
  { label: "Email Outreach Campaigns", icon: Target },
  { label: "Book Review Campaigns", icon: TrendingUp },
  { label: "Influencer Partnerships", icon: BarChart3 },
];

const growthItems = [
  {
    number: "01",
    icon: Megaphone,
    title: "Paid Advertising",
    description: "High-converting ad campaigns tailored to your niche.",
  },
  {
    number: "02",
    icon: Share2,
    title: "PR & Media",
    description:
      "Securing reviews, interviews, and media placements to build your author authority.",
  },
];

const launchSteps = [
  {
    number: 1,
    icon: Rocket,
    title: "Pre-Launch",
    description:
      "Building early buzz through ARC campaigns, cover reveals, and pre-order strategies.",
  },
  {
    number: 2,
    icon: TrendingUp,
    title: "Launch Week",
    description:
      "Aggressive promotion and ad scaling to push your book up the retail rankings.",
  },
  {
    number: 3,
    icon: Infinity,
    title: "Sustenance",
    description:
      "Long-term marketing funnels and email strategies to keep the sales flowing consistently.",
  },
  {
    number: 4,
    icon: BarChart3,
    title: "Scaling",
    description:
      "Analyzing performance data to scale successful campaigns and maximize your reach.",
  },
];

const channelItems = [
  {
    title: "Advertising",
    description:
      "Targeted paid campaigns across Amazon, BookBub, and retail platforms to drive immediate sales.",
    icon: ShoppingCart,
    tag: "CORE",
  },
  {
    title: "Social Media Ads",
    description:
      "Facebook, Instagram, and TikTok campaigns designed to reach readers in your genre.",
    icon: Share2,
    tag: "CORE",
  },
  {
    title: "Email Marketing",
    description:
      "Newsletter sequences, launch announcements, and reader nurture funnels that convert.",
    icon: Inbox,
    tag: "GROWTH",
  },
  {
    title: "Press & Media",
    description:
      "Book reviews, podcast interviews, and media placements to establish your author credibility.",
    icon: Newspaper,
    tag: "AUTHORITY",
  },
  {
    title: "SEO & Metadata",
    description:
      "Optimised book descriptions, keywords, and categories for maximum discoverability.",
    icon: Search,
    tag: "ORGANIC",
  },
  {
    title: "Author Platform",
    description:
      "Building your personal brand and online presence to create a loyal reader community.",
    icon: Users,
    tag: "BRAND",
  },
];

export default function BookMarketingPage() {
  return (
    <main className="flex flex-1 flex-col">
      <ServiceHero
        tagline="Book Marketing"
        heading="Expand Your Reach"
        headingLine2="With Stamford Publishers"
        subheading="From strategy development to campaign execution, Stamford Publishers helps authors build meaningful connections with their target audience."
        features={features}
        formTitle="Let's Get Started"
        formSubtitle="Special Offer: Up to 30% Off"
        formIdPrefix="marketing"
      />
      <ServiceGrowthSection
        imageSrc="/marketing.webp"
        imageAlt="Marketing strategist reviewing campaign analytics on a laptop"
        badge={{ main: "Global", bottom: "Market Impact" }}
        tagline="Book Marketing"
        headingPrimary="Expand Your Reach"
        headingSecondary="With Stamford Publishers"
        description="Our services include social media marketing, email outreach, professional book review campaigns, and influencer partnerships designed to increase visibility and reader engagement."
        items={growthItems}
      />
      <ServiceLaunchCycle
        tagline="Strategic Launch Cycle"
        headingPrimary="The Path to"
        headingSecondary="Novel"
        description="A phased approach to building hype and sustaining long-term sales momentum in the global retail market."
        steps={launchSteps}
      />
      <ServiceChannels
        tagline="Marketing Channels"
        headingPrimary="Multi-Channel"
        headingSecondary="Strategy"
        description="We deploy campaigns across every platform where your readers discover new books."
        items={channelItems}
      />
      <ProfessionalServices />
      <ServicePageCTA
        tagline="Free Consultation"
        heading="Book a Free Consultation with Book Publishing Experts"
        description="Have questions about publishing your book? Schedule a free consultation with one of Stamford Publishers' publishing specialists. We'll provide clear guidance and help you take the next step in your publishing journey with confidence."
      />
    </main>
  );
}
