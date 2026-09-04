"use client";

import { useEffect } from "react";
import LeadForm from "./LeadForm";

type PricingPopupProps = {
  open: boolean;
  plan: string | null;
  onClose: () => void;
};

export default function PricingPopup({ open, plan, onClose }: PricingPopupProps) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open || !plan) return null;

  return (
    <div className="sp-modal" role="dialog" aria-modal="true" aria-labelledby="sp-modal-title">
      <button type="button" className="sp-modal-backdrop" aria-label="Close pricing form" onClick={onClose} />
      <div className="sp-modal-card form-card">
        <button type="button" className="sp-modal-close" onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <span className="form-flag">30% off this month</span>
        <p className="sp-modal-plan">Selected plan: <b>{plan}</b></p>
        <h2 id="sp-modal-title">Get pricing for {plan}</h2>
        <p>
          Send us what you have. An editor reads it and calls you within one business day with an
          honest opinion and a costed plan for the {plan} package.
        </p>
        <LeadForm
          idPrefix="pricing"
          selectedPlan={plan}
          submitLabel="Get my pricing quote"
          compact
        />
      </div>
    </div>
  );
}
