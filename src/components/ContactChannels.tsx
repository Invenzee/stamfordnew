import {
  Check,
  ChevronDown,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  User,
} from "lucide-react";
import Link from "next/link";

const channels = [
  {
    number: "01",
    icon: MapPin,
    title: "Our Headquarters",
    lines: ["515 Camino Del Rio S #318", "San Diego, California, 92108"],
  },
  {
    number: "02",
    icon: Phone,
    title: "Direct Line",
    lines: ["+1 562 573 2551"],
    href: "tel:+15625732551",
  },
  {
    number: "03",
    icon: Mail,
    title: "Inquiry Email",
    lines: ["info@stamfordpublishers.com"],
    href: "mailto:info@stamfordpublishers.com",
  },
];

export default function ContactChannels() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="site-container">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — Direct Channels */}
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-secondary" aria-hidden="true" />
              <span className="font-body text-[11px] font-bold tracking-[0.2em] text-secondary uppercase">
                Information
              </span>
            </div>

            <h2 className="mt-5 font-heading text-[36px] leading-tight font-semibold sm:text-[42px] lg:text-[48px]">
              <span className="text-primary">Direct</span>{" "}
              <span className="text-secondary">Channels</span>
            </h2>

            <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-black/60 sm:text-[15px]">
              Stamford Publishers is available to discuss your publishing goals.
              Reach out through any of the channels below and we&apos;ll respond
              promptly with personalized guidance.
            </p>

            <div className="mt-10 divide-y divide-border">
              {channels.map(({ number, icon: Icon, title, lines, href }) => (
                <div
                  key={number}
                  className="group flex items-center gap-5 border-l-4 border-l-transparent py-7 pl-4 transition-colors first:pt-0 hover:border-l-secondary"
                >
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary"
                  >
                    <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-body text-base font-bold text-primary">
                      {title}
                    </h3>
                    {lines.map((line) =>
                      href ? (
                        <a
                          key={line}
                          href={href}
                          className="mt-1 block font-body text-sm text-black/70 transition-colors hover:text-secondary"
                        >
                          {line}
                        </a>
                      ) : (
                        <p
                          key={line}
                          className="mt-1 font-body text-sm text-black/70"
                        >
                          {line}
                        </p>
                      ),
                    )}
                  </div>

                  <span
                    className="font-heading text-[48px] font-bold leading-none text-black/[0.06] sm:text-[56px]"
                    aria-hidden="true"
                  >
                    {number}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Contact Form */}
          <div className="rounded-2xl border border-border/60 bg-white p-6 shadow-lg sm:p-8">
            <h2 className="font-heading text-2xl font-semibold text-black sm:text-[28px]">
              Send Us A Message
            </h2>
            <p className="mt-2 font-body text-sm leading-relaxed text-black/60">
              Fill out the form below and one of Stamford Publishers&apos;
              publishing specialists will get back to you within 24 hours.
            </p>

            <form className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="contact-full-name"
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
                    id="contact-full-name"
                    type="text"
                    placeholder="Your full name"
                    className="w-full rounded-lg border border-border bg-white py-2.5 pr-3 pl-10 font-body text-sm text-black placeholder:text-black/40 focus:border-secondary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-email"
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
                    id="contact-email"
                    type="email"
                    placeholder="Your email address"
                    className="w-full rounded-lg border border-border bg-white py-2.5 pr-3 pl-10 font-body text-sm text-black placeholder:text-black/40 focus:border-secondary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-phone"
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
                    id="contact-phone"
                    type="tel"
                    placeholder="Your phone number"
                    className="w-full rounded-lg border border-border bg-white py-2.5 pr-3 pl-[4.5rem] font-body text-sm text-black placeholder:text-black/40 focus:border-secondary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
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
                    id="contact-message"
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
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3.5 font-body text-sm font-bold tracking-wide text-white uppercase transition-opacity hover:opacity-90"
              >
                <Check className="h-4 w-4" aria-hidden="true" />
                Get Started Today
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
