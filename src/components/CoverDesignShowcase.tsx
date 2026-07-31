"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { bookCovers } from "@/data/bookCovers";

const AUTOPLAY_INTERVAL = 4000;

export default function CoverDesignShowcase() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [isPaused, setIsPaused] = useState(false);

  const maxIndex = Math.max(0, bookCovers.length - visibleCount);
  const focusOffset = Math.min(2, Math.floor(visibleCount / 2));
  const slideCount = maxIndex + 1;

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
    <section className="bg-highlight py-16 lg:py-24">
      <div className="site-container">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-white/50" aria-hidden="true" />
            <span className="font-body text-[11px] font-bold tracking-[0.2em] text-white/80 uppercase">
              Recent Works
            </span>
            <span className="h-px w-10 bg-white/50" aria-hidden="true" />
          </div>

          <h2 className="mt-5 font-heading text-[36px] leading-tight font-semibold text-white sm:text-[42px] lg:text-[48px]">
            Our Design Showcase
          </h2>

          <p className="mx-auto mt-4 max-w-lg font-body text-sm leading-relaxed text-white/85 sm:text-[15px]">
            Explore covers that have transformed manuscripts into bestsellers.
          </p>
        </div>

        <div
          className="mt-12 overflow-hidden"
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
            {bookCovers.map((cover, index) => {
              const isFocused = index === activeIndex + focusOffset;

              return (
                <div
                  key={cover.id}
                  className={`w-[calc((100%-0px)/1)] min-w-[calc((100%-0px)/1)] shrink-0 overflow-hidden rounded-2xl transition-all duration-300 sm:w-[calc((100%-1rem)/2)] sm:min-w-[calc((100%-1rem)/2)] lg:w-[calc((100%-3.75rem)/4)] lg:min-w-[calc((100%-3.75rem)/4)] ${
                    isFocused
                      ? "shadow-xl"
                      : "shadow-lg opacity-90"
                  }`}
                >
                  <div className="aspect-[2/3] w-full">
                    <Image
                      src={cover.image}
                      alt={cover.alt}
                      width={400}
                      height={600}
                      className="h-full w-full object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-2.5">
          {Array.from({ length: slideCount }, (_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              {...(hasMounted && activeIndex === index
                ? { "aria-current": true }
                : {})}
              onClick={() => goToSlide(index)}
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "bg-secondary"
                  : "bg-white/30 hover:bg-secondary/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
