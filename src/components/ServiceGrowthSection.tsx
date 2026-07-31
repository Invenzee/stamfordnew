import Image from "next/image";
import type { LucideIcon } from "lucide-react";

export type ServiceGrowthItem = {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

export type ServiceGrowthBadge = {
  top?: string;
  main: string;
  bottom?: string;
};

type ServiceGrowthSectionProps = {
  imageSrc?: string;
  imageAlt: string;
  badge: ServiceGrowthBadge;
  tagline: string;
  headingPrimary: string;
  headingSecondary: string;
  description: string;
  items: ServiceGrowthItem[];
};

export default function ServiceGrowthSection({
  imageSrc = "/cta-female.webp",
  imageAlt,
  badge,
  tagline,
  headingPrimary,
  headingSecondary,
  description,
  items,
}: ServiceGrowthSectionProps) {
  const badgeLarge = Boolean(badge.top);

  return (
    <section className="bg-about-section-bg py-16 lg:py-24">
      <div className="site-container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative mx-auto w-full max-w-[520px] lg:max-w-none">
            <div
              className="absolute top-4 left-4 h-[92%] w-[92%] rounded-[28px] border-2 border-secondary"
              aria-hidden="true"
            />

            <div className="relative h-[550px] overflow-hidden rounded-[28px] bg-black/10 shadow-lg">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={800}
                height={650}
                className="h-full w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 520px"
              />
            </div>

            <div
              className={`absolute -bottom-2 right-2 flex flex-col items-center justify-center rounded-full bg-about-badge px-3 text-center shadow-xl sm:-bottom-4 sm:right-4 ${
                badgeLarge
                  ? "h-[120px] w-[120px] sm:h-[130px] sm:w-[130px]"
                  : "h-[110px] w-[110px] sm:h-[120px] sm:w-[120px]"
              }`}
            >
              {badge.top ? (
                <span className="font-body text-[7px] font-bold tracking-wider text-white uppercase sm:text-[8px]">
                  {badge.top}
                </span>
              ) : null}
              <span className="font-heading text-lg font-bold leading-tight text-white sm:text-xl">
                {badge.main}
              </span>
              {badge.bottom ? (
                <span className="font-body text-[7px] font-bold leading-tight tracking-wider text-white uppercase sm:text-[8px]">
                  {badge.bottom}
                </span>
              ) : null}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-secondary" aria-hidden="true" />
              <span className="font-body text-[11px] font-bold tracking-[0.2em] text-highlight uppercase">
                {tagline}
              </span>
            </div>

            <h2 className="mt-5 font-heading text-[36px] leading-tight font-semibold sm:text-[42px] lg:text-[48px]">
              <span className="text-heading">{headingPrimary}</span>
              <br />
              <span className="text-highlight">{headingSecondary}</span>
            </h2>

            <p className="mt-5 font-body text-sm leading-relaxed text-black/70 sm:text-[15px]">
              {description}
            </p>

            <div className="mt-8 divide-y divide-border">
              {items.map(({ number, icon: Icon, title, description: itemDescription }) => (
                <div
                  key={number}
                  className="group relative border-l-4 border-transparent py-6 pl-0 transition-all duration-300 ease-out first:pt-0 hover:border-secondary hover:pl-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary">
                      <Icon
                        className="h-5 w-5 text-white"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-heading text-lg font-bold text-heading">
                        {title}
                      </h3>
                      <p className="mt-2 font-body text-sm leading-relaxed text-black/70 sm:text-[15px]">
                        {itemDescription}
                      </p>
                    </div>

                    <span
                      className="font-heading text-[52px] font-bold leading-none text-about-number-faint sm:text-[64px]"
                      aria-hidden="true"
                    >
                      {number}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
