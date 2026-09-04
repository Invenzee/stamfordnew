import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.stamfordpublishers.com";

const ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about-us", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact-us", changeFrequency: "monthly", priority: 0.8 },
  { path: "/submit-your-manuscript", changeFrequency: "monthly", priority: 0.8 },
  { path: "/book-publishing", changeFrequency: "monthly", priority: 0.8 },
  { path: "/book-writing", changeFrequency: "monthly", priority: 0.8 },
  { path: "/book-editing", changeFrequency: "monthly", priority: 0.8 },
  { path: "/book-cover-design", changeFrequency: "monthly", priority: 0.8 },
  { path: "/book-marketing", changeFrequency: "monthly", priority: 0.8 },
  { path: "/book-illustrations", changeFrequency: "monthly", priority: 0.8 },
  { path: "/ebook-writing", changeFrequency: "monthly", priority: 0.8 },
  { path: "/author-website", changeFrequency: "monthly", priority: 0.8 },
  { path: "/audiobook", changeFrequency: "monthly", priority: 0.8 },
  { path: "/childrens-books", changeFrequency: "monthly", priority: 0.8 },
  { path: "/Christian/lp", changeFrequency: "monthly", priority: 0.7 },
  { path: "/Marketing/lp", changeFrequency: "monthly", priority: 0.7 },
  { path: "/Ghostwriting/lp", changeFrequency: "monthly", priority: 0.7 },
  { path: "/Publishing/lp", changeFrequency: "monthly", priority: 0.7 },
  { path: "/Editing/lp", changeFrequency: "monthly", priority: 0.7 },
  { path: "/Kids/lp", changeFrequency: "monthly", priority: 0.7 },
  { path: "/cookbook/lp", changeFrequency: "monthly", priority: 0.7 },
  { path: "/self-publishing/lp", changeFrequency: "monthly", priority: 0.7 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms-of-service", changeFrequency: "yearly", priority: 0.3 },
  { path: "/refund-policy", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
