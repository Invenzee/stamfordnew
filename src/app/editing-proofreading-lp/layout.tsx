import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SP - Editing LP",
  description:
    "Turn your manuscript into a masterpiece with professional book editing and proofreading. Genre-specialist editors, line-by-line precision, and guaranteed on-time delivery.",
  alternates: {
    canonical: "https://stamfordpublishers.com/editing-proofreading-lp",
  },
  openGraph: {
    title: "SP - Editing LP",
    description:
      "Expert book editing and proofreading — developmental edits, line and copy editing, and precision proofreading that keeps your voice intact.",
    type: "website",
    url: "https://stamfordpublishers.com/editing-proofreading-lp",
    siteName: "Stamford Publishers",
  },
};

export default function BookEditingLpLayout({
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
