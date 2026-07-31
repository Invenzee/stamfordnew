import {
  FileCheck,
  FileDiff,
  MessageSquare,
  NotebookPen,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

const deliverables = [
  {
    icon: FileDiff,
    title: "Tracked Changes Document",
    description:
      "Full visibility into every edit made, with explanatory notes for significant structural changes.",
    tag: "INCLUDED",
  },
  {
    icon: NotebookPen,
    title: "Style Sheet & Guide",
    description:
      "A custom reference document capturing your manuscript's unique spelling, terminology, and style decisions.",
    tag: "INCLUDED",
  },
  {
    icon: FileCheck,
    title: "Clean Final Manuscript",
    description:
      "A publication-ready version with all edits accepted and formatting standardised for submission.",
    tag: "INCLUDED",
  },
  {
    icon: MessageSquare,
    title: "Editor's Letter",
    description:
      "A personalised summary of key findings, strengths, and recommended next steps for your manuscript.",
    tag: "PREMIUM",
  },
  {
    icon: RefreshCw,
    title: "Revision Rounds",
    description:
      "Collaborative back-and-forth sessions to refine your manuscript until every detail meets your vision.",
    tag: "INCLUDED",
  },
  {
    icon: ShieldCheck,
    title: "Plagiarism Report",
    description:
      "A comprehensive originality scan ensuring your work is authentic and ready for professional publication.",
    tag: "PREMIUM",
  },
];

export default function EditingKeyDeliverables() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="site-container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-secondary" aria-hidden="true" />
            <span className="font-body text-[11px] font-bold tracking-[0.2em] text-secondary uppercase">
              What You Receive
            </span>
            <span className="h-px w-8 bg-secondary" aria-hidden="true" />
          </div>

          <h2 className="mt-5 font-heading text-[36px] leading-tight font-semibold sm:text-[42px] lg:text-[48px]">
            <span className="text-primary">Key</span>{" "}
            <span className="text-secondary">Deliverables</span>
          </h2>

          <p className="mt-4 font-heading text-sm leading-relaxed text-black/70 sm:text-[15px]">
            Every editing package includes a comprehensive suite of professional
            outputs.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {deliverables.map(({ icon: Icon, title, description, tag }) => (
            <div
              key={title}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card-warm px-7 py-8 transition-shadow duration-300 hover:shadow-lg"
            >
              <span
                className="absolute right-0 bottom-0 left-0 h-0.5 origin-left scale-x-0 bg-secondary/60 transition-transform duration-300 ease-out group-hover:scale-x-100"
                aria-hidden="true"
              />

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary">
                <Icon
                  className="h-5 w-5 text-white"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </div>

              <h3 className="mt-5 font-heading text-lg font-bold text-primary">
                {title}
              </h3>

              <p className="mt-3 flex-1 font-heading text-[13px] leading-relaxed text-black/60">
                {description}
              </p>

              <span className="mt-6 font-body text-[10px] font-bold tracking-[0.15em] text-secondary uppercase">
                {tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
