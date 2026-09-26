"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Calendar, ChevronDown, Menu, X } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import styles from "./book-events.module.css";

const NAV = [
  { label: "Upcoming Events", href: "#upcoming-events" },
  { label: "Meet Author", href: "#meet-author" },
  { label: "BLOG", href: "#follow" },
];

const GENRES = ["Fiction", "Nonfiction", "Mystery", "Romance", "Children's", "Memoir"];

type Day = "weekday" | "weekend";

type EventCard = {
  src: string;
  alt: string;
  genres: string[];
  day: Day;
  popular: boolean;
  latest: boolean;
};

const EVENTS: EventCard[] = [
  {
    src: "/upcoming_content (1).png",
    alt: "Author at a book fair booth with copies arranged on the table",
    genres: ["Fiction", "Mystery"],
    day: "weekday",
    popular: true,
    latest: true,
  },
  {
    src: "/upcoming_content.png",
    alt: "Two people talking beside a book display at a fair",
    genres: ["Fiction", "Nonfiction"],
    day: "weekday",
    popular: true,
    latest: false,
  },
  {
    src: "/image 3.png",
    alt: "Readers browsing books with an author at a signing table",
    genres: ["Fiction", "Memoir"],
    day: "weekend",
    popular: false,
    latest: true,
  },
  {
    src: "/upcoming_content (2).png",
    alt: "Book fair banners standing beside a display of novels",
    genres: ["Fiction", "Children's"],
    day: "weekend",
    popular: true,
    latest: false,
  },
  {
    src: "/upcoming_content (3).png",
    alt: "A gift basket of books wrapped for an event giveaway",
    genres: ["Fiction", "Romance"],
    day: "weekday",
    popular: false,
    latest: true,
  },
  {
    src: "/upcoming_content (4).png",
    alt: "Two people at a yellow book fair booth holding their books",
    genres: ["Fiction", "Nonfiction"],
    day: "weekend",
    popular: true,
    latest: false,
  },
];

const AUTHORS = [
  {
    src: "/1742628131369 1.png",
    alt: "Older man in a striped sweater seated with an open book",
  },
  {
    src: "/1742628131369 2.png",
    alt: "Black and white portrait of a smiling woman with glasses",
  },
  {
    src: "/1742628131369 3.png",
    alt: "Woman in a blue top seated in an armchair with a red book",
  },
];

const SOCIAL = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61592814706675",
    icon: FaFacebookF,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/stamfordpublishers/",
    icon: FaInstagram,
  },
  {
    label: "X",
    href: "/contact-us",
    icon: FaXTwitter,
  },
  {
    label: "LinkedIn",
    href: "/contact-us",
    icon: FaLinkedinIn,
  },
];

function scrollToReserve() {
  document.getElementById("reserve")?.scrollIntoView({ behavior: "smooth", block: "center" });
  document.getElementById("event-date")?.focus();
}

export default function BookEventsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [genre, setGenre] = useState("Fiction");
  const [date, setDate] = useState("");
  const [dayFilter, setDayFilter] = useState("all");
  const [popularFilter, setPopularFilter] = useState("all");
  const [latestFilter, setLatestFilter] = useState("all");

  const visibleEvents = useMemo(() => {
    const pickedDay: Day | null = date
      ? [0, 6].includes(new Date(`${date}T12:00:00`).getDay())
        ? "weekend"
        : "weekday"
      : dayFilter === "weekday" || dayFilter === "weekend"
        ? dayFilter
        : null;

    return EVENTS.filter((event) => {
      if (!event.genres.includes(genre)) return false;
      if (pickedDay && event.day !== pickedDay) return false;
      if (popularFilter === "popular" && !event.popular) return false;
      if (latestFilter === "latest" && !event.latest) return false;
      return true;
    });
  }, [genre, date, dayFilter, popularFilter, latestFilter]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={`${styles.wrap} ${styles.headerInner}`}>
          <Link href="/" aria-label="Stamford Publishers home">
            <Image
              src="/zesty-logo.png"
              alt="Stamford Publishers"
              width={150}
              height={99}
              priority
              className={styles.logo}
            />
          </Link>

          <nav className={styles.nav} aria-label="Page">
            {NAV.map((item) => (
              <a key={item.label} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <button type="button" className={styles.bookNow} onClick={scrollToReserve}>
            Book Now
          </button>

          <button
            type="button"
            className={styles.menuBtn}
            aria-expanded={menuOpen}
            aria-controls="book-events-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            <span className={styles.srOnly}>{menuOpen ? "Close menu" : "Open menu"}</span>
          </button>
        </div>

        {menuOpen ? (
          <nav id="book-events-menu" className={`${styles.wrap} ${styles.mobileNav}`} aria-label="Page">
            {NAV.map((item) => (
              <a key={item.label} href={item.href} onClick={closeMenu}>
                {item.label}
              </a>
            ))}
            <button type="button" className={styles.bookNow} onClick={scrollToReserve}>
              Book Now
            </button>
          </nav>
        ) : null}
      </header>

      <main>
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.wrap}>
            <div className={styles.card}>
              <Image
                src="/Rectangle 3859.png"
                alt=""
                fill
                priority
                sizes="(max-width: 980px) 100vw, 1200px"
                className={styles.heroBg}
              />
              <div className={styles.heroOverlay} aria-hidden="true" />

              <h1 id="hero-title" className={styles.heroTitle}>
                A Special Evening for Book Lovers
              </h1>

              <div className={styles.heroCopy}>
                <h2 className={styles.eventName}>Miami Book Fair</h2>
                <p className={styles.eventBody}>
                  Join readers and authors for signings, new releases, and a night built around the
                  books you love.
                </p>
                <button type="button" className={styles.pinkBtn} onClick={scrollToReserve}>
                  Book Now
                </button>
              </div>
            </div>

            <form
              id="reserve"
              className={styles.search}
              onSubmit={(event) => {
                event.preventDefault();
                document.getElementById("upcoming-events")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <label>
                <span className={styles.fieldLabel}>Date</span>
                <span className={styles.fieldControl}>
                  <Calendar size={18} aria-hidden="true" />
                  <input
                    id="event-date"
                    className={styles.fieldInput}
                    type="date"
                    name="date"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                  />
                </span>
              </label>
              <span className={styles.rule} aria-hidden="true" />
              <label>
                <span className={styles.fieldLabel}>Genre</span>
                <span className={styles.fieldControl}>
                  <select
                    className={styles.genreSelect}
                    name="genre"
                    aria-label="Genre"
                    value={genre}
                    onChange={(event) => setGenre(event.target.value)}
                  >
                    {GENRES.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </span>
              </label>
            </form>
          </div>
        </section>

        <section id="upcoming-events" className={styles.events} aria-labelledby="events-title">
          <div className={styles.wrap}>
            <div className={styles.eventsHead}>
              <h2 id="events-title" className={styles.sectionTitle}>
                Upcoming Events
              </h2>
              <div className={styles.filters}>
                <label className={styles.filter}>
                  <span className={styles.srOnly}>Day</span>
                  <select
                    aria-label="Weekdays"
                    value={dayFilter}
                    onChange={(event) => setDayFilter(event.target.value)}
                  >
                    <option value="all">Weekdays</option>
                    <option value="weekday">Weekdays only</option>
                    <option value="weekend">Weekends</option>
                  </select>
                  <ChevronDown size={16} aria-hidden="true" />
                </label>
                <label className={styles.filter}>
                  <span className={styles.srOnly}>Popularity</span>
                  <select
                    aria-label="Popular"
                    value={popularFilter}
                    onChange={(event) => setPopularFilter(event.target.value)}
                  >
                    <option value="all">Popular</option>
                    <option value="popular">Popular only</option>
                  </select>
                  <ChevronDown size={16} aria-hidden="true" />
                </label>
                <label className={styles.filter}>
                  <span className={styles.srOnly}>Latest</span>
                  <select
                    aria-label="Latest"
                    value={latestFilter}
                    onChange={(event) => setLatestFilter(event.target.value)}
                  >
                    <option value="all">Latest</option>
                    <option value="latest">Latest only</option>
                  </select>
                  <ChevronDown size={16} aria-hidden="true" />
                </label>
              </div>
            </div>

            <div className={styles.grid}>
              {visibleEvents.length === 0 ? (
                <p className={styles.empty}>No events match those filters. Try another date or genre.</p>
              ) : (
                visibleEvents.map((event) => (
                  <article key={event.src} className={styles.photo}>
                    <Image
                      src={event.src}
                      alt={event.alt}
                      fill
                      sizes="(max-width: 760px) 100vw, 33vw"
                      className={styles.cover}
                    />
                  </article>
                ))
              )}
            </div>
          </div>
        </section>

        <section id="meet-author" className={styles.authors} aria-labelledby="author-title">
          <div className={styles.wrap}>
            <h2 id="author-title" className={styles.authorTitle}>
              Meet the Author.
              <br />
              Get Your Book Signed.
            </h2>
            <div className={styles.authorRow}>
              {AUTHORS.map((author) => (
                <article key={author.src} className={styles.portrait}>
                  <Image
                    src={author.src}
                    alt={author.alt}
                    fill
                    sizes="(max-width: 760px) 100vw, 16rem"
                    className={styles.cover}
                  />
                </article>
              ))}
            </div>
            <div className={styles.reserveWrap}>
              <button type="button" className={styles.reserve} onClick={scrollToReserve}>
                Reserve Your Place
              </button>
            </div>
          </div>
        </section>

        <section className={styles.share} aria-labelledby="share-title">
          <div className={`${styles.wrap} ${styles.shareBand}`}>
            <div className={styles.shareCopy}>
              <h2 id="share-title" className={styles.shareTitle}>
                Help us share a world of books
              </h2>
            </div>
            <div className={styles.sharePhoto}>
              <Image
                src="/image 3.png"
                alt="Author signing books for two readers at a table"
                fill
                sizes="(max-width: 980px) 100vw, 40vw"
                className={styles.cover}
              />
            </div>
          </div>
        </section>
      </main>

      <footer id="follow" className={styles.footer}>
        <div className={styles.wrap}>
          <Link href="/" aria-label="Stamford Publishers home">
            <Image
              src="/zesty-logo.png"
              alt=""
              width={170}
              height={112}
              className={styles.footerLogo}
            />
          </Link>
          <p className={styles.footerCopy}>
            Since 2014, Stamford Publishers has provided professional writing and marketing support to
            authors, offering a smooth process from initial concept to final promotion. Our team combines
            creativity, strategy, and publishing expertise to help authors bring their ideas to life.
          </p>
          <p className={styles.follow}>Follow Us</p>
          <div className={styles.socials}>
            {SOCIAL.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  {...(item.href.startsWith("http")
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                >
                  <Icon aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>
      </footer>
    </div>
  );
}
