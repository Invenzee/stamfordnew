import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import CookbookLanding from "./CookbookLanding";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-text",
});

const PAGE_PATH = "/cookbook/lp";
const SITE = "https://www.stamfordpublishers.com";
const TITLE = "SP - Cookbook LP";
const DESCRIPTION =
  "Cookbook publishing for independent authors and chefs. Recipe editing, food photography direction, full color interior layout, lay flat binding, print production and worldwide distribution. You keep your rights and your royalties.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "cookbook publishing services",
    "publish a cookbook",
    "cookbook self publishing",
    "recipe book publishing",
    "cookbook layout and design",
    "cookbook printing and distribution",
  ],
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    type: "website",
    url: PAGE_PATH,
    siteName: "Stamford Publishers",
    title: TITLE,
    description:
      "From a box of recipe cards to a printed cookbook. Recipe editing, photography direction, full color layout, print production and distribution.",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description:
      "From a box of recipe cards to a printed cookbook. Recipe editing, photography direction, full color layout, print production and distribution.",
  },
  robots: { index: true, follow: true },
};

const FAQ = [
  {
    q: "How much does it cost to publish a cookbook?",
    a: "Three things move the number more than anything else: how many recipes there are, whether the interior prints in full color, and whether photography needs to be commissioned. Stamford Publishers provides an itemized quote after a free consultation rather than a fixed package price, because the honest figure changes with the recipe count.",
  },
  {
    q: "Can I copyright my recipes?",
    a: "A bare list of ingredients is generally not protected by copyright on its own. What is protected is the expression: headnotes, instructions written in the author's voice, the selection and arrangement of the collection, and the photographs and design. This is general information rather than legal advice.",
  },
  {
    q: "Do I need professional food photography?",
    a: "It is not required, but color photography strongly affects how a cookbook sells. There are four workable routes: a full commissioned shoot, a partial shoot covering hero recipes, illustration instead of photography, or a curated and retouched selection of images the author already owns.",
  },
  {
    q: "How many recipes should my cookbook have?",
    a: "Most trade cookbooks land between sixty and a hundred and twenty recipes. Recipe count drives page count, page count drives spine width and unit cost, and unit cost drives retail price, so it is worth settling early.",
  },
  {
    q: "Do my recipes need to be tested?",
    a: "Every recipe in a published cookbook should have been cooked successfully by someone other than the author. Stamford Publishers works at three levels: a desk check for internal consistency, a structured test by a second cook, or full independent testing across a panel.",
  },
  {
    q: "How long does a cookbook take to publish?",
    a: "Longer than a novel of the same length, because photography and color proofing are sequential. A dated schedule is issued with the publishing plan, and the two things most likely to move it are photography and how quickly the author returns approvals.",
  },
  {
    q: "Can you work from handwritten recipe cards?",
    a: "Yes. Cards are transcribed, measurements standardized, and gaps flagged on a query list for the author to confirm. Nothing is invented to fill a missing step.",
  },
  {
    q: "Where will my cookbook be sold?",
    a: "Major online retailers in print and ebook, wholesale catalogs that bookstores and libraries order from, and the author's own direct channels. Print on demand covers the long tail, with short offset runs available for events and direct stock.",
  },
];

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${SITE}/#organization`,
        name: "Stamford Publishers",
        description:
          "Cookbook publishing services for independent authors, chefs and food brands. Recipe editing, food photography direction, interior layout, print production and distribution.",
        url: SITE,
        telephone: "+1-562-573-2551",
        areaServed: "Worldwide",
      },
      {
        "@type": "Service",
        name: "Cookbook Publishing Services",
        serviceType: "Cookbook publishing",
        provider: { "@id": `${SITE}/#organization` },
        url: `${SITE}${PAGE_PATH}`,
        description:
          "End to end cookbook publishing: recipe editing and standardization, copyediting, food photography direction, interior layout, cover design, print production, ebook conversion, ISBN and metadata, and worldwide distribution.",
      },
      {
        "@type": "FAQPage",
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
      <div className={`${fraunces.variable} ${manrope.variable}`}>
        <CookbookLanding />
      </div>
    </>
  );
}
