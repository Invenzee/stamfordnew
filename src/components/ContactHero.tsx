export default function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-contact-hero">
      <div className="site-container relative flex flex-col items-center py-20 text-center sm:py-24 lg:py-28">
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-white/80" aria-hidden="true" />
          <span className="font-heading text-xs tracking-[0.25em] text-white uppercase sm:text-[13px]">
            Connect With Us
          </span>
          <span className="h-px w-10 bg-white/80" aria-hidden="true" />
        </div>

        <h1 className="mt-6 font-heading text-[36px] leading-[1.15] font-semibold text-white sm:text-[44px] lg:text-[52px]">
          Get In Touch
        </h1>

        <p className="mt-5 max-w-2xl font-heading text-base leading-relaxed text-white/70 sm:text-lg lg:text-xl">
          Have questions about publishing your book? Our team of publishing
          specialists is ready to provide clear guidance and help you take the
          next step in your publishing journey with confidence.
        </p>
      </div>
    </section>
  );
}
