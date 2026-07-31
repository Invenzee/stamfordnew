import type { Metadata } from "next";
import ContactChannels from "@/components/ContactChannels";
import ContactHero from "@/components/ContactHero";
import ResponseCommitment from "@/components/ResponseCommitment";

export const metadata: Metadata = {
  title: "Contact Us | Stamford Publishers",
  description:
    "Schedule a free consultation with Stamford Publishers. Our publishing specialists are ready to answer your questions and guide your publishing journey.",
};

export default function ContactPage() {
  return (
    <main className="flex flex-1 flex-col">
      <ContactHero />
      <ContactChannels />
      <ResponseCommitment />
    </main>
  );
}
