import Image from "next/image";

export default function GoldStandard() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="site-container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <div
              className="absolute right-0 bottom-0 h-[92%] w-[92%] translate-x-5 translate-y-5 rounded-[32px] bg-muted"
              aria-hidden="true"
            />

            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[32px] bg-black/10">
              <Image
                src="/book-marketing.webp"
                alt="The Jade Whisper book cover"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-secondary" aria-hidden="true" />
              <span className="font-body text-[11px] font-bold tracking-[0.2em] text-secondary uppercase">
                Book Marketing
              </span>
            </div>

            <h2 className="mt-5 font-heading text-[36px] leading-tight font-semibold text-primary sm:text-[42px] lg:text-[48px]">
              Expand Your Reach with Stamford Publishers
            </h2>

            <p className="mt-5 font-body text-sm leading-relaxed text-black/70 sm:text-[15px]">
              From strategy development to campaign execution, Stamford Publishers
              helps authors build meaningful connections with their target
              audience through customized marketing solutions. Our services
              include social media marketing, email outreach, professional book
              review campaigns, and influencer partnerships designed to increase
              visibility and reader engagement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
