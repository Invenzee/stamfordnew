import Image from "next/image";
import Link from "next/link";
import { ChevronRight, MessageCircle, Phone, Share2 } from "lucide-react";
import { routes } from "@/data/routes";

const companyLinks = [
  { label: "Home", href: routes.home },
  { label: "About Us", href: routes.about },
  { label: "Contact Us", href: routes.contact },
];

const serviceLinks = [
  { label: "Book Publishing Services", href: routes.services.publishing },
  { label: "Book Marketing Services", href: routes.services.marketing },
  { label: "Audiobook Services", href: routes.services.audiobook },
  { label: "Childrens Book Publishing", href: routes.services.childrensBooks },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-of-service" },
];

function FooterLinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="font-heading text-xl font-semibold text-white">{title}</h3>
      <div
        className="mt-3 h-1 w-14 bg-footer-heading-line"
        aria-hidden="true"
      />
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-1.5 font-body text-sm text-white/85 transition-colors hover:text-white"
            >
              <ChevronRight
                className="h-3.5 w-0 shrink-0 overflow-hidden text-secondary opacity-0 transition-all duration-200 group-hover:w-3.5 group-hover:opacity-100"
                aria-hidden="true"
              />
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-footer-gradient text-white">
      <div className="site-container py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt=""
                width={48}
                height={48}
                className="h-12 w-12 brightness-0 invert"
              />
              <div className="flex flex-col leading-none">
                <span className="font-heading text-lg font-semibold tracking-wide text-white">
                  STAMFORD
                </span>
                <span className="mt-1 font-body text-[8px] font-bold tracking-[0.35em] text-white/80">
                  PUBLISHERS
                </span>
              </div>
            </Link>

            <p className="mt-6 max-w-sm font-body text-sm leading-relaxed text-white/80">
              Since 2014, Stamford Publishers has provided professional writing
              and marketing support to authors, offering a smooth process from
              initial concept to final promotion. Our team combines creativity,
              strategy, and publishing expertise to help authors bring their
              ideas to life.
            </p>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:border-white hover:bg-white/10"
              aria-label="Visit us on Facebook"
            >
              <Share2 className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <FooterLinkColumn title="Quick Links" links={companyLinks} />

          <FooterLinkColumn title="Services" links={serviceLinks} />

          <div className="rounded-2xl border border-white/10 bg-black/25 p-6 sm:col-span-2 lg:col-span-1">
            <h3 className="font-heading text-xl font-semibold text-white">
              Start Your Journey
            </h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-white/75">
              Connect with a consultant to discuss your manuscript today.
            </p>

            <div className="mt-6 space-y-3">
              <a
                href="tel:+15625732551"
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/30 bg-footer-cta-call px-4 py-3.5 font-heading text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                +1 562 573 2551
              </a>
              <Link
                href={routes.contact}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/30 bg-footer-cta-chat px-4 py-3.5 font-heading text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                Live Chat
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="site-container flex flex-col gap-4 py-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-3xl font-body text-xs leading-relaxed text-white/60">
            Copyright &copy; 2026 - Stamford Publishers | All rights reserved
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-body text-xs text-white/70 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
