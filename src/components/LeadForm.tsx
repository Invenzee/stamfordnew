"use client";

import { Check, Mail, MessageSquare, Phone, User } from "lucide-react";
import Link from "next/link";
import { handleLeadFormSubmit } from "@/lib/submit-form";

type LeadFormProps = {
  source: string;
  idPrefix: string;
  submitLabel: string;
  emailLabel?: string;
  messagePlaceholder?: string;
  className?: string;
};

export default function LeadForm({
  source,
  idPrefix,
  submitLabel,
  emailLabel = "Email",
  messagePlaceholder = "Tell us about your project",
  className = "space-y-4 px-6 py-5",
}: LeadFormProps) {
  return (
    <form
      onSubmit={(event) => handleLeadFormSubmit(event, source)}
      className={className}
    >
      <div>
        <label
          htmlFor={`${idPrefix}-full-name`}
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
            id={`${idPrefix}-full-name`}
            name="name"
            type="text"
            required
            placeholder="Your full name"
            className="w-full rounded-lg border border-border bg-white py-2.5 pr-3 pl-10 font-body text-sm text-black placeholder:text-black/40 focus:border-secondary focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor={`${idPrefix}-email`}
          className="mb-1.5 block font-body text-xs font-bold text-black"
        >
          {emailLabel}
        </label>
        <div className="relative">
          <Mail
            className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-black/40"
            aria-hidden="true"
          />
          <input
            id={`${idPrefix}-email`}
            name="email"
            type="email"
            required
            placeholder="Your email address"
            className="w-full rounded-lg border border-border bg-white py-2.5 pr-3 pl-10 font-body text-sm text-black placeholder:text-black/40 focus:border-secondary focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor={`${idPrefix}-phone`}
          className="mb-1.5 block font-body text-xs font-bold text-black"
        >
          Phone Number
        </label>
        <div className="relative">
          <Phone
            className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-black/40"
            aria-hidden="true"
          />
          <input
            id={`${idPrefix}-phone`}
            name="phone"
            type="tel"
            required
            placeholder="Your phone number"
            className="w-full rounded-lg border border-border bg-white py-2.5 pr-3 pl-10 font-body text-sm text-black placeholder:text-black/40 focus:border-secondary focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor={`${idPrefix}-message`}
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
            id={`${idPrefix}-message`}
            name="message"
            required
            rows={4}
            placeholder={messagePlaceholder}
            className="w-full resize-none rounded-lg border border-border bg-white py-2.5 pr-3 pl-10 font-body text-sm text-black placeholder:text-black/40 focus:border-secondary focus:outline-none"
          />
        </div>
      </div>

      <div className="space-y-2.5 pt-1">
        <label className="flex items-start gap-2">
          <input
            type="checkbox"
            name="agree_terms"
            required
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
            name="sms_consent"
            value="yes"
            className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-primary"
          />
          <span className="font-body text-[10px] leading-relaxed text-black/70">
            By submitting, you consent to receive SMS notifications, alerts
            &amp; occasional marketing communication from Stamford Publishers.
            Message frequency varies. Message &amp; data rates may apply. You
            can reply STOP to unsubscribe at any time.
          </span>
        </label>
      </div>

      <button type="submit" className="btn btn-primary btn-submit">
        <Check className="h-4 w-4" aria-hidden="true" />
        {submitLabel}
      </button>
    </form>
  );
}
