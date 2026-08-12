"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import LeadForm from "@/components/LeadForm";

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

        <div className="bg-highlight px-6 py-5 pr-14">
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

        <LeadForm
          source="/popup"
          idPrefix="popup"
          submitLabel="Get Started Today"
        />
      </div>
    </div>
  );
}
