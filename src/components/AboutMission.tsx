import Image from "next/image";
import { Eye, Target } from "lucide-react";

const missionItems = [
  {
    number: "01",
    icon: Eye,
    title: "Our Vision",
    description:
      "To be the trusted publishing partner for authors seeking professional support, global distribution, and lasting reader connections.",
  },
  {
    number: "02",
    icon: Target,
    title: "Our Mission",
    description:
      "To guide authors through every stage of the publishing process with expert support, personalized service, and a focus on their creative vision.",
  },
];

export default function AboutMission() {
  return (
    <section className="bg-about-section-bg py-16 lg:py-24">
      <div className="site-container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — image collage */}
          <div className="relative mx-auto w-full max-w-[520px] lg:max-w-none">
            <div
              className="absolute top-6 left-6 h-[88%] w-[88%] rounded-2xl border-2 border-secondary/30"
              aria-hidden="true"
            />

            <div className="relative rounded-3xl bg-white p-5 shadow-lg sm:p-7">
              <div className="relative">
                <div className="group overflow-hidden rounded-tl-[28px] rounded-br-[28px] border-2 border-accent-navy">
                  <Image
                    src="/about-us.jpg"
                    alt="Team collaborating around a laptop in an office"
                    width={640}
                    height={420}
                    className="h-[500px] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                </div>

                <div
                  className="group absolute -top-4 -right-2 h-[130px] w-[95px] overflow-hidden rounded-xl border-2 border-accent-gold shadow-md sm:-right-4 sm:h-[150px] sm:w-[110px]"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=220&h=300&fit=crop"
                    alt="Business professionals in formal attire"
                    width={220}
                    height={300}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                </div>

                <div
                  className="absolute -bottom-3 -left-3 rounded-lg border-2 border-accent-gold bg-card-warm px-5 py-3 shadow-md sm:-left-5"
                >
                  <span className="font-heading text-lg font-bold tracking-wide text-secondary sm:text-xl">
                    ABOUT US
                  </span>
                </div>
              </div>
            </div>

            <div
              className="absolute -bottom-2 right-2 flex h-[110px] w-[110px] flex-col items-center justify-center rounded-full bg-about-badge px-3 text-center shadow-xl sm:-bottom-4 sm:right-4 sm:h-[120px] sm:w-[120px]"
            >
              <span className="font-body text-[9px] font-bold tracking-wider text-white uppercase">
                Proven
              </span>
              <span className="font-heading text-base font-bold leading-tight text-primary sm:text-lg">
                LEGACY
              </span>
              <span className="font-body text-[7px] tracking-wide text-white/80 uppercase sm:text-[8px]">
                OF EXCELLENCE
              </span>
            </div>
          </div>

          {/* Right — content */}
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-secondary" aria-hidden="true" />
              <span className="font-body text-[11px] font-bold tracking-[0.2em] text-secondary uppercase">
                Our Mission
              </span>
            </div>

            <h2 className="mt-5 font-heading text-[36px] leading-tight font-semibold sm:text-[42px] lg:text-[48px]">
              <span className="text-primary">Dedicated to</span>
              <br />
              <span className="text-secondary">Author Success</span>
            </h2>

            <p className="mt-5 font-heading text-base leading-relaxed text-black/80 sm:text-lg">
              Stamford Publishers was founded on the belief that every author
              deserves a professional publishing experience. From manuscript
              development to publishing, distribution, and marketing, we support
              you throughout the process while keeping your creative vision at
              the center of every step.
            </p>

            <div className="mt-8 divide-y divide-border">
              {missionItems.map(({ number, icon: Icon, title, description }) => (
                <div
                  key={number}
                  className="group relative border-l-4 border-transparent py-6 pl-0 transition-all duration-300 ease-out first:pt-0 hover:border-secondary hover:pl-4"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary"
                    >
                      <Icon
                        className="h-5 w-5 text-white"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-heading text-lg font-bold text-primary">
                        {title}
                      </h3>
                      <p className="mt-2 font-heading text-sm leading-relaxed text-black/70 sm:text-[15px]">
                        {description}
                      </p>
                    </div>

                    <span
                      className="font-heading text-[52px] font-bold leading-none text-about-number-faint sm:text-[64px]"
                      aria-hidden="true"
                    >
                      {number}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
