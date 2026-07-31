import { ArrowRight, Check, X } from "lucide-react";

const beforeText =
  "The old house was really big and it had been there for a very long time. Sarah walked slowly through the door and she could smell something that was really weird. She didn't know what it was but it made her feel nervous and scared about being there all alone in the dark rooms of the house.";

const afterHighlights = [
  { text: "The ", highlight: false },
  { text: "Victorian manor loomed", highlight: true },
  { text: " against the grey sky, its weathered facade ", highlight: false },
  { text: "bearing the scars of a century", highlight: true },
  { text: ". Sarah ", highlight: false },
  { text: "stepped across the threshold", highlight: true },
  { text: ", and an ", highlight: false },
  { text: "acrid sweetness", highlight: true },
  {
    text: " — like dried roses left to decay — ",
    highlight: false,
  },
  { text: "curled through the silence", highlight: true },
  { text: ". Her pulse quickened. ", highlight: false },
  { text: "Every shadow held its breath.", highlight: true },
];

export default function EditingBeforeAfter() {
  return (
    <section className="bg-response-section py-16 lg:py-24">
      <div className="site-container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-secondary" aria-hidden="true" />
            <span className="font-body text-[11px] font-bold tracking-[0.2em] text-highlight uppercase">
              The Transformation
            </span>
            <span className="h-px w-8 bg-secondary" aria-hidden="true" />
          </div>

          <h2 className="mt-5 font-heading text-[36px] leading-tight font-semibold sm:text-[42px] lg:text-[48px]">
            <span className="text-heading">Before</span>{" "}
            <span className="text-heading">&amp;</span>{" "}
            <span className="text-highlight">After</span>
          </h2>

          <p className="mt-4 font-heading text-sm leading-relaxed text-black/70 sm:text-[15px]">
            See the tangible difference professional editing makes to real
            manuscript passages.
          </p>
        </div>

        <div className="relative mt-14 flex flex-col items-stretch gap-6 lg:flex-row lg:items-center lg:gap-8">
          {/* Before card */}
          <div className="flex-1 rounded-2xl bg-white px-7 py-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
            <div className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15">
                <X
                  className="h-3 w-3 text-secondary"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              </span>
              <span className="font-body text-[10px] font-bold tracking-[0.15em] text-highlight uppercase">
                Before Editing
              </span>
            </div>

            <p className="mt-6 font-heading text-[15px] leading-relaxed text-black/80 sm:text-base">
              {beforeText}
            </p>
          </div>

          {/* Divider arrow */}
          <div
            className="relative z-10 mx-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-about-badge shadow-md lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2"
            aria-hidden="true"
          >
            <ArrowRight
              className="h-4 w-4 text-white"
              strokeWidth={2.5}
            />
          </div>

          {/* After card */}
          <div className="flex-1 rounded-2xl bg-white px-7 py-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
            <div className="inline-flex items-center gap-2 rounded-full bg-about-badge px-3 py-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                <Check
                  className="h-3 w-3 text-white"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              </span>
              <span className="font-body text-[10px] font-bold tracking-[0.15em] text-white uppercase">
                After Editing
              </span>
            </div>

            <p className="mt-6 font-heading text-[15px] leading-relaxed text-black/80 sm:text-base">
              {afterHighlights.map(({ text, highlight }, index) =>
                highlight ? (
                  <mark
                    key={index}
                    className="rounded-sm bg-primary/15 px-0.5 text-black/80"
                  >
                    {text}
                  </mark>
                ) : (
                  <span key={index}>{text}</span>
                ),
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
