"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from "@/components/ScrollReveal";
import {
  fadeLeft,
  fadeRight,
  motionViewport,
  scaleIn,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";
import { handleLeadFormSubmit } from "@/lib/submit-form";
import { OPEN_QUOTE_POPUP_EVENT, openLiveChat, openQuotePopup } from "@/lib/lead-actions";
import {
  FaBars,
  FaChevronDown,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLocationDot,
  FaPhone,
  FaXmark,
} from "react-icons/fa6";

const PHONE_DISPLAY = "(562) 573-2551";
const PHONE_HREF = "tel:+15625732551";
const EMAIL = "info@stamfordpublishers.com";
const ADDRESS = "1001 Wilshire Boulevard #1439 Los Angeles, CA 90017";
const POPUP_DELAY_MS = 30000;
const POPUP_SESSION_KEY = "ghostwriting-lp-popup-dismissed";

/* Palette */
const PRIMARY = "#F24506";
const PRIMARY_SOFT = "#FFE3D7";
const PRIMARY_TINT = "#FFF4EF";
const BEST_SELLER_BLUE = "#4285F4";
const BAND_GREY = "#E2D8D9";

const CONTAINER = "max-w-[1140px] mx-auto w-full px-4 sm:px-6";
const SECTION_PADDING = "py-12 sm:py-16 lg:py-20";
const SECTION_HEADING =
  "font-sans text-2xl sm:text-3xl lg:text-[50px] font-bold text-[#111] leading-tight";
const BODY_TEXT = "text-sm leading-relaxed text-[#555] sm:text-[15px]";

const NAV_LINKS = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "About Us", href: "#about" },
  { label: "Contact Us", href: "#contact" },
];

const GENRE_OPTIONS = [
  "Audio Book",
  "Fiction",
  "Non-Fiction",
  "Memoir",
  "Business",
  "Children's Book",
  "Self-Help",
  "Other",
];

const HERO_STATS = [
  { end: 400, suffix: "+", label: "Authors Trust Us" },
  { end: 86, suffix: "%", label: "Customer Recurrence" },
  { end: 3000, suffix: "", useComma: true, label: "Editors And Writers" },
  { end: 100, suffix: "%", label: "Client Satisfaction" },
];

const PARTNER_LOGOS = [
  { src: "/cl-1%20(1).webp", alt: "Simon & Schuster" },
  { src: "/cl-3%20(1).webp", alt: "Penguin Random House" },
  { src: "/cl-4%20(1).webp", alt: "Macmillan" },
  { src: "/cl-5%20(1).webp", alt: "HarperCollins" },
];

const AGENCY_POINTS = [
  {
    lead: "100% Custom Writing:",
    body: "No templates or AI generation—every page is written specifically for your project.",
  },
  {
    lead: "Collaborative Process:",
    body: "Chapter-by-chapter reviews ensure your feedback guides the narrative.",
  },
  {
    lead: "Complete Confidentiality:",
    body: "Signed NDAs guarantee that you are recognized as the sole author of your work.",
  },
];

const SERVICE_COVERS = [
  { src: "/childrens-book-lp/Graphic-Google-04-669x1024.webp", alt: "Ghostwritten book cover sample" },
  { src: "/childrens-book-lp/Graphic-Google-05-669x1024.webp", alt: "Ghostwritten book cover sample" },
  { src: "/book-marketing-lp/Graphic-Google.webp", alt: "Ghostwritten book cover sample" },
];

const PLAN_FEATURES = [
  "Your book will be available worldwide on Amazon and other major online",
  "Paperback and eBook",
  "ISBN (International Standard Book Number) included",
  "Print-on-demand setup – order copies anytime at cost price",
  "You retain full rights to your book",
  "Professional listing and optimization for online bookstores",
  "Complete Amazon listing with keywords",
  "Unlimited publishing consultations and support",
  "This package is ideal for authors who want a simple way to publish their book without unnecessary complications",
];

const PLANS = [
  {
    badge: "Basic Start",
    title: "Standard Plan",
    description:
      "Perfect for first-time authors looking for an affordable and hassle-free publishing experience.",
    buttonColor: PRIMARY,
    buttonTextColor: "#FFFFFF",
  },
  {
    badge: "Simple Start",
    title: "Premium Plan",
    description:
      "Designed for authors who want a polished, professional-looking book that stands out.",
    buttonColor: "#111111",
    buttonTextColor: "#FFFFFF",
  },
  {
    badge: "Elite Start",
    title: "Best Seller",
    description:
      "Our complete publishing package for authors who want maximum quality and greater market visibility.",
    buttonColor: BEST_SELLER_BLUE,
    buttonTextColor: "#FFFFFF",
  },
];

const TRUST_REASONS = [
  {
    number: "01",
    title: "Strict Confidentiality & Ownership",
    body: "We sign Non-Disclosure Agreements (NDAs) before starting. You retain 100% rights, credit, and royalties to your manuscript.",
  },
  {
    number: "02",
    title: "Collaborative Chapter Deliveries",
    body: "We submit work in chunks so you can review, provide notes, and approve the direction every step of the way.",
  },
  {
    number: "03",
    title: "End-to-End Publishing Capability",
    body: "Once your ghostwritten manuscript is complete, our team can seamlessly handle editing, layout, cover design, and self-publishing.",
  },
];

const FICTION_POINTS = [
  {
    lead: "Romance & Drama:",
    body: "Emotional depth, rich dialogue, and gripping relationship dynamics.",
  },
  {
    lead: "Sci-Fi & Fantasy:",
    body: "Detailed world-building, internal logic, magic systems, and high-stakes adventure.",
  },
  {
    lead: "Mystery & Thrillers:",
    body: "Pacing, suspense, red herrings, and satisfying plot twists.",
  },
  {
    lead: "Children’s Books:",
    body: "Age-appropriate vocabulary, engaging themes, and storytelling tuned for young minds.",
  },
];

const NONFICTION_POINTS = [
  {
    lead: "Memoirs & Biographies:",
    body: "Preserving your life stories, legacy, and genuine personal tone.",
  },
  {
    lead: "Business & Thought Leadership:",
    body: "Positioning your expertise to build authority and expand your brand.",
  },
  {
    lead: "Self-Help & Personal Growth:",
    body: "Structuring clear, actionable insights that motivate readers to take action.",
  },
];

const SOLUTION_COVERS = [
  { src: "/book-marketing-lp/Graphic-Google-02.webp", alt: "Published book cover" },
  { src: "/book-marketing-lp/Graphic-Google-07.webp", alt: "Published book cover" },
  { src: "/book-marketing-lp/Graphic-Google-08.webp", alt: "Published book cover" },
  { src: "/book-marketing-lp/Graphic-Google-09-scaled.webp", alt: "Published book cover" },
  { src: "/book-marketing-lp/Graphic-Google-03-1-scaled.webp", alt: "Published book cover" },
];

const FAQ_ITEMS = [
  {
    question: "What ghostwriting services does Stamford Publishers offer?",
    answer:
      "Stamford Publishers provides comprehensive ghostwriting services for authors, businesses, and professionals across all genres and formats. Our services include full book ghostwriting for fiction and nonfiction, eBook ghostwriting, memoir and biography writing, business and corporate writing, children's book ghostwriting, and content development for blogs and articles. We also offer manuscript development, editing, and revision services to strengthen existing drafts. Our team of professional ghostwriters works closely with you to capture your unique voice, vision, and message, delivering a polished, publication-ready manuscript that reflects your ideas while maintaining your authenticity. Whether you need a complete book written from scratch or assistance developing your existing concepts, we tailor our services to meet your specific needs and goals.",
  },
  {
    question: "How do you capture my voice and writing style?",
    answer:
      "We begin with in-depth interviews, voice notes, and any existing drafts you have, then build a voice profile covering tone, vocabulary, pacing, and perspective. Your ghostwriter drafts a sample chapter for approval before writing continues, so the voice on the page is unmistakably yours.",
  },
  {
    question: "Do I keep full ownership and credit for my book?",
    answer:
      "Yes. You are the sole author of record. Every project includes a signed NDA and full copyright transfer, so you retain 100% of the credit, rights, and royalties to the finished manuscript.",
  },
  {
    question: "How long does the ghostwriting process take?",
    answer:
      "Most full-length books take between three and eight months depending on word count, genre, and research requirements. We agree on a chapter-by-chapter delivery schedule upfront so you always know what to expect and when.",
  },
  {
    question: "What does ghostwriting cost?",
    answer:
      "Pricing depends on length, genre, and the depth of research involved. After a free consultation we send a fixed, itemized quote with milestone-based payments — no hidden fees and no surprises once writing begins.",
  },
  {
    question: "Can you also publish and market the book?",
    answer:
      "Absolutely. Once your manuscript is approved we can handle editing, interior layout, cover design, ISBN registration, distribution to Amazon and other major retailers, and ongoing book marketing.",
  },
];

const PAYMENT_LOGOS = [
  { src: "/book-marketing-lp/pay-1.webp", alt: "Visa, PayPal, Stripe, and Mastercard accepted" },
];

const REVIEW_LOGOS = [
  { src: "/book-marketing-lp/dmc%20(1).webp", alt: "Clutch reviews" },
  { src: "/book-marketing-lp/trustpilot-1.webp", alt: "Trustpilot reviews" },
  { src: "/childrens-book-lp/google.webp", alt: "Google reviews" },
];

const FOOTER_QUICK_LINKS = [
  { label: "Home", href: "#top" },
  { label: "About Us", href: "#about" },
  { label: "Contact Us", href: "#contact" },
];

const FOOTER_SERVICES = [
  { label: "Book Publishing Services", href: "#services" },
  { label: "Book Marketing Services", href: "#services" },
  { label: "Audiobook Services", href: "#services" },
  { label: "Childrens Book Publishing", href: "#services" },
];

const SOCIAL_LINKS = [
  { icon: FaFacebookF, label: "Facebook", href: "https://facebook.com" },
  { icon: FaInstagram, label: "Instagram", href: "https://instagram.com" },
];

const BTN_BASE =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-95";

const LINE_FIELD =
  "w-full border-0 border-b border-[#DCD3CE] bg-transparent px-1 pb-2.5 pt-2 text-sm text-[#111] outline-none transition-colors duration-300 placeholder:text-[#9C9C9C] focus:border-[#F24506]";

const LINE_SELECT = `${LINE_FIELD} form-select form-select-arrow-muted`;

function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
  return handleLeadFormSubmit(e, "/Ghostwriting/lp");
}

function PrimaryButton({
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
  const classes = `${BTN_BASE} text-white hover:brightness-95 ${className}`;
  const style = { backgroundColor: PRIMARY };
  if (href) {
    return (
      <a href={href} className={classes} style={style} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} className={classes} style={style} onClick={onClick}>
      {children}
    </button>
  );
}

function DarkButton({
  children,
  href,
  className = "",
  onClick,
}: {
  children: ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
}) {
  const classes = `${BTN_BASE} bg-[#111] text-white hover:bg-black ${className}`;
  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  );
}

function CtaPair({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center ${className}`}>
      <DarkButton onClick={openQuotePopup}>Get Started</DarkButton>
      <DarkButton onClick={openLiveChat}>Chat Now</DarkButton>
      <PrimaryButton href={PHONE_HREF}>Free Consultation</PrimaryButton>
    </div>
  );
}

function LeadPoint({ lead, body }: { lead: string; body: string }) {
  return (
    <li className="flex items-start gap-3 text-sm leading-relaxed text-[#555]">
      <span
        className="mt-[7px] h-2 w-2 shrink-0 rounded-full"
        style={{ backgroundColor: PRIMARY }}
        aria-hidden="true"
      />
      <span>
        <strong className="font-semibold text-[#111]">{lead}</strong> {body}
      </span>
    </li>
  );
}

function StatCounter({
  end,
  suffix = "",
  useComma = false,
  className = "",
}: {
  end: number;
  suffix?: string;
  useComma?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    if (reduceMotion) {
      setCount(end);
      return;
    }

    const duration = 1800;
    const startTime = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(end * eased));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [end, isInView, reduceMotion]);

  return (
    <p ref={ref} className={className} style={{ color: PRIMARY }}>
      {useComma ? count.toLocaleString() : count}
      {suffix}
    </p>
  );
}

function MotionColumn({
  children,
  from = "left",
  className = "",
}: {
  children: ReactNode;
  from?: "left" | "right";
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const variants = from === "left" ? fadeLeft : fadeRight;

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={motionViewport}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

function LeadForm({ id }: { id?: string }) {
  return (
    <form id={id} onSubmit={handleFormSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        <input type="text" name="name" placeholder="Name" required className={LINE_FIELD} />
        <input type="email" name="email" placeholder="Email" required className={LINE_FIELD} />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        <input
          type="tel"
          name="phone"
          placeholder="123-456-7890"
          required
          className={LINE_FIELD}
        />
        <select name="genre" defaultValue="Audio Book" className={LINE_SELECT}>
          {GENRE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <input
        type="text"
        name="bookTitle"
        placeholder="Book Title"
        className={LINE_FIELD}
      />
      <textarea
        name="aboutBook"
        placeholder="Tell Us About Your Book"
        rows={4}
        className={`${LINE_FIELD} min-h-[90px] resize-y`}
      />
      <button
        type="submit"
        className="w-full cursor-pointer rounded-md px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:brightness-95 hover:shadow-lg active:scale-[0.99]"
        style={{ backgroundColor: PRIMARY }}
      >
        Submit Now
      </button>
    </form>
  );
}

function FaqAnswer({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
      animate={reduceMotion ? undefined : { height: "auto", opacity: 1 }}
      exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden"
    >
      <p className="px-4 py-5 text-[13px] leading-relaxed text-[#555] sm:px-6">{children}</p>
    </motion.div>
  );
}

export default function GhostwritingLpPage() {
  const reduceMotion = useReducedMotion();
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMounted, setPopupMounted] = useState(false);

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
    const timer = window.setTimeout(() => setPopupOpen(true), POPUP_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const open = () => setPopupOpen(true);
    window.addEventListener(OPEN_QUOTE_POPUP_EVENT, open);
    return () => window.removeEventListener(OPEN_QUOTE_POPUP_EVENT, open);
  }, []);

  const closePopup = () => {
    setPopupOpen(false);
    try {
      sessionStorage.setItem(POPUP_SESSION_KEY, "1");
    } catch {
      // ignore
    }
  };

  const popupModal =
    popupOpen && popupMounted
      ? createPortal(
          <motion.div
            className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto bg-black/55 px-4 pt-10 pb-6 backdrop-blur-sm sm:items-center sm:overflow-hidden sm:p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="gw-popup-heading"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="relative my-auto grid w-full max-w-[920px] rounded-2xl bg-white shadow-[0_24px_64px_rgba(0,0,0,0.25)] md:max-h-[90vh] md:grid-cols-[42%_58%] md:overflow-hidden"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.94, y: 24 }}
              animate={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                onClick={closePopup}
                className="absolute top-3 right-3 z-20 flex h-8 w-8 items-center justify-center rounded-md bg-[#111] text-white hover:bg-[#333] sm:top-4 sm:right-4"
                aria-label="Close popup"
              >
                <FaXmark className="h-3.5 w-3.5" />
              </button>
              <div
                className="flex min-h-[280px] flex-col p-6 pr-12 text-white lg:p-8"
                style={{ backgroundColor: PRIMARY }}
              >
                <h2
                  id="gw-popup-heading"
                  className="mb-3 font-sans text-2xl font-bold leading-tight sm:text-3xl"
                >
                  Bring Your Book Idea to Life With Expert Ghostwriters
                </h2>
                <div className="mb-6 space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <FaPhone className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                    <div>
                      <h3 className="font-bold">Call Us</h3>
                      <a href={PHONE_HREF} className="hover:underline">
                        {PHONE_DISPLAY}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaEnvelope className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                    <div>
                      <h3 className="font-bold">Discuss your story</h3>
                      <a href={`mailto:${EMAIL}`} className="break-all hover:underline">
                        {EMAIL}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-auto flex justify-center">
                  <img
                    src="/ghostwriting-lp/form-img.webp"
                    alt="Ghostwriting consultation"
                    className="max-h-[200px] w-full max-w-[280px] rounded-xl object-contain"
                  />
                </div>
              </div>
              <div className="p-6 sm:p-8 md:max-h-[90vh] md:overflow-y-auto">
                <form
                  onSubmit={(e) => handleLeadFormSubmit(e, "/Ghostwriting/lp-popup")}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                    <input type="text" name="name" placeholder="Name" required className={LINE_FIELD} />
                    <input type="email" name="email" placeholder="Email" required className={LINE_FIELD} />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="123-456-7890"
                      required
                      className={LINE_FIELD}
                    />
                    <select name="genre" defaultValue="Audio Book" className={LINE_SELECT}>
                      {GENRE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <input
                    type="text"
                    name="bookTitle"
                    placeholder="Book Title"
                    className={LINE_FIELD}
                  />
                  <textarea
                    name="aboutBook"
                    placeholder="Tell Us About Your Book"
                    rows={4}
                    className={`${LINE_FIELD} min-h-[90px] resize-y`}
                  />
                  <button
                    type="submit"
                    className="w-full cursor-pointer rounded-md px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:brightness-95 hover:shadow-lg active:scale-[0.99]"
                    style={{ backgroundColor: PRIMARY }}
                  >
                    Submit Now
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>,
          document.body,
        )
      : null;

  return (
    <>
      {/* Navbar */}
      <motion.header
        initial={reduceMotion ? false : { y: -24, opacity: 0 }}
        animate={reduceMotion ? undefined : { y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 w-full bg-white shadow-sm transition-all duration-300 ${
          headerScrolled ? "shadow-md" : ""
        }`}
      >
        <div className={`${CONTAINER} py-3`}>
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            <a
              href="#top"
              className="shrink-0 transition-opacity duration-300 hover:opacity-80"
              aria-label="Stamford Publishers"
            >
              <img
                src="/ghostwriting-lp/logo.webp"
                alt="Stamford Publishers"
                width={150}
                height={150}
                className="w-24 sm:w-28"
              />
            </a>

            <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-[#111] transition-colors duration-300 hover:text-[#F24506]"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <DarkButton
                onClick={openLiveChat}
                className="shrink-0 px-4 py-2.5 text-xs sm:px-5 sm:text-sm"
              >
                Chat Now
              </DarkButton>
              <PrimaryButton
                onClick={openQuotePopup}
                className="hidden lg:inline-flex shrink-0 px-5 py-2.5 text-sm"
              >
                Get A Quote
              </PrimaryButton>
              <button
                type="button"
                onClick={() => setMobileNavOpen((prev) => !prev)}
                aria-expanded={mobileNavOpen}
                aria-label="Toggle navigation menu"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-white transition-transform duration-300 hover:scale-105 lg:hidden"
                style={{ backgroundColor: PRIMARY }}
              >
                {mobileNavOpen ? (
                  <FaXmark className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <FaBars className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {mobileNavOpen && (
              <motion.nav
                initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                animate={reduceMotion ? undefined : { height: "auto", opacity: 1 }}
                exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden lg:hidden"
                aria-label="Mobile"
              >
                <div className="mt-3 space-y-1 rounded-2xl bg-white p-4 shadow-lg">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileNavOpen(false)}
                      className="block rounded-lg px-3 py-2 text-sm font-medium text-[#111] transition-colors duration-300 hover:bg-[#FFF4EF] hover:text-[#F24506]"
                    >
                      {link.label}
                    </a>
                  ))}
                  <a
                    href={PHONE_HREF}
                    className="block rounded-lg px-3 py-2 text-sm font-semibold text-[#F24506]"
                  >
                    {PHONE_DISPLAY}
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileNavOpen(false);
                      openLiveChat();
                    }}
                    className="block w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-[#111]"
                  >
                    Chat Now
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileNavOpen(false);
                      openQuotePopup();
                    }}
                    className="block w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-[#F24506]"
                  >
                    Get A Quote
                  </button>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <div className="overflow-x-hidden">
        {/* Hero */}
        <section
          id="top"
          className="relative overflow-hidden pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-36 lg:pb-20"
          style={{
            background: `linear-gradient(120deg, #FFF7F4 0%, ${PRIMARY_TINT} 38%, ${PRIMARY_SOFT} 100%)`,
          }}
          aria-labelledby="gw-hero-heading"
        >
          <div className={`${CONTAINER} relative z-10`}>
            <div className="grid min-w-0 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
              <motion.div
                className="min-w-0"
                initial={reduceMotion ? false : "hidden"}
                animate={reduceMotion ? undefined : "visible"}
                variants={staggerContainer}
              >
                <motion.h1
                  id="gw-hero-heading"
                  variants={staggerItem}
                  className="mb-5 font-sans text-3xl font-bold leading-[1.15] text-[#111] sm:text-4xl lg:text-[50px]!"
                >
                  Professional{" "}
                  <span style={{ color: PRIMARY }}>Book &amp; eBook Ghostwriting</span> Services
                </motion.h1>
                <motion.p variants={staggerItem} className={`mb-8 max-w-xl ${BODY_TEXT}`}>
                  At Stamford Publishers, we bring your story, concepts, and ideas to life with
                  compelling, publication-ready manuscripts. Our team of experienced book
                  ghostwriters collaborates closely with you to capture your unique voice, structure
                  your narrative, and craft a book that resonates with readers—all while you retain
                  100% of the credit and copyright.
                </motion.p>

                <motion.div variants={staggerItem}>
                  <CtaPair className="mb-10" />
                </motion.div>

                <motion.div
                  variants={staggerItem}
                  className="grid max-w-xl grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 text-center"
                >
                  {HERO_STATS.map((stat) => (
                    <div key={stat.label}>
                      <StatCounter
                        end={stat.end}
                        suffix={stat.suffix}
                        useComma={stat.useComma}
                        className="mb-1 font-sans text-3xl font-bold leading-none sm:text-[32px]!"
                      />
                      <p className="text-xs leading-snug text-[#555]">{stat.label}</p>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              <ScrollReveal variants={scaleIn} delay={0.15} className="min-w-0">
                <div className="rounded-2xl bg-white p-2.5 shadow-[0_18px_50px_rgba(0,0,0,0.10)]">
                  <div className="px-5 py-4 sm:px-6 sm:py-5 -ml-20 max-sm:ml-0 rounded-2xl" style={{ backgroundColor: PRIMARY }}>
                    <h2 className="mb-1.5 font-sans text-lg font-bold leading-tight text-white sm:text-xl">
                      Activate Your Coupon To Avail 40% Discount
                    </h2>
                    <p className="text-xs text-white/90 sm:text-[13px]">
                      It’s a limited time offer so hurry up! Don’t wait!
                    </p>
                  </div>
                  <div className="px-4 pb-5 pt-6 sm:px-6">
                    <LeadForm id="hero-form" />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Trust bar */}
        <section className="bg-white py-7 sm:py-9" aria-label="Publishing partners">
          <div className={CONTAINER}>
            <ScrollStagger className="flex flex-wrap items-center justify-center gap-8 sm:justify-between sm:gap-8 lg:gap-10">
              {PARTNER_LOGOS.map((logo) => (
                <ScrollStaggerItem key={logo.src}>
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-7 w-auto max-w-[100px] object-contain opacity-70 grayscale transition-all duration-300 hover:scale-105 hover:opacity-100 sm:h-9 sm:max-w-[140px] lg:h-10"
                    loading="lazy"
                  />
                </ScrollStaggerItem>
              ))}
            </ScrollStagger>
          </div>
        </section>

        {/* Ghostwriting agency */}
        <section id="about" className={SECTION_PADDING} aria-labelledby="gw-agency-heading">
          <div className={CONTAINER}>
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <MotionColumn from="left">
                <img
                  src="/ghostwriting-lp/sec-1.webp"
                  alt="Ghostwriter drafting a manuscript"
                  className="h-[280px] w-full rounded-2xl object-cover shadow-lg transition-transform duration-500 hover:scale-[1.02] sm:h-[380px] lg:h-[600px]"
                  loading="lazy"
                />
              </MotionColumn>
              <MotionColumn from="right">
                <ScrollReveal>
                  <h2 id="gw-agency-heading" className={`${SECTION_HEADING} mb-4 lg:text-4xl!`}>
                    A Ghostwriting Agency Driven by Experience &amp; Expertise
                  </h2>
                  <p className={`mb-4 ${BODY_TEXT}`}>
                    With over a decade in the ghostwriting industry, Stamford Publishers has helped
                    entrepreneurs, visionaries, educators, and storytellers become published authors.
                  </p>
                  <p className={`mb-6 ${BODY_TEXT}`}>
                    We combine thorough research, narrative pacing, and tailored tone matching to
                    turn your raw notes, outlines, or spoken thoughts into a polished book. Whether
                    you need a fiction ghostwriter, an eBook specialist, a business
                    thought-leadership book, or a deeply personal memoir, we deliver manuscripts
                    built to captivate.
                  </p>
                </ScrollReveal>
                <ScrollStagger className="mb-8 list-none space-y-3.5">
                  {AGENCY_POINTS.map((point) => (
                    <ScrollStaggerItem key={point.lead}>
                      <LeadPoint lead={point.lead} body={point.body} />
                    </ScrollStaggerItem>
                  ))}
                </ScrollStagger>
                <ScrollReveal delay={0.1}>
                  <CtaPair />
                </ScrollReveal>
              </MotionColumn>
            </div>
          </div>
        </section>

        {/* Bringing your story to life */}
        <section className={`${SECTION_PADDING} pt-0!`} aria-labelledby="gw-story-heading">
          <div className={CONTAINER}>
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <MotionColumn from="left">
                <ScrollReveal>
                  <h2 id="gw-story-heading" className={`${SECTION_HEADING} mb-4 lg:text-4xl!`}>
                    Bringing Your Story to Life
                  </h2>
                  <p className={`mb-4 ${BODY_TEXT}`}>
                    Not everyone has the time or specialized craft to structure plotlines, draft
                    realistic dialogue, or organize complex research into a seamless book. That
                    shouldn’t prevent your ideas from reaching the world.
                  </p>
                  <p className={`mb-8 ${BODY_TEXT}`}>
                    When you partner with Stamford Publishers, we match you with a dedicated
                    ghostwriter experienced in your specific genre. We turn your outline, voice
                    notes, or rough drafts into an engaging reading experience—handling the writing
                    so you can focus on sharing your message.
                  </p>
                  <CtaPair />
                </ScrollReveal>
              </MotionColumn>
              <MotionColumn from="right">
                <img
                  src="/ghostwriting-lp/sec-2.webp"
                  alt="Notebook, pen, and story outline on a desk"
                  className="h-[240px] w-full rounded-2xl object-cover shadow-lg transition-transform duration-500 hover:scale-[1.02] sm:h-[320px] lg:h-[380px]"
                  loading="lazy"
                />
              </MotionColumn>
            </div>
          </div>
        </section>

        {/* Complete professional ghostwriting services */}
        <section id="services" className={SECTION_PADDING} aria-labelledby="gw-services-heading">
          <div className={CONTAINER}>
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <MotionColumn from="left">
                <ScrollReveal>
                  <h2 id="gw-services-heading" className={`${SECTION_HEADING} mb-3 lg:text-4xl!`}>
                    Complete Professional{" "}
                    <span style={{ color: PRIMARY }}>Ghostwriting Services</span>
                  </h2>
                  <p className={`mb-8 ${BODY_TEXT}`}>
                    We edit, write and illustrate, then publish and promote books.
                  </p>
                  <CtaPair />
                </ScrollReveal>
              </MotionColumn>
              <MotionColumn from="right">
                <div className="grid grid-cols-3 items-end gap-3 sm:gap-4">
                  {SERVICE_COVERS.map((cover, index) => (
                    <img
                      key={cover.src}
                      src={cover.src}
                      alt={cover.alt}
                      className={`h-[150px] w-full rounded-lg object-cover shadow-lg transition-transform duration-500 hover:-translate-y-1 sm:h-[220px] lg:h-[260px] ${
                        index === 1 ? "-translate-y-4 sm:-translate-y-6" : ""
                      }`}
                      loading="lazy"
                    />
                  ))}
                </div>
              </MotionColumn>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className={SECTION_PADDING} aria-labelledby="gw-pricing-heading">
          <div className={CONTAINER}>
            <ScrollReveal className="mb-8 text-center sm:mb-12">
              <h2
                id="gw-pricing-heading"
                className={`${SECTION_HEADING} mx-auto mb-3 max-w-2xl`}
              >
                Choose The <span style={{ color: PRIMARY }}>Ghostwriting Plan</span> That Fits Your
                Vision
              </h2>
              <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#555]">
                All ghostwriting packages include dedicated project management, chapter reviews,
                professional editing, and full copyright transfer.
              </p>
            </ScrollReveal>

            <ScrollStagger className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5 lg:gap-6">
              {PLANS.map((plan) => (
                <ScrollStaggerItem key={plan.title} className="h-full">
                  <article className="flex h-full flex-col rounded-2xl border border-black/5 bg-white p-6 shadow-[0_10px_36px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_44px_rgba(0,0,0,0.12)] lg:p-7">
                    <span
                      className="mx-auto mb-4 inline-flex rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white"
                      style={{ backgroundColor: PRIMARY }}
                    >
                      {plan.badge}
                    </span>
                    <h3 className="mb-3 text-center font-sans text-xl font-bold text-[#111] sm:text-2xl">
                      {plan.title}
                    </h3>
                    <p className="mb-5 text-center text-[13px] leading-relaxed text-[#555]">
                      {plan.description}
                    </p>
                    <ul className="mb-6 max-h-[260px] list-none space-y-3 overflow-y-auto pr-3 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#C9C9C9] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#EFEFEF] [&::-webkit-scrollbar]:w-1">
                      {PLAN_FEATURES.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-3 text-[13px] leading-relaxed text-[#555]"
                        >
                          <span
                            className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-sm bg-[#111]"
                            aria-hidden="true"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={openQuotePopup}
                      className={`${BTN_BASE} mt-auto w-full text-xs uppercase tracking-wide hover:brightness-95`}
                      style={{
                        backgroundColor: plan.buttonColor,
                        color: plan.buttonTextColor,
                      }}
                    >
                      Buy Your Plan
                    </button>
                  </article>
                </ScrollStaggerItem>
              ))}
            </ScrollStagger>
          </div>
        </section>

        {/* Why authors trust us */}
        <section className={SECTION_PADDING} aria-labelledby="gw-trust-heading">
          <div className={CONTAINER}>
            <ScrollReveal className="mb-10 text-center sm:mb-14">
              <h2 id="gw-trust-heading" className={`${SECTION_HEADING} mx-auto mb-3 max-w-2xl`}>
                Why Authors Trust <span style={{ color: PRIMARY }}>Stamford Publishers</span>
              </h2>
              <p className="mx-auto max-w-xl text-sm leading-relaxed text-[#555]">
                Here’s what makes Stamford Publishers the preferred publishing partner for authors.
              </p>
            </ScrollReveal>

            <ScrollStagger className="mb-10 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6 lg:gap-10">
              {TRUST_REASONS.map((reason) => (
                <ScrollStaggerItem key={reason.number}>
                  <div className="relative pt-8 pl-4 sm:pl-6">
                    <span
                      className="pointer-events-none absolute left-0 top-0 font-sans text-[64px] font-bold leading-none sm:text-[72px]"
                      style={{ color: PRIMARY_SOFT }}
                      aria-hidden="true"
                    >
                      {reason.number}
                    </span>
                    <h3
                      className="relative mb-2 font-sans text-lg font-bold leading-snug sm:text-xl"
                      style={{ color: PRIMARY }}
                    >
                      {reason.title}
                    </h3>
                    <p className="relative text-[13px] leading-relaxed text-[#555]">
                      {reason.body}
                    </p>
                  </div>
                </ScrollStaggerItem>
              ))}
            </ScrollStagger>

            <ScrollReveal delay={0.1}>
              <CtaPair className="sm:justify-center" />
            </ScrollReveal>
          </div>
        </section>

        {/* Mastery in fiction and nonfiction */}
        <section className={SECTION_PADDING} aria-labelledby="gw-fiction-heading">
          <div className={CONTAINER}>
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <MotionColumn from="left">
                <img
                  src="/ghostwriting-lp/mastery.webp"
                  alt="Stack of published books"
                  className="h-[280px] w-full rounded-2xl object-cover shadow-lg transition-transform duration-500 hover:scale-[1.02] sm:h-[400px] lg:h-[500px]"
                  loading="lazy"
                />
              </MotionColumn>
              <MotionColumn from="right">
                <ScrollReveal>
                  <h2 id="gw-fiction-heading" className={`${SECTION_HEADING} mb-4 lg:text-4xl!`}>
                    Mastery in Fiction and Nonfiction
                  </h2>
                  <p className={`mb-2 ${BODY_TEXT}`}>
                    Crafting captivating fiction requires vivid imagination, emotional depth, and
                    precise plot structure. Our ghostwriters excel in bringing immersive worlds and
                    compelling character arcs to life across popular fiction genres:
                  </p>
                </ScrollReveal>
                <ScrollStagger className="mb-8 list-none space-y-3.5">
                  {FICTION_POINTS.map((point) => (
                    <ScrollStaggerItem key={point.lead}>
                      <LeadPoint lead={point.lead} body={point.body} />
                    </ScrollStaggerItem>
                  ))}
                </ScrollStagger>
                <ScrollReveal delay={0.1}>
                  <CtaPair />
                </ScrollReveal>
              </MotionColumn>
            </div>
          </div>
        </section>

        {/* Non-fiction and memoir */}
        <section className={`${SECTION_PADDING} pt-0!`} aria-labelledby="gw-nonfiction-heading">
          <div className={CONTAINER}>
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <MotionColumn from="left">
                <ScrollReveal>
                  <h2 id="gw-nonfiction-heading" className={`${SECTION_HEADING} mb-4 lg:text-4xl!`}>
                    Non-Fiction &amp; Memoir Ghostwriting
                  </h2>
                  <p className={`mb-6 ${BODY_TEXT}`}>
                    For non-fiction, credibility, clarity, and authority are key. We combine
                    meticulous research with accessible writing to elevate your voice:
                  </p>
                </ScrollReveal>
                <ScrollStagger className="mb-8 list-none space-y-3.5">
                  {NONFICTION_POINTS.map((point) => (
                    <ScrollStaggerItem key={point.lead}>
                      <LeadPoint lead={point.lead} body={point.body} />
                    </ScrollStaggerItem>
                  ))}
                </ScrollStagger>
                <ScrollReveal delay={0.1}>
                  <CtaPair />
                </ScrollReveal>
              </MotionColumn>
              <MotionColumn from="right">
                <img
                  src="/ghostwriting-lp/sec-3.webp"
                  alt="Author reading in a library"
                  className="h-[240px] w-full rounded-2xl object-cover shadow-lg transition-transform duration-500 hover:scale-[1.02] sm:h-[340px] lg:h-[450px]"
                  loading="lazy"
                />
              </MotionColumn>
            </div>
          </div>
        </section>

        {/* Complete solution band */}
        <section
          className={SECTION_PADDING}
          style={{ backgroundColor: BAND_GREY }}
          aria-labelledby="gw-solution-heading"
        >
          <div className={CONTAINER}>
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <MotionColumn from="left">
                <h2 id="gw-solution-heading" className={`${SECTION_HEADING} mb-3 lg:text-4xl!`}>
                  A Complete Solution to{" "}
                  <span style={{ color: PRIMARY }}>Self-Publishing &amp; Ghostwriting</span>{" "}
                  Services
                </h2>
                <p className="mb-8 text-sm leading-relaxed text-[#4A4142] sm:text-[15px]">
                  That Helps You Increase Readers’ Interest &amp; Your Popularity
                </p>
                <CtaPair />
              </MotionColumn>
              <MotionColumn from="right">
                <div className="flex items-center justify-center">
                  {SOLUTION_COVERS.map((cover, index) => {
                    const offsets = [
                      "h-[130px] sm:h-[170px] rotate-[-6deg]",
                      "h-[150px] sm:h-[195px] rotate-[-3deg]",
                      "h-[175px] sm:h-[230px] z-10",
                      "h-[150px] sm:h-[195px] rotate-[3deg]",
                      "h-[130px] sm:h-[170px] rotate-[6deg]",
                    ];
                    return (
                      <img
                        key={cover.src}
                        src={cover.src}
                        alt={cover.alt}
                        className={`${offsets[index]} w-auto rounded-md object-cover shadow-[0_10px_28px_rgba(0,0,0,0.22)] transition-transform duration-500 hover:-translate-y-2 ${
                          index === 0 ? "" : "-ml-4 sm:-ml-6"
                        }`}
                        loading="lazy"
                      />
                    );
                  })}
                </div>
              </MotionColumn>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className={SECTION_PADDING} aria-labelledby="gw-faq-heading">
          <div className={CONTAINER}>
            <ScrollReveal className="mb-8 text-center sm:mb-10">
              <h2 id="gw-faq-heading" className={SECTION_HEADING}>
                Frequently Asked Questions
              </h2>
            </ScrollReveal>

            <ScrollStagger className="mx-auto max-w-4xl">
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openFaq === index;
                return (
                  <ScrollStaggerItem key={item.question}>
                    <div
                      className={`overflow-hidden ${
                        isOpen ? "mb-3" : "border-b border-black/10"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? -1 : index)}
                        aria-expanded={isOpen}
                        className={`flex w-full cursor-pointer items-center justify-between gap-4 px-4 py-4 text-left text-sm font-semibold transition-colors duration-300 sm:px-6 ${
                          isOpen ? "text-white" : "text-[#111] hover:text-[#F24506]"
                        }`}
                        style={isOpen ? { backgroundColor: PRIMARY } : undefined}
                      >
                        <span>{item.question}</span>
                        <motion.span
                          animate={reduceMotion ? undefined : { rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="shrink-0"
                        >
                          <FaChevronDown
                            className={`h-3 w-3 ${isOpen ? "text-white" : "text-[#888]"}`}
                            aria-hidden="true"
                          />
                        </motion.span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && <FaqAnswer>{item.answer}</FaqAnswer>}
                      </AnimatePresence>
                    </div>
                  </ScrollStaggerItem>
                );
              })}
            </ScrollStagger>
          </div>
        </section>

        {/* Payment methods and reviews */}
        <section className="border-y border-black/10 bg-white py-8 sm:py-10" aria-label="Payment methods and reviews">
          <div className={CONTAINER}>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10">
              <ScrollReveal className="text-center">
                <p className="mb-5 text-sm font-semibold text-[#111]">Payment Methods</p>
                <div className="flex flex-wrap items-center justify-center gap-6">
                  {PAYMENT_LOGOS.map((logo) => (
                    <img
                      key={logo.src}
                      src={logo.src}
                      alt={logo.alt}
                      className="w-48 object-contain transition-transform duration-300 hover:scale-105 sm:w-60"
                      loading="lazy"
                    />
                  ))}
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.1} className="text-center">
                <p className="mb-5 text-sm font-semibold text-[#111]">Reviews</p>
                <div className="flex flex-wrap items-center justify-center gap-8">
                  {REVIEW_LOGOS.map((logo) => (
                    <img
                      key={logo.src}
                      src={logo.src}
                      alt={logo.alt}
                      className="h-7 w-auto max-w-[110px] object-contain transition-transform duration-300 hover:scale-105 sm:h-8"
                      loading="lazy"
                    />
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Pitch your book idea */}
        <section
          id="contact"
          className={SECTION_PADDING}
          style={{
            background: `linear-gradient(150deg, ${PRIMARY_TINT} 0%, ${PRIMARY_SOFT} 55%, #FFF6F2 100%)`,
          }}
          aria-labelledby="gw-pitch-heading"
        >
          <div className={CONTAINER}>
            <ScrollReveal className="mb-8">
              <h2 id="gw-pitch-heading" className={SECTION_HEADING}>
                Pitch Your Book Idea
              </h2>
            </ScrollReveal>
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <MotionColumn from="left">
                <img
                  src="/ghostwriting-lp/form-img.webp"
                  alt="Open book illustration"
                  className="w-full object-contain transition-transform duration-500 hover:scale-[1.02]"
                  loading="lazy"
                />
              </MotionColumn>
              <MotionColumn from="right">
                <LeadForm id="pitch-form" />
              </MotionColumn>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-white pt-12 pb-10 sm:pt-16" aria-label="Site footer">
        <div className={CONTAINER}>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_1.1fr_1.1fr] lg:gap-12">
            <ScrollReveal>
              <img
                src="/ghostwriting-lp/logo.webp"
                alt="Stamford Publishers"
                className="mb-5 w-40 transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
              <p className="text-[13px] leading-relaxed text-[#555]">
                Since 2014, Stamford Publishers has provided professional writing and marketing
                support to authors, offering a smooth process from initial concept to final
                promotion. Our team combines creativity, strategy, and publishing expertise to help
                authors bring their ideas to life and reach a wider audience.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
              <h3 className="mb-4 font-sans text-base font-bold text-[#111]">Quick Links</h3>
              <ul className="list-none space-y-3">
                {FOOTER_QUICK_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="inline-block text-[13px] text-[#555] transition-all duration-300 hover:translate-x-1 hover:text-[#F24506]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h3 className="mb-4 font-sans text-base font-bold text-[#111]">Services</h3>
              <ul className="list-none space-y-3">
                {FOOTER_SERVICES.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="inline-block text-[13px] text-[#555] transition-all duration-300 hover:translate-x-1 hover:text-[#F24506]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <h3 className="mb-4 font-sans text-base font-bold text-[#111]">Contact</h3>
              <ul className="list-none space-y-3">
                <li className="flex items-start gap-3">
                  <FaPhone
                    className="mt-1 h-3.5 w-3.5 shrink-0"
                    style={{ color: PRIMARY }}
                    aria-hidden="true"
                  />
                  <a
                    href={PHONE_HREF}
                    className="text-[13px] text-[#555] transition-opacity duration-300 hover:opacity-70"
                  >
                    {PHONE_DISPLAY}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <FaEnvelope
                    className="mt-1 h-3.5 w-3.5 shrink-0"
                    style={{ color: PRIMARY }}
                    aria-hidden="true"
                  />
                  <a
                    href={`mailto:${EMAIL}`}
                    className="break-all text-[13px] text-[#555] transition-opacity duration-300 hover:opacity-70"
                  >
                    {EMAIL}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <FaLocationDot
                    className="mt-1 h-3.5 w-3.5 shrink-0"
                    style={{ color: PRIMARY }}
                    aria-hidden="true"
                  />
                  <p className="text-[13px] leading-relaxed text-[#555]">{ADDRESS}</p>
                </li>
              </ul>

              <h3 className="mb-4 mt-7 font-sans text-base font-bold text-[#111]">Social Media</h3>
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="flex h-8 w-8 items-center justify-center rounded text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#111]"
                    style={{ backgroundColor: PRIMARY }}
                  >
                    <social.icon className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </footer>
      {popupModal}
    </>
  );
}
