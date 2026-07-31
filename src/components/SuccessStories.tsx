import Image from "next/image";
import { Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import { routes } from "@/data/routes";

export default function SuccessStories() {
  return (
    <section className="relative overflow-hidden bg-legacy-cta">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
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
                Free Consultation
              </span>
            </div>

            <h2 className="mt-5 font-heading text-[36px] leading-[1.15] font-semibold text-white sm:text-[42px] lg:text-[48px]">
              Book a Free Consultation with Book Publishing Experts
            </h2>

            <p className="mt-5 max-w-lg font-body text-sm leading-relaxed text-white/75 sm:text-[15px]">
              Have questions about publishing your book? Want to see how our
              services can support your goals? Schedule a free consultation with
              one of Stamford Publishers&apos; publishing specialists.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={routes.contact}
                className="btn btn-secondary btn-md btn-on-dark"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Get A Quote
              </Link>
              <Link
                href={routes.contact}
                className="btn btn-primary btn-md btn-on-dark"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Contact Us
              </Link>
            </div>
          </div>

          <div className="relative flex items-end justify-center lg:justify-end">
            <div className="relative w-full max-w-[480px]">
              <Image
                src="/cta-female.webp"
                alt="Author holding a published book"
                width={480}
                height={560}
                className="block h-auto w-full object-contain object-bottom"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
