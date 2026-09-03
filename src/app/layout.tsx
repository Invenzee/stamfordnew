import type { Metadata } from "next";
import { headers } from "next/headers";
import { Poppins, Raleway } from "next/font/google";
// import LiveChat from "@/components/LiveChat";
import GoogleAdsHead from "@/components/GoogleAdsHead";
import PhoneConversionClicks from "@/components/PhoneConversionClicks";
import PpcTracker from "@/components/PpcTracker";
import SiteChrome from "@/components/SiteChrome";
import ZendeskWidget from "@/components/ZendeskWidget";
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
    icon: [
      { url: "/favicon.ico", type: "image/x-icon", sizes: "any" },
      { url: "/favicon.png?v=2", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.png?v=2",
  },
};

function isThankYouPath(pathname: string) {
  const normalized = pathname.replace(/\/$/, "") || "/";
  return normalized === "/thank-you";
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const pathname = headerList.get("x-pathname") ?? "";

  return (
    <html
      lang="en"
      className={`${poppins.variable} ${raleway.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <GoogleAdsHead includeLeadConversion={isThankYouPath(pathname)} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png?v=2" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png?v=2" />
      </head>
      <body
        className="flex min-h-full flex-col bg-background text-foreground"
        suppressHydrationWarning
      >
        <PpcTracker />
        <PhoneConversionClicks />
        <SiteChrome>{children}</SiteChrome>
        {/* <LiveChat /> */}
        <ZendeskWidget />
      </body>
    </html>
  );
}
