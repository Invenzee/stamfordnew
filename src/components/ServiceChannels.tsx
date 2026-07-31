import type { LucideIcon } from "lucide-react";

export type ServiceChannelItem = {
  title: string;
  description: string;
  icon: LucideIcon;
  tag?: string;
};

type ServiceChannelsProps = {
  tagline: string;
  headingPrimary: string;
  headingSecondary: string;
  description?: string;
  items: ServiceChannelItem[];
};

export default function ServiceChannels({
  tagline,
  headingPrimary,
  headingSecondary,
  description,
  items,
}: ServiceChannelsProps) {
  return (
    <section className="bg-about-section-bg py-16 lg:py-24">
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

          {description ? (
            <p className="mt-4 font-body text-sm leading-relaxed text-black/70 sm:text-[15px]">
              {description}
            </p>
          ) : null}
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title, description: itemDescription, tag }) => (
            <div
              key={title}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card-warm px-7 py-8 transition-shadow duration-300 hover:shadow-lg"
            >
              <span
                className="absolute right-0 bottom-0 left-0 h-0.5 origin-left scale-x-0 bg-secondary/60 transition-transform duration-300 ease-out group-hover:scale-x-100"
                aria-hidden="true"
              />

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary">
                <Icon
                  className="h-5 w-5 text-white"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </div>

              <h3 className="mt-5 font-heading text-lg font-bold text-heading">
                {title}
              </h3>

              <p className="mt-3 flex-1 font-body text-[13px] leading-relaxed text-black/60">
                {itemDescription}
              </p>

              {tag ? (
                <span className="mt-6 font-body text-[10px] font-bold tracking-[0.15em] text-highlight uppercase">
                  {tag}
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
