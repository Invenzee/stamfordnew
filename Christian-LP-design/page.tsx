import type { Metadata } from "next";
import { Newsreader, Karla } from "next/font/google";
import ChristianLanding from "./ChristianLanding";
import { BRAND, FAQ } from "./content";

/**
 * Display and long form text. Newsreader has a real optical size axis,
 * which is what lets the hero run at 70px without looking like body copy
 * scaled up.
 */
const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
});

/** Interface text: labels, buttons, form fields, navigation. */
const karla = Karla({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-ui",
});

const PAGE_PATH = "/christian-book-publishing";

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.site),
  title:
    "Christian Book Publishing Services for US Authors | Stamford Publishers",
  description:
    "Stamford Publishers helps Christian authors publish devotionals, faith memoirs, Bible studies and Christian fiction. Theologically aware editing, cover design, distribution and marketing. You keep all rights and royalties.",
  keywords: [
    "christian book publishing services",
    "christian self publishing companies",
    "publish a christian book",
    "devotional book publishing",
    "faith based book publishers",
    "christian ghostwriting services",
  ],
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    type: "website",
    url: PAGE_PATH,
    siteName: BRAND.name,
    title: "Christian Book Publishing Services | Stamford Publishers",
    description:
      "Editing, design, distribution and marketing for Christian authors across the United States. You keep one hundred percent of the rights and royalties.",
    images: [{ url: "/og/christian-publishing.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Christian Book Publishing Services | Stamford Publishers",
    description:
      "Editing, design, distribution and marketing for Christian authors across the United States.",
    images: ["/og/christian-publishing.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${BRAND.site}${PAGE_PATH}#service`,
        name: "Christian Book Publishing Services",
        serviceType: "Christian self publishing and author services",
        areaServed: { "@type": "Country", name: "United States" },
        provider: {
          "@type": "Organization",
          name: BRAND.name,
          url: BRAND.site,
          foundingDate: String(BRAND.foundedYear),
          telephone: BRAND.phoneDisplay,
        },
        description:
          "Editing, cover design, typesetting, ISBN registration, distribution, audiobook production and marketing for Christian authors in the United States.",
      },
      {
        "@type": "FAQPage",
        "@id": `${BRAND.site}${PAGE_PATH}#faq`,
        mainEntity: FAQ.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className={`${newsreader.variable} ${karla.variable}`}>
        <ChristianLanding />
      </div>
    </>
  );
}
