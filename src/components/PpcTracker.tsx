"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { capturePpcParams } from "@/lib/ppc";

function PpcTrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    capturePpcParams();
  }, [pathname, searchParams]);

  return null;
}

export default function PpcTracker() {
  return (
    <Suspense fallback={null}>
      <PpcTrackerInner />
    </Suspense>
  );
}
