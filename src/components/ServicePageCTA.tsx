import Image from "next/image";
import { MessageCircle, Phone } from "lucide-react";

type ServicePageCTAProps = {
  tagline: string;
  heading: string;
  description: string;
  imageAlt?: string;
  borderedButtons?: boolean;
};

export default function ServicePageCTA({
  tagline,
  heading,
  description,
  imageAlt = "Author proudly holding a published book",
  borderedButtons = false,
}: ServicePageCTAProps) {
  const buttonClass = borderedButtons
    ? "flex items-center gap-2.5 rounded-md border border-white/30 px-6 py-3.5 font-body text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
    : "flex items-center gap-2.5 rounded-md px-6 py-3.5 font-body text-[15px] font-semibold text-white transition-opacity hover:opacity-90";

  return (
    <section className="relative overflow-hidden bg-legacy-cta">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <svg
          className="absolute -bottom-1/4 -left-1/4 h-[140%] w-[80%]"
          viewBox="0 0 800 600"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 600 C200 400 350 350 500 200 C650 50 700 0 800 0 L0 0 Z"
            className="fill-white/[0.04]"
          />
        </svg>
        <svg
          className="absolute -right-1/4 -bottom-1/4 h-[120%] w-[70%]"
          viewBox="0 0 800 600"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M200 600 C400 200 600 100 800 0 L800 600 Z"
            className="fill-white/[0.03]"
          />
        </svg>
      </div>

      <div className="site-container relative pt-16 lg:pt-20">
        <div className="grid items-end gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col items-start pb-16 text-left lg:pb-20">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-white/80" aria-hidden="true" />
              <span className="font-body text-[11px] font-bold tracking-[0.2em] text-white/80 uppercase">
                {tagline}
              </span>
            </div>

            <h2 className="mt-5 font-heading text-[36px] leading-[1.15] font-semibold text-white sm:text-[42px] lg:text-[48px]">
              {heading}
            </h2>

            <p className="mt-5 max-w-lg font-body text-sm leading-relaxed text-white/75 sm:text-[15px]">
              {description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                className={`${buttonClass} bg-secondary`}
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Get A Quote
              </button>
              <a
                href="tel:+15625732551"
                className={`${buttonClass} bg-primary`}
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call Now
              </a>
            </div>
          </div>

          <div className="relative flex items-end justify-center lg:justify-end">
            <div className="relative w-full max-w-[480px]">
              <Image
                src="/pre-footer.webp"
                alt={imageAlt}
                width={480}
                height={560}
                className="block w-64 object-contain object-bottom"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
