import { Clock, FileText, UserCheck } from "lucide-react";

const commitments = [
  {
    icon: Clock,
    title: "Free Consultation",
    description:
      "Share your goals and receive a personalized publishing roadmap from our specialists.",
  },
  {
    icon: UserCheck,
    title: "Expert Author Support",
    description:
      "Matched with a publishing specialist who understands your vision and timeline.",
  },
  {
    icon: FileText,
    title: "Personalized Guidance",
    description:
      "Clear recommendations and next steps tailored to your publishing goals.",
  },
];

export default function ResponseCommitment() {
  return (
    <section className="bg-response-section py-16 lg:py-20">
      <div className="site-container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-secondary" aria-hidden="true" />
            <span className="font-body text-[11px] font-bold tracking-[0.2em] text-secondary uppercase">
              What To Expect
            </span>
            <span className="h-px w-8 bg-secondary" aria-hidden="true" />
          </div>

          <h2 className="mt-5 font-heading text-[36px] leading-tight font-semibold sm:text-[42px] lg:text-[48px]">
            <span className="text-primary">Our Response</span>{" "}
            <span className="text-secondary">Commitment</span>
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {commitments.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col items-center rounded-2xl border border-border/60 bg-white px-6 py-10 text-center shadow-sm transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg"
            >
              <Icon
                className="h-10 w-10 text-secondary"
                strokeWidth={1.5}
                aria-hidden="true"
              />

              <h3 className="mt-5 font-heading text-lg font-bold text-primary sm:text-xl">
                {title}
              </h3>

              <p className="mt-3 font-heading text-[13px] leading-relaxed text-black/70 sm:text-sm">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
