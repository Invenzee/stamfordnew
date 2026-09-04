"use client";

import { usePathname } from "next/navigation";
import { FaPhone } from "react-icons/fa6";
import { PHONE_HREF } from "@/lib/google-ads";
import { getLpCallTheme, isStandaloneLpPath } from "@/lib/standalone-lp";

export default function LpMobileCallButton() {
  const pathname = usePathname();

  if (
    !isStandaloneLpPath(pathname) ||
    pathname?.toLowerCase().startsWith("/cookbook/lp") ||
    pathname?.toLowerCase().startsWith("/self-publishing/lp")
  ) {
    return null;
  }

  const theme = getLpCallTheme(pathname);

  return (
    <a
      href={PHONE_HREF}
      aria-label="Call us now"
      className="fixed bottom-5 left-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full md:hidden"
      style={{
        backgroundColor: theme.bg,
        color: theme.icon,
        boxShadow: `0 6px 20px ${theme.bg}73`,
      }}
    >
      <span
        className="absolute inset-0 rounded-full animate-ping opacity-30"
        style={{ backgroundColor: theme.bg }}
        aria-hidden="true"
      />
      <FaPhone className="relative h-6 w-6" aria-hidden="true" />
    </a>
  );
}
