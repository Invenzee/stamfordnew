"use client";

import { useEffect } from "react";

export default function PhoneConversionClicks() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest("a[href^='tel:']");
      if (!(link instanceof HTMLAnchorElement) || !link.href) return;
      if (typeof window.gtag_report_conversion !== "function") return;

      event.preventDefault();
      window.gtag_report_conversion(link.href);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
