export default function PolicyContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="site-container policy-prose">{children}</div>
    </section>
  );
}
