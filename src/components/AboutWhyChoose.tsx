const features = [
  {
    number: "01",
    title: "Client Satisfaction Guaranteed",
    description:
      "Comprehensive publishing solutions tailored to your goals, with support you can count on at every stage.",
  },
  {
    number: "02",
    title: "100% Author Ownership",
    description:
      "You retain full ownership of your work, your rights, and your royalties.",
  },
  {
    number: "03",
    title: "Expert Author Support",
    description:
      "Personalized guidance from publishing specialists who understand your vision and timeline.",
  },
];

export default function AboutWhyChoose() {
  return (
    <section className="bg-about-section-bg py-16 lg:py-24">
      <div className="site-container">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-secondary" aria-hidden="true" />
            <span className="font-body text-[11px] font-bold tracking-[0.2em] text-secondary uppercase">
              What Sets Us Apart
            </span>
            <span className="h-px w-10 bg-secondary" aria-hidden="true" />
          </div>

          <h2 className="mt-5 font-heading text-[36px] leading-tight font-semibold sm:text-[42px] lg:text-[48px]">
            <span className="text-primary">Why Choose</span>{" "}
            <span className="text-secondary">Stamford Publishers</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map(({ number, title, description }) => (
            <div
              key={number}
              className="rounded-2xl border border-border/60 border-l-4 border-l-transparent bg-white p-8 shadow-sm transition-all duration-300 ease-out hover:scale-105 hover:border-l-secondary hover:shadow-lg"
            >
              <span
                className="font-heading text-[56px] font-bold leading-none text-accent-gold/70 sm:text-[64px]"
                aria-hidden="true"
              >
                {number}
              </span>

              <h3 className="mt-4 font-heading text-xl font-bold text-primary">
                {title}
              </h3>

              <p className="mt-3 font-heading text-sm leading-relaxed text-black/70 sm:text-[15px]">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
