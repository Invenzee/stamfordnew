"use client";

import { useState } from "react";
import { submitLeadFormData } from "@/lib/submit-form";
import { PHONE_CONVERSION_NUMBER, PHONE_HREF } from "@/lib/google-ads";

const GENRES = [
  "Memoir or biography",
  "Business and leadership",
  "Self-help and personal development",
  "Fiction, any sub-genre",
  "Children's or young adult",
  "Health and medical",
  "Faith and spirituality",
  "Poetry",
  "Education and research",
  "Other",
];

const STAGES = [
  "Just an idea, nothing written",
  "Partly written",
  "Complete first draft",
  "Edited and ready to publish",
  "Already published, needs marketing",
];

type LeadFormProps = {
  idPrefix: string;
  selectedPlan?: string | null;
  submitLabel?: string;
  compact?: boolean;
};

export default function LeadForm({
  idPrefix,
  selectedPlan = null,
  submitLabel = "Send my manuscript details",
  compact = false,
}: LeadFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);

    const form = e.currentTarget;
    const fd = new FormData(form);

    if (String(fd.get("company") || "")) return;

    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const genre = String(fd.get("genre") || "").trim();
    const stage = String(fd.get("stage") || "").trim();

    const nextErrors: Record<string, boolean> = {
      name: !name,
      email: !email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email),
      phone: !phone,
      genre: !genre,
      stage: !stage,
    };
    setFieldErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    setSubmitting(true);

    const planLine = selectedPlan ? `Selected package: ${selectedPlan}` : null;
    const message = [planLine, `Current stage: ${stage}`].filter(Boolean).join(" | ");

    try {
      await submitLeadFormData(
        {
          name,
          email,
          phone,
          genre,
          stage,
          message,
          plan: selectedPlan || undefined,
        },
        selectedPlan
          ? `/self-publishing/lp | ${selectedPlan}`
          : "/self-publishing/lp",
      );
    } catch {
      setError(true);
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <input type="hidden" name="source" value="lp-self-publishing" />
      {selectedPlan ? <input type="hidden" name="plan" value={selectedPlan} /> : null}

      <div className={`fld${fieldErrors.name ? " bad" : ""}`}>
        <label htmlFor={`${idPrefix}-name`}>Full name</label>
        <input
          id={`${idPrefix}-name`}
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Alex Moreno"
        />
      </div>

      <div className="fld-row">
        <div className={`fld${fieldErrors.email ? " bad" : ""}`}>
          <label htmlFor={`${idPrefix}-email`}>Email</label>
          <input
            id={`${idPrefix}-email`}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@email.com"
          />
        </div>
        <div className={`fld${fieldErrors.phone ? " bad" : ""}`}>
          <label htmlFor={`${idPrefix}-phone`}>Phone</label>
          <input
            id={`${idPrefix}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(562) 555 0134"
          />
        </div>
      </div>

      <div className={`fld${fieldErrors.genre ? " bad" : ""}`}>
        <label htmlFor={`${idPrefix}-genre`}>Book genre</label>
        <select id={`${idPrefix}-genre`} name="genre" defaultValue="">
          <option value="">Select genre</option>
          {GENRES.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      <div className={`fld${fieldErrors.stage ? " bad" : ""}`}>
        <label htmlFor={`${idPrefix}-stage`}>Current stage</label>
        <select id={`${idPrefix}-stage`} name="stage" defaultValue="">
          <option value="">Select stage</option>
          {STAGES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: -9999 }}
        defaultValue=""
      />

      <button className="btn btn-navy btn-block" type="submit" disabled={submitting}>
        {submitting ? "Sending..." : submitLabel}
      </button>

      <p className={`form-note${compact ? " form-note-compact" : ""}`}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
        All enquiries are confidential. No spam, no reselling.
      </p>

      {error ? (
        <p className="form-ok form-err" role="alert" style={{ display: "block" }}>
          That did not go through. Please call{" "}
          <a href={PHONE_HREF}>{PHONE_CONVERSION_NUMBER}</a> and we will take your details over
          the phone.
        </p>
      ) : null}
    </form>
  );
}
