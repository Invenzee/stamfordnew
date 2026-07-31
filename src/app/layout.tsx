import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PopupForm from "@/components/PopupForm";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stamford Publishers",
  description:
    "Stamford Publishers - Professional publishing, editing, marketing, and distribution services for authors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Header />
        {children}
        <Footer />
        <PopupForm />
      </body>
    </html>
  );
}
