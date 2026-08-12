"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from "@/components/ScrollReveal";
import {
  fadeIn,
  fadeLeft,
  fadeRight,
  motionTransition,
  motionViewport,
  scaleIn,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";
import { handleLeadFormSubmit } from "@/lib/submit-form";
import {
  FaBookOpen,
  FaBook,
  FaBullhorn,
  FaCheck,
  FaComments,
  FaEnvelope,
  FaGlobe,
  FaHeadset,
  FaImages,
  FaPaintbrush,
  FaPenToSquare,
  FaPencil,
  FaPhone,
  FaPlus,
  FaStar,
  FaTrophy,
  FaUser,
  FaXmark,
  FaMinus,
} from "react-icons/fa6";

const PHONE = "+1 562 573 2551";
const PHONE_HREF = "tel:+15625732551";
const PHONE_DISPLAY = "(562) 573-2551";
const EMAIL = "info@stamfordpublishers.com";
const POPUP_DELAY_MS = 2000;
const POPUP_SESSION_KEY = "childrens-book-lp-popup-dismissed";

/* Colors from reference image */
const YELLOW = "#FDD835";
const PURPLE = "#9C27B0";
const TEAL = "#B2EBF2";
const TEAL_SOFT = "#E0F7FA";

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

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Pricing", href: "#mid-cta" },
  { label: "Contact Us", href: "#contact" },
];

const PARTNER_LOGOS = [
  { src: "/cl-1%20(1).webp", alt: "Penguin Random House" },
  { src: "/cl-4%20(1).webp", alt: "Macmillan" },
  { src: "/cl-3%20(1).webp", alt: "HarperCollins" },
  { src: "/cl-5%20(1).webp", alt: "Hachette" },
];

const HERO_CHECKS = [
  "End-to-end publishing support, from manuscript to finished book",
  "Custom illustrations tailored to your story's tone and audience",
  "Professional editing, formatting, and distribution",
  "Affordable, transparent pricing at every stage",
  "A collaborative process that keeps you in control of your vision",
];

const FEATURE_CHECKS = [
  "Custom-made illustrations",
  "Vibrant, colorful designs",
  "Kid-friendly visual appeal",
  "Fast, reliable delivery",
  "Affordable, quality service",
  "Fully collaborative process",
];

const WHY_STATS = [
  {
    icon: FaUser,
    end: 1850,
    suffix: "+",
    useComma: true,
    label: "5 Star Author Reviews",
  },
  {
    icon: FaTrophy,
    end: 99,
    suffix: "%",
    useComma: false,
    label: "Positive Reviews",
  },
  {
    icon: FaBook,
    end: 250,
    suffix: "+",
    useComma: false,
    label: "Books Published",
  },
];

const SERVICE_CARDS = [
  {
    icon: FaPencil,
    title: "Story Development",
    description:
      "We shape age-appropriate plots, characters, and themes that captivate young readers while preserving your creative voice.",
  },
  {
    icon: FaPaintbrush,
    title: "Custom Illustrations",
    description:
      "Vibrant, professional artwork tailored to your story's tone — from whimsical picture books to educational titles.",
  },
  {
    icon: FaPenToSquare,
    title: "Editing & Proofreading",
    description:
      "Expert editors refine your manuscript, ensuring it's error-free, engaging, and perfect for young readers.",
  },
  {
    icon: FaImages,
    title: "Cover & Layout Design",
    description:
      "Eye-catching covers and clean interior layouts designed to stand out in bookstores and online marketplaces.",
  },
  {
    icon: FaGlobe,
    title: "Publishing & Distribution",
    description:
      "Paperback, hardcover, and eBook formats with distribution across Amazon, Barnes & Noble, and global channels.",
  },
  {
    icon: FaBullhorn,
    title: "Book Marketing",
    description:
      "Targeted campaigns that put your children's book in front of parents, teachers, and young readers who will love it.",
  },
  {
    icon: FaUser,
    title: "Author Branding",
    description:
      "Build a memorable author presence with branded assets, bio copy, and a launch-ready online footprint.",
  },
  {
    icon: FaHeadset,
    title: "Ongoing Support",
    description:
      "Stay supported after launch with guidance on reviews, sequels, school outreach, and long-term visibility.",
  },
];

const WORK_CAROUSEL_IMAGES = [
  { src: "/book-marketing-lp/Graphic-Google.webp", alt: "Children's book publishing showcase" },
  { src: "/book-marketing-lp/Graphic-Google-02.webp", alt: "Children's book publishing showcase 2" },
  { src: "/book-marketing-lp/Graphic-Google-03-1-scaled.webp", alt: "Children's book publishing showcase 3" },
  { src: "/book-marketing-lp/Graphic-Google-07.webp", alt: "Children's book publishing showcase 4" },
  { src: "/book-marketing-lp/Graphic-Google-08.webp", alt: "Children's book publishing showcase 5" },
  { src: "/book-marketing-lp/Graphic-Google-09-scaled.webp", alt: "Children's book publishing showcase 6" },
  { src: "/childrens-book-lp/Graphic-Google-04-669x1024.webp", alt: "Children's book cover showcase" },
  { src: "/childrens-book-lp/Graphic-Google-05-669x1024.webp", alt: "Children's book cover showcase 2" },
];

const DETAILED_SERVICES = [
  {
    icon: FaPencil,
    title: "Ghostwriting Services",
    description:
      "Have a story to tell but need help writing it? Our ghostwriters collaborate closely with you to develop your idea into a finished children's manuscript in your voice, with you as the credited author.",
  },
  {
    icon: FaBookOpen,
    title: "Book Publishing",
    description:
      "We manage the full publishing process — writing support, editing, formatting, and distribution — so your children's book is ready to share with readers on the platforms of your choice.",
  },
  {
    icon: FaPenToSquare,
    title: "Editing & Proofreading",
    description:
      "Expert editors refine your manuscript, ensuring it's error-free, engaging, and perfectly suited for young readers before it goes to print or digital shelves.",
  },
  {
    icon: FaPaintbrush,
    title: "Illustration Services",
    description:
      "Custom illustrations bring your characters and world to life with vibrant, age-appropriate artwork tailored to your story's tone and your target audience.",
  },
  {
    icon: FaGlobe,
    title: "Distribution",
    description:
      "Get your children's book into major online and retail channels — including Amazon, Barnes & Noble, and international marketplaces — so families can discover it anywhere.",
  },
  {
    icon: FaBullhorn,
    title: "Book Marketing",
    description:
      "Promotion strategies built for children's titles — from social campaigns and launch support to school and library outreach that puts your book in front of the right readers.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Stamford Publishers turned my bedtime story idea into a beautifully illustrated book my kids are proud of. The team understood the audience and guided me every step of the way.",
    author: "Sarah Mitchell",
    role: "Children's Author",
    image: "/about-1.webp",
  },
  {
    quote:
      "From illustrations to marketing, everything felt professional and personal. My picture book is now reaching families I never thought I could connect with on my own.",
    author: "James Rodriguez",
    role: "Picture Book Author",
    image: "/about-2.webp",
  },
];

const FAQ_ITEMS = [
  {
    question: "What children's book formats do you publish?",
    answer:
      "We support picture books, early readers, chapter books, coloring books, educational titles, and more — in paperback, hardcover, and eBook formats.",
  },
  {
    question: "Do you provide illustration services?",
    answer:
      "Yes. Our illustrators create custom artwork matched to your story's age group, style, and characters so the visuals feel cohesive from cover to cover.",
  },
  {
    question: "How long does children's book publishing take?",
    answer:
      "Timelines vary by illustration complexity and scope, but most projects move from manuscript to published book within a clear, milestone-based schedule we share upfront.",
  },
  {
    question: "Can I keep creative control of my story?",
    answer:
      "Absolutely. We collaborate closely while keeping your voice, characters, and vision at the center of every creative decision.",
  },
  {
    question: "Do you help market children's books after publishing?",
    answer:
      "Yes. We offer marketing support designed for children's titles, including online campaigns, launch promotion, and strategies to reach parents and educators.",
  },
];

const CONTACT_BENEFITS = [
  "Submit Your Manuscript & Ideas: Share your manuscript, preliminary story concept, or visual ideas with our team. We’ll review your goals and match you with the right publishing team.",
  "Editing & Illustration Planning: Work with dedicated editors to polish your story, while our creative team establishes your book's art direction, visual style, and character concepts.",
  "Custom Artwork & Page Layout: Review initial sketches, illustration proofs, and interior layouts. You retain total creative control and approve every page before final production.",
  "Formatting & Print Prep: We format your manuscript and custom artwork into high-resolution, print-ready files (Hardcover, Paperback) and eBook formats optimized for Amazon KDP, IngramSpark, and Apple Books.",
  "Final Publishing & Global Distribution: We publish your book across major digital and physical sales channels worldwide, empowering you with full ownership, royalties, and ongoing promotion strategies."
];

const FOOTER_QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "#contact" },
];

const FOOTER_ADDRESS = "1001 Wilshire Boulevard #1439 Los Angeles, CA 90017";

const FOOTER_BADGES = {
  trustpilot: "/book-marketing-lp/trustpilot-1.webp",
};

const SECTION_PADDING = "py-12 sm:py-16 lg:py-20";
const SECTION_HEADING =
  "text-2xl sm:text-3xl lg:text-[40px] font-bold text-[#111] leading-tight";
const CONTAINER = "max-w-[1140px] mx-auto w-full px-4 sm:px-6";

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

    const duration = 2000;
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

  const display = useComma ? count.toLocaleString() : String(count);

  return (
    <p ref={ref} className={className} style={{ color: PURPLE }}>
      {display}
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
      <div className="px-4 py-4 text-sm leading-relaxed text-[#444] sm:px-5 sm:py-4 bg-[#faf5fb]">
        {children}
      </div>
    </motion.div>
  );
}

const HERO_FORM_FIELD =
  "w-full px-4 py-3 border border-[#CCCCCC] rounded-xl bg-white text-[#111] text-sm outline-none focus:border-[#8E24AA] placeholder:text-[#757575] transition-all duration-300";

const HERO_FORM_SELECT = `${HERO_FORM_FIELD} form-select form-select-arrow-dark`;

const FIELD_CLASS =
  "w-full px-4 py-3 border border-black/50 rounded-lg outline-none focus:border-[#9C27B0] bg-white text-[#111] placeholder:text-[#999] text-sm transition-all duration-300";

const SELECT_CLASS = `${FIELD_CLASS} form-select form-select-arrow-muted`;

function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
  return handleLeadFormSubmit(e, "/childrens-book-publishing-lp");
}

const BTN_BASE =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-full px-6 py-3 text-sm cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-95";

function PurpleButton({
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
  const classes = `${BTN_BASE} bg-gradient-to-r from-[#9C27B0] to-[#AB47BC] text-white hover:from-[#7B1FA2] hover:to-[#9C27B0] ${className}`;
  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

function BlackButton({
  children,
  href,
  className = "",
}: {
  children: ReactNode;
  href?: string;
  className?: string;
}) {
  const classes = `${BTN_BASE} bg-[#111] text-white hover:bg-[#333] ${className}`;
  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  return <button type="button" className={classes}>{children}</button>;
}

function BlueButton({
  children,
  href,
  className = "",
}: {
  children: ReactNode;
  href?: string;
  className?: string;
}) {
  const classes = `${BTN_BASE} bg-[#42A5F5] text-white hover:bg-[#1E88E5] ${className}`;
  return (
    <a href={href} className={classes}>
      {children}
    </a>
  );
}

function DetailedServiceCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof FaPencil;
  title: string;
  description: string;
}) {
  return (
    <ScrollStaggerItem>
      <article className="group rounded-[28px] border border-[#9C27B0] bg-white p-6 text-center transition-all duration-300 hover:border-[#6A1B9A] hover:bg-[#6A1B9A] hover:-translate-y-1 hover:shadow-lg sm:p-8 lg:p-10">
        <Icon
          className="mx-auto mb-4 h-9 w-9 text-[#9C27B0] transition-all duration-300 group-hover:scale-110 group-hover:text-white sm:mb-5 sm:h-11 sm:w-11"
          aria-hidden="true"
        />
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-[#111] transition-colors duration-300 group-hover:text-white sm:mb-4 sm:text-base">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-[#444] transition-colors duration-300 group-hover:text-white">
          {description}
        </p>
      </article>
    </ScrollStaggerItem>
  );
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
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                activeIndex === index
                  ? "h-2.5 w-8 bg-[#9C27B0]"
                  : "h-2.5 w-2.5 bg-[#9C27B0]/30 hover:bg-[#9C27B0]/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ServiceGridCard({
  icon: Icon,
  title,
  description,
  mirrored,
}: {
  icon: typeof FaPencil;
  title: string;
  description: string;
  mirrored: boolean;
}) {
  const iconBox = (
    <div
      className={`z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-[15px] bg-white shadow-[0_4px_18px_rgba(0,0,0,0.14)] transition-transform duration-300 group-hover:scale-105 sm:absolute sm:top-1/2 sm:h-[60px] sm:w-[60px] sm:-translate-y-1/2 ${
        mirrored
          ? "sm:left-0 sm:-translate-x-1/2"
          : "sm:right-0 sm:translate-x-1/2"
      }`}
    >
      <Icon className="h-6 w-6 sm:h-8 sm:w-8" style={{ color: PURPLE }} aria-hidden="true" />
    </div>
  );

  if (mirrored) {
    return (
      <ScrollStaggerItem>
        <article className="group relative flex flex-col gap-4 rounded-[24px] bg-white p-5 shadow-[0_6px_24px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] sm:min-h-[120px] sm:flex-row sm:items-center sm:gap-3 sm:rounded-[30px] sm:py-7 sm:pl-10 sm:pr-7 md:pl-12 md:pr-9 md:py-8">
          <div className="flex items-center gap-3 sm:contents">
            {iconBox}
            <h3 className="text-[15px] font-bold leading-snug text-[#222] sm:w-[88px] sm:shrink-0 md:w-[105px] sm:text-base">
              {title}
            </h3>
          </div>
          <p className="min-w-0 flex-1 text-sm leading-relaxed text-[#666] sm:text-[15px]">
            {description}
          </p>
        </article>
      </ScrollStaggerItem>
    );
  }

  return (
    <ScrollStaggerItem>
      <article className="group relative flex flex-col gap-4 rounded-[24px] bg-white p-5 shadow-[0_6px_24px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] sm:min-h-[120px] sm:flex-row sm:items-center sm:gap-3 sm:rounded-[30px] sm:py-7 sm:pl-7 sm:pr-10 md:pl-9 md:pr-12 md:py-8">
        <p className="order-2 min-w-0 flex-1 text-sm leading-relaxed text-[#666] sm:order-1 sm:text-right sm:text-[15px]">
          {description}
        </p>
        <div className="order-1 flex items-center justify-between gap-3 sm:order-2 sm:contents">
          <h3 className="text-[15px] font-bold leading-snug text-[#222] sm:w-[88px] sm:shrink-0 sm:text-right md:w-[105px] sm:text-base">
            {title}
          </h3>
          {iconBox}
        </div>
      </article>
    </ScrollStaggerItem>
  );
}

function HeroLeadForm({ id }: { id?: string }) {
  return (
    <form id={id} onSubmit={handleFormSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input type="text" name="name" placeholder="Name" required className={HERO_FORM_FIELD} />
        <input type="email" name="email" placeholder="Email" required className={HERO_FORM_FIELD} />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          type="tel"
          name="phone"
          placeholder="123-456-7890"
          required
          className={HERO_FORM_FIELD}
        />
        <select name="genre" required className={HERO_FORM_SELECT} defaultValue="Audiobook">
          {GENRE_OPTIONS.map((genre) => (
            <option key={genre} value={genre}>
              {genre === "Audiobook" ? "Audio Book" : genre}
            </option>
          ))}
        </select>
      </div>
      <input
        type="text"
        name="bookTitle"
        placeholder="Book Title"
        required
        className={HERO_FORM_FIELD}
      />
      <textarea
        name="aboutBook"
        placeholder="Tell Us About Your Book"
        required
        rows={5}
        className={`${HERO_FORM_FIELD} min-h-[100px] resize-y`}
      />
      <button
        type="submit"
        className="w-full rounded-full py-2 px-6 text-sm font-bold uppercase tracking-wide text-white bg-[#8E24AA] hover:bg-[#7B1FA2] cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
      >
        Submit Now
      </button>
    </form>
  );
}

function LeadForm({ id, submitLabel = "Submit Now" }: { id?: string; submitLabel?: string }) {
  return (
    <form id={id} onSubmit={handleFormSubmit} className="space-y-3">
      <input type="text" name="name" placeholder="Name" required className={FIELD_CLASS} />
      <input type="email" name="email" placeholder="Email" required className={FIELD_CLASS} />
      <input type="tel" name="phone" placeholder="Phone" required className={FIELD_CLASS} />
      <select name="service" required className={SELECT_CLASS} defaultValue="">
        <option value="" disabled>
          Select a Service
        </option>
        <option value="publishing">Children&apos;s Book Publishing</option>
        <option value="illustration">Illustration</option>
        <option value="marketing">Book Marketing</option>
        <option value="full">Full Publishing Package</option>
      </select>
      <textarea
        name="message"
        placeholder="Tell us about your book project"
        required
        rows={4}
        className={`${FIELD_CLASS} resize-y min-h-[100px]`}
      />
      <PurpleButton type="submit" className="w-full uppercase tracking-wide">
        {submitLabel}
      </PurpleButton>
    </form>
  );
}

export default function ChildrensBookLpPage() {
  const reduceMotion = useReducedMotion();
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMounted, setPopupMounted] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNavOpen]);

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
    const timer = window.setTimeout(() => setPopupOpen(true), POPUP_DELAY_MS);
    return () => window.clearTimeout(timer);
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
          aria-labelledby="cb-popup-heading"
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
              className="flex min-h-[280px] flex-col p-6 pr-12 lg:p-8"
              style={{ backgroundColor: YELLOW }}
            >
              <h2
                id="cb-popup-heading"
                className="text-2xl sm:text-3xl font-bold text-[#111] mb-3 leading-tight"
              >
                Publish Your Children&apos;s Book With Confidence
              </h2>
              <div className="space-y-3 text-sm text-[#111] mb-6">
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
                    <h3 className="font-bold">Discuss your story</h3>
                    <a href={`mailto:${EMAIL}`} className="hover:underline break-all">
                      {EMAIL}
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-auto flex justify-center">
                <img
                  src="/children-book-1.webp"
                  alt="Children's book publishing"
                  className="w-full max-w-[280px] rounded-xl object-cover max-h-[200px]"
                />
              </div>
            </div>
            <div className="p-6 sm:p-8 md:max-h-[90vh] md:overflow-y-auto">
              <form
                onSubmit={(e) => handleLeadFormSubmit(e, "/childrens-book-publishing-lp-popup")}
                className="space-y-3"
              >
                <input type="text" name="name" placeholder="Name" required className={FIELD_CLASS} />
                <input type="email" name="email" placeholder="Email" required className={FIELD_CLASS} />
                <input type="tel" name="phone" placeholder="Phone" required className={FIELD_CLASS} />
                <textarea
                  name="message"
                  placeholder="Tell us about your children's book"
                  required
                  rows={4}
                  className={`${FIELD_CLASS} resize-y`}
                />
                <PurpleButton type="submit" className="w-full uppercase tracking-wide">
                  Submit Now
                </PurpleButton>
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
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          headerScrolled ? "bg-white shadow-md" : "bg-white/95 shadow-sm"
        }`}
      >
        <div className={`${CONTAINER} py-3`}>
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            <a href="#" className="shrink-0 transition-opacity duration-300 hover:opacity-80" aria-label="Stamford Publishers">
              <img
                src="/childrens-book-lp/logo.webp"
                alt="Stamford Publishers"
                width={150}
                height={150}
                className="h-12 w-auto sm:h-14 md:h-16"
              />
            </a>

            <div className="flex items-center gap-2 sm:gap-3">
              <PurpleButton href={PHONE_HREF} className="px-3 py-2 text-[11px] sm:px-4 sm:py-2.5 sm:text-sm">
                <span className="inline">{PHONE}</span>
              </PurpleButton>
            </div>
          </div>
        </div>
      </motion.header>

      <div>
        {/* Hero */}
        <section
          className="relative overflow-hidden bg-[url('/childrens-book-lp/hero.webp')] bg-cover bg-center bg-no-repeat pt-20 pb-10 sm:pt-24 sm:pb-12 lg:pt-32 lg:pb-20"
          aria-labelledby="cb-hero-heading"
        >
          <div className={`${CONTAINER} relative z-10`}>
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
              <motion.div
                initial={reduceMotion ? false : "hidden"}
                animate={reduceMotion ? undefined : "visible"}
                variants={staggerContainer}
              >
                <motion.h1
                  id="cb-hero-heading"
                  variants={staggerItem}
                  className="mb-4 text-2xl font-bold leading-tight text-[#111] sm:text-3xl lg:text-4xl"
                >
                  Fast &amp; Trusted Children&apos;s Book Publishing Made At Its Best!
                </motion.h1>
                <motion.p
                  variants={staggerItem}
                  className="mb-6 max-w-xl text-sm leading-relaxed text-[#222] sm:text-[15px]"
                >
                  Bringing a children&apos;s book to life takes more than a manuscript — it takes the
                  right illustrations, editing, formatting, and publishing support to make it shine.
                  At Stamford Publishers, we guide authors through every stage of children&apos;s book
                  publishing, so your story is ready to delight young readers and stand out on the shelf.
                </motion.p>

                <motion.ul variants={staggerItem} className="mb-8 max-w-xl list-none space-y-3">
                  {HERO_CHECKS.map((item) => (
                    <motion.li
                      key={item}
                      variants={staggerItem}
                      className="flex items-start gap-3 text-sm font-medium text-[#111]"
                    >
                      <span
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white transition-transform duration-300 hover:scale-110"
                        style={{ backgroundColor: PURPLE }}
                      >
                        <FaCheck className="h-2.5 w-2.5" aria-hidden="true" />
                      </span>
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.div variants={staggerItem} className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <BlackButton href="#hero-form" className="w-full sm:w-auto">
                    Get Illustration For Children&apos;s Books
                  </BlackButton>
                  <PurpleButton href="#contact" className="w-full sm:w-auto">
                    Talk To The Expert
                  </PurpleButton>
                </motion.div>
              </motion.div>

              <ScrollReveal variants={scaleIn} delay={0.15}>
                <div className="rounded-2xl border-2 border-[#FDD835] bg-white p-5 transition-shadow duration-300 hover:shadow-xl sm:p-6 lg:p-8">
                  <h2 className="mb-2 text-left text-xl font-bold leading-tight text-[#111] sm:text-2xl lg:text-[26px]">
                    Claim 30% OFF Today!
                  </h2>
                  <p className="mb-6 text-left text-sm leading-relaxed text-[#111] sm:text-[15px]">
                    Sign up right now for availing limited-time discount.
                  </p>
                  <HeroLeadForm id="hero-form" />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Trust bar */}
        <section className="border-b border-black bg-white py-6 sm:py-8" aria-label="Publishing partners">
          <div className={CONTAINER}>
            <ScrollStagger className="flex flex-wrap items-center justify-center gap-6 sm:justify-between sm:gap-8">
              {PARTNER_LOGOS.map((logo) => (
                <ScrollStaggerItem key={logo.src}>
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-7 w-auto max-w-[100px] flex-1 object-contain opacity-80 grayscale transition-all duration-300 hover:scale-105 hover:opacity-100 sm:h-10 sm:max-w-[120px] lg:h-12 lg:max-w-[100%]"
                  />
                </ScrollStaggerItem>
              ))}
            </ScrollStagger>
          </div>
        </section>

        {/* Feature focus — teal */}
        <section
          className="bg-[url('/childrens-book-lp/bg-2.webp')] bg-cover bg-center bg-no-repeat py-12 sm:py-20 lg:py-28"
          aria-labelledby="cb-leading-heading"
        >
          <div className={CONTAINER}>
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
              <MotionColumn from="left">
                <ScrollReveal>
                  <h2 id="cb-leading-heading" className={`${SECTION_HEADING} mb-4`}>
                    Turning Your Manuscript Into a Published Children&apos;s Book
                  </h2>
                  <p className="mb-5 text-sm leading-relaxed text-[#222]">
                    Have a story that&apos;s ready to shine? At Stamford Publishers, we take your children&apos;s book from manuscript to market pairing professional editing and formatting with custom illustrations that bring your characters and world to life. Whether you&apos;re aiming for a whimsical tone, a magical theme, or a heartwarming tale, our team ensures every element of your book, text and art alike, works together to engage young readers and their parents.
                  </p>
                </ScrollReveal>
                <ScrollStagger className="mb-6 grid list-none grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                  {FEATURE_CHECKS.map((item) => (
                    <ScrollStaggerItem key={item}>
                      <li className="flex items-start gap-3 text-sm font-medium text-[#111]">
                        <span
                          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white transition-transform duration-300 hover:scale-110"
                          style={{ backgroundColor: PURPLE }}
                        >
                          <FaCheck className="h-2.5 w-2.5" aria-hidden="true" />
                        </span>
                        {item}
                      </li>
                    </ScrollStaggerItem>
                  ))}
                </ScrollStagger>
                <ScrollReveal delay={0.1}>
                  <BlackButton href="#contact" className="w-full sm:w-auto">
                    Get Illustration For Children&apos;s Books
                  </BlackButton>
                </ScrollReveal>
              </MotionColumn>
              <MotionColumn from="right">
                <img
                  src="/childrens-book-lp/sec-2-img.webp"
                  alt="Child discovering books in a library"
                  className="h-[280px] w-full rounded-2xl object-cover shadow-lg transition-transform duration-500 hover:scale-[1.02] sm:h-[380px] lg:h-[500px]"
                />
              </MotionColumn>
            </div>
          </div>
        </section>

        {/* Why market globally — white */}
        <section className={SECTION_PADDING} aria-labelledby="cb-why-heading">
          <div className={CONTAINER}>
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
              <MotionColumn from="left" className="order-2 lg:order-1">
                <img
                  src="/childrens-book-lp/global-sec.webp"
                  alt="Young child reading a colorful picture book"
                  className="h-[280px] w-full rounded-2xl border-4 border-[#8C24A9]/20 object-cover shadow-lg transition-transform duration-500 hover:scale-[1.02] sm:h-[380px] lg:h-[500px]"
                />
              </MotionColumn>
              <MotionColumn from="right" className="order-1 lg:order-2">
                <ScrollReveal>
                  <h2 id="cb-why-heading" className={`${SECTION_HEADING} mb-4`}>
                    Why Authors Choose Stamford Publishers
                  </h2>
                  <p className="mb-6 text-sm leading-relaxed text-[#444]">
                    We&apos;ve helped hundreds of authors publish children&apos;s books that resonate with young readers and succeed in the market — handling everything from manuscript development to final distribution. Whether you&apos;re self-publishing your first title or planning a larger release, we manage every detail with care, so you can focus on the story only you can tell.
                  </p>
                </ScrollReveal>
                <ScrollStagger className="mb-8 grid max-w-xl grid-cols-3 gap-4 sm:gap-6">
                  {WHY_STATS.map((stat) => (
                    <ScrollStaggerItem key={stat.label}>
                      <div className="text-center transition-transform duration-300 hover:-translate-y-1">
                        <stat.icon
                          className="mx-auto mb-3 h-8 w-8 transition-transform duration-300 hover:scale-110 sm:mb-4 sm:h-10 sm:w-10"
                          style={{ color: PURPLE }}
                          aria-hidden="true"
                        />
                        <StatCounter
                          end={stat.end}
                          suffix={stat.suffix}
                          useComma={stat.useComma}
                          className="mb-2 text-3xl font-bold leading-none sm:text-4xl lg:text-[42px]"
                        />
                        <p className="text-xs leading-snug text-[#111] sm:text-sm">{stat.label}</p>
                      </div>
                    </ScrollStaggerItem>
                  ))}
                </ScrollStagger>
                <ScrollReveal delay={0.1}>
                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <BlackButton href="#contact" className="w-full sm:w-auto">
                      Hire Our Expert
                    </BlackButton>
                    <PurpleButton href="#hero-form" className="w-full sm:w-auto">
                      Claim Free Consultation
                    </PurpleButton>
                  </div>
                </ScrollReveal>
              </MotionColumn>
            </div>
          </div>
        </section>

        {/* Services grid — teal soft */}
        <section
          id="services"
          className="bg-[url('/childrens-book-lp/bg-2.webp')] bg-cover bg-center bg-no-repeat py-12 sm:py-20 lg:py-28"
          aria-labelledby="cb-services-heading"
        >
          <div className={CONTAINER}>
            <ScrollReveal className="mb-8 text-center sm:mb-10">
              <h2 id="cb-services-heading" className={`${SECTION_HEADING} mx-auto mb-3 max-w-2xl`}>
                Comprehensive Children&apos;s Book Publishing Solutions
              </h2>
              <p className="mx-auto max-w-2xl text-sm text-[#444]">
                We&apos;ve helped hundreds of authors publish children&apos;s books that resonate with young readers and succeed in the market — handling everything from manuscript development to final distribution. Whether you&apos;re self-publishing your first title or planning a larger release, we manage every detail with care, so you can focus on the story only you can tell.
              </p>
            </ScrollReveal>
            <ScrollStagger className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:gap-x-12 xl:gap-x-20">
              {SERVICE_CARDS.map((card, index) => (
                <ServiceGridCard
                  key={card.title}
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                  mirrored={index % 2 === 1}
                />
              ))}
            </ScrollStagger>
          </div>
        </section>

        {/* Our Works */}
        <section id="portfolio" className={SECTION_PADDING} aria-labelledby="cb-works-heading">
          <div className={CONTAINER}>
            <ScrollReveal className="mb-8 text-center sm:mb-10">
              <h2 id="cb-works-heading" className={`${SECTION_HEADING} mb-3`}>
                Our Works
              </h2>
              <p className="mx-auto max-w-xl text-sm text-[#555]">
                A look at the children&apos;s books and campaigns we&apos;ve helped bring to market —
                built on creativity, quality, and results across genres and platforms.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <WorksCarousel />
            </ScrollReveal>
          </div>
        </section>

        {/* Mid-page CTA — yellow */}
        <section
          id="mid-cta"
          className={`${SECTION_PADDING} relative overflow-hidden bg-[url('/childrens-book-lp/bg-4.webp')] bg-cover bg-center bg-no-repeat md:bg-fixed`}
          aria-labelledby="cb-mid-cta-heading"
        >
          <div className={`${CONTAINER} relative z-10 text-center`}>
            <ScrollReveal>
              <h2 id="cb-mid-cta-heading" className={`${SECTION_HEADING} mx-auto mb-3 max-w-2xl`}>
                Bring Your Story to Life Save 25% Today!
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-sm text-[#222]">
                Partner with Stamford Publishers&apos; expert children&apos;s book team and get 25% OFF full publishing and illustration packages. Let&apos;s turn your manuscript into a beautifully illustrated book young readers will love.
              </p>
              <div className="flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
                <BlueButton href="#hero-form" className="w-full sm:w-auto">
                  Get Kids Book Illustration
                </BlueButton>
                <PurpleButton href="#contact" className="w-full sm:w-auto">
                  Talk To An Expert
                </PurpleButton>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Detailed services — white */}
        <section className={SECTION_PADDING} aria-labelledby="cb-detailed-heading">
          <div className={CONTAINER}>
            <ScrollReveal className="mb-8 text-center sm:mb-10">
              <h2 id="cb-detailed-heading" className={`${SECTION_HEADING} mb-3`}>
                Our Full Range of Publishing Solutions
              </h2>
              <p className="mx-auto max-w-xl text-sm text-[#555]">
                End-to-end services crafted specifically for children&apos;s book authors.
              </p>
            </ScrollReveal>
            <ScrollStagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {DETAILED_SERVICES.map((item) => (
                <DetailedServiceCard
                  key={item.title}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </ScrollStagger>
          </div>
        </section>

        {/* Showcase — teal */}
        <section
          className={`${SECTION_PADDING} bg-[url('/childrens-book-lp/bg-2.webp')] bg-cover bg-center bg-no-repeat md:bg-fixed`}
          aria-labelledby="cb-showcase-heading"
        >
          <div className={CONTAINER}>
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
              <MotionColumn from="left">
                <ScrollReveal>
                  <h2 id="cb-showcase-heading" className={`${SECTION_HEADING} mb-4`}>
                    Publish Your Children&apos;s Book with Stamford Publishers Get 25% OFF!
                  </h2>
                  <p className="mb-6 text-sm leading-relaxed text-[#222]">
                    Take advantage of our limited-time offer and get 25% OFF complete children&apos;s book publishing packages. From manuscript editing and custom illustration to formatting and global distribution, we handle everything under one roof.
                  </p>
                  <PurpleButton href="#hero-form" className="w-full sm:w-auto">
                    Get Kids Book Illustration
                  </PurpleButton>
                </ScrollReveal>
              </MotionColumn>
              <MotionColumn from="right">
                <img
                  src="/childrens-book-lp/showcase-1.webp"
                  alt="Children's book mockup showcase"
                  className="mx-auto w-full max-w-md object-contain transition-transform duration-500 hover:scale-[1.02] sm:-my-12 lg:-my-24"
                />
              </MotionColumn>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className={SECTION_PADDING} aria-labelledby="cb-testimonials-heading">
          <div className={CONTAINER}>
            <ScrollReveal className="mb-8 text-center sm:mb-10">
              <h2 id="cb-testimonials-heading" className={SECTION_HEADING}>
                What Our Clients Say
              </h2>
              <p className="mx-auto mb-6 max-w-2xl text-sm leading-relaxed text-[#222]">
                We have been in the industry for a long period, allowing us to gather a bunch of customers who praise our work. Don&apos;t just believe it, read it yourself.
              </p>
            </ScrollReveal>
            <ScrollStagger className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
              {TESTIMONIALS.map((item) => (
                <ScrollStaggerItem key={item.author}>
                  <article className="flex h-full flex-col rounded-2xl border-2 border-[#FDD835] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8">
                    <p className="mb-6 flex-1 text-sm leading-relaxed text-[#333]">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                    <div className="flex flex-col items-center gap-2">
                      <img
                        src={item.image}
                        alt={item.author}
                        className="h-14 w-14 rounded-full border-2 border-[#9C27B0]/30 object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <p className="text-sm font-bold text-[#111]">{item.author}</p>
                      <p className="text-xs text-[#666]">{item.role}</p>
                    </div>
                  </article>
                </ScrollStaggerItem>
              ))}
            </ScrollStagger>
          </div>
        </section>

        {/* Secondary CTA — yellow */}
        <section
          className={`${SECTION_PADDING} bg-[url('/childrens-book-lp/bg-4.webp')] bg-cover bg-center bg-no-repeat md:bg-fixed`}
          aria-labelledby="cb-idea-heading"
        >
          <div className={CONTAINER}>
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
              <MotionColumn from="left" className="order-2 lg:order-1">
                <img
                  src="/childrens-book-lp/showcase-2.webp"
                  alt="Children's book mockup showcase"
                  className="mx-auto w-full object-contain transition-transform duration-500 hover:scale-[1.02] sm:-my-12 lg:-my-24"
                />
              </MotionColumn>
              <MotionColumn from="right" className="order-1 lg:order-2">
                <ScrollReveal>
                  <h2 id="cb-idea-heading" className={`${SECTION_HEADING} mb-4`}>
                    Turn Your Story Idea into a Published Children&apos;s Book
                  </h2>
                  <p className="mb-6 text-sm leading-relaxed text-[#222]">
                    Bring your characters off the manuscript page and onto the shelves. Claim 25% OFF full-service publishing and work with experienced editors, illustrators, and self-publishing strategists.
                  </p>
                  <BlackButton href="#contact" className="w-full sm:w-auto">
                    Chat With Expert
                  </BlackButton>
                </ScrollReveal>
              </MotionColumn>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className={SECTION_PADDING} aria-labelledby="cb-faq-heading">
          <div className={`${CONTAINER} max-w-3xl`}>
            <ScrollReveal className="mb-8 text-center">
              <h2 id="cb-faq-heading" className={`${SECTION_HEADING} inline-block`}>
                Frequently Asked Questions
              </h2>
              <motion.div
                className="mx-auto mt-2 h-1 w-24 rounded-full"
                style={{ backgroundColor: PURPLE }}
                initial={reduceMotion ? false : { width: 0 }}
                whileInView={reduceMotion ? undefined : { width: 96 }}
                viewport={motionViewport}
                transition={{ duration: 0.6, delay: 0.2 }}
                aria-hidden="true"
              />
            </ScrollReveal>
            <ScrollStagger className="space-y-3">
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openFaq === index;
                return (
                  <ScrollStaggerItem key={item.question}>
                    <div
                      className={`overflow-hidden rounded-xl border transition-colors duration-300 ${
                        isOpen ? "border-transparent" : "border-[#e5e5e5]"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? -1 : index)}
                        className={`flex w-full items-center justify-between gap-4 px-4 py-4 text-left text-sm font-semibold transition-all duration-300 sm:px-5 ${
                          isOpen
                            ? "text-white"
                            : "bg-white text-[#111] hover:bg-[#fafafa]"
                        }`}
                        style={isOpen ? { backgroundColor: PURPLE } : undefined}
                        aria-expanded={isOpen}
                      >
                        <span>{item.question}</span>
                        <motion.span
                          animate={reduceMotion ? undefined : { rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="shrink-0"
                        >
                          {isOpen ? (
                            <FaMinus className="h-3.5 w-3.5" aria-hidden="true" />
                          ) : (
                            <FaPlus className="h-3.5 w-3.5 text-[#9C27B0]" aria-hidden="true" />
                          )}
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

        {/* Contact — purple */}
        <section
          id="contact"
          className={SECTION_PADDING}
          style={{ backgroundColor: PURPLE }}
          aria-labelledby="cb-contact-heading"
        >
          <div className={CONTAINER}>
            <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-14">
              <ScrollReveal variants={scaleIn}>
                <div className="rounded-2xl bg-white p-5 shadow-xl transition-shadow duration-300 hover:shadow-2xl sm:p-6 lg:p-8">
                  <h3 className="mb-4 text-center text-3xl font-bold text-[#111]">Contact Us</h3>
                  <LeadForm submitLabel="Send Message" />
                </div>
              </ScrollReveal>
              <MotionColumn from="right">
                <h2
                  id="cb-contact-heading"
                  className="mb-4 text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl"
                >
                  How To Publish Your Children&apos;s Book With Us
                </h2>
                <ScrollStagger className="mb-8 list-none space-y-3">
                  {CONTACT_BENEFITS.map((benefit) => (
                    <ScrollStaggerItem key={benefit}>
                      <li className="flex items-start gap-3 text-[13px] font-normal text-white">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 hover:scale-110">
                          <FaCheck className="h-3 w-3" aria-hidden="true" />
                        </span>
                        {benefit}
                      </li>
                    </ScrollStaggerItem>
                  ))}
                </ScrollStagger>
              </MotionColumn>
            </div>
          </div>
        </section>
      </div>

      <footer className="pb-0" aria-label="Site footer">
        {/* Partner logos — purple bar */}
        <ScrollReveal variants={fadeIn}>
          <div style={{ backgroundColor: PURPLE }}>
            <div className={CONTAINER}>
              <img
                src="/childrens-book-lp/footer-top-1.webp"
                alt="Publishing partners"
                className="w-full object-contain py-6 sm:py-8 lg:py-10"
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Main footer — cream/yellow */}
        <div className="border-b border-black bg-[#FFF9C4]">
          <div className={`${CONTAINER} py-8 sm:py-10 lg:py-14`}>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              <ScrollReveal>
                <img
                  src="/childrens-book-lp/logo.webp"
                  alt="Stamford Publishers"
                  className="mb-5 w-40 transition-transform duration-300 hover:scale-105 sm:w-48"
                />
                <p className="mb-1 text-sm text-[#111]">{PHONE_DISPLAY}</p>
                <p className="mb-1 text-sm text-[#111]">
                  <a href={`mailto:${EMAIL}`} className="break-all transition-opacity duration-300 hover:opacity-80">
                    {EMAIL}
                  </a>
                </p>
                <p className="text-sm leading-relaxed text-[#111]">{FOOTER_ADDRESS}</p>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <h3 className="mb-4 text-base font-bold text-[#111]">Quick Links</h3>
                <ul className="list-none space-y-3">
                  {FOOTER_QUICK_LINKS.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-[#111] transition-all duration-300 hover:translate-x-1 hover:text-[#9C27B0]"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <div className="flex flex-wrap items-start gap-6 sm:gap-8 lg:justify-end lg:gap-12">
                  <img
                    src={FOOTER_BADGES.trustpilot}
                    alt="Trustpilot rating"
                    className="w-20 object-contain transition-transform duration-300 hover:scale-105 sm:w-24"
                  />
                  <img
                    src="/childrens-book-lp/google.webp"
                    alt="Google Reviews rating"
                    className="w-20 object-contain transition-transform duration-300 hover:scale-105 sm:w-24"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* Copyright — black bar */}
        <div className="border-t border-black bg-black py-3 text-center">
          <p className="text-xs text-white sm:text-sm">
            Copyright &copy; {new Date().getFullYear()} Stamford Publishers - All Rights Reserved.
          </p>
        </div>
      </footer>

      {popupModal}
    </>
  );
}
