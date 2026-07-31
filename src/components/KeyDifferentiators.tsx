import { BookOpen, Globe, Headphones, Megaphone } from "lucide-react";

const differentiators = [
  {
    icon: BookOpen,
    title: "Book Publishing",
    description:
      "Turn your manuscript into a professionally prepared book, ready for printing, publishing, and distribution.",
  },
  {
    icon: Headphones,
    title: "Audiobook Production",
    description:
      "Bring your story to life in audio format and reach more listeners through professional audiobook production.",
  },
  {
    icon: Megaphone,
    title: "Book Marketing",
    description:
      "Promote your book with customized marketing strategies designed to increase visibility and connect with readers.",
  },
  {
    icon: Globe,
    title: "Book Editing",
    description:
      "Strengthen your manuscript with professional editing services that improve clarity, structure, flow, and quality.",
  },
];

export default function KeyDifferentiators() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="site-container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-secondary" aria-hidden="true" />
            <span className="font-body text-[11px] font-bold tracking-[0.2em] text-secondary uppercase">
              Our Services
            </span>
            <span className="h-px w-8 bg-secondary" aria-hidden="true" />
          </div>

          <h2 className="mt-5 font-heading text-[36px] leading-tight font-semibold sm:text-[42px] lg:text-[48px]">
            <span className="text-primary">Comprehensive Publishing</span>{" "}
            <span className="text-secondary">Services</span>
          </h2>

          <p className="mt-4 font-heading text-sm leading-relaxed text-black/70 sm:text-[15px]">
            Stamford Publishers offers a complete, author-focused publishing
            experience, supporting writers through manuscript development,
            editing, publishing, and promotion with expert guidance and dedicated
            support.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {differentiators.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-border bg-card-warm px-6 py-10 text-center transition-shadow duration-300 hover:shadow-lg"
            >
              <span
                className="absolute top-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-secondary transition-transform duration-300 ease-out group-hover:scale-x-100"
                aria-hidden="true"
              />

              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary transition-transform duration-300 ease-out group-hover:rotate-12">
                <Icon
                  className="h-5 w-5 text-white transition-transform duration-300 ease-out group-hover:-rotate-6"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </div>

              <h3 className="font-heading text-lg font-bold text-primary">
                {title}
              </h3>

              <p className="mt-3 font-heading text-[13px] leading-relaxed text-black/60">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
