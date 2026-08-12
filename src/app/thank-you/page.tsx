import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You | Stamford Publishers",
  description:
    "Thank you for contacting Stamford Publishers. Our team will review your submission and get back to you shortly.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return (
    <section className="w-full bg-background">
      <div className="site-container py-20 text-center sm:py-28">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Submission Received
        </p>
        <h1 className="mb-4 font-heading text-3xl font-bold text-heading sm:text-4xl lg:text-5xl">
          Thank You!
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-foreground/75 sm:text-[15px]">
          Your details have been sent to our team at Stamford Publishers. A publishing specialist
          will review your submission and contact you shortly to discuss your project.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn btn-primary btn-md">
            Back to Home
          </Link>
          <a href="tel:+15625732551" className="btn btn-secondary btn-md">
            Call (562) 573-2551
          </a>
        </div>
      </div>
    </section>
  );
}
