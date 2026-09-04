"use client";

import { useCallback, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { Manrope, Source_Serif_4 } from "next/font/google";
import { PHONE_CONVERSION_NUMBER, PHONE_HREF } from "@/lib/google-ads";
import { useSelfPubEffects } from "./useSelfPubEffects";
import LeadForm from "./LeadForm";
import PricingPopup from "./PricingPopup";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--sp-fh",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--sp-fb",
  display: "swap",
});

const TESTIMONIALS = [
  {
    quote:
      "My manuscript sat untouched for two years because I did not know what step two was. They read it, told me plainly what it needed, and it was on Amazon four months later.",
    name: "Debut author",
    genre: "Memoir",
    image: "/about-1.webp",
  },
  {
    quote:
      "The distribution reach was the surprise. I expected Amazon. I did not expect to find my book in three county library systems by the end of the year.",
    name: "Published author",
    genre: "Historical fiction",
    image: "/quote-2.webp",
  },
  {
    quote:
      "They handled the parts I did not understand, ISBNs, copyright filing, trim sizes, so I could stay in the part I am actually good at, which is writing.",
    name: "First-time author",
    genre: "Business",
    image: "/user.jpg",
  },
] as const;

export default function SelfPublishingLpClient() {
  const rootRef = useRef<HTMLDivElement>(null);
  useSelfPubEffects(rootRef);
  const [pricingPlan, setPricingPlan] = useState<string | null>(null);
  const closePricing = useCallback(() => setPricingPlan(null), []);

  return (
    <div
      ref={rootRef}
      className={`sp-lp sp-lp-root ${manrope.variable} ${sourceSerif.variable} ${manrope.className}`}
      style={
        {
          ["--fh"]: "var(--sp-fh), system-ui, sans-serif",
          ["--fb"]: "var(--sp-fb), Georgia, serif",
          fontFamily: "var(--fb)",
        } as CSSProperties
      }
    >

{/* ================= STICKY TOP ================= */}
<div className="sp-sticky">
  <div className="promo">
    Sign up this month and save <b>30%</b> on your publishing package
    {'\u00a0'}·{'\u00a0'} <a href={PHONE_HREF}>{PHONE_CONVERSION_NUMBER}</a>
  </div>

  <header className="hdr">
    <div className="shell hdr-in">
      <a className="logo" href="#top">
        <span className="logo-mark">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 4.5h6.5a3 3 0 013 3V20a2.4 2.4 0 00-2.4-2.4H3z"/>
            <path d="M21 4.5h-6.5a3 3 0 00-3 3V20a2.4 2.4 0 012.4-2.4H21z"/>
          </svg>
        </span>
        <span className="logo-txt"><b>Stamford Publishers</b><span>Self-Publishing</span></span>
      </a>

      <nav className="nav" aria-label="Sections">
        <a href="#services">Services</a>
        <a href="#distribution">Distribution</a>
        <a href="#check">Book check</a>
        <a href="#process">How it works</a>
        <a href="#compare">Compare</a>
        <a href="#packages">Packages</a>
        <a href="#faq">FAQ</a>
      </nav>

      <a className="hdr-tel" href={PHONE_HREF}>{PHONE_CONVERSION_NUMBER}</a>
      <a className="btn btn-grad hdr-cta" href="#quote">
        <span className="hdr-cta-full">Free manuscript review</span>
        <span className="hdr-cta-short">Free review</span>
      </a>
    </div>
  </header>
</div>

{/* ================= HERO ================= */}
<section className="hero" id="top">
  <div className="orb orb-a" aria-hidden="true"></div>
  <div className="orb orb-c" aria-hidden="true"></div>
  <svg className="hero-grid-bg" aria-hidden="true">
    <defs>
      <pattern id="grid" width="52" height="52" patternUnits="userSpaceOnUse">
        <path d="M52 0H0v52" fill="none" stroke="rgba(255,255,255,.09)" strokeWidth="1"/>
      </pattern>
      <linearGradient id="gfade" x1="0" y1="0" x2="0.4" y2="1">
        <stop offset="0%" stopColor="#fff" stopOpacity=".9"/>
        <stop offset="100%" stopColor="#fff" stopOpacity="0"/>
      </linearGradient>
      <mask id="gm"><rect width="100%" height="100%" fill="url(#gfade)"/></mask>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" mask="url(#gm)"/>
  </svg>

  <div className="shell hero-grid">
    <div>
      <p className="tag"><i></i>Self-publishing services for US authors</p>

      <h1 className="d1">Writing the book was the hard part. Getting it stocked is ours.</h1>

      <p className="lede">
        Most self-publishing services stop at uploading your file to Amazon. Stamford Publishers
        gets your title into the same wholesale catalogue that bookstores and libraries actually
        order from, alongside full editing, cover design, formatting and a launch campaign built
        for your genre.
      </p>

      <div className="trust">
        <span className="chip">
          <span className="stars" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8 5.8 21.3l2.4-7.4L2 9.4h7.6z"/></svg>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8 5.8 21.3l2.4-7.4L2 9.4h7.6z"/></svg>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8 5.8 21.3l2.4-7.4L2 9.4h7.6z"/></svg>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8 5.8 21.3l2.4-7.4L2 9.4h7.6z"/></svg>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8 5.8 21.3l2.4-7.4L2 9.4h7.6z"/></svg>
          </span>
          <b>4.9</b> average author rating
        </span>
        <span className="chip"><b>7</b> retail and audio channels</span>
        <span className="chip"><b>Free</b> manuscript assessment</span>
      </div>

      <div className="hero-cta">
        <a className="btn btn-grad" href="#quote">Get my free manuscript review</a>
        <a className="btn btn-line" href="#distribution">See where my book could sell</a>
      </div>

      <ul className="ticks">
        <li><span className="tick"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.6" strokeLinecap="round"><path d="M4 12.5l5.5 5.5L20 6"/></svg></span> Listed in the wholesale catalogue bookstores actually order from</li>
        <li><span className="tick"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.6" strokeLinecap="round"><path d="M4 12.5l5.5 5.5L20 6"/></svg></span> You keep 100% of the rights and every royalty dollar</li>
        <li><span className="tick"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.6" strokeLinecap="round"><path d="M4 12.5l5.5 5.5L20 6"/></svg></span> A named editor reads your manuscript before we quote a price</li>
      </ul>
    </div>

    <div className="form-card" id="quote">
      <span className="form-flag">30% off this month</span>
      <h2>Get your free manuscript review</h2>
      <p>Send us what you have. An editor reads it and calls you within one business day with an honest opinion and a costed plan.</p>
      <LeadForm idPrefix="hero" />
    </div>
  </div>

  {/* gradient journey graphic: draft, edit, formats, shelf. No photography anywhere. */}
  <div className="shell hero-art" aria-hidden="true">
    <svg viewBox="0 0 1160 200" fill="none">
      <defs>
        <linearGradient id="pg1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#5CA0FF"/><stop offset="100%" stopColor="#22C8E6"/></linearGradient>
        <linearGradient id="pg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#3B4FD8"/><stop offset="100%" stopColor="#2E7BF6"/></linearGradient>
        <linearGradient id="pg3" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#FFC658"/><stop offset="100%" stopColor="#FF9A1F"/></linearGradient>
        <linearGradient id="ln" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#5CA0FF" stopOpacity=".7"/><stop offset="100%" stopColor="#22C8E6" stopOpacity=".1"/></linearGradient>
      </defs>
      <path d="M120 150 C 320 150, 300 60, 500 60 S 760 150, 960 100" stroke="url(#ln)" strokeWidth="2" strokeDasharray="7 7"/>

      <g transform="translate(60,60)">
        <rect x="8" y="8" width="86" height="112" rx="8" fill="#fff" fillOpacity=".08"/>
        <rect x="0" y="0" width="86" height="112" rx="8" fill="#fff" fillOpacity=".14" stroke="rgba(255,255,255,.28)"/>
        <g stroke="rgba(255,255,255,.45)" strokeWidth="3" strokeLinecap="round"><path d="M16 24h54M16 38h54M16 52h38M16 66h54M16 80h30"/></g>
        <text x="43" y="134" textAnchor="middle" fill="rgba(233,241,251,.75)" fontFamily="Manrope,sans-serif" fontSize="12" fontWeight="700">Your draft</text>
      </g>

      <g transform="translate(300,26)">
        <rect x="0" y="0" width="150" height="96" rx="14" fill="url(#pg2)" fillOpacity=".22" stroke="rgba(92,160,255,.5)"/>
        <circle cx="30" cy="30" r="12" fill="url(#pg2)"/>
        <path d="M25 30l4 4 7-8" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" fill="none"/>
        <g stroke="rgba(255,255,255,.4)" strokeWidth="3" strokeLinecap="round"><path d="M54 26h72M54 38h50"/></g>
        <g stroke="rgba(255,255,255,.32)" strokeWidth="3" strokeLinecap="round"><path d="M20 62h110M20 76h74"/></g>
        <text x="75" y="118" textAnchor="middle" fill="rgba(233,241,251,.75)" fontFamily="Manrope,sans-serif" fontSize="12" fontWeight="700">Edited and designed</text>
      </g>

      <g transform="translate(600,30)">
        <rect x="0" y="10" width="62" height="86" rx="8" fill="url(#pg1)" fillOpacity=".75"/>
        <rect x="70" y="22" width="54" height="74" rx="8" fill="url(#pg2)" fillOpacity=".8"/>
        <rect x="132" y="34" width="46" height="62" rx="8" fill="url(#pg3)" fillOpacity=".85"/>
        <text x="89" y="118" textAnchor="middle" fill="rgba(233,241,251,.75)" fontFamily="Manrope,sans-serif" fontSize="12" fontWeight="700">Print, ebook, audio</text>
      </g>

      <g transform="translate(900,44)">
        <circle cx="70" cy="52" r="46" fill="url(#pg1)" fillOpacity=".18" stroke="rgba(34,200,230,.45)"/>
        <circle cx="70" cy="52" r="28" fill="url(#pg1)" fillOpacity=".3"/>
        <path d="M70 24v56M42 52h56" stroke="rgba(255,255,255,.5)" strokeWidth="2"/>
        <ellipse cx="70" cy="52" rx="14" ry="28" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="2"/>
        <text x="70" y="120" textAnchor="middle" fill="rgba(233,241,251,.75)" fontFamily="Manrope,sans-serif" fontSize="12" fontWeight="700">On sale worldwide</text>
      </g>
    </svg>
  </div>
</section>

{/* ================= RETAILER STRIP ================= */}
<section className="strip">
  <div className="shell strip-in">
    <p>Distributed through</p>
    <span>Amazon</span><span>Barnes & Noble</span><span>Ingram</span>
    <span>Apple Books</span><span>Kobo</span><span>Google Play</span><span>Audible</span>
  </div>
</section>

{/* ================= STATS ================= */}
<section className="sec sec-mist">
  <div className="shell stats-in">
    <div className="stat rv"><b className="grad-txt" data-count="1400" data-suffix="+">0</b><span>Books written, edited and published</span></div>
    <div className="stat rv"><b className="grad-txt" data-count="7" data-suffix="">0</b><span>Retail and audio channels at launch</span></div>
    <div className="stat rv"><b className="grad-txt" data-count="100" data-suffix="%">0</b><span>Rights and royalties kept by you</span></div>
    <div className="stat rv"><b className="grad-txt" data-count="40" data-suffix="+">0</b><span>Countries your title can reach</span></div>
  </div>
</section>

{/* ================= SERVICES ================= */}
<section className="sec" id="services">
  <div className="shell">
    <div className="sec-head">
      <p className="tag"><i></i>What we handle</p>
      <h2 className="d2">Six services, one publishing team</h2>
      <p className="lede">
        Most authors stall in the gap between finishing a draft and knowing what happens next.
        We close that gap. Take the full package or hire us for a single service.
      </p>
    </div>

    <div className="svc-grid">
      <article className="svc rv">
        <div className="svc-ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z"/></svg></div>
        <h3>Ghostwriting</h3>
        <p>Expert writers turn your notes, interviews or half-finished chapters into a clean, publish-ready draft that still sounds like you.</p>
      </article>

      <article className="svc rv">
        <div className="svc-ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/><path d="M9 7h7"/></svg></div>
        <h3>Editing and proofreading</h3>
        <p>Developmental editing for structure and argument, line editing for rhythm, and a final proof so nothing embarrassing reaches print.</p>
      </article>

      <article className="svc rv">
        <div className="svc-ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.6"/><path d="M21 15l-5-5L5 21"/></svg></div>
        <h3>Cover design and formatting</h3>
        <p>Covers built to compete in your category thumbnail, and interiors typeset properly for paperback, hardcover and every e-reader.</p>
      </article>

      <article className="svc rv">
        <div className="svc-ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19"/><path d="M12 2.5a14.5 14.5 0 010 19 14.5 14.5 0 010-19z"/></svg></div>
        <h3>Publishing and distribution</h3>
        <p>ISBN registration in your name, copyright filing, and placement in the wholesale catalogue that bookstores and libraries order from.</p>
      </article>

      <article className="svc rv">
        <div className="svc-ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M19 10v1a7 7 0 01-14 0v-1M12 18v4"/></svg></div>
        <h3>Audiobook production</h3>
        <p>Professional narration, direction and mastering to Audible and Apple specification, so your book reaches listeners as well as readers.</p>
      </article>

      <article className="svc rv">
        <div className="svc-ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round"><path d="M3 11l18-8-8 18-2-8-8-2z"/></svg></div>
        <h3>Book marketing</h3>
        <p>Launch campaigns, review outreach, Amazon listing optimisation, press and book fair placement, aimed at readers who buy your genre.</p>
      </article>

      <div className="svc-more rv">
        <b>Also available:</b> book video trailers, author websites, blog and article writing, website content, ebook writing, and book signing coordination.
      </div>
    </div>
  </div>
</section>

{/* ================= DISTRIBUTION =================
     Promoted to its own major section per brief: distribution is the
     headline differentiator on this page, not a footnote under services.
============================================================ */}
<section className="sec sec-navy on-navy" id="distribution">
  <div className="orb orb-a" style={{top: -180, left: -100}} aria-hidden="true"></div>
  <div className="orb orb-b" style={{bottom: -160, right: -60}} aria-hidden="true"></div>
  <div className="shell">
    <div className="sec-head">
      <p className="tag"><i></i>The part most services skip</p>
      <h2 className="d2">Distribution is where self-publishing usually falls short. We built ours to not.</h2>
      <p className="lede">
        Plenty of self-publishing services stop at uploading your file to Amazon and calling it
        done. That reaches readers already searching for your exact title. It does not reach a
        bookstore buyer, a librarian building next quarter's order, or a reader browsing a shelf
        who has never heard your name. Ours does both.
      </p>
    </div>

    <div className="dist-grid">
      <div className="dist rv">
        <div className="dist-h">
          <span className="dist-ic" style={{background: "linear-gradient(135deg,#2E7BF6,#22C8E6)"}}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 9h20"/></svg></span>
          <h3>Where readers buy directly</h3>
        </div>
        <ul>
          <li><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2E7BF6" strokeWidth="3" strokeLinecap="round"><path d="M4 12.5l5.5 5.5L20 6"/></svg>Amazon, print and Kindle</li>
          <li><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2E7BF6" strokeWidth="3" strokeLinecap="round"><path d="M4 12.5l5.5 5.5L20 6"/></svg>Barnes & Noble</li>
          <li><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2E7BF6" strokeWidth="3" strokeLinecap="round"><path d="M4 12.5l5.5 5.5L20 6"/></svg>Apple Books</li>
          <li><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2E7BF6" strokeWidth="3" strokeLinecap="round"><path d="M4 12.5l5.5 5.5L20 6"/></svg>Kobo and Google Play Books</li>
          <li><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2E7BF6" strokeWidth="3" strokeLinecap="round"><path d="M4 12.5l5.5 5.5L20 6"/></svg>Audible, for audiobook editions</li>
        </ul>
      </div>

      <div className="dist rv">
        <div className="dist-h">
          <span className="dist-ic" style={{background: "linear-gradient(135deg,#3B4FD8,#7C5CFF)"}}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21V8l9-5 9 5v13"/><path d="M9 21v-6h6v6"/></svg></span>
          <h3>Where stores and libraries order from</h3>
        </div>
        <ul>
          <li><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#3B4FD8" strokeWidth="3" strokeLinecap="round"><path d="M4 12.5l5.5 5.5L20 6"/></svg>Ingram, the wholesale catalogue buyers use</li>
          <li><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#3B4FD8" strokeWidth="3" strokeLinecap="round"><path d="M4 12.5l5.5 5.5L20 6"/></svg>Independent bookstores</li>
          <li><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#3B4FD8" strokeWidth="3" strokeLinecap="round"><path d="M4 12.5l5.5 5.5L20 6"/></svg>Public library systems</li>
          <li><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#3B4FD8" strokeWidth="3" strokeLinecap="round"><path d="M4 12.5l5.5 5.5L20 6"/></svg>Academic and school libraries</li>
          <li><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#3B4FD8" strokeWidth="3" strokeLinecap="round"><path d="M4 12.5l5.5 5.5L20 6"/></svg>Book fairs and signing events</li>
        </ul>
      </div>

      <div className="dist rv">
        <div className="dist-h">
          <span className="dist-ic" style={{background: "linear-gradient(135deg,#0EA5A5,#22C8E6)"}}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 010 18 14 14 0 010-18z"/></svg></span>
          <h3>How far it actually travels</h3>
        </div>
        <ul>
          <li><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0EA5A5" strokeWidth="3" strokeLinecap="round"><path d="M4 12.5l5.5 5.5L20 6"/></svg>All 50 US states</li>
          <li><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0EA5A5" strokeWidth="3" strokeLinecap="round"><path d="M4 12.5l5.5 5.5L20 6"/></svg>UK, Canada, Australia and EU retailers</li>
          <li><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0EA5A5" strokeWidth="3" strokeLinecap="round"><path d="M4 12.5l5.5 5.5L20 6"/></svg>Print on demand, no warehousing for you</li>
          <li><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0EA5A5" strokeWidth="3" strokeLinecap="round"><path d="M4 12.5l5.5 5.5L20 6"/></svg>Hardcover, paperback, ebook, audio</li>
          <li><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0EA5A5" strokeWidth="3" strokeLinecap="round"><path d="M4 12.5l5.5 5.5L20 6"/></svg>Author copies at printing cost</li>
        </ul>
      </div>
    </div>

    <div className="reasons" style={{marginTop: "clamp(40px,5vw,60px)"}}>
      <div className="reason rv">
        <h3 className="h3">One listing, every format</h3>
        <p>Print and digital editions sit under a single retailer record, so a reader who finds your paperback also sees the Kindle edition, and vice versa. Most self-publishing services list these separately, which splits your reviews and your ranking.</p>
      </div>
      <div className="reason rv">
        <h3 className="h3">A catalogue buyers actually use</h3>
        <p>Ingram is the same wholesale system that traditional publishers list through. Being in it does not guarantee a store stocks you, but it means any store or library that wants to order your book is able to, in one click, at standard trade terms.</p>
      </div>
    </div>

    <p className="dist-note rv" style={{marginTop: 32}}>
      <b>Worth being straight about:</b> listing in a retailer's catalogue is not the same as a
      bookstore stocking it on a shelf. Shelf placement is always the retailer's own decision, and
      no honest publisher can promise otherwise. What we guarantee is that any store or library
      wanting to order your book is able to, and that your marketing package includes outreach
      aimed at making that decision easier for them.
    </p>
  </div>
</section>

{/* ================= SCRIPTURE-FREE SCRIPTURE-BAND STYLE STAT BAND ================= */}
<section className="sec sec-mist">
  <div className="shell">
    <div className="sec-head center">
      <p className="tag"><i></i>Reach, in numbers</p>
      <h2 className="d2">What "worldwide distribution" actually means for your book</h2>
    </div>
    <div className="stats-in">
      <div className="stat rv"><b className="grad-txt" data-count="7" data-suffix="">0</b><span>Retail and audio platforms at launch</span></div>
      <div className="stat rv"><b className="grad-txt" data-count="40" data-suffix="+">0</b><span>Countries your title is listed in</span></div>
      <div className="stat rv"><b className="grad-txt" data-count="1" data-suffix="">0</b><span>Combined listing per format, not split</span></div>
      <div className="stat rv"><b className="grad-txt" data-count="0" data-suffix="">0</b><span>Warehousing or inventory cost to you</span></div>
    </div>
  </div>
</section>

{/* ================= READINESS QUIZ ================= */}
<section className="sec sec-navy on-navy" id="check">
  <div className="orb orb-b" style={{top: -120, right: -60}} aria-hidden="true"></div>
  <div className="orb orb-c" style={{bottom: -180, left: -100}} aria-hidden="true"></div>
  <div className="shell">
    <div className="sec-head center">
      <p className="tag"><i></i>Two minute check</p>
      <h2 className="d2">Is your book ready to publish?</h2>
      <p className="lede">Answer three questions and we will tell you which step actually comes next, even if that step is not hiring us.</p>
    </div>

    <div className="quiz-wrap">
      <div className="quiz-bar" aria-hidden="true"><i className="on"></i><i></i><i></i></div>

      <div className="quiz-step on" data-step="0">
        <h3 className="quiz-q">Where is your manuscript right now?</h3>
        <div className="quiz-opts">
          <button className="qopt" type="button" data-k="stage" data-v="idea"><em>A</em>Still an idea, or notes only</button>
          <button className="qopt" type="button" data-k="stage" data-v="partial"><em>B</em>Partly written</button>
          <button className="qopt" type="button" data-k="stage" data-v="draft"><em>C</em>Complete first draft or later</button>
          <button className="qopt" type="button" data-k="stage" data-v="published"><em>D</em>Already published somewhere</button>
        </div>
      </div>

      <div className="quiz-step" data-step="1">
        <h3 className="quiz-q">Has it been professionally edited?</h3>
        <div className="quiz-opts">
          <button className="qopt" type="button" data-k="edit" data-v="yes"><em>A</em>Yes, by a professional editor</button>
          <button className="qopt" type="button" data-k="edit" data-v="no"><em>B</em>No, not yet</button>
          <button className="qopt" type="button" data-k="edit" data-v="unsure"><em>C</em>A friend read it, does that count?</button>
        </div>
        <button className="quiz-back" type="button" data-back>← Back</button>
      </div>

      <div className="quiz-step" data-step="2">
        <h3 className="quiz-q">What matters most for this book?</h3>
        <div className="quiz-opts">
          <button className="qopt" type="button" data-k="goal" data-v="speed"><em>A</em>Getting it published quickly</button>
          <button className="qopt" type="button" data-k="goal" data-v="reach"><em>B</em>Reaching as many readers as possible</button>
          <button className="qopt" type="button" data-k="goal" data-v="quality"><em>C</em>Making it as good as it can be</button>
          <button className="qopt" type="button" data-k="goal" data-v="income"><em>D</em>Earning income from it</button>
        </div>
        <button className="quiz-back" type="button" data-back>← Back</button>
      </div>

      <div className="quiz-res" id="quizRes">
        <span className="res-tag" id="resTag">Your next step</span>
        <h3 id="resTitle"></h3>
        <p id="resBody"></p>
        <div className="res-next">
          <b>What we would do first</b>
          <ul id="resList"></ul>
        </div>
        <div className="quiz-actions">
          <a className="btn btn-grad" href="#quote">Get my free manuscript review</a>
          <button className="btn btn-line" id="quizReset" type="button">Start over</button>
        </div>
      </div>
    </div>
  </div>
</section>

{/* ================= PROCESS ================= */}
<section className="sec sec-mist" id="process">
  <div className="shell">
    <div className="sec-head center">
      <p className="tag"><i></i>How it works</p>
      <h2 className="d2">Four steps from manuscript to market</h2>
    </div>
    <div className="proc-grid">
      <div className="step rv"><div className="step-n">01</div><h3>Free manuscript review</h3><p>Send whatever you have. An editor reads it and writes back a plain assessment of what it needs. No charge, no commitment.</p></div>
      <div className="step rv"><div className="step-n">02</div><h3>Write and edit</h3><p>Ghostwriting if the draft is unfinished, then developmental editing, line editing and proofreading, with your notes at every handoff.</p></div>
      <div className="step rv"><div className="step-n">03</div><h3>Design and publish</h3><p>Cover concepts, interior typesetting, ISBN and copyright registration, then final proofs. Nothing prints until you sign off in writing.</p></div>
      <div className="step rv"><div className="step-n">04</div><h3>Distribute and market</h3><p>Your book goes live across every channel at once, and the launch campaign begins so readers, stores and libraries can find it.</p></div>
    </div>
  </div>
</section>

{/* ================= COMPARISON ================= */}
<section className="sec" id="compare">
  <div className="shell">
    <div className="sec-head">
      <p className="tag"><i></i>Your options</p>
      <h2 className="d2">Do it yourself, query an agent, or hand it over</h2>
      <p className="lede">All three are legitimate routes. Here is an honest comparison so you can pick the one that suits your book and your patience.</p>
    </div>

    <div className="cmp-scroll">
      <table className="cmp">
        <thead>
          <tr>
            <th scope="col">Compare</th>
            <th scope="col">Doing it yourself</th>
            <th scope="col">Traditional publishing</th>
            <th scope="col" className="hi">Stamford Publishers</th>
          </tr>
        </thead>
        <tbody>
          <tr><th scope="row">Time to publish</th><td>Months to years, entirely on your own schedule</td><td>Often 18 months or more, if an agent says yes at all</td><td className="hi">Typically 3 to 6 months from kickoff</td></tr>
          <tr><th scope="row">Getting accepted</th><td>No gatekeeper, anyone can publish</td><td>Requires an agent, then a publisher, then luck</td><td className="hi">No gatekeeper, we work with what you have</td></tr>
          <tr><th scope="row">Editing and design</th><td>You find, vet and manage each freelancer yourself</td><td>Provided, but you get little say in the outcome</td><td className="hi">One team, one manager, your approval at every stage</td></tr>
          <tr><th scope="row">Distribution</th><td>Usually one platform, listed separately by format</td><td>Wide, if the publisher chooses to prioritise you</td><td className="hi">7 channels, one listing per format, from launch</td></tr>
          <tr><th scope="row">Rights and royalties</th><td>You keep everything</td><td>Publisher takes rights, you receive 8 to 15% royalty</td><td className="hi">You keep 100% of rights and royalties</td></tr>
          <tr><th scope="row">Upfront cost</th><td>Low, but your time is the real cost</td><td>None, though advances are rare for new authors</td><td className="hi">Quoted after a free review, nothing before</td></tr>
          <tr><th scope="row">Creative control</th><td>Total</td><td>Limited, publisher has final say on title and cover</td><td className="hi">Total, you approve every decision</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

{/* ================= GENRES ================= */}
<section className="sec sec-mist">
  <div className="shell">
    <div className="sec-head">
      <p className="tag"><i></i>Industries we write for</p>
      <h2 className="d2">Writers who already know your subject</h2>
      <p className="lede">Your book is assigned to a writer and editor who have worked in your category before, not a generalist learning it on your budget.</p>
    </div>
    <div className="gen-grid">
      <div className="gen rv"><i style={{background: "linear-gradient(135deg,#2E7BF6,#22C8E6)"}}></i>Memoirs and biographies</div>
      <div className="gen rv"><i style={{background: "linear-gradient(135deg,#3B4FD8,#7C5CFF)"}}></i>Business and leadership</div>
      <div className="gen rv"><i style={{background: "linear-gradient(135deg,#0EA5A5,#22C8E6)"}}></i>Self-help and personal growth</div>
      <div className="gen rv"><i style={{background: "linear-gradient(135deg,#FFC658,#FF9A1F)"}}></i>Fiction, all sub-genres</div>
      <div className="gen rv"><i style={{background: "linear-gradient(135deg,#2E7BF6,#22C8E6)"}}></i>Children's and young adult</div>
      <div className="gen rv"><i style={{background: "linear-gradient(135deg,#3B4FD8,#7C5CFF)"}}></i>Health and medical</div>
      <div className="gen rv"><i style={{background: "linear-gradient(135deg,#0EA5A5,#22C8E6)"}}></i>Faith and spirituality</div>
      <div className="gen rv"><i style={{background: "linear-gradient(135deg,#FFC658,#FF9A1F)"}}></i>Education and research</div>
      <div className="gen rv"><i style={{background: "linear-gradient(135deg,#2E7BF6,#22C8E6)"}}></i>Finance and economics</div>
      <div className="gen rv"><i style={{background: "linear-gradient(135deg,#3B4FD8,#7C5CFF)"}}></i>Lifestyle and travel</div>
      <div className="gen rv"><i style={{background: "linear-gradient(135deg,#0EA5A5,#22C8E6)"}}></i>Motivational and inspirational</div>
      <div className="gen rv"><i style={{background: "linear-gradient(135deg,#FFC658,#FF9A1F)"}}></i>Consultant and expert books</div>
    </div>
  </div>
</section>

{/* ================= TESTIMONIALS ================= */}
<section className="sec" id="testimonials">
  <div className="shell">
    <div className="sec-head center">
      <p className="tag"><i></i>Author feedback</p>
      <h2 className="d2">What authors say about the process</h2>
    </div>
    <div className="tst-grid">
      {TESTIMONIALS.map((item) => (
        <figure className="tst rv" key={item.name + item.genre}>
          <span className="stars" aria-hidden="true">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8 5.8 21.3l2.4-7.4L2 9.4h7.6z"/></svg>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8 5.8 21.3l2.4-7.4L2 9.4h7.6z"/></svg>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8 5.8 21.3l2.4-7.4L2 9.4h7.6z"/></svg>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8 5.8 21.3l2.4-7.4L2 9.4h7.6z"/></svg>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8 5.8 21.3l2.4-7.4L2 9.4h7.6z"/></svg>
          </span>
          <blockquote>{item.quote}</blockquote>
          <figcaption>
            <span className="av">
              <Image src={item.image} alt={item.name} width={46} height={46} className="av-img" />
            </span>
            <span>
              <b>{item.name}</b>
              <span>{item.genre}</span>
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  </div>
</section>

{/* ================= PACKAGES ================= */}
<section className="sec sec-navy on-navy" id="packages">
  <div className="orb orb-a" style={{top: -200, left: -120}} aria-hidden="true"></div>
  <div className="orb orb-b" style={{bottom: -160, right: -80}} aria-hidden="true"></div>
  <div className="shell">
    <div className="sec-head center">
      <p className="tag"><i></i>Packages</p>
      <h2 className="d2">Pick a starting point, adjust as you go</h2>
      <p className="lede">Every package includes a full manuscript edit and complete publishing setup. The difference is how far your distribution and marketing reach.</p>
    </div>

    <div className="pkg-grid">
      <article className="tier rv">
        <h3>Foundations</h3>
        <p className="for">For authors who want a clean, professionally published book without a marketing push.</p>
        <div className="quote">Quote on request<small>One time cost, confirmed after a free manuscript review</small></div>
        <hr />
        <ul>
          <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M4 12.5l5.5 5.5L20 6"/></svg>Full manuscript edit and proofread</li>
          <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M4 12.5l5.5 5.5L20 6"/></svg>Interior formatting, print and ebook</li>
          <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M4 12.5l5.5 5.5L20 6"/></svg>Custom cover design, two concepts</li>
          <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M4 12.5l5.5 5.5L20 6"/></svg>ISBN and copyright registration</li>
          <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M4 12.5l5.5 5.5L20 6"/></svg>Amazon and Kindle distribution</li>
        </ul>
        <button type="button" className="btn btn-line" onClick={() => setPricingPlan("Foundations")}>
          Get pricing
        </button>
      </article>

      <article className="tier tier-hot rv">
        <span className="tier-flag">Most authors choose this</span>
        <h3>Complete Publishing</h3>
        <p className="for">Full retail and library reach from day one, with a dedicated consultant on your project.</p>
        <div className="quote">Quote on request<small>One time cost, confirmed after a free manuscript review</small></div>
        <hr />
        <ul>
          <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M4 12.5l5.5 5.5L20 6"/></svg>Everything in Foundations</li>
          <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M4 12.5l5.5 5.5L20 6"/></svg>Barnes & Noble, Ingram, Apple Books, Kobo</li>
          <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M4 12.5l5.5 5.5L20 6"/></svg>Library and independent bookstore reach</li>
          <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M4 12.5l5.5 5.5L20 6"/></svg>Premium cover, three concepts</li>
          <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M4 12.5l5.5 5.5L20 6"/></svg>Author copies for signings</li>
          <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M4 12.5l5.5 5.5L20 6"/></svg>Dedicated publishing consultant</li>
        </ul>
        <button type="button" className="btn btn-grad" onClick={() => setPricingPlan("Complete Publishing")}>
          Get pricing
        </button>
      </article>

      <article className="tier rv">
        <h3>Full-Service Launch</h3>
        <p className="for">For authors who want a coordinated launch, not just a published book sitting in a catalogue.</p>
        <div className="quote">Quote on request<small>One time cost, confirmed after a free manuscript review</small></div>
        <hr />
        <ul>
          <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M4 12.5l5.5 5.5L20 6"/></svg>Everything in Complete Publishing</li>
          <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M4 12.5l5.5 5.5L20 6"/></svg>Audiobook production and narration</li>
          <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M4 12.5l5.5 5.5L20 6"/></svg>Press and media outreach</li>
          <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M4 12.5l5.5 5.5L20 6"/></svg>Book signing and book fair placement</li>
          <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M4 12.5l5.5 5.5L20 6"/></svg>Author website and video trailer</li>
          <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M4 12.5l5.5 5.5L20 6"/></svg>Twelve week launch campaign</li>
        </ul>
        <button type="button" className="btn btn-line" onClick={() => setPricingPlan("Full-Service Launch")}>
          Get pricing
        </button>
      </article>
    </div>

    <p className="pkg-foot">Every manuscript is different. Final pricing is confirmed after a free review, never before.</p>
  </div>
</section>

{/* ================= FAQ ================= */}
<section className="sec" id="faq">
  <div className="shell">
    <div className="sec-head center">
      <p className="tag"><i></i>Before you reach out</p>
      <h2 className="d2">Common questions</h2>
    </div>
    <div className="faq-wrap">
      <details open>
        <summary>What makes your distribution different from other self-publishing services?</summary>
        <p>Most self-publishing services list your book on Amazon and stop there. We list through Ingram, the same wholesale catalogue traditional publishers use, so independent bookstores and libraries can order your title through their normal ordering system rather than needing to buy a single copy from a retail listing. Print and digital editions are also combined under one listing per format, which most competitors split, costing you reviews and ranking.</p>
      </details>
      <details>
        <summary>Do I need a finished manuscript to get started?</summary>
        <p>No. A complete draft is the easiest starting point, but it is not required. If you have half a book, a stack of notes, or only an idea and the time to be interviewed, our ghostwriters can build the draft with you. Tell the consultant what actually exists and the plan is built around that.</p>
      </details>
      <details>
        <summary>Who owns the book and the royalties?</summary>
        <p>You do, completely. The copyright is filed in your name, the ISBN is registered to you, and every royalty dollar from every channel is paid to you. We are a service provider, not a publishing house that takes a share of your work. Nothing in the agreement claims film, foreign or future rights.</p>
      </details>
      <details>
        <summary>How much does it cost?</summary>
        <p>It depends on the state of your manuscript and how many services you need, which is why we quote after reading it rather than before. A book that needs only formatting and distribution costs a fraction of one that needs ghostwriting from scratch. The review is free and the quote is itemised, so you can see what each part costs and remove anything you do not want.</p>
      </details>
      <details>
        <summary>How long does the whole process take?</summary>
        <p>A finished, clean manuscript usually goes from kickoff to live in three to four months. Books needing developmental work or ghostwriting run longer, commonly six to nine months depending on length and how quickly you return feedback. You receive a dated schedule before any work begins.</p>
      </details>
      <details>
        <summary>Will my book actually be in bookstores?</summary>
        <p>It will be available to every bookstore and library through the Ingram wholesale catalogue, which is where retailers place their orders. Whether a specific store puts it on a physical shelf is that store's own buying decision, and no honest publisher can promise it. Our marketing packages include outreach to independent stores, which is how most self-published titles get stocked.</p>
      </details>
      <details>
        <summary>Can I upgrade my package later?</summary>
        <p>Yes, and many authors do. It is common to start with editing and publishing to get the book out, then add audiobook production or a marketing campaign once early sales show which channels are worth pushing. You are never charged twice for work already completed.</p>
      </details>
    </div>
  </div>
</section>

{/* ================= FINAL CTA ================= */}
<section className="final">
  <div className="orb orb-b" aria-hidden="true"></div>
  <div className="orb orb-c" aria-hidden="true"></div>
  <div className="shell">
    <h2 className="d2">Ready to see your name on a spine?</h2>
    <p>Send us your manuscript, your outline, or just a description of the book you keep meaning to write. A publishing consultant reads it and comes back within one business day.</p>
    <div className="final-cta">
      <a className="btn btn-white" href="#quote">Get my free manuscript review</a>
      <a className="btn btn-line" href={PHONE_HREF}>Call {PHONE_CONVERSION_NUMBER}</a>
    </div>
  </div>
</section>

{/* ================= FOOTER ================= */}
<footer className="ftr">
  <div className="shell ftr-grid">
    <div>
      <a className="logo" href="#top" style={{marginRight: "0"}}>
        <span className="logo-mark">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 4.5h6.5a3 3 0 013 3V20a2.4 2.4 0 00-2.4-2.4H3z"/><path d="M21 4.5h-6.5a3 3 0 00-3 3V20a2.4 2.4 0 012.4-2.4H21z"/>
          </svg>
        </span>
        <span className="logo-txt"><b>Stamford Publishers</b><span>Self-Publishing</span></span>
      </a>
      <p className="ftr-blurb">We bring your story to life with expert guidance, from the first outline to the finished book on sale, in stores that can actually order it.</p>
      <p className="ftr-addr">
        <a href={PHONE_HREF}>{PHONE_CONVERSION_NUMBER}</a><br />
        <a href="mailto:info@stamfordpublishers.com">info@stamfordpublishers.com</a>
      </p>
    </div>

    <div><h4>Services</h4><ul>
      <li><a href="/book-writing">Ghostwriting</a></li>
      <li><a href="/book-editing">Editing</a></li>
      <li><a href="/book-cover-design">Cover design</a></li>
      <li><a href="/book-publishing">Publishing</a></li>
      <li><a href="/book-marketing">Marketing</a></li>
      <li><a href="/audiobook">Audiobook</a></li>
    </ul></div>

    <div><h4>Company</h4><ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about-us">About us</a></li>
      <li><a href="/childrens-books">Children&apos;s books</a></li>
      <li><a href="/author-website">Author websites</a></li>
      <li><a href="/contact-us">Contact us</a></li>
    </ul></div>

    <div><h4>Get started</h4><ul>
      <li><a href="#quote">Free manuscript review</a></li>
      <li><a href={PHONE_HREF}>{PHONE_CONVERSION_NUMBER}</a></li>
    </ul>
    <p className="ftr-blurb" style={{marginTop: 14}}>Consultations run Monday to Friday, usually within the same week.</p></div>
  </div>

  <div className="shell ftr-legal">
    <span>Copyright 2026 Stamford Publishers. All rights reserved.</span>
    <span>
      <a href="/privacy-policy">Privacy policy</a>
      {'\u00a0'}{'\u00a0'}
      <a href="/terms-of-service">Terms and conditions</a>
    </span>
    <span className="ftr-disc">
      Stamford Publishers provides self-publishing and author services. We are not a traditional
      publishing house and do not acquire rights to the books we produce.
    </span>
  </div>
</footer>

{/* ================= STICKY MOBILE BAR ================= */}
<div className="dock">
  <a className="btn btn-line-ink" href={PHONE_HREF}>Call now</a>
  <a className="btn btn-grad" href="#quote">Free review</a>
</div>

<PricingPopup open={Boolean(pricingPlan)} plan={pricingPlan} onClose={closePricing} />

    </div>
  );
}
