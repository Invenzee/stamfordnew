"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { FaEnvelope, FaPhone, FaXmark } from "react-icons/fa6";
import { OPEN_QUOTE_POPUP_EVENT } from "@/lib/lead-actions";
import { submitLeadForm } from "@/lib/submit-form";
import s from "./lp.module.css";
import {
  BRAND,
  NAV,
  HERO,
  FORM,
  TRUST,
  SCRIPTURE,
  SERVICES,
  REASONS,
  GENRES,
  PROCESS,
  TESTIMONIALS,
  PACKAGES,
  FAQ,
  CLOSING,
  FOOTER,
} from "./content";

const POPUP_DELAY_MS = 20000;
const POPUP_SESSION_KEY = "christian-lp-popup-dismissed";

/* ------------------------------------------------------------------ */
/* Ribbon bookmark. The one bold flourish on the page: it grows as you  */
/* scroll and ends in a notched tail, like a real Bible ribbon.         */
/* ------------------------------------------------------------------ */
function RibbonBookmark() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let queued = false;
    const draw = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      el.style.height = `${60 + pct * (window.innerHeight - 120)}px`;
      queued = false;
    };
    const onScroll = () => {
      if (!queued) {
        window.requestAnimationFrame(draw);
        queued = true;
      }
    };

    draw();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", draw);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", draw);
    };
  }, []);

  return <div ref={ref} className={s.ribbon} aria-hidden="true" />;
}

/* ------------------------------------------------------------------ */
/* Consultation form                                                    */
/* ------------------------------------------------------------------ */
function ConsultationForm({
  source = "/Christian/lp",
  idPrefix = "f",
  cardId,
  animated = false,
  plain = false,
}: {
  source?: string;
  idPrefix?: string;
  cardId?: string;
  animated?: boolean;
  plain?: boolean;
}) {
  const [invalid, setInvalid] = useState<Record<string, boolean>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: bots fill this, humans never see it
    if (String(data.get("company") ?? "").trim()) {
      window.location.href = "/thank-you";
      return;
    }

    const required = ["name", "email", "phone"];
    const missing: Record<string, boolean> = {};
    required.forEach((k) => {
      if (!String(data.get(k) ?? "").trim()) missing[k] = true;
    });
    setInvalid(missing);
    if (Object.keys(missing).length) return;

    try {
      await submitLeadForm(form, source);
    } catch (error) {
      window.alert(
        error instanceof Error && error.message
          ? error.message
          : "Failed to submit form. Please try again.",
      );
    }
  }

  const cx = (key: string) =>
    invalid[key] ? `${s.field} ${s.fieldInvalid}` : s.field;

  const wrapClass = plain
    ? s.formPlain
    : `${s.formCard}${animated ? ` ${s.rise} ${s.rise2}` : ""}`;

  return (
    <div className={wrapClass} id={cardId}>
      <h2 id={`${idPrefix}-heading`}>{FORM.heading}</h2>
      <p className={s.formSub}>{FORM.sub}</p>

      <form onSubmit={onSubmit} noValidate>
        <div className={cx("name")}>
          <label htmlFor={`${idPrefix}-name`}>Full name</label>
          <input
            id={`${idPrefix}-name`}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Ruth Callahan"
            required
          />
        </div>

        <div className={s.fieldRow}>
          <div className={cx("email")}>
            <label htmlFor={`${idPrefix}-email`}>Email address</label>
            <input
              id={`${idPrefix}-email`}
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@church.org"
              required
            />
          </div>
          <div className={cx("phone")}>
            <label htmlFor={`${idPrefix}-phone`}>Phone number</label>
            <input
              id={`${idPrefix}-phone`}
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="(562) 555 0134"
              required
            />
          </div>
        </div>

        <div className={cx("bookType")}>
          <label htmlFor={`${idPrefix}-type`}>What are you writing?</label>
          <select id={`${idPrefix}-type`} name="bookType" defaultValue="">
            <option value="">Choose the closest match</option>
            {FORM.bookTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className={cx("stage")}>
          <label htmlFor={`${idPrefix}-stage`}>Where it stands today</label>
          <select id={`${idPrefix}-stage`} name="stage" defaultValue="">
            <option value="">Choose one</option>
            {FORM.stages.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* honeypot: bots fill this, humans never see it */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px" }}
        />

        <button
          className={`${s.btn} ${s.btnInk} ${s.btnBlock}`}
          type="submit"
        >
          {FORM.submit}
        </button>

        <p className={s.formNote}>{FORM.note}</p>
      </form>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */
export default function ChristianLanding() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMounted, setPopupMounted] = useState(false);

  useEffect(() => {
    setPopupMounted(true);
  }, []);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(POPUP_SESSION_KEY) === "1") return;
    } catch {
      // ignore
    }
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
          <div
            className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto bg-black/55 px-4 pt-10 pb-6 backdrop-blur-sm sm:items-center sm:overflow-hidden sm:p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="christian-popup-heading"
          >
            <div className={`${s.theme} relative my-auto grid w-full max-w-[920px] rounded-2xl bg-[#fbf6ea] shadow-[0_24px_64px_rgba(0,0,0,0.28)] md:max-h-[90vh] md:grid-cols-[42%_58%] md:overflow-hidden`}>
              <button
                type="button"
                onClick={closePopup}
                className="absolute top-3 right-3 z-20 flex h-8 w-8 items-center justify-center rounded-md bg-[#0d1836] text-[#f1e7d2] hover:bg-[#22376f] sm:top-4 sm:right-4"
                aria-label="Close popup"
              >
                <FaXmark className="h-3.5 w-3.5" />
              </button>

              <div className="flex min-h-[280px] flex-col bg-[#16265a] p-6 pr-12 text-[#f1e7d2] lg:p-8">
                <h2
                  id="christian-popup-heading"
                  className="mb-3 font-serif text-2xl font-normal leading-tight sm:text-3xl"
                >
                  Entrust your manuscript to people who read Scripture the way
                  you do
                </h2>
                <div className="mb-6 space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <FaPhone
                      className="mt-1 h-4 w-4 shrink-0 text-[#c29a45]"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="font-semibold text-[#e4ce93]">Call Us</h3>
                      <a href={BRAND.phoneHref} className="hover:underline">
                        {BRAND.phoneDisplay}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaEnvelope
                      className="mt-1 h-4 w-4 shrink-0 text-[#c29a45]"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="font-semibold text-[#e4ce93]">
                        Discuss your book
                      </h3>
                      <a
                        href="mailto:info@stamfordpublishers.com"
                        className="break-all hover:underline"
                      >
                        info@stamfordpublishers.com
                      </a>
                    </div>
                  </div>
                </div>
                <p className="mt-auto text-sm leading-relaxed text-[#f1e7d2]/80">
                  Fifteen minutes, at no cost. Tell us where the manuscript
                  stands and we will tell you what it needs next.
                </p>
              </div>

              <div className="p-6 sm:p-8 md:max-h-[90vh] md:overflow-y-auto">
                <ConsultationForm
                  source="/Christian/lp-popup"
                  idPrefix="popup"
                  plain
                />
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <div className={s.page}>
      <RibbonBookmark />
      {popupModal}

      {/* ---------------- header ---------------- */}
      <header className={s.header}>
        <div className={`${s.shell} ${s.headerIn}`}>
          <a className={s.wordmark} href="#top">
            <b>{BRAND.name}</b>
            <span>{BRAND.imprint}</span>
          </a>

          <nav className={s.nav} aria-label="Section navigation">
            {NAV.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <a className={s.tel} href={BRAND.phoneHref}>
            {BRAND.phoneDisplay}
          </a>
          <a className={`${s.btn} ${s.btnGold}`} href="#consultation">
            Free consultation
          </a>
        </div>
      </header>

      {/* ---------------- hero ---------------- */}
      <section className={`${s.hero} ${s.onBlue}`} id="top">
        <svg
          className={s.heroArches}
          viewBox="0 0 1200 620"
          preserveAspectRatio="xMidYMax slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="archFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C29A45" stopOpacity=".85" />
              <stop offset="100%" stopColor="#C29A45" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g fill="none" stroke="url(#archFade)" strokeWidth="1.1">
            <path d="M120 620 V300 a90 90 0 0 1 180 0 V620" />
            <path d="M150 620 V310 a60 60 0 0 1 120 0 V620" />
            <path d="M480 620 V230 a120 120 0 0 1 240 0 V620" />
            <path d="M520 620 V245 a80 80 0 0 1 160 0 V620" />
            <path d="M600 620 V330" />
            <path d="M900 620 V300 a90 90 0 0 1 180 0 V620" />
            <path d="M930 620 V310 a60 60 0 0 1 120 0 V620" />
          </g>
        </svg>

        <div className={`${s.shell} ${s.heroGrid}`}>
          <div>
            <p className={`${s.rubric} ${s.rise}`}>{HERO.rubric}</p>

            <h1 className={`${s.display} ${s.rise} ${s.rise2}`}>
              {HERO.headingLine1}
              <br />
              {HERO.headingLine2}
              <em>{HERO.headingBottom}</em>
            </h1>

            <svg
              className={`${s.heroRule} ${s.rise} ${s.rise2}`}
              viewBox="0 0 420 14"
              aria-hidden="true"
            >
              <g stroke="#C29A45" fill="none" strokeWidth="1">
                <line x1="0" y1="7" x2="186" y2="7" />
                <line x1="234" y1="7" x2="420" y2="7" />
                <path d="M210 1 L216 7 L210 13 L204 7 Z" fill="#C29A45" stroke="none" />
                <circle cx="196" cy="7" r="1.6" fill="#C29A45" stroke="none" />
                <circle cx="224" cy="7" r="1.6" fill="#C29A45" stroke="none" />
              </g>
            </svg>

            <p className={`${s.lede} ${s.rise} ${s.rise3}`}>{HERO.lede}</p>

            <ul className={`${s.assurances} ${s.rise} ${s.rise4}`}>
              {HERO.assurances.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>

          <ConsultationForm
            cardId="consultation"
            animated
          />
        </div>
      </section>

      {/* ---------------- trust strip ---------------- */}
      <section className={s.strip}>
        <div className={`${s.shell} ${s.stripIn}`}>
          {TRUST.map((t) => (
            <div className={s.stripItem} key={t.label}>
              <b>{t.figure}</b>
              <span>{t.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- scripture ---------------- */}
      <section className={s.verse}>
        <div className={s.verseIn}>
          <svg
            className={s.fleuron}
            width="52"
            height="52"
            viewBox="0 0 52 52"
            aria-hidden="true"
          >
            <g fill="none" stroke="#C29A45" strokeWidth="1.2">
              <path d="M26 6 V46 M14 20 H38" />
              <circle cx="26" cy="26" r="18" strokeOpacity=".55" />
            </g>
          </svg>
          <blockquote>{SCRIPTURE.text}</blockquote>
          <cite>{SCRIPTURE.reference}</cite>
        </div>
      </section>

      {/* ---------------- services, set as a table of contents ---------------- */}
      <section className={s.sec} id="services">
        <div className={s.shell}>
          <div className={s.secHead}>
            <p className={s.rubric}>
              Everything a Christian book needs, under one roof
            </p>
            <h2 className={s.h2}>Contents</h2>
            <p className={s.lede}>
              Take the whole list or take one line of it. Authors come to us with
              finished manuscripts, with half a draft, and occasionally with a
              shoebox of handwritten pages. All three are welcome.
            </p>
          </div>

          <ol className={s.toc}>
            {SERVICES.map((item) => (
              <li key={item.numeral}>
                <a href="#consultation">
                  <span className={s.tocNum}>{item.numeral}</span>
                  <span className={s.tocTitle}>{item.title}</span>
                  <span className={s.tocDots} />
                  <span className={s.tocDesc}>{item.desc}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- why stamford ---------------- */}
      <section className={`${s.sec} ${s.secBlue} ${s.onBlue}`} id="why">
        <div className={s.shell}>
          <div className={s.secHead}>
            <p className={s.rubric}>Why authors stay with us</p>
            <h2 className={s.h2}>A publisher that already speaks the language</h2>
            <p className={s.lede}>
              Plenty of firms will format a Christian book. Fewer will notice
              that you have quoted the King James in one chapter and the New
              International in the next, or that your chapter on grace is doing
              two jobs at once. That noticing is the work.
            </p>
          </div>

          <div className={s.reasons}>
            {REASONS.map((r) => (
              <div className={s.reason} key={r.title}>
                <h3 className={s.h3}>{r.title}</h3>
                <p>{r.body}</p>
              </div>
            ))}
          </div>

          <div className={s.genresWrap}>
            <p className={s.rubric}>Genres we publish most often</p>
            <div className={s.genres}>
              {GENRES.map((g) => (
                <span key={g}>{g}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- process ---------------- */}
      <section className={`${s.sec} ${s.secVellum}`} id="process">
        <div className={s.shell}>
          <div className={s.secHead}>
            <p className={s.rubric}>How a book gets made here</p>
            <h2 className={s.h2}>Five chapters, from first call to launch day</h2>
          </div>

          <div className={s.chapters}>
            {PROCESS.map((step) => (
              <article className={s.chapter} key={step.numeral}>
                <div className={s.chapterMark}>{step.numeral}</div>
                <h3 className={s.h3}>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- testimonials ---------------- */}
      <section className={s.sec} id="authors">
        <div className={s.shell}>
          <div className={s.secHead}>
            <p className={s.rubric}>In their own words</p>
            <h2 className={s.h2}>Authors who finished the book</h2>
          </div>

          <div className={s.quotes}>
            {TESTIMONIALS.map((t) => (
              <figure className={s.quote} key={t.name}>
                <svg
                  className={s.quoteMark}
                  width="30"
                  height="22"
                  viewBox="0 0 30 22"
                  aria-hidden="true"
                >
                  <path
                    d="M0 22V11C0 4.9 4.5 0 11 0v4.4C7.4 4.4 4.9 7 4.9 11H11v11H0zm19 0V11C19 4.9 23.5 0 30 0v4.4c-3.6 0-6.1 2.6-6.1 6.6H30v11H19z"
                    fill="currentColor"
                  />
                </svg>
                <blockquote>{t.quote}</blockquote>
                <figcaption>
                  <b>{t.name}</b>
                  <span>{t.book}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- packages ---------------- */}
      <section className={`${s.sec} ${s.secVellum}`} id="packages">
        <div className={s.shell}>
          <div className={s.secHead}>
            <p className={s.rubric}>Where authors usually start</p>
            <h2 className={s.h2}>Three starting points</h2>
            <p className={s.lede}>
              These are the routes most authors take. None of them is fixed.
              After we read your manuscript we will tell you which parts you
              actually need and which you can skip.
            </p>
          </div>

          <div className={s.tiers}>
            {PACKAGES.map((p) => (
              <article
                className={p.featured ? `${s.tier} ${s.tierFeatured}` : s.tier}
                key={p.name}
              >
                {p.flag && <p className={s.tierFlag}>{p.flag}</p>}
                <h3>{p.name}</h3>
                <p className={s.tierFor}>{p.for}</p>
                <div className={s.tierPrice}>
                  {p.price}
                  <small>{p.priceNote}</small>
                </div>
                <ul>
                  {p.includes.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
                <a
                  className={
                    p.featured ? `${s.btn} ${s.btnGold}` : `${s.btn} ${s.btnInk}`
                  }
                  href="#consultation"
                >
                  {p.cta}
                </a>
              </article>
            ))}

            <p className={s.tierFoot}>
              Not sure which one fits?{" "}
              <a href="#consultation">Speak to a consultant first</a>. It costs
              nothing and it usually saves money.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- faq ---------------- */}
      <section className={s.sec} id="faq">
        <div className={s.shell}>
          <div className={s.secHead}>
            <p className={s.rubric}>Before you call</p>
            <h2 className={s.h2}>Questions Christian authors ask us</h2>
          </div>

          <div className={s.faq}>
            {FAQ.map((item, i) => (
              <details key={item.q} open={i === 0}>
                <summary>{item.q}</summary>
                <p className={s.faqBody}>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- closing cta ---------------- */}
      <section className={`${s.close} ${s.onBlue}`}>
        <div className={s.shell}>
          <h2 className={s.h2}>{CLOSING.heading}</h2>
          <p>{CLOSING.body}</p>
          <div className={s.closeActions}>
            <a className={`${s.btn} ${s.btnGold}`} href="#consultation">
              Book a free consultation
            </a>
            <a className={`${s.btn} ${s.btnLine}`} href={BRAND.phoneHref}>
              Call {BRAND.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* ---------------- footer ---------------- */}
      <footer className={s.footer}>
        <div className={`${s.shell} ${s.footerGrid}`}>
          <div>
            <a className={`${s.wordmark} ${s.wordmarkFooter}`} href="#top">
              <b>{BRAND.name}</b>
              <span>{BRAND.imprint}</span>
            </a>
            <p className={s.footerBlurb}>{FOOTER.blurb}</p>
          </div>

          <div>
            <h4>Services</h4>
            <ul>
              {FOOTER.services.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Company</h4>
            <ul>
              {FOOTER.company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Start your book</h4>
            <ul>
              <li>
                <a href={BRAND.phoneHref}>{BRAND.phoneDisplay}</a>
              </li>
              <li>
                <a href="#consultation">Request a free consultation</a>
              </li>
            </ul>
            <p className={s.footerBlurb} style={{ marginTop: 16 }}>
              Consultations run Monday to Friday, and we can usually find a time
              the same week.
            </p>
          </div>
        </div>

        <div className={s.footerVerse}>
          <div className={s.shell}>{FOOTER.verse}</div>
        </div>

        <div className={`${s.shell} ${s.footerLegal}`}>
          <span>
            Copyright {new Date().getFullYear()} {BRAND.name}. All rights
            reserved.
          </span>
          <span>
            <Link href="/privacy-policy">Privacy policy</Link>
            &nbsp;&nbsp;
            <Link href="/terms-of-service">Terms and conditions</Link>
          </span>
        </div>
      </footer>
    </div>
  );
}
