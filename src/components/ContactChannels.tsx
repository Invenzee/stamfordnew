import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import LeadForm from "@/components/LeadForm";

const channels = [
  {
    number: "01",
    icon: MapPin,
    title: "Our Headquarters",
    lines: ["1001 Wilshire Boulevard #1439", "Los Angeles, CA 90017"],
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
              <span className="font-body text-[11px] font-bold tracking-[0.2em] text-highlight uppercase">
                Information
              </span>
            </div>

            <h2 className="mt-5 font-heading text-[36px] leading-tight font-semibold sm:text-[42px] lg:text-[48px]">
              <span className="text-heading">Direct</span>{" "}
              <span className="text-highlight">Channels</span>
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
                    <h3 className="font-body text-base font-bold text-heading">
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

            <LeadForm
              source="/contact-us"
              idPrefix="contact"
              submitLabel="Get Started Today"
              emailLabel="Email Address"
              className="mt-6 space-y-4"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
