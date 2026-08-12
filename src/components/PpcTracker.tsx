"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { PHONE_HREF } from "@/lib/google-ads";
import { capturePpcParams } from "@/lib/ppc";

function PpcTrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    capturePpcParams();
  }, [pathname, searchParams]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest<HTMLAnchorElement>('a[href^="tel:"]');
      if (!link) return;

      const url = link.getAttribute("href") || PHONE_HREF;
      event.preventDefault();

      if (typeof window.gtag_report_conversion === "function") {
        window.gtag_report_conversion(url);
        return;
      }

      window.location.href = url;
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

export default function PpcTracker() {
  return (
    <Suspense fallback={null}>
      <PpcTrackerInner />
    </Suspense>
  );
}
