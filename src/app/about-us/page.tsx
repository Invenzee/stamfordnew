import type { Metadata } from "next";
import AboutHero from "@/components/AboutHero";
import AboutMission from "@/components/AboutMission";
import AboutWhyChoose from "@/components/AboutWhyChoose";
import SuccessStories from "@/components/SuccessStories";

export const metadata: Metadata = {
  title: "About Us | Stamford Publishers",
  description:
    "Learn about Stamford Publishers — comprehensive publishing solutions designed around your unique goals, with expert support at every stage.",
};

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col">
      <AboutHero />
      <AboutMission />
      <AboutWhyChoose />
      <SuccessStories />
    </main>
  );
}
