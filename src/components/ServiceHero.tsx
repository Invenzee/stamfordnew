import {
  Check,
  ChevronDown,
  Mail,
  MessageCircle,
  MessageSquare,
  Phone,
  User,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

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
  return (
    <section className="relative overflow-hidden bg-hero">
      <div className="site-container relative py-10 lg:py-14">
        <div className="flex items-start justify-between max-sm:flex-col gap-8">
          <div className="flex w-[65%] max-sm:w-full flex-col items-start text-left">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-secondary" aria-hidden="true" />
              <span className="font-body text-[11px] font-bold tracking-[0.2em] text-secondary uppercase">
                {tagline}
              </span>
            </div>

            <h1 className="mt-5 font-heading text-[32px] leading-[1.1] font-semibold text-primary sm:text-[42px] lg:text-[58px]">
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
              <button
                type="button"
                className="btn btn-secondary btn-md"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Live Chat
              </button>
              <a
                href="tel:+15625732551"
                className="btn btn-primary btn-md"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {callButtonLabel}
              </a>
            </div>
          </div>

          <div className="relative z-10 w-[35%] max-sm:w-full lg:justify-self-end">
            <div className="relative z-10 overflow-hidden rounded-2xl bg-white/90 shadow-xl backdrop-blur-sm">
              <div className="bg-primary px-6 py-5">
                <h2 className="font-body text-xl font-bold tracking-wide text-white uppercase">
                  {formTitle}
                </h2>
                <p className="mt-1 font-body text-sm text-white/90">
                  {formSubtitle}
                </p>
              </div>

              <form className="space-y-4 px-6 py-5">
                <div>
                  <label
                    htmlFor={`${formIdPrefix}-full-name`}
                    className="mb-1.5 block font-body text-xs font-bold text-black"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <User
                      className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-black/40"
                      aria-hidden="true"
                    />
                    <input
                      id={`${formIdPrefix}-full-name`}
                      type="text"
                      placeholder="Your full name"
                      className="w-full rounded-lg border border-border bg-white py-2.5 pr-3 pl-10 font-body text-sm text-black placeholder:text-black/40 focus:border-secondary focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor={`${formIdPrefix}-email`}
                    className="mb-1.5 block font-body text-xs font-bold text-black"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-black/40"
                      aria-hidden="true"
                    />
                    <input
                      id={`${formIdPrefix}-email`}
                      type="email"
                      placeholder="Your email address"
                      className="w-full rounded-lg border border-border bg-white py-2.5 pr-3 pl-10 font-body text-sm text-black placeholder:text-black/40 focus:border-secondary focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor={`${formIdPrefix}-phone`}
                    className="mb-1.5 block font-body text-xs font-bold text-black"
                  >
                    Phone Number
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3 flex items-center gap-1">
                      <span className="text-base leading-none" aria-hidden="true">
                        🇵🇰
                      </span>
                      <ChevronDown
                        className="h-3 w-3 text-black/40"
                        aria-hidden="true"
                      />
                    </div>
                    <Phone
                      className="absolute top-1/2 left-14 h-4 w-4 -translate-y-1/2 text-black/40"
                      aria-hidden="true"
                    />
                    <input
                      id={`${formIdPrefix}-phone`}
                      type="tel"
                      placeholder="Your phone number"
                      className="w-full rounded-lg border border-border bg-white py-2.5 pr-3 pl-[4.5rem] font-body text-sm text-black placeholder:text-black/40 focus:border-secondary focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor={`${formIdPrefix}-message`}
                    className="mb-1.5 block font-body text-xs font-bold text-black"
                  >
                    Message
                  </label>
                  <div className="relative">
                    <MessageSquare
                      className="absolute top-3 left-3 h-4 w-4 text-black/40"
                      aria-hidden="true"
                    />
                    <textarea
                      id={`${formIdPrefix}-message`}
                      rows={4}
                      placeholder="Tell us about your project"
                      className="w-full resize-none rounded-lg border border-border bg-white py-2.5 pr-3 pl-10 font-body text-sm text-black placeholder:text-black/40 focus:border-secondary focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2.5 pt-1">
                  <label className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-primary"
                    />
                    <span className="font-body text-[10px] leading-relaxed text-black/70">
                      I agree to the{" "}
                      <Link href="/terms" className="text-secondary underline">
                        Terms &amp; Conditions
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-secondary underline">
                        Privacy Policy
                      </Link>
                      .
                    </span>
                  </label>
                  <label className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-primary"
                    />
                    <span className="font-body text-[10px] leading-relaxed text-black/70">
                      I consent to receive SMS messages and phone calls regarding
                      my inquiry. Message and data rates may apply.
                    </span>
                  </label>
                  <p className="font-body text-[9px] leading-relaxed text-black/50">
                    By submitting this form, you agree to receive recurring
                    automated promotional and personalized marketing text
                    messages. Consent is not a condition of purchase. Reply STOP
                    to unsubscribe.
                  </p>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-submit"
                >
                  <Check className="h-4 w-4" aria-hidden="true" />
                  Get Started Today
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
