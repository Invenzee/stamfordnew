import Image from "next/image";
import { bookCovers } from "@/data/bookCovers";

const columnOne = Array.from({ length: 7 }, (_, i) => i);
const columnTwo = Array.from({ length: 7 }, (_, i) => i + 3);

function BookCover({ index }: { index: number }) {
  const cover = bookCovers[index % bookCovers.length];

  return (
    <div
      className="relative aspect-[2/3] w-40 shrink-0 overflow-hidden rounded-lg shadow-lg ring-1 ring-white/20"
      aria-hidden="true"
    >
      <Image
        src={cover.image}
        alt={cover.alt}
        fill
        sizes="160px"
        className="object-cover"
      />
    </div>
  );
}

function BookColumn({
  items,
  direction,
}: {
  items: number[];
  direction: "up" | "down";
}) {
  const looped = [...items, ...items, ...items, ...items];

  return (
    <div className="h-full w-40 overflow-hidden">
      <div
        className={`flex flex-col gap-4 ${
          direction === "up" ? "animate-scroll-up" : "animate-scroll-down"
        }`}
      >
        {looped.map((item, i) => (
          <BookCover key={i} index={item} />
        ))}
      </div>
    </div>
  );
}

export default function HeroBookCarousel() {
  return (
    <div
      className="pointer-events-none absolute -inset-y-20 -right-10 z-0 hidden items-center justify-center gap-4 overflow-hidden opacity-80 sm:flex sm:-inset-x-24 sm:-right-60 sm:-inset-y-24"
      aria-hidden="true"
    >
      <div className="flex -rotate-6 gap-4 sm:gap-5">
        <BookColumn items={columnOne} direction="up" />
        <BookColumn items={columnTwo} direction="down" />
      </div>
    </div>
  );
}
