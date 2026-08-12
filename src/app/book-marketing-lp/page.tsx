"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  FaComments,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLocationDot,
  FaPhone,
  FaStar,
  FaXmark,
} from "react-icons/fa6";
import { handleLeadFormSubmit } from "@/lib/submit-form";

const PHONE = "+1 562 573 2551";
const PHONE_HREF = "tel:+15625732551";
const EMAIL = "info@stamfordpublishers.com";
const POPUP_DELAY_MS = 2000;
const POPUP_SESSION_KEY = "book-marketing-lp-popup-dismissed";

const GENRE_OPTIONS = [
  "Fiction",
  "Non-Fiction",
  "Children's Book",
  "Memoir",
  "Self-Help",
  "Business",
  "Poetry",
  "Audiobook",
  "Other",
];

const HERO_STATS = [
  "99% Client Satisfaction Rate",
  "10+ Years in Publishing & Marketing",
  "150+ National Bestsellers Launched",
  "50+ In-House Marketing Specialists",
];

const TIMELINE_OPTIONS = ["1 Month", "3 Months", "6 Months", "12 Months"];
const PUBLISHED_OPTIONS = ["Yes", "No"];

const PARTNER_LOGOS = [
  { src: "/cl-1%20(1).webp", alt: "Penguin Random House" },
  { src: "/cl-4%20(1).webp", alt: "Macmillan" },
  { src: "/cl-3%20(1).webp", alt: "HarperCollins" },
  { src: "/cl-5%20(1).webp", alt: "Hachette" },
];

const PROMO_CHANNELS = [
  {
    id: "social",
    label: "Social Media Marketing",
    title: "Social Media Marketing",
    description:
      "We put your book in front of readers where they already spend their time. Through precision-targeted campaigns on Facebook, Instagram, and LinkedIn, we connect your story to the audiences most likely to engage with it — turning casual scrollers into engaged readers and buyers.",
    image: "/book-marketing-lp/social-media.webp",
    imageAlt: "Social media marketing for book promotion",
  },
  {
    id: "seo",
    label: "Search Engine Optimization",
    title: "Search Engine Optimization",
    description:
      "Readers can’t buy a book they can’t find. We research the keywords, categories, and search terms your ideal readers are actually using, then apply them across your book’s metadata, listing copy, and author website. The result is stronger organic rankings on Amazon and Google alike, so your book keeps attracting new readers long after a campaign ends.",
    image: "/book-marketing-lp/seo.webp",
    imageAlt: "Search engine optimization for authors",
  },
  {
    id: "amazon",
    label: "Amazon Marketing",
    title: "Amazon Marketing",
    description:
      "Amazon is where most book discovery and buying happens, so we treat your listing as a storefront, not an afterthought. From optimized titles, descriptions, and A+ Content to targeted Amazon Ads and category/bestseller-list positioning, we build a presence designed to convert browsers into buyers and keep your book climbing the rankings that matter.",
    image: "/book-marketing-lp/amazon.webp",
    imageAlt: "Amazon book marketing campaigns",
  },
  {
    id: "content",
    label: "Content Marketing",
    title: "Content Marketing",
    description:
      "We help authors build authority, not just awareness. Through blog content, author interviews, guest features, and shareable reader-focused pieces, we position you as a voice in your genre — giving readers a reason to follow your work and giving search engines fresh, relevant content to rank.",
    image: "/book-marketing-lp/content.webp",
    imageAlt: "Content marketing for book authors",
  },
  {
    id: "launch",
    label: "Book Launch Campaigns",
    title: "Book Launch Campaigns",
    description:
      "The first weeks after release set the trajectory for a book’s long-term success. We build coordinated launch campaigns — pre-release buzz, review pipelines, launch-day promotion, and post-launch momentum — timed to drive the concentrated sales and visibility that can push a title onto bestseller lists.",
    image: "/book-marketing-lp/book.webp",
    imageAlt: "Book launch marketing campaign",
  },
  {
    id: "influencer",
    label: "Influencer Marketing",
    title: "Influencer Marketing",
    description:
      "We connect your book with bookstagrammers, BookTokers, YouTube reviewers, and genre-specific influencers who already have your readers’ attention. These partnerships generate authentic reviews, unboxings, and recommendations that build trust and buzz in ways traditional advertising can’t replicate.",
    image: "/book-marketing-lp/influencer.webp",
    imageAlt: "Influencer marketing for book authors",
  },
];

const EXECUTION_STEPS = [
  {
    number: "01",
    title: "Evaluation & Strategy",
    description:
      "We start by analyzing your book, genre, and target audience to build a marketing strategy aligned with your publishing goals.",
  },
  {
    number: "02",
    title: "Market Research",
    description:
      "We study market trends, competitor performance, and reader behavior to identify most effective channels and opportunities for your book.",
  },
  {
    number: "03",
    title: "Campaign Execution",
    description:
      "We launch and actively manage your marketing campaigns, tracking performance in real time to keep growth and engagement on target.",
  },
  {
    number: "04",
    title: "Optimization & Reporting",
    description:
      "We continuously refine your campaigns based on performance data — improving visibility, increasing reader interest, and maximizing your return on investment.",
  },
];

const WHY_CHOOSE = [
  {
    number: "01",
    title: "Research-Backed Strategy",
    description:
      "Every campaign starts with research, not guesswork. We study your book, your audience, and your competition before a single dollar is spent on promotion.",
  },
  {
    number: "02",
    title: "Proven Results",
    description:
      "Our team has supported hundreds of authors across genres, building campaigns that improve visibility, reader engagement, and long-term sales momentum.",
  },
  {
    number: "03",
    title: "Dedicated Ongoing Support",
    description:
      "From launch day to long-term promotion, we stay with you — answering questions, adjusting strategy, and reporting on progress every step of the way.",
  },
];

const MARKETING_PACKAGES = [
  {
    name: "Starter Plan",
    features: [
      "Social media setup and management",
      "Email campaign creation",
      "Amazon & Google ad setup",
      "Press release writing",
      "Author website landing page",
      "Monthly performance report",
      "Dedicated account manager",
      "Content calendar planning",
    ],
  },
  {
    name: "Growth Plan",
    features: [
      "Everything in Starter Plan",
      "Influencer outreach campaigns",
      "Advanced Amazon advertising",
      "Book launch strategy & timeline",
      "Reader review generation support",
      "Multi-platform ad management",
      "Bi-weekly strategy calls",
      "Competitive market analysis",
    ],
  },
  {
    name: "Premium Plan",
    features: [
      "Everything in Growth Plan",
      "Full-service PR & media outreach",
      "Podcast & interview booking",
      "Custom video ad creatives",
      "Priority campaign optimization",
      "Dedicated senior strategist",
      "Quarterly growth planning",
      "Priority support & reporting",
    ],
  },
];

const PHONE_DISPLAY = "(562) 573-2551";

const FOOTER_FIELD_CLASS =
  "w-full px-4 py-2.5 border border-black/10 rounded-lg outline-none focus:border-[#ffc800] bg-[#B3B5A1] text-white placeholder:text-white text-sm transition-all duration-300";

const FOOTER_SELECT_CLASS = `${FOOTER_FIELD_CLASS} form-select form-select-arrow-white`;

const FOOTER_BADGES = {
  dmca: "/book-marketing-lp/dmc%20(1).webp",
  payments: "/book-marketing-lp/pay-1.webp",
  trustpilot: "/book-marketing-lp/trustpilot-1.webp",
};

const POPUP_FIELD_CLASS =
  "w-full px-4 py-2.5 border border-[#d9d9d9] rounded-lg bg-white text-[#111] text-sm outline-none focus:border-[#ffc800] placeholder:text-[#aaa] transition-all duration-300";

const POPUP_SELECT_CLASS = `${POPUP_FIELD_CLASS} form-select form-select-arrow-muted`;

const SECTION_HEADING =
  "text-2xl sm:text-3xl lg:text-5xl font-bold transition-all duration-300";

const SECTION_PADDING = "py-12 lg:py-16 transition-all duration-300";

const CARD_HOVER =
  "transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-1";

const HERO_FIELD_CLASS =
  "w-full px-4 py-2 border border-black/10 rounded-lg outline-none focus:border-[#ffc800] bg-[#B3B5A1] text-white placeholder:text-white transition-all duration-300";

const HERO_SELECT_CLASS = `${HERO_FIELD_CLASS} form-select form-select-arrow-white`;

const LP_BTN_BASE =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden bg-[#ffc800] text-[#111] font-bold transition-all duration-300 hover:text-white";

function LpButton({
  children,
  href,
  type = "button",
  className = "",
  onClick,
}: {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
}) {
  const classes = `${LP_BTN_BASE} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        <span
          className="absolute inset-0 bg-[#111] rounded-[inherit] scale-x-0 origin-left transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-x-100"
          aria-hidden="true"
        />
        <span className="relative z-10">{children}</span>
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      <span
        className="absolute inset-0 bg-[#111] rounded-[inherit] scale-x-0 origin-left transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-x-100"
        aria-hidden="true"
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
}

const WORK_CAROUSEL_IMAGES = [
  { src: "/book-marketing-lp/Graphic-Google.webp", alt: "Book marketing campaign showcase" },
  { src: "/book-marketing-lp/Graphic-Google-02.webp", alt: "Book marketing campaign showcase 2" },
  { src: "/book-marketing-lp/Graphic-Google-03-1-scaled.webp", alt: "Book marketing campaign showcase 3" },
  { src: "/book-marketing-lp/Graphic-Google-07.webp", alt: "Book marketing campaign showcase 4" },
  { src: "/book-marketing-lp/Graphic-Google-08.webp", alt: "Book marketing campaign showcase 5" },
  { src: "/book-marketing-lp/Graphic-Google-09-scaled.webp", alt: "Book marketing campaign showcase 6" },
];

const TESTIMONIALS = [
  {
    quote:
      "Stamford Publishers transformed how my book reached readers. Their marketing team understood my audience and built campaigns that genuinely moved the needle. I saw more reviews, more sales, and more engagement within the first month.",
    author: "Sarah Mitchell",
    role: "Independent Author",
  },
  {
    quote:
      "I was overwhelmed by book marketing until I partnered with Stamford Publishers. They handled social media, email outreach, and Amazon ads while keeping me informed every step of the way. Professional, responsive, and results-driven.",
    author: "James Rodriguez",
    role: "Non-Fiction Author",
  },
  {
    quote:
      "From our first strategy call to post-launch reporting, communication was clear and honest. They helped me promote a backlist title I thought was done — and it found a whole new audience.",
    author: "Emily Carter",
    role: "Romance Author",
  },
  {
    quote:
      "As a debut author, I needed guidance I could trust. Stamford Publishers broke everything down in plain language and delivered campaigns that matched my goals without overselling or overpromising.",
    author: "David Park",
    role: "Business Author",
  },
];

function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
  return handleLeadFormSubmit(e, "/book-marketing-lp");
}

function WorksCarousel() {
  const gapPx = 16;
  const [visibleCount, setVisibleCount] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const update = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setVisibleCount(5);
      } else if (window.matchMedia("(min-width: 640px)").matches) {
        setVisibleCount(2);
      } else {
        setVisibleCount(2);
      }
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, WORK_CAROUSEL_IMAGES.length - visibleCount);

  useEffect(() => {
    setActiveIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(Math.max(0, Math.min(index, maxIndex)));
    },
    [maxIndex],
  );

  const cardWidth = `calc((100% - ${(visibleCount - 1) * gapPx}px) / ${visibleCount})`;
  const slideOffset = `calc(-${activeIndex} * (${cardWidth} + ${gapPx}px))`;
  const dotCount = maxIndex + 1;

  return (
    <div aria-label="Our works carousel">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            gap: `${gapPx}px`,
            transform: `translateX(${slideOffset})`,
          }}
        >
          {WORK_CAROUSEL_IMAGES.map((image) => (
            <div
              key={image.src}
              className="shrink-0 rounded-xl overflow-hidden shadow-md bg-white transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1"
              style={{ width: cardWidth }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {dotCount > 1 && (
        <div
          className="mt-6 flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Carousel navigation"
        >
          {Array.from({ length: dotCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => goTo(index)}
              className={`transition-all duration-300 rounded-full ${activeIndex === index
                  ? "h-2.5 w-8 bg-[#ffc800]"
                  : "h-2.5 w-2.5 bg-[#d4d4d4] hover:bg-[#bbb]"
                }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function TestimonialsCarousel() {
  const gapPx = 20;
  const [visibleCount, setVisibleCount] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const update = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, TESTIMONIALS.length - visibleCount);

  useEffect(() => {
    setActiveIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(Math.max(0, Math.min(index, maxIndex)));
    },
    [maxIndex],
  );

  const cardWidth = `calc((100% - ${(visibleCount - 1) * gapPx}px) / ${visibleCount})`;
  const slideOffset = `calc(-${activeIndex} * (${cardWidth} + ${gapPx}px))`;
  const dotCount = maxIndex + 1;

  return (
    <div aria-label="Author testimonials carousel">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            gap: `${gapPx}px`,
            transform: `translateX(${slideOffset})`,
          }}
        >
          {TESTIMONIALS.map((item) => (
            <article
              key={item.author}
              className="shrink-0 flex flex-col bg-[#FFF2C2] rounded-[20px] p-6 lg:p-8 shadow-[0_8px_24px_rgba(255,200,0,0.15)] border border-[#ffc800]/20 transition-all duration-300 ease-out hover:shadow-[0_12px_32px_rgba(255,200,0,0.25)] hover:-translate-y-1"
              style={{ width: cardWidth }}
            >
              <div className="flex gap-0.5 mb-4 text-[#ffc800]" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar key={i} className="w-4 h-4" aria-hidden="true" />
                ))}
              </div>
              <p className="text-sm sm:text-[15px] text-[#111] leading-relaxed mb-6 flex-1">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="border-t border-[#ffc800]/35 pt-4">
                <p className="font-bold text-[#111] text-sm">{item.author}</p>
                <p className="text-xs text-[#666] mt-0.5">{item.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {dotCount > 1 && (
        <div
          className="mt-8 flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Testimonials carousel navigation"
        >
          {Array.from({ length: dotCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              aria-label={`Go to testimonial slide ${index + 1}`}
              onClick={() => goTo(index)}
              className={`transition-all duration-300 rounded-full ${activeIndex === index
                  ? "h-2.5 w-8 bg-[#ffc800]"
                  : "h-2.5 w-2.5 bg-[#ffc800]/35 hover:bg-[#ffc800]/55"
                }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function BookMarketingLpPage() {
  const [activeChannel, setActiveChannel] = useState(PROMO_CHANNELS[0].id);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMounted, setPopupMounted] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);

  const activePromo = PROMO_CHANNELS.find((c) => c.id === activeChannel) ?? PROMO_CHANNELS[0];

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setPopupMounted(true);
  }, []);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(POPUP_SESSION_KEY) === "1";
    } catch {
      dismissed = false;
    }
    if (dismissed) return;

    const timer = window.setTimeout(() => {
      setPopupOpen(true);
    }, POPUP_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setPopupOpen(false);
    try {
      sessionStorage.setItem(POPUP_SESSION_KEY, "1");
    } catch {
      // ignore storage errors
    }
  };

  const popupModal =
    popupOpen && popupMounted ? (
      <div
        className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto bg-black/55 px-4 pt-10 pb-6 backdrop-blur-sm transition-opacity duration-300 sm:items-center sm:overflow-hidden sm:p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lp-popup-heading"
      >
        <div className="relative my-auto grid w-full max-w-[920px] rounded-2xl bg-white shadow-[0_24px_64px_rgba(0,0,0,0.25)] transition-all duration-300 md:max-h-[90vh] md:grid-cols-[42%_58%] md:overflow-hidden">
          <button
            type="button"
            onClick={closePopup}
            className="absolute top-3 right-3 z-20 flex h-8 w-8 items-center justify-center rounded-md bg-[#111] text-white hover:bg-[#333] sm:top-4 sm:right-4"
            aria-label="Close popup"
          >
            <FaXmark className="h-3.5 w-3.5" />
          </button>
          <div className="flex min-h-[280px] flex-col bg-[#ffc800] p-6 pr-12 lg:p-6">
            <h2
              id="lp-popup-heading"
              className={`${SECTION_HEADING} leading-[1.25] text-[#111] mb-2`}
            >
              Turn Your Book Into a Bestseller With Stamford Publishers
            </h2>

            <div className="space-y-2 text-sm text-[#111] mb-6">
              <div className="flex items-start gap-3">
                <FaPhone className="w-4 h-4 mt-1 shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="font-bold">Call Us</h3>
                  <a href={PHONE_HREF} className="hover:underline">
                    {PHONE_DISPLAY}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaEnvelope className="w-4 h-4 mt-1 shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="font-bold">Discuss your ideas</h3>
                  <a href={`mailto:${EMAIL}`} className="hover:underline break-all">
                    {EMAIL}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-auto flex justify-center pt-4">
              <img
                src="/book-marketing-lp/popup.webp"
                alt="Author using smartphone for book marketing"
                className="w-full max-w-[300px] object-contain"
              />
            </div>
          </div>

          <div className="p-7 sm:p-8 lg:p-10 md:max-h-[90vh] md:overflow-y-auto">
            <form
              onSubmit={(e) => handleLeadFormSubmit(e, "/book-marketing-lp-popup")}
              className="flex flex-col items-center justify-center space-y-5"
            >
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                  className={POPUP_FIELD_CLASS}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className={POPUP_FIELD_CLASS}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="tel"
                  name="phone"
                  placeholder="123-456-7890"
                  required
                  className={POPUP_FIELD_CLASS}
                />
                <select name="genre" required className={POPUP_SELECT_CLASS} defaultValue="Audiobook">
                  {GENRE_OPTIONS.map((g) => (
                    <option key={g} value={g}>
                      {g === "Audiobook" ? "Audio Book" : g}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                name="bookTitle"
                placeholder="Book Title"
                required
                className={POPUP_FIELD_CLASS}
              />
              <textarea
                name="aboutBook"
                placeholder="Tell Us About Your Book"
                required
                rows={5}
                className={`${POPUP_FIELD_CLASS} min-h-[130px] resize-y`}
              />
              <LpButton type="submit" className="w-full rounded-lg py-2.5 px-6 text-sm uppercase tracking-wide font-normal">
                Submit Now
              </LpButton>
            </form>
          </div>
        </div>
      </div>
    ) : null;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${headerScrolled
            ? "bg-white border-b border-[#e5e5e5] shadow-sm"
            : "bg-transparent border-b border-transparent"
          }`}
      >
        <div className="relative max-w-[1140px] mx-auto w-full px-4 py-5">
          <div className="flex items-center justify-between gap-3">
            <a
              href={PHONE_HREF}
              className="flex items-center gap-2 text-sm font-medium text-[#111] min-w-0 z-10 transition-all duration-300 hover:opacity-80"
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#ffc800] shrink-0 transition-colors duration-300 hover:bg-[#111] group">
                <FaPhone className="w-3.5 h-3.5 transition-colors duration-300 group-hover:text-white" aria-hidden="true" />
              </span>
              <span className="hidden sm:block">
                <span className="text-[#666] text-xs block leading-tight">Call Now</span>
                <span className="font-semibold">{PHONE}</span>
              </span>
            </a>

            <LpButton href="#lp-hero-form" className="shrink-0 text-xs sm:text-sm px-4 py-2.5 sm:px-6 z-10 rounded-full font-semibold normal-case">
              Get Started
            </LpButton>
          </div>

          <a
            href="#"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 hover:opacity-80"
            aria-label="Stamford Publishers"
          >
            <img
              src="/book-marketing-lp/logo.webp"
              alt="Stamford Publishers"
              width={100}
              height={100}
              className="h-12 sm:h-14 lg:h-16 w-auto transition-all duration-300"
            />
          </a>
        </div>
      </header>

      <div>
        {/* Hero */}
        <section
          className="relative pt-12 bg-[#fff8e6] min-h-[600px] sm:min-h-[700px] lg:min-h-[780px] transition-all duration-300 overflow-hidden"
          aria-labelledby="lp-hero-heading"
        >
          <div
            className="absolute inset-0 z-0 pointer-events-none opacity-45 bg-[#fff8e6] bg-[url('/book-marketing-lp/bannerbg%20(1).webp')] bg-cover bg-[center_30%] bg-no-repeat"
            aria-hidden="true"
          />
          <img
            src="/book-marketing-lp/Bannerrr%20(2).webp"
            alt=""
            className="absolute bottom-0 left-0 right-0 z-0 block w-full h-auto opacity-80 pointer-events-none object-contain object-bottom"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 z-[1] pointer-events-none bg-[linear-gradient(180deg,rgba(255,248,230,0.94)_0%,rgba(255,248,230,0.82)_22%,rgba(255,248,230,0.58)_48%,rgba(255,248,230,0.18)_72%,rgba(255,255,255,0)_100%)]"
            aria-hidden="true"
          />
          <div className="relative z-10 max-w-[1140px] mx-auto w-full px-4 pt-24 sm:pt-28 pb-32 sm:pb-36 lg:pb-40">
            <div className="text-center max-w-5xl mx-auto">
              <h1
                id="lp-hero-heading"
                className="text-2xl sm:text-3xl lg:text-5xl font-bold leading-tight text-[#111] mb-2 transition-all duration-300"
              >
                Turn Your Book Into a Bestseller
              </h1>
              <p className="text-[#333] text-sm sm:text-[15px] leading-relaxed mb-6 sm:mb-8 max-w-4xl mx-auto">
                Every great book deserves an audience. At Stamford Publishers, we build data-driven marketing campaigns that put your book in front of the readers most likely to buy it — driving visibility, credibility, and lasting sales, whether you&apos;re launching a debut title or reigniting momentum for an existing one.
              </p>

              <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-3 max-w-2xl mx-auto mb-8 sm:mb-10 text-left list-none">
                {HERO_STATS.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm sm:text-[14px] text-[#222] font-medium transition-all duration-300">
                    <span className="flex items-center justify-center w-[22px] h-[22px] shrink-0 bg-[#ffc800] rounded-full text-[11px] font-bold text-[#111]">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <form
              id="lp-hero-form"
              onSubmit={handleFormSubmit}
              className="max-w-3xl mx-auto space-y-3"
            >
              <div className="grid sm:grid-cols-3 gap-3">
                <input type="text" name="name" placeholder="Name" required className={HERO_FIELD_CLASS} />
                <input type="email" name="email" placeholder="Email" required className={HERO_FIELD_CLASS} />
                <input type="tel" name="phone" placeholder="Your Phone" required className={HERO_FIELD_CLASS} />
              </div>
              <div className="grid sm:grid-cols-[1fr_1fr_1.4fr] gap-3">
                <select name="timeline" required className={HERO_SELECT_CLASS} defaultValue="3 Months">
                  {TIMELINE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <select name="published" required className={HERO_SELECT_CLASS} defaultValue="Yes">
                  {PUBLISHED_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <LpButton type="submit" className="w-full rounded-full px-6 py-3 text-sm uppercase tracking-wide h-[46px] sm:h-auto">
                  Submit Now
                </LpButton>
              </div>
            </form>
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-[15] leading-none pointer-events-none" aria-hidden="true">
            <svg viewBox="0 0 1440 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" className="block w-full h-16 md:h-20 drop-shadow-[0_-4px_12px_rgba(0,0,0,0.04)]">
              <path
                d="M0,55 C180,95 360,15 540,45 C720,75 900,25 1080,50 C1260,75 1380,85 1440,90 L1440,100 L0,100 Z"
                fill="#ffffff"
              />
            </svg>
          </div>
        </section>

        {/* Publisher trust row */}
        <section className="py-8 bg-white border-b border-[#eee] transition-all duration-300" aria-label="Publishing partners">
          <div className="max-w-[1140px] mx-auto w-full px-4">
            <div className="flex flex-wrap items-center justify-center sm:justify-between gap-6 sm:gap-8">
              {PARTNER_LOGOS.map((logo) => (
                <img
                  key={logo.src}
                  src={logo.src}
                  alt={logo.alt}
                  className="h-8 sm:h-10 lg:h-12 w-auto object-contain flex-1 max-w-[120px] sm:max-w-[22%] transition-all duration-300 hover:opacity-70"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Promotional Channels */}
        <section className={`${SECTION_PADDING} bg-white`} aria-labelledby="lp-channels-heading">
          <div className="max-w-[1140px] mx-auto w-full px-4">
            <h2
              id="lp-channels-heading"
              className={`${SECTION_HEADING} text-center mb-8 lg:mb-12`}
            >
              Our{" "}
              <span className="text-[#ffc800]">Promotional Channels</span>
            </h2>

            <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
              <nav
                className="flex flex-wrap lg:flex-col gap-2 w-full lg:w-[25%] lg:pb-0"
                aria-label="Marketing channels"
              >
                {PROMO_CHANNELS.map((channel) => (
                  <button
                    key={channel.id}
                    type="button"
                    onClick={() => setActiveChannel(channel.id)}
                    className={`group relative text-left px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm lg:whitespace-normal rounded-full overflow-hidden transition-colors duration-300 hover:text-white ${activeChannel === channel.id
                        ? "bg-[#ffc800] text-[#111] font-semibold"
                        : "bg-[#fbeccc] text-[#4a2c2a] font-medium"
                      }`}
                  >
                    <span className="absolute inset-0 bg-[#111] rounded-full scale-x-0 origin-left transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-x-100" aria-hidden="true" />
                    <span className="relative z-10">{channel.label}</span>
                  </button>
                ))}
              </nav>

              <div className="relative overflow-hidden rounded-[20px] w-full lg:w-[70%] bg-[#fbeccc] transition-all duration-300">
                <img
                  src={activePromo.image}
                  alt=""
                  className="hidden md:block absolute inset-0 w-full h-full object-contain object-right pointer-events-none transition-opacity duration-500"
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 z-[1] pointer-events-none bg-[linear-gradient(to_bottom,#FBEBCD_0%,#FBEBCD_70%,rgba(251,235,205,0.6)_100%)] md:bg-[linear-gradient(to_right,#FBEBCD_65%,transparent_100%)]"
                  aria-hidden="true"
                />
                <div className="relative z-[2] p-5 sm:p-8 lg:p-10 flex flex-col justify-center">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#59101B] mb-3 sm:mb-4 transition-all duration-300">
                    {activePromo.title}
                  </h3>
                  <p className="text-[#333] text-sm sm:text-[14px] leading-relaxed mb-4 sm:mb-6 transition-all duration-300">
                    {activePromo.description}
                  </p>
                  <img
                    src={activePromo.image}
                    alt={activePromo.imageAlt}
                    className="md:hidden w-full max-h-[180px] object-contain object-center mb-4"
                  />
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
                    <LpButton href="#lp-hero-form" className="px-6 py-3 rounded-full font-semibold text-sm normal-case">
                      Get A Quote
                    </LpButton>
                    <a href={PHONE_HREF} className="flex items-center gap-3 group transition-all duration-300">
                      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#ffc800] shrink-0 group-hover:bg-[#111] transition-colors duration-300">
                        <FaPhone className="w-4 h-4 text-[#111] group-hover:text-white transition-colors duration-300" aria-hidden="true" />
                      </span>
                      <span className="text-sm leading-tight">
                        <span className="text-[#666] text-xs block">Call Now</span>
                        <span className="font-bold text-[#111]">{PHONE}</span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Marketing Matters */}
        <WhyMarketingSection sectionId="lp-why-heading" />

        {/* Execution */}
        <section className={`${SECTION_PADDING} bg-white`} aria-labelledby="lp-execution-heading">
          <div className="max-w-[1140px] mx-auto w-full px-4">
            <h2
              id="lp-execution-heading"
              className={`${SECTION_HEADING} text-center`}
            >
              How Should It Be{" "}
              <span className="text-[#ffc800]">Executed?</span>
            </h2>
            <p className="text-sm text-[#666] leading-relaxed max-w-2xl mx-auto text-center mb-8 mt-2">Our marketing process combines research, strategy, creative promotion, and continuous optimization to help your book reach the right audience.</p>

            <div className="hidden lg:flex items-center gap-8 xl:gap-10">
              <div className="flex-[1] flex flex-col justify-center gap-14 xl:gap-20 min-w-0">
                {EXECUTION_STEPS.slice(0, 2).map((step) => (
                  <div key={step.number} className="text-right transition-all duration-300 hover:translate-x-[-4px]">
                    <span className="block text-4xl xl:text-5xl font-bold text-[#ffc800] leading-none mb-3">
                      {step.number}
                    </span>
                    <h3 className="font-bold text-lg xl:text-xl mb-2 text-[#111]">{step.title}</h3>
                    <p className="text-sm text-[#666] leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>

              <div className="flex-[1.5] flex items-center justify-center shrink-0">
                <div className="w-52 h-52 xl:w-full xl:h-[450px] border-2 border-[#ffc800] rounded-full bg-white flex items-center justify-center shadow-[0_0_50px_rgba(255,200,0,0.35)] transition-all duration-300 hover:shadow-[0_0_60px_rgba(255,200,0,0.45)]">
                  <img
                    src="/book-marketing-lp/logo.webp"
                    alt="Stamford Publishers"
                    width={140}
                    height={140}
                    className="w-28 xl:w-76 h-auto"
                  />
                </div>
              </div>

              <div className="flex-[1] flex flex-col justify-center gap-14 xl:gap-20 min-w-0">
                {EXECUTION_STEPS.slice(2, 4).map((step) => (
                  <div key={step.number} className="text-left transition-all duration-300 hover:translate-x-1">
                    <span className="block text-4xl xl:text-5xl font-bold text-[#ffc800] leading-none mb-3">
                      {step.number}
                    </span>
                    <h3 className="font-bold text-lg xl:text-xl mb-2 text-[#111]">{step.title}</h3>
                    <p className="text-sm text-[#666] leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:hidden">
              <div className="flex justify-center mb-10">
                <div className="w-44 h-44 rounded-full bg-white flex items-center justify-center shadow-[0_0_50px_rgba(255,200,0,0.35)] transition-all duration-300">
                  <img
                    src="/book-marketing-lp/logo.webp"
                    alt="Stamford Publishers"
                    width={120}
                    height={120}
                    className="w-24 h-auto"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                {EXECUTION_STEPS.map((step) => (
                  <div key={step.number} className="transition-all duration-300 hover:-translate-y-1">
                    <span className="block text-3xl font-bold text-[#ffc800] leading-none mb-2">
                      {step.number}
                    </span>
                    <h3 className="font-bold text-lg mb-2 text-[#111]">{step.title}</h3>
                    <p className="text-sm text-[#666] leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 lg:mt-14">
              <LpButton href="#lp-hero-form" className="px-6 py-3 rounded-full text-sm uppercase tracking-wide">
                Get A Quote
              </LpButton>
              <a href={PHONE_HREF} className="flex items-center gap-3 text-sm font-semibold text-[#111] transition-all duration-300 hover:opacity-80">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#ffc800] shrink-0 transition-colors duration-300 group-hover:bg-[#111]">
                  <FaPhone className="w-4 h-4 text-[#111]" aria-hidden="true" />
                </span>
                <span>
                  <span className="text-[#666] text-xs block leading-tight">Call Now</span>
                  <span className="font-semibold">{PHONE}</span>
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className={`${SECTION_PADDING} bg-white`} aria-labelledby="lp-choose-heading">
          <div className="max-w-[1140px] mx-auto w-full px-4">
            <h2
              id="lp-choose-heading"
              className={`${SECTION_HEADING} max-w-2xl mx-auto text-center mb-8 lg:mb-12`}
            >
              Why Authors Choose Stamford Publishers
            </h2>

            <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
              {WHY_CHOOSE.map((item) => (
                <div
                  key={item.number}
                  className={`bg-[#FFF2C2] rounded-[24px] p-6 sm:p-8 text-left ${CARD_HOVER}`}
                >
                  <h2
                    className="block text-7xl font-bold text-[#ffc800]/45 leading-none mb-4"
                    aria-hidden="true"
                  >
                    {item.number}
                  </h2>
                  <h3 className="text-xl lg:text-[22px] font-bold text-[#111] mb-3 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-[15px] text-[#111] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Packages */}
        <section className={`${SECTION_PADDING} bg-[#FFF5CE]`} aria-labelledby="lp-packages-heading">
          <div className="max-w-[1140px] mx-auto w-full px-4">
            <div className="text-center mb-8 lg:mb-12">
              <h2 id="lp-packages-heading" className={`${SECTION_HEADING} mb-3`}>
                Marketing Packages
              </h2>
              <p className="text-[#555] text-sm max-w-2xl mx-auto">
                Choose a plan that fits your book, budget, and promotional goals. All packages include
                dedicated support and transparent reporting.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
              {MARKETING_PACKAGES.map((plan) => (
                <PricingPlanCard key={plan.name} name={plan.name} features={plan.features} />
              ))}
            </div>
          </div>
        </section>

        {/* Our Works */}
        <section className={`${SECTION_PADDING} bg-[#fff8e6]`} aria-labelledby="lp-works-heading">
          <div className="max-w-[1140px] mx-auto w-full px-4">
            <div className="text-center mb-8">
              <h2 id="lp-works-heading" className={`${SECTION_HEADING} mb-3`}>
                Our Works
              </h2>
              <p className="text-[#555] text-sm max-w-xl mx-auto">
                A look at the campaigns and titles we’ve helped bring to market built on strategy, creativity, and measurable results across genres and platforms.
              </p>
            </div>

            <WorksCarousel />
          </div>
        </section>

        {/* Why Marketing Matters (repeat) */}
        <WhyMarketingSection sectionId="lp-why-heading-2" />

        {/* Testimonials */}
        <section className={`${SECTION_PADDING} bg-[#FFF5CE]`} aria-labelledby="lp-testimonials-heading">
          <div className="max-w-[1140px] mx-auto w-full px-4">
            <div className="text-center mb-8 lg:mb-10">
              <h2
                id="lp-testimonials-heading"
                className={`${SECTION_HEADING} mb-4`}
              >
                What Authors Say
              </h2>
              <p className="text-[#444] text-sm sm:text-[15px] max-w-2xl mx-auto leading-relaxed">
                Authors work with Stamford Publishers because of our transparent communication and
                results-focused approach from debut writers to seasoned authors building out a backlist.
              </p>
            </div>

            <TestimonialsCarousel />
          </div>
        </section>
      </div>

      {/* LP Footer */}
      <footer className={`relative overflow-hidden pt-12 lg:pt-16 pb-8 transition-all duration-300`} aria-label="Contact and footer">
        <div
          className="absolute inset-0 pointer-events-none bg-[#fff8e6]/20 bg-[url('/book-marketing-lp/bannerbg%20(1).webp')] bg-cover bg-center opacity-100"
          aria-hidden="true"
        />
        <div className="absolute inset-0 pointer-events-none bg-[#fff8e6]/88" aria-hidden="true" />

        <div className="relative z-10 max-w-[1140px] mx-auto w-full px-4">

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 mb-12 lg:mb-14">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="flex items-center justify-center w-11 h-11 rounded-full bg-[#ffc800] shrink-0 transition-all duration-300 hover:bg-[#111] group">
                  <FaPhone className="w-4 h-4 text-white transition-colors duration-300" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm text-[#111] mb-0.5">Call Now</p>
                  <a href={PHONE_HREF} className="font-bold text-[#111] hover:opacity-80 transition-opacity">
                    {PHONE_DISPLAY}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex items-center justify-center w-11 h-11 rounded-full bg-[#ffc800] shrink-0 transition-all duration-300 hover:bg-[#111]">
                  <FaEnvelope className="w-4 h-4 text-white" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm text-[#111] mb-0.5">Mail Us</p>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="font-bold text-[#111] hover:opacity-80 transition-opacity break-all"
                  >
                    {EMAIL}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex items-center justify-center w-11 h-11 rounded-full bg-[#ffc800] shrink-0 transition-all duration-300 hover:bg-[#111]">
                  <FaLocationDot className="w-4 h-4 text-white" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm text-[#111] mb-0.5">Find Us</p>
                  <a
                    href="https://maps.google.com/?q=1001+Wilshire+Boulevard+%231439+Los+Angeles+CA+90017"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#111] hover:opacity-80 transition-opacity leading-snug"
                  >
                    1001 Wilshire Boulevard #1439
                    <br />
                    Los Angeles, CA 90017
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-[#ffc800] text-white hover:bg-[#111] transition-all duration-300"
                >
                  <FaFacebookF className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-[#ffc800] text-white hover:bg-[#111] transition-all duration-300"
                >
                  <FaInstagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div>
              <h2 className={`${SECTION_HEADING} text-[#111] mb-2`}>
                We Would Love To Hear From You
              </h2>
              <form onSubmit={handleFormSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                  className={FOOTER_FIELD_CLASS}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className={FOOTER_FIELD_CLASS}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone"
                  required
                  className={FOOTER_FIELD_CLASS}
                />
                <select name="timeline" required className={FOOTER_SELECT_CLASS} defaultValue="3 Months">
                  {TIMELINE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <select name="published" required className={FOOTER_SELECT_CLASS} defaultValue="Yes">
                  {PUBLISHED_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <LpButton type="submit" className="w-full sm:col-span-2 rounded-lg py-3 px-6 text-sm uppercase tracking-wide">
                  Submit Now
                </LpButton>
              </form>
            </div>
          </div>

          <div className="border-t border-[#d8d0c0]/80 pt-6 flex flex-col lg:flex-row items-center justify-between gap-6">
            <p className="text-xs sm:text-sm text-[#111] text-center lg:text-left">
              2026 © Stamford Publishers – All Right Reserved
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-20">
              <img
                src={FOOTER_BADGES.dmca}
                alt="DMCA Protected"
                className="h-10 w-auto object-contain transition-all duration-300 hover:opacity-80"
              />
              <img
                src={FOOTER_BADGES.payments}
                alt="Accepted payment methods"
                className="h-9 w-auto object-contain"
              />
              <img
                src={FOOTER_BADGES.trustpilot}
                alt="Trustpilot rating"
                className="h-12 w-auto object-contain"
              />
            </div>
          </div>
        </div>

        <a
          href="#lp-hero-form"
          className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#0084ff] text-white shadow-[0_4px_20px_rgba(0,132,255,0.45)] hover:bg-[#111] transition-all duration-300 hover:scale-105"
          aria-label="Chat with us"
        >
          <FaComments className="w-6 h-6" aria-hidden="true" />
        </a>
      </footer>

      {popupMounted && popupModal ? createPortal(popupModal, document.body) : null}
    </>
  );
}

const WHY_MARKETING_SHAPE_DIVIDER_MASK = `url("data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100"><path d="m0 4 150 40h160l190 50 190-50h160l150-40V0H0v4z" fill="black"/></svg>',
)}")`;

function PaperEdge({ flip }: { flip: "top" | "bottom" }) {
  return (
    <svg
      viewBox="0 0 95 0 24"
      preserveAspectRatio="none"
      className={`block w-full h-5 sm:h-6 ${flip === "bottom" ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path
        d="M0,24 L80,6 L160,24 L240,6 L320,24 L400,6 L480,24 L560,6 L640,24 L720,6 L800,24 L880,6 L960,24 L1000,6 L1000,24 L0,24 Z"
        fill="#d2d2d2"
      />
    </svg>
  );
}

function PricingPlanCard({ name, features }: { name: string; features: string[] }) {
  return (
    <article className={`relative flex flex-col ${CARD_HOVER}`}>
      <PaperEdge flip="top" />

      <div className="relative bg-[#d2d2d2] px-6 sm:px-7 pt-5 pb-7 transition-all duration-300">
        <div className="absolute inset-0 bg-[#d2d2d2] pointer-events-none" aria-hidden="true" />

        <div className="relative z-10">
          <h3 className="text-center text-xl sm:text-2xl lg:text-3xl font-bold text-[#111] mb-4 transition-all duration-300">{name}</h3>

          <LpButton
            href="#lp-hero-form"
            className="w-full rounded-full text-white text-sm font-light p-2 mb-5 normal-case"
          >
            Chat Now to Avail Discounted Pricing
          </LpButton>

          <ul
            className="max-h-[210px] overflow-y-auto space-y-3 mb-6 pr-2 [scrollbar-width:thin] [scrollbar-color:#4a4a4a_#ffffff] [&::-webkit-scrollbar]:w-2.5 [&::-webkit-scrollbar-track]:bg-white [&::-webkit-scrollbar-thumb]:bg-[#4a4a4a] [&::-webkit-scrollbar-thumb]:rounded-full"
          >
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm text-[#111] leading-relaxed transition-all duration-300">
                <span className="mt-2 w-2 h-2 rounded-full bg-[#ffc800] shrink-0" aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>

          <LpButton
            href="#lp-hero-form"
            className="w-full rounded-full font-semibold text-[15px] py-2 px-6 mb-5 normal-case"
          >
            Get Started
          </LpButton>

          <a href={PHONE_HREF} className="flex items-center justify-center gap-3 group transition-all duration-300">
                <span className="flex items-center justify-center w-11 h-11 rounded-full bg-[#ffc800] shrink-0 transition-all duration-300 group-hover:bg-[#111]">
                  <FaPhone className="w-4 h-4 text-white" aria-hidden="true" />
                </span>
            <span className="text-sm leading-tight text-left">
              <span className="text-[#111] text-xs block">Share Your Idea?</span>
              <span className="font-bold text-[#111]">{PHONE_DISPLAY}</span>
            </span>
          </a>
        </div>
      </div>

      <PaperEdge flip="bottom" />
    </article>
  );
}

function WhyMarketingSection({ sectionId }: { sectionId: string }) {
  const dividerHeight = "h-[60px] sm:h-[80px] lg:h-[100px]";

  const backgroundLayers = (
    <>
      <div
        className="absolute inset-0 pointer-events-none bg-[url('/book-marketing-lp/bannerbg%20(1).webp')] bg-cover bg-[center_30%] bg-fixed bg-no-repeat"
        aria-hidden="true"
      />
      <div className="absolute inset-0 pointer-events-none bg-[#dbdcc0] opacity-[0.88]" aria-hidden="true" />
    </>
  );

  const ShapeBand = ({ className = "" }: { className?: string }) => (
    <div
      className={`relative w-full ${dividerHeight} overflow-hidden rotate-180 ${className}`}
      style={{
        WebkitMaskImage: WHY_MARKETING_SHAPE_DIVIDER_MASK,
        maskImage: WHY_MARKETING_SHAPE_DIVIDER_MASK,
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
      }}
      aria-hidden="true"
    >
      {backgroundLayers}
    </div>
  );

  return (
    <section className="relative mt-12 sm:mt-16 lg:mt-20 transition-all duration-300" aria-labelledby={sectionId}>
      <ShapeBand className="-mb-2" />

      <div className="relative">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {backgroundLayers}
        </div>

        <div className="relative z-10 max-w-[1140px] mx-auto w-full py-10 sm:py-12 lg:py-14 px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative flex justify-center lg:justify-start min-h-0 lg:min-h-[420px]">
              <img
                src="/book-marketing-lp/girlwithtablet.webp"
                alt="Author reviewing book marketing on a tablet"
                className="relative lg:absolute lg:-top-24 lg:left-10 z-[5] w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[400px] h-auto mx-auto lg:mx-0 transition-all duration-300"
              />
            </div>

            <div className="">
              <h2
                id={sectionId}
                className={`${SECTION_HEADING} leading-tight text-[#111] mb-5 sm:mb-6`}
              >
                Why Book Marketing
                <br />
                Matters
              </h2>
              <p className="text-[#111] text-sm sm:text-[15px] leading-relaxed mb-8 max-w-xl transition-all duration-300">
                Publishing a book is only half the journey — getting it read is the other. Our marketing
                programs are built to close that gap, combining audience research, targeted promotion,
                and ongoing optimization so your book doesn&apos;t just exist online, it gets discovered.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
                <LpButton href="#lp-hero-form" className="px-6 py-3 rounded-full font-semibold text-sm normal-case">
                  Get A Quote
                </LpButton>
                <a href={PHONE_HREF} className="flex items-center gap-3 group transition-all duration-300">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#ffc800] shrink-0 group-hover:bg-[#111] transition-colors duration-300">
                    <FaPhone className="w-4 h-4 text-[#111] group-hover:text-white transition-colors duration-300" aria-hidden="true" />
                  </span>
                  <span className="text-sm leading-tight">
                    <span className="text-[#666] text-xs block">Call Now</span>
                    <span className="font-bold text-[#111]">{PHONE}</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ShapeBand className="-mt-2 rotate-360 z-20" />
    </section>
  );
}
