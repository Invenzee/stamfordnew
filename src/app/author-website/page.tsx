import type { Metadata } from "next";
import {
  Calendar,
  LayoutDashboard,
  LifeBuoy,
  Lightbulb,
  Mail,
  Monitor,
  Palette,
  Rocket,
  Search,
  Share2,
  ShoppingCart,
  Smartphone,
  Code,
} from "lucide-react";
import ProfessionalServices from "@/components/ProfessionalServices";
import ServiceChannels from "@/components/ServiceChannels";
import ServiceGrowthSection from "@/components/ServiceGrowthSection";
import ServiceHero from "@/components/ServiceHero";
import ServiceLaunchCycle from "@/components/ServiceLaunchCycle";
import ServicePageCTA from "@/components/ServicePageCTA";

export const metadata: Metadata = {
  title: "Author Website | Stamford Publishers",
  description:
    "Build your author brand with a professional website from Stamford Publishers. Expert support, personalized design, and tools to connect with readers.",
};

const features = [
  { label: "Personalized Client Dashboard", icon: LayoutDashboard },
  { label: "Expert Author Support", icon: Smartphone },
  { label: "SEO-Optimized for Discoverability", icon: Search },
  { label: "Client Satisfaction Guaranteed", icon: ShoppingCart },
];

const growthItems = [
  {
    number: "01",
    icon: Palette,
    title: "Custom Design",
    description:
      "A tailored visual identity that reflects your genre, brand, and personality as an author.",
  },
  {
    number: "02",
    icon: LifeBuoy,
    title: "Ongoing Support & Hosting",
    description:
      "Reliable hosting, security updates, and technical support so your site stays online and current.",
  },
];

const launchSteps = [
  {
    number: 1,
    icon: Lightbulb,
    title: "Discovery",
    description:
      "Understanding your brand, genre, and goals to map out the ideal site structure.",
  },
  {
    number: 2,
    icon: Palette,
    title: "Design",
    description:
      "Crafting a custom visual layout that reflects your unique author identity.",
  },
  {
    number: 3,
    icon: Code,
    title: "Development",
    description:
      "Building a fast, secure, mobile-responsive site with all required functionality.",
  },
  {
    number: 4,
    icon: Rocket,
    title: "Launch",
    description:
      "Going live with full testing, SEO setup, and training on how to manage your site.",
  },
];

const channelItems = [
  {
    title: "Mobile-Responsive",
    description: "Looks great on every device",
    icon: Monitor,
  },
  {
    title: "SEO Optimized",
    description: "Built to be found by readers",
    icon: Search,
  },
  {
    title: "Retail Integration",
    description: "Direct links to all your book platforms",
    icon: ShoppingCart,
  },
  {
    title: "Newsletter Signup",
    description: "Grow your reader mailing list",
    icon: Mail,
  },
  {
    title: "Events & Appearances",
    description: "Showcase signings and tours",
    icon: Calendar,
  },
  {
    title: "Social Integration",
    description: "Connect all your social profiles",
    icon: Share2,
  },
];

export default function AuthorWebsitePage() {
  return (
    <main className="flex flex-1 flex-col">
      <ServiceHero
        tagline="Author Support"
        heading="Your Professional Home"
        headingLine2="On the Internet"
        subheading="Stamford Publishers helps authors build a professional online presence designed to connect with readers and support their publishing goals."
        features={features}
        formTitle="Let's Get Started"
        formSubtitle="Special Offer: Up to 30% Off"
        formIdPrefix="author-website"
        callButtonLabel="Call Now"
      />
      <ServiceGrowthSection
        imageSrc="/author-website.jpg"
        imageAlt="Web designer building a professional author website"
        badge={{
          top: "Author Website Design",
          main: "100%",
          bottom: "Custom Designed",
        }}
        tagline="Our Services"
        headingPrimary="Comprehensive Publishing"
        headingSecondary="Services"
        description="Stamford Publishers offers a complete, author-focused publishing experience, supporting writers through manuscript development, editing, publishing, and promotion with expert guidance and dedicated support."
        items={growthItems}
      />
      <ServiceLaunchCycle
        tagline="The Build Process"
        headingPrimary="The Path to"
        headingSecondary="Launch"
        description="A structured, collaborative process that takes your website from concept to a fully live, professional online presence."
        steps={launchSteps}
      />
      <ServiceChannels
        tagline="What's Included"
        headingPrimary="Core Website"
        headingSecondary="Features"
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
