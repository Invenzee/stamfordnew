import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SP - Publishing LP",
  description:
    "End-to-end self-publishing from manuscript editing and cover design to ISBN assignment, global distribution, and Amazon optimization. You keep 100% rights and royalties.",
  alternates: {
    canonical: "https://stamfordpublishers.com/Publishing/lp",
  },
  openGraph: {
    title: "SP - Publishing LP",
    description:
      "Complete self-publishing solutions — formatting, cover design, ISBN setup, print-on-demand, and worldwide distribution through major bookstores.",
    type: "website",
    url: "https://stamfordpublishers.com/Publishing/lp",
    siteName: "Stamford Publishers",
  },
};

export default function BookPublishingServicesLpLayout({
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
