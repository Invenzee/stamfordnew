import { Layers, MessageCircle, Pen, Rocket } from "lucide-react";

const steps = [
  {
    number: 1,
    icon: MessageCircle,
    title: "Consultation",
    description:
      "Share your goals with Stamford Publishers and receive a personalized publishing roadmap.",
  },
  {
    number: 2,
    icon: Pen,
    title: "Development",
    description:
      "We support manuscript development, editing, and design while keeping your vision at the center.",
  },
  {
    number: 3,
    icon: Layers,
    title: "Production",
    description:
      "Your book is professionally prepared for printing, publishing, and distribution.",
  },
  {
    number: 4,
    icon: Rocket,
    title: "Launch",
    description:
      "We help you publish, distribute, and promote your book to reach the right readers.",
  },
];

export default function Workflow() {
  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-20">
      <div
        className="pointer-events-none absolute top-1/2 right-0 h-[500px] w-[500px] translate-x-1/3 -translate-y-1/2 rounded-full bg-muted/60"
        aria-hidden="true"
      />

      <div className="site-container relative">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-secondary" aria-hidden="true" />
            <span className="font-body text-[11px] font-bold tracking-[0.2em] text-secondary uppercase">
              Self-Publishing
            </span>
          </div>

          <h2 className="mt-5 font-heading text-[36px] leading-tight font-semibold sm:text-[42px] lg:text-[48px]">
            <span className="text-primary">A Streamlined Path to</span>
            <br />
            <span className="text-secondary">Self-Publishing</span>
          </h2>

          <p className="mt-4 font-body text-sm leading-relaxed text-black/70 sm:text-[15px]">
            Stamford Publishers provides a simple, flexible, and author-focused
            self-publishing experience tailored to your goals. From manuscript
            development to publishing, distribution, and marketing, we support
            you throughout the process while keeping your creative vision at the
            center of every step.
          </p>
        </div>

        <div className="relative mt-14">
          <div
            className="absolute top-[52px] right-[12%] left-[12%] hidden h-px bg-secondary/20 lg:block"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {steps.map(({ number, icon: Icon, title, description }) => (
              <div
                key={number}
                className="group relative flex flex-col items-center rounded-2xl border border-border bg-white px-5 py-8 text-center transition-all duration-300 hover:scale-105 hover:border-secondary hover:shadow-xl"
              >
                <div className="relative mb-6">
                  <div className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-primary">
                    <Icon
                      className="h-8 w-8 text-white"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </div>
                  <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-secondary font-body text-xs font-bold text-white">
                    {number}
                  </span>
                </div>

                <h3 className="font-heading text-lg font-bold text-primary">
                  {title}
                </h3>
                <p className="mt-3 font-body text-[13px] leading-relaxed text-black/60">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
