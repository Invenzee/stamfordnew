"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  fadeIn,
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
  FaCheck,
  FaChevronDown,
  FaCircleCheck,
  FaClipboardList,
  FaEnvelope,
  FaFacebookF,
  FaHatWizard,
  FaHeart,
  FaInstagram,
  FaLandmark,
  FaLayerGroup,
  FaLightbulb,
  FaLinkedinIn,
  FaLocationDot,
  FaMagnifyingGlass,
  FaPhone,
  FaRocket,
  FaUserPen,
  FaUserSecret,
  FaXmark,
} from "react-icons/fa6";

const PHONE_DISPLAY = "(562) 573-2551";
const PHONE_HREF = "tel:+15625732551";
const EMAIL = "info@stamfordpublishers.com";
const ADDRESS = "640 St Paul Ave, Los Angeles, CA 90017";
const POPUP_DELAY_MS = 30000;
const POPUP_SESSION_KEY = "book-editing-lp-popup-dismissed";

/* Palette */
const PRIMARY = "#61DCC6";
const PRIMARY_DARK = "#4EC9B3";
const PRIMARY_SOFT = "#D9F7F2";
const PRIMARY_TINT = "#F0FCFA";
const SECONDARY = "#3A2F5C";
const ON_PRIMARY = "#111111";
const DELETE_RED = "#D32F2F";

const CONTAINER = "max-w-[1140px] mx-auto w-full px-4 sm:px-6";
const SECTION_PADDING = "py-12 sm:py-16 lg:py-20";
const SECTION_HEADING =
  "font-sans text-2xl sm:text-3xl lg:text-[40px] font-bold text-[#111] leading-tight";
const SECTION_SUBHEADING =
  "mx-auto max-w-2xl text-sm leading-relaxed text-[#555] sm:text-[15px]";

const GENRE_OPTIONS = [
  "Fiction",
  "Non-Fiction",
  "Romance",
  "Children's Book",
  "Memoir",
  "Business",
  "Poetry",
  "Other",
];

const SERVICE_OPTIONS = [
  "Developmental Editing",
  "Line & Copy Editing",
  "Proofreading",
  "Formatting & Layout",
  "Full Editing Package",
];

const PARTNER_LOGOS = [
  { src: "/cl-1%20(1).webp", alt: "Simon & Schuster" },
  { src: "/cl-3%20(1).webp", alt: "Penguin Random House" },
  { src: "/cl-4%20(1).webp", alt: "Macmillan" },
  { src: "/cl-5%20(1).webp", alt: "HarperCollins" },
];

const HERO_CHECKS = [
  "Starts from $0.03 / word",
  "Industry Specific Editors",
  "10+ years of experience",
  "Trusted by 400+ authors",
];

const BETTER_CHECKS = [
  "Basic editing",
  "Line by line editing",
  "Developmental editing",
  "Premium editing",
];

type EditSegment = { text: string; kind?: "ins" | "del" | "note" };

const EDITING_STAGES = [
  {
    title: "Manuscript Style Setup",
    body: "Before a single sentence changes, we lock in your style guide, spelling convention, and a glossary of names and invented terms so every chapter stays consistent.",
    sample: [
      [
        { text: "Citation & spacing pass", kind: "note" },
        { text: " " },
      ],
      [
        { text: "a", kind: "del" },
        { text: "A striking resemblance has been seen between the success rates of the Netherlands and that of" },
        { text: "ofthe", kind: "del" },
        { text: "of the", kind: "ins" },
        { text: " US. In the study by" },
        { text: "byMartynova", kind: "del" },
        { text: "Martynova", kind: "ins" },
        { text: " and Renneboog (2010)" },
        { text: "it", kind: "del" },
        { text: " it", kind: "ins" },
        { text: " " },
        { text: "already became clear found", kind: "del" },
        { text: "found", kind: "ins" },
        { text: " that shareholder protection was almost equal between the US and the" },
        { text: "Netherlandsin", kind: "del" },
        { text: "Netherlands in", kind: "ins" },
        { text: " both countries." },
      ],
    ] as EditSegment[][],
  },
  {
    title: "Line & Copy Editing",
    body: "Sentence-level work on clarity, rhythm, and word choice, paired with a strict pass on grammar, punctuation, tense, and continuity.",
    sample: [
      [
        { text: "This " },
        { text: "corresponded", kind: "del" },
        { text: "corresponds", kind: "ins" },
        { text: " to the fact that " },
        { text: "they both have a success rate is of approximately the 40%", kind: "del" },
        { text: "both countries have a success rate of approximately 40%", kind: "ins" },
        { text: "." },
      ],
      [
        { text: "At least one", kind: "del" },
        { text: "More than 1", kind: "ins" },
        { text: " hedge fund acquired a share in " },
        { text: "14the company in fourteen", kind: "del" },
        { text: "fourteen", kind: "ins" },
        { text: " of the 36 listed companies in my database. Of these, 10" },
        { text: " of those", kind: "del" },
        { text: " were working together to achieve certain goals." },
      ],
      [
        { text: "The ", kind: "ins" },
        { text: "The hedge funds held a share in the company for an average length of ", kind: "del" },
        { text: "average length of hedge funds holding a share in the company is 531 days. Although Brav et al. (2008) " },
        { text: "considered", kind: "del" },
        { text: "may find", kind: "ins" },
        { text: " this long-term period, I consider 531 days" },
        { text: " is still to be seen as to be", kind: "del" },
        { text: " to be", kind: "ins" },
        { text: " short-term." },
      ],
    ] as EditSegment[][],
  },
  {
    title: "Precision Proofreading",
    body: "The final sweep catches the errors that survive every earlier round — typos, double spaces, broken hyphenation, stray formatting, and layout slips — so your book goes to print clean.",
    sample: [
      [
        { text: "The average percentage of voting power " },
        { text: "is initial", kind: "del" },
        { text: "initially", kind: "ins" },
        { text: " ranges between 8.06% and the maximum voting power is 10.10%." },
      ],
      [
        { text: "From ", kind: "del" },
        { text: "By", kind: "ins" },
        { text: " looking at this data, it can be concluded that hedge funds are not generally involved in acquiring controlling blocks of stock." },
      ],
    ] as EditSegment[][],
  },
  {
    title: "Author Review & Sign-Off",
    body: "You receive a tracked-changes file plus a clean copy. Accept, reject, or discuss any edit — nothing is final until you approve it.",
    sample: [
      [
        { text: "Discussion", kind: "note" },
        { text: " " },
      ],
      [
        { text: "Conducting ", kind: "del" },
        { text: "Doing", kind: "ins" },
        { text: " an " },
        { text: "extensively", kind: "del" },
        { text: "extensive", kind: "ins" },
        { text: " study of the shareholder activism undertaken by hedge funds in the Netherlands over " },
        { text: "a for the", kind: "del" },
        { text: "the", kind: "ins" },
        { text: " past decade required a great deal of precise work. " },
        { text: "But although ", kind: "del" },
        { text: "Even though ", kind: "ins" },
        { text: "I " },
        { text: "didn't not", kind: "del" },
        { text: "did not", kind: "ins" },
        { text: " use any private information, this study " },
        { text: "pretty nice gives a ", kind: "del" },
        { text: "provides ", kind: "ins" },
        { text: "insight into hedge fund activism in the country." },
      ],
    ] as EditSegment[][],
  },
];

const METHODOLOGY_STEPS = [
  {
    icon: FaMagnifyingGlass,
    title: "Manuscript Review & Assessment",
    body: "You submit your manuscript draft. We assess your word count, genre, and editing needs to pair you with an editor specializing in your field.",
  },
  {
    icon: FaClipboardList,
    title: "Project Guidelines & Style Setup",
    body: "We establish a customized editorial plan following Chicago Manual of Style (CMOS) guidelines, aligning with your publishing objectives.",
  },
  {
    icon: FaLayerGroup,
    title: "Multi-Pass Editing",
    body: "Your editor conducts thorough passes refining story structure, tone, dialogue, line flow, grammar, and sentence clarity.",
  },
  {
    icon: FaUserPen,
    title: "Editorial Review",
    body: "You receive two versions of your manuscript: a clean, publication-ready copy and a version showing all tracked changes and editorial notes.",
  },
];

const GENRES = [
  {
    id: "romance",
    label: "Romance",
    icon: FaHeart,
    title: "Romance",
    body: "Capture the emotions that keep readers turning pages. Our editors refine character development, dialogue, pacing, and emotional depth while preserving your unique voice. We help create compelling love stories that resonate with readers and leave a lasting impression.",
    covers: [
      { src: "/sp-editing-lp/romance-1.webp", alt: "Romance book cover sample" },
      { src: "/sp-editing-lp/romance-2.webp", alt: "Romance book cover sample" },
    ],
  },
  {
    id: "science-fiction",
    label: "Science Fiction",
    icon: FaRocket,
    title: "Science Fiction",
    body: "Build immersive future worlds without sacrificing narrative momentum. Our editors carefully evaluate internal logic, technical consistency, sci-fi tropes, and plot pacing to ensure your high-concept ideas translate into a seamless, captivating read.",
    covers: [
      { src: "/sp-editing-lp/science-1.webp", alt: "Science Fiction book cover sample" },
      { src: "/sp-editing-lp/science-2.webp", alt: "Science Fiction book cover sample" },
    ],
  },
  {
    id: "historical-fiction",
    label: "Historical Fiction",
    icon: FaLandmark,
    title: "Historical Fiction",
    body: "Transport readers to another era with accuracy and atmosphere. We refine dialogue authenticity, historical tone, and period-appropriate details while ensuring your central story and characters stay engaging and clear.",
    covers: [
      { src: "/sp-editing-lp/history-1.webp", alt: "Historical Fiction book cover sample" },
      { src: "/sp-editing-lp/history-2.webp", alt: "Historical Fiction book cover sample" },
    ],
  },
  {
    id: "mystery-thriller",
    label: "Mystery/Thriller",
    icon: FaUserSecret,
    title: "Mystery/Thriller",
    body: "Keep your readers guessing until the very end. Our editing team meticulous checks plot continuity, red herrings, clue placement, suspense building, and pacing so your twists land with maximum impact.",
    covers: [
        { src: "/sp-editing-lp/thriller-1.webp", alt: "Mystery/Thriller book cover sample" },
        { src: "/sp-editing-lp/thriller-2.webp", alt: "Mystery/Thriller book cover sample" },
    ],
  },
  {
    id: "self-help",
    label: "Self-Help",
    icon: FaLightbulb,
    title: "Self-Help",
    body: "Deliver your insights with maximum clarity and authority. We structure your actionable advice, organize chapter flow, eliminate redundancies, and refine your motivational tone so your wisdom inspires and impacts readers.",
    covers: [
      { src: "/sp-editing-lp/self-1.webp", alt: "Self-Help book cover sample" },
      { src: "/sp-editing-lp/self-2.webp", alt: "Self-Help book cover sample" },
    ],
  },
  {
    id: "fantasy",
    label: "Fantasy",
    icon: FaHatWizard,
    title: "Fantasy",
    body: "Create a magical world readers will want to explore. Our editors refine world-building, character development, plot pacing, and thematic consistency while maintaining your unique voice and creative vision.",
    covers: [
      { src: "/sp-editing-lp/fant-1.webp", alt: "Fantasy book cover sample" },
      { src: "/sp-editing-lp/fant-2.webp", alt: "Fantasy book cover sample" },
    ],
  },
];

const TRUST_REASONS = [
  {
    number: "01",
    title: "100% Full Ownership",
    body: "You retain total copyright and ownership of your manuscript and all editorial revisions made.",
  },
  {
    number: "02",
    title: "Transparent & Fair Pricing",
    body: "Premium editing services starting at just $0.03/word with no hidden fees or unexpected costs.",
  },
  {
    number: "03",
    title: "Fast Turnaround Times",
    body: "Efficient, deadline-driven editing workflows that keep your publishing schedule on target.",
  },
  {
    number: "04",
    title: "Dedicated Author Support",
    body: "Collaborative communication throughout the entire process, including direct feedback from your editor.",
  },
];

const TRUST_STATS = [
  { end: 900, suffix: "+", label: "Books Written" },
  { end: 7, suffix: "+", label: "Year of Experience" },
  { end: 50, suffix: "+", label: "Book Experts" },
  { end: 100, suffix: "%", label: "Satisfaction Rate" },
];

const TESTIMONIALS = [
  {
    author: "Amelia Grant",
    quote:
      "I braced myself for an editor who would flatten my voice, and got the opposite. Every change was tracked, explained, and easy to accept or reject. My novel reads like me — only sharper.",
    image: "/about-1.webp",
  },
  {
    author: "Mark Ellison",
    quote:
      "The sample edit sold me and the full edit exceeded it. They caught continuity errors my beta readers missed and delivered two days early. My proofread manuscript went straight to my agent.",
    image: "/about-2.webp",
  },
];

const SOCIAL_LINKS = [
  { icon: FaFacebookF, label: "Facebook", href: "https://facebook.com" },
  { icon: FaInstagram, label: "Instagram", href: "https://instagram.com" },
  { icon: FaLinkedinIn, label: "LinkedIn", href: "https://linkedin.com" },
];

const BTN_BASE =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-95";

const PILL_FIELD =
  "w-full rounded-full px-5 py-3 text-sm font-medium text-[#111] outline-none transition-all duration-300 placeholder:text-[#111]/60 focus:ring-2 focus:ring-[#111]/15 [&:-webkit-autofill]:[-webkit-text-fill-color:#111] [&:-webkit-autofill]:[box-shadow:0_0_0_1000px_#61DCC6_inset]";

const PILL_SELECT = `${PILL_FIELD} form-select form-select-arrow-dark [&>option]:bg-white [&>option]:text-[#111]`;

function pillFieldStyle() {
  return { backgroundColor: PRIMARY, color: ON_PRIMARY } as const;
}

function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
  return handleLeadFormSubmit(e, "/Editing/lp");
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
  const classes = `${BTN_BASE} text-[#111] hover:brightness-95 ${className}`;
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

function ChatNowButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={openLiveChat}
      className={`${BTN_BASE} bg-[#111] text-white hover:bg-black ${className}`}
    >
      Chat Now
    </button>
  );
}

function PhoneBlock({ onDark = false }: { onDark?: boolean }) {
  return (
    <a
      href={PHONE_HREF}
      className="group inline-flex items-center gap-3"
      aria-label={`Call us at ${PHONE_DISPLAY}`}
    >
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#111] transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10"
        style={{ backgroundColor: PRIMARY }}
      >
        <FaPhone className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
      </span>
      <span className="leading-tight">
        <span
          className={`block text-[11px] ${onDark ? "text-white/70" : "text-[#777]"}`}
        >
          Call Us Now
        </span>
        <span
          className={`block text-[13px] font-bold sm:text-sm ${onDark ? "text-white" : "text-[#111]"
            }`}
        >
          {PHONE_DISPLAY}
        </span>
      </span>
    </a>
  );
}

function CheckItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-sm font-medium text-[#111]">
      <span
        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[#111] transition-transform duration-300 hover:scale-110"
        style={{ backgroundColor: PRIMARY }}
      >
        <FaCheck className="h-2.5 w-2.5" aria-hidden="true" />
      </span>
      {children}
    </li>
  );
}

function StatCounter({
  end,
  suffix = "",
  className = "",
}: {
  end: number;
  suffix?: string;
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
    <h5 ref={ref} className={className} style={{ color: PRIMARY_DARK }}>
      {count}
      {suffix}
    </h5>
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

function HeroLeadForm({ id }: { id?: string }) {
  return (
    <form id={id} onSubmit={handleFormSubmit} className="w-full max-w-xl space-y-3">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          className={PILL_FIELD}
          style={pillFieldStyle()}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className={PILL_FIELD}
          style={pillFieldStyle()}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          required
          className={PILL_FIELD}
          style={pillFieldStyle()}
        />
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <select
          name="genre"
          defaultValue=""
          className={PILL_SELECT}
          style={pillFieldStyle()}
        >
          <option value="" disabled>
            Select Genre
          </option>
          {GENRE_OPTIONS.map((genre) => (
            <option key={genre} value={genre} className="text-[#111]">
              {genre}
            </option>
          ))}
        </select>
        <select
          name="service"
          defaultValue=""
          className={PILL_SELECT}
          style={pillFieldStyle()}
        >
          <option value="" disabled>
            Select Service
          </option>
          {SERVICE_OPTIONS.map((service) => (
            <option key={service} value={service} className="text-[#111]">
              {service}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full cursor-pointer rounded-full px-5 py-3 text-sm font-bold uppercase tracking-wide text-[#111] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-95 hover:shadow-lg active:scale-95"
          style={{ backgroundColor: PRIMARY }}
        >
          Submit Now
        </button>
      </div>
    </form>
  );
}

function ContactLeadForm({ id }: { id?: string }) {
  return (
    <form id={id} onSubmit={handleFormSubmit} className="space-y-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          className={PILL_FIELD}
          style={pillFieldStyle()}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className={PILL_FIELD}
          style={pillFieldStyle()}
        />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          required
          className={PILL_FIELD}
          style={pillFieldStyle()}
        />
        <select
          name="genre"
          defaultValue=""
          className={PILL_SELECT}
          style={pillFieldStyle()}
        >
          <option value="" disabled>
            Select Genre
          </option>
          {GENRE_OPTIONS.map((genre) => (
            <option key={genre} value={genre} className="text-[#111]">
              {genre}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <select
          name="service"
          defaultValue=""
          className={PILL_SELECT}
          style={pillFieldStyle()}
        >
          <option value="" disabled>
            Select Service
          </option>
          {SERVICE_OPTIONS.map((service) => (
            <option key={service} value={service} className="text-[#111]">
              {service}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full cursor-pointer rounded-full px-5 py-3 text-sm font-bold uppercase tracking-wide text-[#111] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-95 hover:shadow-lg active:scale-95"
          style={{ backgroundColor: PRIMARY }}
        >
          Submit Now
        </button>
      </div>
    </form>
  );
}

function StageAnswer({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
      animate={reduceMotion ? undefined : { height: "auto", opacity: 1 }}
      exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden"
    >
      <p className="px-5 py-4 text-[13px] leading-relaxed text-[#555]">{children}</p>
    </motion.div>
  );
}

function renderEditSegments(paragraph: EditSegment[], showEdits: boolean) {
  return paragraph.map((segment, segmentIndex) => {
    if (segment.kind === "del") {
      if (!showEdits) return null;
      return (
        <span
          key={segmentIndex}
          className="line-through decoration-2"
          style={{ color: DELETE_RED, textDecorationColor: DELETE_RED }}
        >
          {segment.text}
        </span>
      );
    }

    if (segment.kind === "ins") {
      return (
        <span
          key={segmentIndex}
          className={
            showEdits
              ? "rounded px-0.5 font-medium underline decoration-2 underline-offset-2"
              : undefined
          }
          style={
            showEdits
              ? {
                  color: ON_PRIMARY,
                  backgroundColor: PRIMARY,
                  textDecorationColor: ON_PRIMARY,
                }
              : undefined
          }
        >
          {segment.text}
        </span>
      );
    }

    if (segment.kind === "note") {
      if (!showEdits) return null;
      return (
        <span
          key={segmentIndex}
          className="rounded px-1.5 py-0.5 text-xs font-semibold text-[#111]"
          style={pillFieldStyle()}
        >
          {segment.text}
        </span>
      );
    }

    return <span key={segmentIndex}>{segment.text}</span>;
  });
}

function TrackedEditingSample() {
  const [activeStage, setActiveStage] = useState(0);
  const [showEdits, setShowEdits] = useState(true);
  const reduceMotion = useReducedMotion();
  const stage = EDITING_STAGES[activeStage];

  return (
    <div className="grid items-start gap-6 min-w-0 md:gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
      <div
        className="overflow-hidden rounded-2xl border border-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
        style={{ backgroundColor: PRIMARY_TINT }}
      >
        {EDITING_STAGES.map((item, index) => {
          const isOpen = activeStage === index;
          return (
            <div
              key={item.title}
              className={index > 0 ? "border-t border-black/10" : undefined}
            >
              <button
                type="button"
                onClick={() => setActiveStage(index)}
                aria-expanded={isOpen}
                className={`flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left text-[13px] font-semibold transition-colors duration-300 cursor-pointer sm:gap-4 sm:px-5 sm:py-4 sm:text-sm ${
                  isOpen ? "text-[#111]" : "text-[#111] hover:text-[#3A2F5C]"
                }`}
                style={isOpen ? { backgroundColor: PRIMARY, color: ON_PRIMARY } : undefined}
              >
                <span>{item.title}</span>
                <motion.span
                  animate={reduceMotion ? undefined : { rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0"
                >
                  <FaChevronDown
                    className={`h-3 w-3 ${isOpen ? "text-[#111]" : "text-[#3A2F5C]"}`}
                    aria-hidden="true"
                  />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && <StageAnswer>{item.body}</StageAnswer>}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <motion.div
        key={stage.title}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="min-w-0 rounded-2xl border border-black/10 bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:p-7 lg:p-8"
      >
        <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-[#3A2F5C]">
          {stage.title}
        </p>
        <div className="space-y-4 text-[13px] leading-[1.9] text-[#333] sm:text-sm">
          {stage.sample.map((paragraph, paragraphIndex) => (
            <p key={paragraphIndex}>{renderEditSegments(paragraph, showEdits)}</p>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-start gap-3 border-t border-black/10 pt-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <button
            type="button"
            role="switch"
            aria-checked={showEdits}
            onClick={() => setShowEdits((prev) => !prev)}
            className="inline-flex cursor-pointer items-center gap-3 text-sm font-semibold text-[#111]"
          >
            <span
              className="relative flex h-7 w-[52px] shrink-0 items-center rounded-full transition-colors duration-300"
              style={{ backgroundColor: showEdits ? PRIMARY : "#CFD8D5" }}
            >
              <motion.span
                className="absolute h-5 w-5 rounded-full bg-white shadow-sm"
                animate={{ left: showEdits ? 26 : 4 }}
                transition={{ type: "spring", stiffness: 500, damping: 32 }}
              />
            </span>
            {showEdits ? "Tracked Edits On" : "Clean Copy"}
          </button>
          <p className="text-xs text-[#777]">
            Toggle to see the same passage before and after our editors sign off.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function GenreShowcase() {
  const [activeId, setActiveId] = useState(GENRES[0].id);
  const activeGenre = GENRES.find((genre) => genre.id === activeId) ?? GENRES[0];
  const ActiveIcon = activeGenre.icon;

  return (
    <>
      <div
        className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:mb-12 sm:flex-wrap sm:justify-center sm:gap-3 sm:overflow-visible sm:px-0 sm:pb-0"
        role="tablist"
        aria-label="Book genres"
      >
        {GENRES.map((genre) => {
          const isActive = genre.id === activeId;
          return (
            <button
              key={genre.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveId(genre.id)}
              className={`shrink-0 cursor-pointer rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300 sm:px-6 sm:py-2.5 sm:text-sm ${
                isActive
                  ? "border-[#3A2F5C] bg-[#3A2F5C] text-white shadow-md"
                  : "border-[#D5D2DC] bg-white text-[#111] hover:border-[#3A2F5C]/30 hover:bg-[#F7F6FA]"
              }`}
            >
              {genre.label}
            </button>
          );
        })}
      </div>

      <motion.div
        key={activeGenre.id}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-1 items-center gap-8 min-w-0 lg:grid-cols-2 lg:gap-14"
        role="tabpanel"
      >
        <div>
          <ActiveIcon
            className="mb-4 h-14 w-14 sm:mb-5 sm:h-18 sm:w-18"
            style={{ color: PRIMARY }}
            aria-hidden="true"
          />
          <h3 className="mb-3 font-sans text-2xl font-bold text-[#111] sm:text-3xl">
            {activeGenre.title}
          </h3>
          <p className="mb-6 text-sm leading-relaxed text-[#555] sm:text-[15px]">
            {activeGenre.body}
          </p>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
            <PrimaryButton onClick={openQuotePopup}>Get Started</PrimaryButton>
            <ChatNowButton />
            <PhoneBlock />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 min-w-0 sm:gap-6">
          {activeGenre.covers.map((cover) => (
            <img
              key={cover.src}
              src={cover.src}
              alt={cover.alt}
              className="h-[200px] w-full rounded-xl object-cover shadow-lg transition-transform duration-500 hover:-translate-y-1 sm:h-[320px] lg:h-[360px]"
              loading="lazy"
            />
          ))}
        </div>
      </motion.div>
    </>
  );
}

function MidPageCta() {
  return (
    <section className="relative bg-[url('/sp-editing-lp/banner.webp')] bg-cover bg-center" aria-label="Special offer">
      <div className="absolute inset-0 bg-[#3A2F5C]/90"></div>
      <div className={`${CONTAINER} relative z-10`}>
        <div className="grid items-center gap-6 py-10 text-center md:py-12 lg:grid-cols-[1fr_auto_auto] lg:gap-10 lg:py-0 lg:text-left">
          <MotionColumn from="left" className="lg:py-10">
            <h2 className="mb-3 font-sans text-xl font-bold leading-tight text-white sm:text-2xl lg:text-[26px]">
              Prepare Your Book for Successful Publishing{" "}
              <span style={{ color: PRIMARY }}>Save Up to 50%</span>
            </h2>
            <p className="mx-auto max-w-md text-[13px] leading-relaxed text-white/80 lg:mx-0">
              Partner with Stamford Publishers’ editorial team today. Get professional editing tailored to your genre and save up to 50% on all comprehensive manuscript packages.
            </p>
          </MotionColumn>

          <ScrollReveal variants={fadeIn} className="hidden lg:block">
            <img
              src="/sp-editing-lp/cta.webp"
              alt="Edited manuscript ready for publishing"
              className="-mt-20 w-full max-w-[320px] object-contain"
              loading="lazy"
            />
          </ScrollReveal>

          <MotionColumn from="right" className="lg:py-10">
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:items-center sm:gap-6 lg:items-start lg:justify-start">
              <PhoneBlock onDark />
              <ChatNowButton />
              <PrimaryButton onClick={openQuotePopup}>Get Started</PrimaryButton>
            </div>
          </MotionColumn>
        </div>
      </div>
    </section>
  );
}

export default function BookEditingLpPage() {
  const reduceMotion = useReducedMotion();
  const [headerScrolled, setHeaderScrolled] = useState(false);
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
            aria-labelledby="be-popup-heading"
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
                style={{ backgroundColor: PRIMARY_SOFT }}
              >
                <h2
                  id="be-popup-heading"
                  className="mb-3 font-sans text-2xl font-bold leading-tight text-[#111] sm:text-3xl"
                >
                  Turn Your Manuscript Into A Masterpiece
                </h2>
                <div className="mb-6 space-y-3 text-sm text-[#111]">
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
                      <h3 className="font-bold">Discuss your manuscript</h3>
                      <a href={`mailto:${EMAIL}`} className="break-all hover:underline">
                        {EMAIL}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-auto flex justify-center">
                  <img
                    src="/sp-editing-lp/hero-img.webp"
                    alt="Manuscript editing and proofreading"
                    className="max-h-[200px] w-full max-w-[280px] rounded-xl object-cover"
                  />
                </div>
              </div>
              <div className="p-6 sm:p-8 md:max-h-[90vh] md:overflow-y-auto">
                <form
                  onSubmit={(e) => handleLeadFormSubmit(e, "/Editing/lp-popup")}
                  className="space-y-3"
                >
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      required
                      className={PILL_FIELD}
                      style={pillFieldStyle()}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                      className={PILL_FIELD}
                      style={pillFieldStyle()}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      required
                      className={PILL_FIELD}
                      style={pillFieldStyle()}
                    />
                    <select
                      name="genre"
                      defaultValue=""
                      className={PILL_SELECT}
                      style={pillFieldStyle()}
                    >
                      <option value="" disabled>
                        Select Genre
                      </option>
                      {GENRE_OPTIONS.map((genre) => (
                        <option key={genre} value={genre}>
                          {genre}
                        </option>
                      ))}
                    </select>
                  </div>
                  <select
                    name="service"
                    defaultValue=""
                    className={PILL_SELECT}
                    style={pillFieldStyle()}
                  >
                    <option value="" disabled>
                      Select Service
                    </option>
                    {SERVICE_OPTIONS.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                  <PrimaryButton type="submit" className="w-full uppercase tracking-wide">
                    Submit Now
                  </PrimaryButton>
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
        className={`fixed top-0 left-0 right-0 z-50 w-full bg-white shadow-sm transition-all duration-300 ${headerScrolled ? "shadow-md" : ""}`}
      >
        <div className={`${CONTAINER} py-3`}>
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            <a
              href="#"
              className="shrink-0 transition-opacity duration-300 hover:opacity-80"
              aria-label="Stamford Publishers"
            >
              <img
                src="/sp-editing-lp/logo.webp"
                alt="Stamford Publishers"
                width={150}
                height={150}
                className="w-30"
              />
            </a>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <ChatNowButton className="shrink-0 px-4 py-2.5 text-xs sm:px-5 sm:text-sm" />
              <PrimaryButton
                onClick={openQuotePopup}
                className="hidden lg:inline-flex shrink-0 px-5 py-2.5 text-sm"
              >
                Get Started
              </PrimaryButton>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="overflow-x-hidden">
        {/* Hero */}
        <section
          className="relative overflow-hidden bg-[url('/sp-editing-lp/banner.webp')] bg-cover bg-center pt-24 pb-10 sm:pt-28 sm:pb-14 lg:pt-40 lg:pb-20"
          aria-labelledby="be-hero-heading"
        >
          <div className="absolute inset-0 bg-white/80"></div>
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full z-20 opacity-40"
            style={{ background: `radial-gradient(circle, ${PRIMARY_SOFT} 0%, transparent 70%)` }}
            aria-hidden="true"
          />
          <div className={`${CONTAINER} relative z-10`}>
            <div className="grid min-w-0 items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
              <motion.div
                className="min-w-0"
                initial={reduceMotion ? false : "hidden"}
                animate={reduceMotion ? undefined : "visible"}
                variants={staggerContainer}
              >
                <motion.p
                  variants={staggerItem}
                  className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#555] sm:text-[13px]!"
                >
                  Turn Your Manuscript Into A Masterpiece
                </motion.p>
                <motion.h1
                  id="be-hero-heading"
                  variants={staggerItem}
                  className="mb-4 font-sans text-3xl font-bold leading-[1.15] text-[#111] sm:text-4xl!"
                >
                  Professional Book Editing &amp; Proofreading Services
                </motion.h1>
                <motion.p
                  variants={staggerItem}
                  className="mb-6 max-w-xl text-sm leading-relaxed text-[#555] sm:text-[15px]"
                >
                  At Stamford Publishers, our experienced editors help transform your raw manuscript into a clean, captivating, and publication-ready book. From correcting grammar, syntax, and punctuation to refining structure, plot pacing, and narrative tone, we ensure your work meets industry publishing standards while preserving your authentic voice.
                </motion.p>

                <motion.ul
                  variants={staggerItem}
                  className="mb-8 grid max-w-xl list-none grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-2"
                >
                  {HERO_CHECKS.map((item) => (
                    <motion.li key={item} variants={staggerItem} className="list-none">
                      <CheckItem>{item}</CheckItem>
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.div variants={staggerItem}>
                  <HeroLeadForm id="hero-form" />
                </motion.div>
              </motion.div>

              <ScrollReveal variants={scaleIn} delay={0.15} className="min-w-0">
                <img
                  src="/sp-editing-lp/hero-img.webp"
                  alt="Manuscript being edited and proofread"
                  className="mx-auto w-full max-w-[600px] object-cover transition-transform duration-500 hover:scale-[1.02]"
                />
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Trust bar */}
        <section className="border-y border-black/10 bg-white py-6 sm:py-8" aria-label="Publishing partners">
          <div className={CONTAINER}>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:justify-between sm:gap-8 lg:gap-10">
              {PARTNER_LOGOS.map((logo) => (
                <img
                  key={logo.src}
                  src={logo.src}
                  alt={logo.alt}
                  className="h-7 w-auto max-w-[90px] object-contain opacity-70 grayscale transition-all duration-300 hover:scale-105 hover:opacity-100 sm:h-9 sm:max-w-[140px] lg:h-10"
                />
              ))}
            </div>
          </div>
        </section>

        {/* What makes us better */}
        <section className={SECTION_PADDING} aria-labelledby="be-better-heading">
          <div className={CONTAINER}>
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
              <MotionColumn from="left" className="order-2 lg:order-1">
                <img
                  src="/sp-editing-lp/sec-2.webp"
                  alt="Open book with a magnifying glass over edited text"
                  className="mx-auto w-full max-w-[600px] object-cover lg:mx-0"
                  loading="lazy"
                />
              </MotionColumn>
              <MotionColumn from="right" className="order-1 lg:order-2">
                <ScrollReveal>
                  <h2 id="be-better-heading" className={`${SECTION_HEADING} mb-4 text-4xl!`}>
                    What Makes Our Book Editing &amp; Proofreading Better?
                  </h2>
                  <p className="mb-6 text-sm leading-relaxed text-[#555] sm:text-[15px]">
                    Great editing goes far beyond basic spell-checks. We perform thorough, line-by-line evaluations to elevate your writing, eliminate structural plot holes, and polish every sentence for maximum reader engagement.
                  </p>
                </ScrollReveal>
                <div className="mb-8 grid list-none grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-2">
                  {BETTER_CHECKS.map((item) => (
                    <CheckItem key={item}>{item}</CheckItem>
                  ))}
                </div>
                <ScrollReveal delay={0.1}>
                  <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
                    <PrimaryButton onClick={openQuotePopup}>Get Started</PrimaryButton>
                    <ChatNowButton />
                    <PhoneBlock />
                  </div>
                </ScrollReveal>
              </MotionColumn>
            </div>
          </div>
        </section>

        <MidPageCta />

        {/* Tracked editing sample */}
        <section className={SECTION_PADDING} aria-labelledby="be-sample-heading">
          <div className={CONTAINER}>
            <ScrollReveal className="mb-8 text-center sm:mb-12">
              <h2 id="be-sample-heading" className={`${SECTION_HEADING} mx-auto mb-3 max-w-xl`}>
                Polished Narration &amp; Precision Proofreading
              </h2>
              <p className={SECTION_SUBHEADING}>
              Our editors don’t alter your unique voice we elevate it. Here is an example of how our line editing and proofreading process refines raw text into clear, impactful prose:
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <TrackedEditingSample />
            </ScrollReveal>
          </div>
        </section>

        {/* Methodology */}
        <section className={SECTION_PADDING} aria-labelledby="be-method-heading">
          <div className={CONTAINER}>
            <ScrollReveal className="mb-8 text-center sm:mb-12">
              <h2 id="be-method-heading" className={`${SECTION_HEADING} mx-auto mb-3 max-w-xl`}>
                Our Structured Book Editing Methodology
              </h2>
              <p className={SECTION_SUBHEADING}>
              Our structured editing process ensures every manuscript receives detailed attention from experienced professionals.
              </p>
            </ScrollReveal>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
              {METHODOLOGY_STEPS.map((step) => (
                <article
                  key={step.title}
                  className="group h-full rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg lg:p-6"
                  style={{ backgroundColor: PRIMARY_SOFT }}
                >
                  <step.icon
                    className="mx-auto mb-4 h-12 w-12 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: PRIMARY }}
                    aria-hidden="true"
                  />
                  <h3 className="mb-3 font-sans text-xl font-bold leading-snug text-[#111] sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-[#4A5F59] sm:text-sm">{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Genres */}
        <section className={SECTION_PADDING} aria-labelledby="be-genre-heading">
          <div className={CONTAINER}>
            <ScrollReveal className="mb-8 text-center">
              <h2 id="be-genre-heading" className={`${SECTION_HEADING} mx-auto mb-3 max-w-xl`}>
                At Your Service Across Every Genre
              </h2>
              <p className={SECTION_SUBHEADING}>
                Choose your category and work with an editor who already knows its conventions,
                pacing, and readers.
              </p>
            </ScrollReveal>
            <GenreShowcase />
          </div>
        </section>

        {/* Why authors trust us */}
        <section className={SECTION_PADDING} aria-labelledby="be-trust-heading">
          <div className={CONTAINER}>
            <ScrollReveal className="mb-10 text-center sm:mb-14">
              <h2 id="be-trust-heading" className={`${SECTION_HEADING} mx-auto max-w-xl`}>
                Why Authors Trust Stamford Publishers
              </h2>
            </ScrollReveal>
            <div className="grid items-start gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
              <div className="space-y-6 sm:space-y-8 lg:space-y-10">
                {TRUST_REASONS.map((reason) => (
                  <div key={reason.number}>
                    <div className="flex items-start gap-3 sm:items-center sm:gap-4 md:gap-6">
                      <h5
                        className="w-10 shrink-0 font-sans text-3xl font-bold! leading-none sm:w-12 sm:text-4xl md:w-14 md:text-[60px]"
                        style={{ color: PRIMARY }}
                        aria-hidden="true"
                      >
                        {reason.number}
                      </h5>
                      <div className="min-w-0 pt-0.5 sm:pt-1">
                        <h3 className="mb-0 font-sans text-lg font-bold text-[#111] sm:text-[24px]">
                          {reason.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-[#111] sm:text-[15px]">
                          {reason.body}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5">
                {TRUST_STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex min-h-[120px] flex-col items-center justify-center rounded-2xl px-3 py-6 text-center sm:min-h-[148px] sm:p-4"
                    style={{ backgroundColor: PRIMARY_SOFT }}
                  >
                    <StatCounter
                      end={stat.end}
                      suffix={stat.suffix}
                      className="mb-1 font-sans text-3xl font-bold leading-none sm:mb-2 sm:text-4xl md:text-[60px]!"
                    />
                    <p className="text-xs font-medium text-black sm:text-sm md:text-[15px]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <MidPageCta />

        {/* Testimonials */}
        <section className={SECTION_PADDING} aria-labelledby="be-testimonials-heading">
          <div className={CONTAINER}>
            <ScrollReveal className="mb-10 text-center sm:mb-14">
              <h2 id="be-testimonials-heading" className={`${SECTION_HEADING} mb-3`}>
                What Our Authors Say
              </h2>
              <p className={SECTION_SUBHEADING}>
                Debut novelists, memoirists, and academics have all trusted us with a manuscript
                they had already rewritten a dozen times. Here is what they told us afterwards.
              </p>
            </ScrollReveal>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8">
              {TESTIMONIALS.map((item) => (
                <figure key={item.author} className="flex h-full flex-col">
                    <div className="bg-[#111] p-[1.5px] [clip-path:polygon(0_26px,26px_0,100%_0,100%_calc(100%-26px),calc(100%-26px)_100%,0_100%)]">
                      <blockquote className="flex h-full flex-col bg-[#F7F7F7] px-6 py-7 text-center [clip-path:polygon(0_26px,26px_0,100%_0,100%_calc(100%-26px),calc(100%-26px)_100%,0_100%)] sm:px-8">
                        <p className="mb-3 font-sans text-sm font-bold text-[#111]">
                          {item.author}
                        </p>
                        <p className="text-[13px] leading-relaxed text-[#555]">
                          &ldquo;{item.quote}&rdquo;
                        </p>
                      </blockquote>
                    </div>
                    <figcaption className="-mt-8 flex justify-center">
                      <img
                        src={item.image}
                        alt={item.author}
                        className="h-16 w-16 rounded-full border-4 border-white object-cover shadow-md transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                      />
                    </figcaption>
                  </figure>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Contact + footer */}
      <footer id="contact" className="bg-white pt-4 pb-8 sm:pb-10" aria-label="Contact and site footer">
        <div className={CONTAINER}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <MotionColumn from="left">
              <h2 className="mb-6 font-sans text-xl font-bold text-[#111] sm:text-2xl">
                We Would Love To Hear From You
              </h2>
              <ContactLeadForm id="contact-form" />
              <p className="mt-10 text-xs text-[#777] sm:mt-20">
                Copyright &copy; {new Date().getFullYear()} Stamford Publishers — All Rights
                Reserved.
              </p>
            </MotionColumn>

            <MotionColumn from="right">
              <div className="space-y-5">
                <div>
                  <div className="flex items-start gap-4">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#111]"
                      style={{ backgroundColor: PRIMARY }}
                    >
                      <FaPhone className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: SECONDARY }}>
                        Call Us
                      </p>
                      <a
                        href={PHONE_HREF}
                        className="text-sm font-bold text-[#111] transition-opacity duration-300 hover:opacity-70"
                      >
                        {PHONE_DISPLAY}
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-4">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#111]"
                      style={{ backgroundColor: PRIMARY }}
                    >
                      <FaEnvelope className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: SECONDARY }}>
                        Email Us
                      </p>
                      <a
                        href={`mailto:${EMAIL}`}
                        className="break-all text-sm font-bold text-[#111] transition-opacity duration-300 hover:opacity-70"
                      >
                        {EMAIL}
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-4">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#111]"
                      style={{ backgroundColor: PRIMARY }}
                    >
                      <FaLocationDot className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: SECONDARY }}>
                        Visit Us
                      </p>
                      <p className="text-sm font-bold leading-relaxed text-[#111]">{ADDRESS}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-3 pt-1">
                    {SOCIAL_LINKS.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={social.label}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-[#111] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#3A2F5C] hover:text-white"
                        style={{ backgroundColor: PRIMARY }}
                      >
                        <social.icon className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-6 pt-4 sm:gap-8">
                    <img
                      src="/book-marketing-lp/trustpilot-1.webp"
                      alt="Trustpilot rating"
                      className="w-20 object-contain transition-transform duration-300 hover:scale-105 sm:w-24"
                      loading="lazy"
                    />
                    <img
                      src="/book-marketing-lp/pay-1.webp"
                      alt="Accepted payment methods"
                      className="w-36 object-contain transition-transform duration-300 hover:scale-105 sm:w-44 md:w-56"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </MotionColumn>
          </div>
        </div>
      </footer>
      {popupModal}
    </>
  );
}
