export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-about-hero">
      <div className="site-container relative flex flex-col items-center py-20 text-center sm:py-24 lg:py-28">
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-white/80" aria-hidden="true" />
          <span className="font-heading text-xs tracking-[0.25em] text-white uppercase sm:text-[13px]">
            Our Story
          </span>
          <span className="h-px w-10 bg-white/80" aria-hidden="true" />
        </div>

        <h1 className="mt-6 font-heading text-[36px] leading-[1.15] font-semibold text-white sm:text-[44px] lg:text-[52px]">
          About Stamford Publishers
        </h1>

        <p className="mt-5 max-w-2xl font-heading text-base leading-relaxed text-white/70 sm:text-lg lg:text-xl">
          Whether you&apos;re publishing your first book or adding to an
          established portfolio, Stamford Publishers delivers comprehensive
          publishing solutions designed around your unique goals.
        </p>
      </div>
    </section>
  );
}
