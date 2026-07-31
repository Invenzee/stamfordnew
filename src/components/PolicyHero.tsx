export default function PolicyHero({ title }: { title: string }) {
  return (
    <section className="relative overflow-hidden bg-policy-hero">
      <div className="site-container relative flex flex-col items-center justify-center py-16 text-center sm:py-20 lg:py-24">
        <h1 className="font-heading text-[32px] leading-[1.2] font-semibold text-white sm:text-[40px] lg:text-[48px]">
          {title}
        </h1>
      </div>
    </section>
  );
}
