"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LpMobileCallButton from "@/components/LpMobileCallButton";
import PopupForm from "@/components/PopupForm";
import { isStandaloneLpPath } from "@/lib/standalone-lp";

export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isStandaloneLp = isStandaloneLpPath(pathname);

  if (isStandaloneLp) {
    return (
      <>
        {children}
        <LpMobileCallButton />
      </>
    );
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
      <PopupForm />
    </>
  );
}
