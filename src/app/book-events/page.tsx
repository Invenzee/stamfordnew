import type { Metadata } from "next";
import BookEventsPage from "./BookEventsPage";

const PAGE_PATH = "/book-events";
const SITE = "https://www.stamfordpublishers.com";
const TITLE = "Book Events | Stamford Publishers";
const DESCRIPTION =
  "Book an evening with Stamford Publishers. Upcoming author events, signings, and readings for book lovers.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE}${PAGE_PATH}` },
  openGraph: {
    type: "website",
    url: `${SITE}${PAGE_PATH}`,
    siteName: "Stamford Publishers",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function Page() {
  return <BookEventsPage />;
}
