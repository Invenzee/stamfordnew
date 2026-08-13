"use client";

import Link from "next/link";
import {
  ChevronDown,
  Globe,
  Headphones,
  Megaphone,
  Palette,
  Sparkles,
  SpellCheck,
  SquarePen,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { routes } from "@/data/routes";

export const mainServices = [
  {
    label: "Book Editing & Proofreading",
    href: routes.services.editing,
    icon: SpellCheck,
  },
  {
    label: "Book Cover Design",
    href: routes.services.coverDesign,
    icon: Palette,
  },
  {
    label: "Book Marketing",
    href: routes.services.marketing,
    icon: Megaphone,
  },
  {
    label: "Book Publishing",
    href: routes.services.publishing,
    icon: Globe,
  },
  {
    label: "Book Writing",
    href: routes.services.writing,
    icon: SquarePen,
  },
  {
    label: "Book Illustrations",
    href: routes.services.illustrations,
    icon: SquarePen,
  },
  {
    label: "E-Book Writing",
    href: routes.services.ebookWriting,
    icon: SquarePen,
  },
  {
    label: "Author Website",
    href: routes.services.authorWebsite,
    icon: SquarePen,
  },
];

export const specialtyServices = [
  {
    label: "Audio Book Production",
    href: routes.services.audiobook,
    icon: Headphones,
  },
  {
    label: "Children's Book Specialty",
    href: routes.services.childrensBooks,
    icon: Sparkles,
  },
];

function ServiceItem({
  label,
  href,
  icon: Icon,
}: {
  label: string;
  href: string;
  icon: LucideIcon;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3.5 rounded-md px-4 py-2 font-heading text-[15px] leading-snug text-black transition-colors hover:bg-black/5"
    >
      <Icon className="h-[18px] w-[18px] shrink-0 stroke-[1.5]" aria-hidden="true" />
      <span>{label}</span>
    </Link>
  );
}

export default function ServicesDropdown() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openMenu = () => {
    cancelClose();
    setOpen(true);
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 200);
  };

  return (
    <div
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        className="font-heading flex items-center gap-1 text-[17px] text-black transition-opacity hover:opacity-70"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => {
          cancelClose();
          setOpen((current) => !current);
        }}
      >
        Services
        <ChevronDown
          className={`mt-0.5 h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      <div
        className={`absolute left-0 top-full z-50 min-w-[320px] pt-2 ${
          open ? "visible" : "invisible pointer-events-none"
        }`}
      >
        <div className="rounded-[18px] bg-about-section-bg px-2 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
          <div className="flex flex-col">
            {mainServices.map((service) => (
              <ServiceItem key={service.href} {...service} />
            ))}
          </div>

          <div className="my-1.5 border-t border-black/10" />

          <div className="flex flex-col">
            {specialtyServices.map((service) => (
              <ServiceItem key={service.href} {...service} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
