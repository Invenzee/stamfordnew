import type { Metadata } from "next";
import "./sp-lp.css";

const PAGE_PATH = "/self-publishing/lp";
const SITE = "https://www.stamfordpublishers.com";

export const metadata: Metadata = {
  title: "SP - Self-Publishing LP",
  description:
    "Stamford Publishers takes your manuscript to Amazon, Barnes & Noble, Apple Books, Ingram, Kobo and Audible. Ghostwriting, editing, cover design, audiobook and marketing, with distribution reach most self-publishing services cannot match. You keep every right and every royalty.",
  keywords: [
    "self publishing services",
    "self publish a book",
    "book distribution",
    "Ingram distribution",
    "Amazon self publishing",
    "Stamford Publishers",
  ],
  alternates: {
    canonical: `${SITE}${PAGE_PATH}`,
  },
  openGraph: {
    title: "SP - Self-Publishing LP",
    description:
      "Editing, design, publishing and marketing, with distribution reach into stores and libraries most self-publishing services never get you into.",
    type: "website",
    url: `${SITE}${PAGE_PATH}`,
    siteName: "Stamford Publishers",
  },
};

export default function SelfPublishingLpLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="lp-standalone min-h-screen">{children}</div>;
}
