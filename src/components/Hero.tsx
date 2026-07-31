import {
  Check,
  ChevronDown,
  Globe,
  LayoutDashboard,
  Mail,
  MessageCircle,
  MessageSquare,
  PenLine,
  Phone,
  ShieldCheck,
  ThumbsUp,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import HeroBookCarousel from "@/components/HeroBookCarousel";

const features = [
  { icon: ThumbsUp, label: "Client Satisfaction Guaranteed" },
  { icon: Users, label: "Expert Author Support" },
  { icon: LayoutDashboard, label: "Personalized Client Dashboard" },
  { icon: Globe, label: "Global Book Distribution" },
  { icon: PenLine, label: "Professional Editing & Design" },
  { icon: ShieldCheck, label: "100% Author Ownership" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero">
      <div className="h-0.5 w-full bg-secondary" />

      <div className="site-container relative py-10 lg:py-14">
        <div className="flex items-start justify-between max-sm:flex-col gap-8">
          <div className="flex w-[65%] max-sm:w-full flex-col items-start text-left">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-secondary" aria-hidden="true" />
              <span className="font-body text-[11px] font-bold tracking-[0.2em] text-secondary uppercase">
                Stamford Publishers
              </span>
            </div>

            <h1 className="mt-5 font-heading text-[32px] leading-[1.1] font-semibold text-primary sm:text-[42px] lg:text-[58px]">
              Begin Your Publishing Journey
              with Stamford Publishers
            </h1>

            <p className="mt-3 font-body text-base leading-relaxed text-black/80 sm:text-lg">
              Whether you&apos;re publishing your first book or adding to an
              established portfolio, Stamford Publishers delivers comprehensive
              publishing solutions designed around your unique goals, guiding you
              through every stage of the publishing process with expert support
              and personalized service.
            </p>

            <div className="mt-8 grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
              {features.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-lg bg-muted px-4 py-3.5 shadow-sm"
                >
                  <Icon
                    className="h-5 w-5 shrink-0 text-secondary"
                    aria-hidden="true"
                  />
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
                Call Now
              </a>
            </div>
          </div>

          <div className="relative z-10 w-[35%] max-sm:w-full lg:justify-self-end">
            <HeroBookCarousel />

            <div className="relative z-10 overflow-hidden rounded-2xl bg-white/90 shadow-xl backdrop-blur-sm">
              <div className="bg-primary px-6 py-5">
                <h2 className="font-body text-xl font-bold tracking-wide text-white uppercase">
                  Let&apos;s Get Started
                </h2>
                <p className="mt-1 font-body text-sm text-white/90">
                  Special Offer: Up to 30% Off
                </p>
              </div>

              <form className="space-y-4 px-6 py-5">
                <div>
                  <label
                    htmlFor="hero-full-name"
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
                      id="hero-full-name"
                      type="text"
                      placeholder="Your full name"
                      className="w-full rounded-lg border border-border bg-white py-2.5 pr-3 pl-10 font-body text-sm text-black placeholder:text-black/40 focus:border-secondary focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="hero-email"
                    className="mb-1.5 block font-body text-xs font-bold text-black"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-black/40"
                      aria-hidden="true"
                    />
                    <input
                      id="hero-email"
                      type="email"
                      placeholder="Your email address"
                      className="w-full rounded-lg border border-border bg-white py-2.5 pr-3 pl-10 font-body text-sm text-black placeholder:text-black/40 focus:border-secondary focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="hero-phone"
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
                      id="hero-phone"
                      type="tel"
                      placeholder="Your phone number"
                      className="w-full rounded-lg border border-border bg-white py-2.5 pr-3 pl-[4.5rem] font-body text-sm text-black placeholder:text-black/40 focus:border-secondary focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="hero-message"
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
                      id="hero-message"
                      rows={4}
                      placeholder="What's in your mind? write down."
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
                      <Link href="/terms-of-service" className="text-secondary underline">
                        Terms &amp; Conditions
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy-policy" className="text-secondary underline">
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
                      By submitting, you consent to receive SMS notifications,
                      alerts &amp; occasional marketing communication from
                      Stamford Publishers. Message frequency varies. Message
                      &amp; data rates may apply. You can reply STOP to
                      unsubscribe at any time.
                    </span>
                  </label>
                  <p className="font-body text-[9px] leading-relaxed text-black/50">
                    Please check the box to communicate via SMS or email. Carrier
                    charges may apply for SMS. Reply STOP or UNSUBSCRIBE to stop
                    at any time.
                  </p>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-submit"
                >
                  <Check className="h-4 w-4" aria-hidden="true" />
                  Start Project
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
