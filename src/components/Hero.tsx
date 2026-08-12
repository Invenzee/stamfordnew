import {
  Globe,
  LayoutDashboard,
  MessageCircle,
  PenLine,
  Phone,
  ShieldCheck,
  ThumbsUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import HeroBookCarousel from "@/components/HeroBookCarousel";
import LeadForm from "@/components/LeadForm";
import { routes } from "@/data/routes";

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
              <span className="font-body text-[11px] font-bold tracking-[0.2em] text-highlight uppercase">
                Stamford Publishers
              </span>
            </div>

            <h1 className="mt-5 font-heading text-[32px] leading-[1.1] font-semibold text-heading sm:text-[42px] lg:text-[58px]">
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
                Call Now
              </a>
            </div>
          </div>

          <div className="relative z-10 w-[35%] max-sm:w-full lg:justify-self-end">
            <HeroBookCarousel />

            <div className="relative z-10 overflow-hidden rounded-2xl bg-white/90 shadow-xl backdrop-blur-sm">
              <div className="bg-highlight px-6 py-5">
                <h2 className="font-body text-xl font-bold tracking-wide text-white uppercase">
                  Let&apos;s Get Started
                </h2>
                <p className="mt-1 font-body text-sm text-white/90">
                  Special Offer: Up to 30% Off
                </p>
              </div>

              <LeadForm
                source="/"
                idPrefix="hero"
                submitLabel="Start Project"
                messagePlaceholder="What's in your mind? write down."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
