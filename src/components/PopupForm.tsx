"use client";

import {
  Check,
  ChevronDown,
  Mail,
  MessageSquare,
  Phone,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const POPUP_DELAY_MS = 2000;

export default function PopupForm() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsOpen(true), POPUP_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-form-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        aria-label="Close popup"
        onClick={() => setIsOpen(false)}
      />

      <div className="relative z-10 max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
          aria-label="Close"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="bg-primary px-6 py-5 pr-14">
          <h2
            id="popup-form-title"
            className="font-body text-xl font-bold tracking-wide text-white uppercase"
          >
            Let&apos;s Get Started
          </h2>
          <p className="mt-1 font-body text-sm text-white/90">
            Special Offer: Up to 30% Off
          </p>
        </div>

        <form className="space-y-4 px-6 py-5">
          <div>
            <label
              htmlFor="popup-full-name"
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
                id="popup-full-name"
                type="text"
                placeholder="Your full name"
                className="w-full rounded-lg border border-border bg-white py-2.5 pr-3 pl-10 font-body text-sm text-black placeholder:text-black/40 focus:border-secondary focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="popup-email"
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
                id="popup-email"
                type="email"
                placeholder="Your email address"
                className="w-full rounded-lg border border-border bg-white py-2.5 pr-3 pl-10 font-body text-sm text-black placeholder:text-black/40 focus:border-secondary focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="popup-phone"
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
                id="popup-phone"
                type="tel"
                placeholder="Your phone number"
                className="w-full rounded-lg border border-border bg-white py-2.5 pr-3 pl-[4.5rem] font-body text-sm text-black placeholder:text-black/40 focus:border-secondary focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="popup-message"
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
                id="popup-message"
                rows={3}
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
                <Link
                  href="/terms-of-service"
                  className="text-secondary underline"
                >
                  Terms &amp; Conditions
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy-policy"
                  className="text-secondary underline"
                >
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
                By submitting, you consent to receive SMS notifications, alerts
                &amp; occasional marketing communication from Stamford
                Publishers. Message frequency varies. Message &amp; data rates
                may apply. You can reply STOP to unsubscribe at any time.
              </span>
            </label>
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
  );
}
