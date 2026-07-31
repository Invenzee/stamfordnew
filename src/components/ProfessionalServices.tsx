"use client";

import Link from "next/link";
import {
  BookImage,
  Globe,
  Headphones,
  Megaphone,
  Palette,
  PenLine,
  SpellCheck,
  type LucideIcon,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { routes } from "@/data/routes";

const services: {
  id: number;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}[] = [
  {
    id: 0,
    title: "Book Editing & Proofreading",
    description:
      "Strengthen your manuscript with professional editing services that improve clarity, structure, flow, and quality.",
    href: routes.services.editing,
    icon: SpellCheck,
  },
  {
    id: 1,
    title: "Book Cover Design",
    description: "Custom covers and interior layouts.",
    href: routes.services.coverDesign,
    icon: Palette,
  },
  {
    id: 2,
    title: "Book Marketing",
    description:
      "Promote your book with customized marketing strategies designed to increase visibility and connect with readers.",
    href: routes.services.marketing,
    icon: Megaphone,
  },
  {
    id: 3,
    title: "Book Publishing",
    description:
      "Turn your manuscript into a professionally prepared book, ready for printing, publishing, and distribution.",
    href: routes.services.publishing,
    icon: Globe,
  },
  {
    id: 4,
    title: "Ghostwriting",
    description:
      "Personalized writing support designed around your ideas, timeline, and publishing goals.",
    href: routes.services.writing,
    icon: PenLine,
  },
  {
    id: 5,
    title: "Audio Book",
    description:
      "Bring your story to life in audio format and reach more listeners through professional audiobook production.",
    href: routes.services.audiobook,
    icon: Headphones,
  },
  {
    id: 6,
    title: "Children Book",
    description:
      "Tailored illustration and publishing for young readers.",
    href: routes.services.childrensBooks,
    icon: BookImage,
  },
];

const AUTOPLAY_INTERVAL = 4500;

type ProfessionalServicesProps = {
  className?: string;
  tagline?: string;
  headingPrimary?: string;
  headingSecondary?: string;
  description?: string;
  serviceOrder?: number[];
};

const DEFAULT_TAGLINE = "Our Services";
const DEFAULT_HEADING_PRIMARY = "Comprehensive Publishing";
const DEFAULT_HEADING_SECONDARY = "Services";
const DEFAULT_DESCRIPTION =
  "Stamford Publishers offers a complete, author-focused publishing experience, supporting writers through manuscript development, editing, publishing, and promotion with expert guidance and dedicated support.";

export default function ProfessionalServices({
  className,
  tagline = DEFAULT_TAGLINE,
  headingPrimary = DEFAULT_HEADING_PRIMARY,
  headingSecondary = DEFAULT_HEADING_SECONDARY,
  description = DEFAULT_DESCRIPTION,
  serviceOrder,
}: ProfessionalServicesProps = {}) {
  const orderedServices = serviceOrder
    ? serviceOrder
        .map((id) => services.find((service) => service.id === id))
        .filter((service): service is typeof services[number] => service != null)
    : services;
  const trackRef = useRef<HTMLDivElement>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [isPaused, setIsPaused] = useState(false);

  const maxIndex = Math.max(0, orderedServices.length - visibleCount);

  const updateVisibleCount = useCallback(() => {
    const width = window.innerWidth;
    if (width < 640) {
      setVisibleCount(1);
    } else if (width < 1024) {
      setVisibleCount(2);
    } else {
      setVisibleCount(4);
    }
  }, []);

  const updateOffset = useCallback(() => {
    const track = trackRef.current;
    if (!track?.children[activeIndex]) return;

    const card = track.children[activeIndex] as HTMLElement;
    setOffset(card.offsetLeft);
  }, [activeIndex]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, [hasMounted, updateVisibleCount]);

  useEffect(() => {
    if (!hasMounted) return;

    setActiveIndex((current) => Math.min(current, maxIndex));
  }, [hasMounted, maxIndex]);

  useEffect(() => {
    if (!hasMounted) return;

    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, [hasMounted, updateOffset]);

  useEffect(() => {
    if (!hasMounted || isPaused) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current >= maxIndex ? 0 : current + 1));
    }, AUTOPLAY_INTERVAL);

    return () => window.clearInterval(interval);
  }, [hasMounted, isPaused, maxIndex]);

  const goToSlide = (index: number) => {
    setActiveIndex(Math.min(index, maxIndex));
  };

  return (
    <section
      className={className ?? "bg-white py-16 lg:py-20"}
    >
      <div className="site-container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-secondary" aria-hidden="true" />
            <span className="font-body text-[11px] font-bold tracking-[0.2em] text-highlight uppercase">
              {tagline}
            </span>
            <span className="h-px w-8 bg-secondary" aria-hidden="true" />
          </div>

          <h2 className="mt-5 font-heading text-[36px] leading-tight font-semibold sm:text-[42px] lg:text-[48px]">
            <span className="text-heading">{headingPrimary}</span>{" "}
            <span className="text-highlight">{headingSecondary}</span>
          </h2>

          <p className="mt-4 font-body text-sm leading-relaxed text-black/70 sm:text-[15px]">
            {description}
          </p>
        </div>

        <div
          className="mt-14 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={trackRef}
            className="flex gap-4 transition-transform duration-500 ease-out sm:gap-5"
            style={
              hasMounted
                ? { transform: `translateX(-${offset}px)` }
                : undefined
            }
          >
            {orderedServices.map(({ id, title, description, href, icon: Icon }) => (
              <div
                key={id}
                className="group w-[calc((100%-0px)/1)] min-w-[calc((100%-0px)/1)] shrink-0 sm:w-[calc((100%-1rem)/2)] sm:min-w-[calc((100%-1rem)/2)] lg:w-[calc((100%-3.75rem)/4)] lg:min-w-[calc((100%-3.75rem)/4)]"
              >
                <div className="flex h-full flex-col rounded-2xl border border-border bg-white px-6 py-8 transition-all duration-300 ease-out group-hover:-translate-y-2 group-hover:border-secondary/40 group-hover:shadow-[0_12px_40px_rgba(233,106,41,0.12)]">
                  <Icon
                    className="h-10 w-10 text-secondary transition-transform duration-300 group-hover:scale-110"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />

                  <h3 className="mt-5 font-heading text-lg font-bold text-heading">
                    {title}
                  </h3>

                  <p className="mt-3 flex-1 font-body text-[13px] leading-relaxed text-black/60">
                    {description}
                  </p>

                  <Link
                    href={href}
                    className="btn btn-primary btn-service mt-6 inline-flex w-fit"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-2.5">
          {orderedServices.map((service, index) => (
            <button
              key={service.id}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              {...(hasMounted && activeIndex === index
                ? { "aria-current": true }
                : {})}
              onClick={() => goToSlide(index)}
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "bg-secondary"
                  : "bg-border hover:bg-secondary/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
