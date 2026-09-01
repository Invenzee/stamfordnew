import type { Metadata } from "next";
import ManuscriptForm from "@/components/ManuscriptForm";

export const metadata: Metadata = {
  title: "Submit Your Manuscript | Stamford Publishers",
  description:
    "Submit your manuscript to Stamford Publishers. Share your author details, book information, and draft so our publishing specialists can review your project.",
};

export default function SubmitManuscriptPage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="relative overflow-hidden bg-contact-hero">
        <div className="site-container relative flex flex-col items-center py-16 text-center sm:py-20 lg:py-24">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-white/80" aria-hidden="true" />
            <span className="font-heading text-xs tracking-[0.25em] text-white uppercase sm:text-[13px]">
              Author Submissions
            </span>
            <span className="h-px w-10 bg-white/80" aria-hidden="true" />
          </div>

          <h1 className="mt-6 font-heading text-[36px] leading-[1.15] font-semibold text-white sm:text-[44px] lg:text-[52px]">
            Submit Your Manuscript
          </h1>

          <p className="mt-5 max-w-2xl font-heading text-base leading-relaxed text-white/70 sm:text-lg">
            Send us your author details, book information, and current draft.
            A publishing specialist will review your submission and follow up
            with clear next steps.
          </p>
        </div>
      </section>

      <section className="bg-about-section-bg py-14 lg:py-20">
        <div className="site-container">
          <div className="mx-auto max-w-4xl">
            <ManuscriptForm />
          </div>
        </div>
      </section>
    </main>
  );
}
