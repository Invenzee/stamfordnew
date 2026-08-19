import type { Metadata } from "next";
import { headers } from "next/headers";
import { Poppins, Raleway } from "next/font/google";
import GoogleTag from "@/components/GoogleTag";
import LiveChat from "@/components/LiveChat";
import PpcTracker from "@/components/PpcTracker";
import SiteChrome from "@/components/SiteChrome";
// import ZendeskWidget from "@/components/ZendeskWidget";
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
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png?v=2" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png?v=2" />
        <GoogleTag fireLeadConversion={isThankYou} />
      </head>
      <body
        className="flex min-h-full flex-col bg-background text-foreground"
        suppressHydrationWarning
      >
        <PpcTracker />
        <SiteChrome>{children}</SiteChrome>
        <LiveChat />
        {/* <ZendeskWidget /> */}
      </body>
    </html>
  );
}
