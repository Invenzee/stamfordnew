"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
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

type Status = "idle" | "sending" | "sent" | "error";

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
function ConsultationForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [invalid, setInvalid] = useState<Record<string, boolean>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const required = ["name", "email", "phone", "bookType", "stage"];
    const missing: Record<string, boolean> = {};
    required.forEach((k) => {
      if (!String(data.get(k) ?? "").trim()) missing[k] = true;
    });
    setInvalid(missing);
    if (Object.keys(missing).length) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/christian-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");

      // Fire your analytics conversion here.
      // window.dataLayer?.push({ event: "christian_lp_lead" });
    } catch {
      setStatus("error");
    }
  }

  const cx = (key: string) =>
    invalid[key] ? `${s.field} ${s.fieldInvalid}` : s.field;

  return (
    <div className={`${s.formCard} ${s.rise} ${s.rise2}`} id="consultation">
      <h2>{FORM.heading}</h2>
      <p className={s.formSub}>{FORM.sub}</p>

      <form onSubmit={onSubmit} noValidate>
        <div className={cx("name")}>
          <label htmlFor="f-name">Full name</label>
          <input
            id="f-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Ruth Callahan"
          />
        </div>

        <div className={s.fieldRow}>
          <div className={cx("email")}>
            <label htmlFor="f-email">Email address</label>
            <input
              id="f-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@church.org"
            />
          </div>
          <div className={cx("phone")}>
            <label htmlFor="f-phone">Phone number</label>
            <input
              id="f-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="(562) 555 0134"
            />
          </div>
        </div>

        <div className={cx("bookType")}>
          <label htmlFor="f-type">What are you writing?</label>
          <select id="f-type" name="bookType" defaultValue="">
            <option value="">Choose the closest match</option>
            {FORM.bookTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className={cx("stage")}>
          <label htmlFor="f-stage">Where it stands today</label>
          <select id="f-stage" name="stage" defaultValue="">
            <option value="">Choose one</option>
            {FORM.stages.map((t) => (
              <option key={t}>{t}</option>
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
          disabled={status === "sending" || status === "sent"}
        >
          {status === "sending"
            ? "Sending"
            : status === "sent"
              ? "Request received"
              : FORM.submit}
        </button>

        <p className={s.formNote}>{FORM.note}</p>

        {status === "sent" && (
          <p className={s.formStatus} role="status">
            {FORM.success}
          </p>
        )}
        {status === "error" && (
          <p className={`${s.formStatus} ${s.formError}`} role="alert">
            That did not go through. Please call {BRAND.phoneDisplay} and we
            will take your details over the phone.
          </p>
        )}
      </form>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */
export default function ChristianLanding() {
  return (
    <div className={s.page}>
      <RibbonBookmark />

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
              {HERO.headingTop}
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

          <ConsultationForm />
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
