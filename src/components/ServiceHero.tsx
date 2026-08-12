"use client";

import {
  Check,
  MessageCircle,
  Phone,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LeadForm from "@/components/LeadForm";
import { routes } from "@/data/routes";

export type ServiceHeroFeature = {
  label: string;
  icon?: LucideIcon;
};

type ServiceHeroProps = {
  tagline: string;
  heading: string;
  headingLine2?: string;
  subheading: string;
  features: ServiceHeroFeature[];
  formTitle: string;
  formSubtitle: string;
  formIdPrefix: string;
  callButtonLabel?: string;
};

export default function ServiceHero({
  tagline,
  heading,
  headingLine2,
  subheading,
  features,
  formTitle,
  formSubtitle,
  formIdPrefix,
  callButtonLabel = "Call Now",
}: ServiceHeroProps) {
  const pathname = usePathname();

  return (
    <section className="relative overflow-hidden bg-hero">
      <div className="site-container relative py-10 lg:py-14">
        <div className="flex items-start justify-between max-sm:flex-col gap-8">
          <div className="flex w-[65%] max-sm:w-full flex-col items-start text-left">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-secondary" aria-hidden="true" />
              <span className="font-body text-[11px] font-bold tracking-[0.2em] text-highlight uppercase">
                {tagline}
              </span>
            </div>

            <h1 className="mt-5 font-heading text-[32px] leading-[1.1] font-semibold text-heading sm:text-[42px] lg:text-[58px]">
              {heading}
              {headingLine2 ? (
                <>
                  { " " } {headingLine2}
                </>
              ) : null}
            </h1>

            <p className="mt-3 font-heading text-xl font-semibold text-black sm:text-2xl">
              {subheading}
            </p>

            <div className="mt-8 grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
              {features.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-lg bg-white px-4 py-3.5 shadow-sm"
                >
                  {Icon ? (
                    <Icon
                      className="h-5 w-5 shrink-0 text-secondary"
                      aria-hidden="true"
                    />
                  ) : (
                    <span
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary"
                      aria-hidden="true"
                    >
                      <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                    </span>
                  )}
                  <span className="font-heading text-[15px] leading-snug text-black">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={routes.contact}
                className="btn btn-primary btn-md"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Get A Quote
              </Link>
              <a
                href="tel:+15625732551"
                className="btn btn-secondary btn-md"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {callButtonLabel}
              </a>
            </div>
          </div>

          <div className="relative z-10 w-[35%] max-sm:w-full lg:justify-self-end">
            <div className="relative z-10 overflow-hidden rounded-2xl bg-white/90 shadow-xl backdrop-blur-sm">
              <div className="bg-highlight px-6 py-5">
                <h2 className="font-body text-xl font-bold tracking-wide text-white uppercase">
                  {formTitle}
                </h2>
                <p className="mt-1 font-body text-sm text-white/90">
                  {formSubtitle}
                </p>
              </div>

              <LeadForm
                source={pathname}
                idPrefix={formIdPrefix}
                submitLabel="Get Started Today"
                emailLabel="Email Address"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
