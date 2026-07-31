import {
  Briefcase,
  Flame,
  Heart,
  Rocket,
  ScrollText,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const categories: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Thriller",
    description: "Dark, atmospheric covers",
    icon: Flame,
  },
  {
    title: "Romance",
    description: "Elegant, emotional designs",
    icon: Heart,
  },
  {
    title: "Sci-Fi",
    description: "Futuristic, bold visuals",
    icon: Rocket,
  },
  {
    title: "Literary",
    description: "Sophisticated, minimalist art",
    icon: ScrollText,
  },
  {
    title: "Business",
    description: "Professional, authoritative looks",
    icon: Briefcase,
  },
  {
    title: "Children's",
    description: "Vibrant, playful illustrations",
    icon: Sparkles,
  },
];

export default function CoverDesignCategories() {
  return (
    <section className="bg-about-section-bg pt-16 pb-8 lg:pt-20 lg:pb-10">
      <div className="site-container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-secondary" aria-hidden="true" />
            <span className="font-body text-[11px] font-bold tracking-[0.2em] text-highlight uppercase">
              Design Categories
            </span>
            <span className="h-px w-8 bg-secondary" aria-hidden="true" />
          </div>

          <h2 className="mt-5 font-heading text-[36px] leading-tight font-semibold sm:text-[42px] lg:text-[48px]">
            <span className="text-heading">Cover Styles We</span>{" "}
            <span className="text-highlight">Specialize In</span>
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-5">
          {categories.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="flex flex-col items-center rounded-2xl border border-border bg-white px-4 py-6 text-center transition-all duration-300 hover:border-secondary/40 hover:shadow-lg"
            >
              <Icon
                className="h-8 w-8 text-secondary"
                strokeWidth={1.5}
                aria-hidden="true"
              />

              <h3 className="mt-4 font-heading text-base font-bold text-heading sm:text-lg">
                {title}
              </h3>

              <p className="mt-2 font-body text-[11px] leading-relaxed text-black/60 sm:text-xs">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
