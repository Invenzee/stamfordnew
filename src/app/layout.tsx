import type { Metadata } from "next";
import { headers } from "next/headers";
import { Poppins, Raleway } from "next/font/google";
import GoogleTag from "@/components/GoogleTag";
import PpcTracker from "@/components/PpcTracker";
import SiteChrome from "@/components/SiteChrome";
import "./globals.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const raleway = Raleway({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Stamford Publishers",
  description:
    "Stamford Publishers - Professional publishing, editing, marketing, and distribution services for authors.",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = (await headers()).get("x-pathname") ?? "";
  const isThankYou = pathname === "/thank-you";

  return (
    <html
      lang="en"
      className={`${poppins.variable} ${raleway.variable} h-full antialiased`}
    >
      <head>
        <GoogleTag fireLeadConversion={isThankYou} />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <PpcTracker />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
