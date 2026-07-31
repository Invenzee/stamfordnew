"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import {
  mainServices,
  specialtyServices,
} from "@/components/ServicesDropdown";
import { routes } from "@/data/routes";

const navLinks = [
  { label: "Home", href: routes.home },
  { label: "About Us", href: routes.about },
  { label: "Contact Us", href: routes.contact },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    setServicesOpen(false);
  };

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-10 w-10 items-center justify-center rounded-md text-black transition-colors hover:bg-black/5"
        aria-label="Open menu"
        aria-expanded={open}
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/50"
            onClick={close}
            aria-label="Close menu"
          />

          <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
              <span className="font-heading text-lg font-semibold text-black">
                Menu
              </span>
              <button
                type="button"
                onClick={close}
                className="flex h-10 w-10 items-center justify-center rounded-md text-black transition-colors hover:bg-black/5"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-5 py-6">
              <ul className="space-y-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={close}
                      className="block rounded-md px-3 py-3 font-heading text-[17px] text-black transition-colors hover:bg-black/5"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}

                <li>
                  <button
                    type="button"
                    onClick={() => setServicesOpen((current) => !current)}
                    className="flex w-full items-center justify-between rounded-md px-3 py-3 font-heading text-[17px] text-black transition-colors hover:bg-black/5"
                    aria-expanded={servicesOpen}
                  >
                    Services
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>

                  {servicesOpen && (
                    <ul className="mt-1 space-y-0.5 border-l-2 border-primary/30 pl-4">
                      {mainServices.map((service) => (
                        <li key={service.href}>
                          <Link
                            href={service.href}
                            onClick={close}
                            className="block rounded-md px-3 py-2.5 font-heading text-[15px] leading-snug text-black/80 transition-colors hover:bg-black/5 hover:text-black"
                          >
                            {service.label}
                          </Link>
                        </li>
                      ))}
                      {specialtyServices.map((service) => (
                        <li key={service.href}>
                          <Link
                            href={service.href}
                            onClick={close}
                            className="block rounded-md px-3 py-2.5 font-heading text-[15px] leading-snug text-black/80 transition-colors hover:bg-black/5 hover:text-black"
                          >
                            {service.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              </ul>
            </nav>

            <div className="space-y-3 border-t border-black/10 px-5 py-5">
              <a
                href="tel:+15625732551"
                className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 font-heading text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
              >
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                +1 562 573 2551
              </a>
              <Link
                href="/quote"
                onClick={close}
                className="flex w-full items-center justify-center rounded-md bg-primary px-4 py-3 font-heading text-[15px] font-bold tracking-wide text-white uppercase transition-opacity hover:opacity-90"
              >
                Get Quote
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
