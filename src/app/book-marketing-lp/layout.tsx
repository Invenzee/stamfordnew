import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SP - Marketing LP",
  description:
    "Professional book marketing services to boost visibility, reach readers, and grow your author brand. Get a free consultation with Stamford Publishers today.",
  alternates: {
    canonical: "https://stamfordpublishers.com/book-marketing-lp",
  },
  openGraph: {
    title: "SP - Marketing LP",
    description:
      "Strategic book promotion, social media campaigns, and advertising support to help your book reach more readers.",
    type: "website",
    url: "https://stamfordpublishers.com/book-marketing-lp",
    siteName: "Stamford Publishers",
  },
};

export default function BookMarketingLpLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="lp-standalone min-h-screen bg-white text-[#111] font-sans">
      {children}
    </div>
  );
}
