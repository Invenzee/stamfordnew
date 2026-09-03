"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { PHONE_CONVERSION_NUMBER, PHONE_HREF } from "@/lib/google-ads";
import { submitLeadForm } from "@/lib/submit-form";
import s from "./lp.module.css";

const SOURCE = "/cookbook/lp";

function cx(...keys: Array<string | false | undefined>) {
  return keys
    .filter((key): key is string => Boolean(key))
    .map((key) => s[key] ?? key)
    .join(" ");
}

const RECIPE_OPTIONS = [
  "Fewer than 40",
  "40 to 80",
  "80 to 120",
  "More than 120",
  "Not counted yet",
];

const STAGE_OPTIONS = [
  "An idea, nothing written",
  "Handwritten cards or notes",
  "Recipes typed up, needs editing",
  "Finished manuscript",
  "Designed book, needs printing",
];

const PHOTO_OPTIONS = [
  "I need a photographer",
  "I have some photos",
  "I have all photos",
  "No photos, illustration instead",
  "Not sure yet",
];

const FAQ = [
  {
    q: "How much does it cost to publish a cookbook?",
    a: [
      "Three things move the number more than anything else: how many recipes there are, whether the interior prints in full color, and whether you need photography commissioned rather than supplied. A sixty recipe full color book with a commissioned shoot sits at a very different level from a hundred and twenty recipe text led book using your own images.",
      "We do not publish a single package price for cookbooks, because the honest answer changes with the recipe count. After the consultation you get an itemized quote with every line broken out, so you can remove anything you would rather handle yourself.",
    ],
  },
  {
    q: "Can I copyright my recipes?",
    a: [
      "A bare list of ingredients is generally not protected by copyright on its own. What is protected is your expression: the headnotes, the instructions written in your voice, the selection and arrangement of the collection, and the photographs and design. That is one of the reasons headnotes matter so much in a cookbook, and one of the reasons we spend editorial time on them.",
    ],
    fine:
      "General information about how cookbook copyright usually works, not legal advice. For your specific situation, speak to an intellectual property attorney.",
  },
  {
    q: "Do I need professional food photography?",
    a: [
      "No, but color photography changes how a cookbook sells, and readers do decide with their eyes. There are four routes and all of them work: a full commissioned shoot, a partial shoot covering only the hero recipes, illustration instead of photography, or a curated and retouched selection of images you already own.",
      "If you shoot it yourself, we write the brief first so the images are consistent enough to sit together in one book. Inconsistent photography is harder to fix later than almost anything else.",
    ],
  },
  {
    q: "How many recipes should my cookbook have?",
    a: [
      "Most trade cookbooks land between sixty and a hundred and twenty. Below sixty the book can feel slight at a normal price point, and above a hundred and twenty it starts to lose its shape unless there is a strong organizing idea holding it together.",
      "Recipe count drives page count, page count drives spine width and unit cost, and unit cost drives your retail price. This is worth settling early. It is almost always better to cut ten weak recipes than to pad with them.",
    ],
  },
  {
    q: "Do my recipes need to be tested?",
    a: [
      "Every recipe in a published cookbook should have been cooked successfully by someone who did not write it. That is the standard, and it is what protects you from a one star review that begins with the words \"the timing is wrong.\"",
      "We work at three levels: a desk check for internal consistency, a structured test by a second cook, or full independent testing across a panel. Most first time authors choose the desk check plus testing on the recipes they are least sure about.",
    ],
  },
  {
    q: "How long does a cookbook take?",
    a: [
      "Longer than a novel of the same length, because photography and color proofing are sequential and cannot be rushed without showing. A straightforward text led cookbook moves faster than a photo led one, and a book that needs a commissioned shoot is paced by the shoot.",
      "We give you a dated schedule with the plan at stage two, and the two things most likely to move it are photography and how quickly approvals come back from you.",
    ],
  },
  {
    q: "Can you work from handwritten recipe cards?",
    a: [
      "Yes, and it is one of the most common places a family cookbook starts. We transcribe the cards, standardize the measurements, fill the gaps that every handwritten recipe has, and send you a query list for the things only you can answer, like what \"bake until done\" meant in your grandmother's oven.",
      "Where a card is illegible or a step is missing, we flag it rather than invent it. Nothing goes into your book that you have not confirmed.",
    ],
  },
  {
    q: "Where will my cookbook be sold?",
    a: [
      "Major online retailers as print and ebook, wholesale catalogs that bookstores and libraries order from, and your own direct channels, which is where a cookbook author usually keeps the most margin per copy.",
      "Print on demand covers the long tail with no inventory. If you want stock for events, markets, a restaurant counter or a farm shop, we can quote a short offset run alongside it.",
    ],
  },
  {
    q: "What if I only need part of this?",
    a: [
      "Then you only pay for part of it. Plenty of authors come to us with a finished, designed book that needs print production sorted out, or with strong photography and no idea how to lay out a recipe page. Every stage on this page can be bought on its own.",
    ],
  },
];

function IconBook() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 19.5V5a2 2 0 0 1 2-2h13v18H6a2 2 0 0 1-2-2Z" />
      <path d="M9 3v18" />
    </svg>
  );
}

function IconBag() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 7h18" />
      <path d="M5 7v11a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7" />
      <path d="M9 7V5a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18Z" />
    </svg>
  );
}

function IconCheck(props: { size?: number }) {
  const size = props.size ?? 15;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={size > 16 ? "2.2" : "2"}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function LeadForm() {
  const [invalid, setInvalid] = useState<Record<string, boolean>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (String(data.get("company") ?? "").trim()) {
      window.location.href = "/thank-you";
      return;
    }

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const missing: Record<string, boolean> = {};
    if (!name) missing.name = true;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) missing.email = true;
    if (!phone) missing.phone = true;
    setInvalid(missing);
    if (Object.keys(missing).length) return;

    try {
      await submitLeadForm(form, SOURCE);
    } catch (error) {
      window.alert(
        error instanceof Error && error.message
          ? error.message
          : "That did not send. Please call us on the number above, or email the details and we will pick it up.",
      );
    }
  }

  return (
    <form className={s.form} id="leadForm" onSubmit={onSubmit} noValidate>
      <div>
        <h3>Get my cookbook publishing plan</h3>
        <p className={s.formSub}>Takes about a minute. We reply within one business day.</p>

        <div className={s.hp} aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
        </div>

        <div className={s.grid2}>
          <div className={invalid.name ? `${s.field} ${s.fieldInvalid}` : s.field}>
            <label htmlFor="name">
              Your name <span className={s.req}>*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              autoComplete="name"
              placeholder="Jane Whitfield"
              aria-invalid={invalid.name || undefined}
            />
          </div>
          <div className={invalid.email ? `${s.field} ${s.fieldInvalid}` : s.field}>
            <label htmlFor="email">
              Email <span className={s.req}>*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              autoComplete="email"
              placeholder="jane@example.com"
              aria-invalid={invalid.email || undefined}
            />
          </div>
        </div>

        <div className={s.grid2}>
          <div className={invalid.phone ? `${s.field} ${s.fieldInvalid}` : s.field}>
            <label htmlFor="phone">
              Phone <span className={s.req}>*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              autoComplete="tel"
              placeholder="(562) 573-2551"
              aria-invalid={invalid.phone || undefined}
            />
          </div>
          <div className={s.field}>
            <label htmlFor="recipes">How many recipes</label>
            <select id="recipes" name="recipes" defaultValue="">
              <option value="">Select</option>
              {RECIPE_OPTIONS.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={s.grid2}>
          <div className={s.field}>
            <label htmlFor="stage">What you have so far</label>
            <select id="stage" name="stage" defaultValue="">
              <option value="">Select</option>
              {STAGE_OPTIONS.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className={s.field}>
            <label htmlFor="photos">Photography</label>
            <select id="photos" name="photos" defaultValue="">
              <option value="">Select</option>
              {PHOTO_OPTIONS.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={s.field}>
          <label htmlFor="about">Tell us about the book</label>
          <textarea
            id="about"
            name="about"
            placeholder="What kind of cookbook is it, who is it for, and is there a date you are working toward?"
          />
        </div>

        <button type="submit" className={cx("btn", "btnPrimary", "btnBlock", "btnLg")}>
          Send my project details
        </button>

        <p className={s.formFine}>
          Your details go to our cookbook team and nowhere else. We do not sell or share them.
          Read the <Link href="/privacy-policy">privacy policy</Link>.
        </p>
      </div>
    </form>
  );
}

export default function CookbookLanding() {
  const [stuck, setStuck] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const year = new Date().getFullYear();

  useEffect(() => {
    const html = document.documentElement;
    const previous = html.style.scrollBehavior;
    html.style.scrollBehavior = "smooth";

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setStuck(window.scrollY > 12);
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    document.body.classList.add("cookbook-lp-active");
    const applyChatOffset = () => {
      const mobile = window.matchMedia("(max-width: 760px)").matches;
      try {
        window.zE?.("webWidget", "updateSettings", {
          webWidget: {
            offset: {
              vertical: mobile ? "92px" : "0px",
              horizontal: "12px",
              mobile: { vertical: "92px", horizontal: "12px" },
            },
          },
        });
      } catch {
        // Classic and messaging widgets differ; CSS offset still applies.
      }
    };
    applyChatOffset();
    const chatTimer = window.setInterval(applyChatOffset, 1500);

    return () => {
      html.style.scrollBehavior = previous;
      window.removeEventListener("scroll", onScroll);
      document.body.classList.remove("cookbook-lp-active");
      window.clearInterval(chatTimer);
    };
  }, []);

  return (
    <div className={s.page}>
      <a className={s.skip} href="#main">
        Skip to content
      </a>

      <header className={cx("masthead", stuck && "mastheadStuck")} id="masthead">
        <div className={cx("shell", "mastheadIn")}>
          <Link className={s.brand} href="/">
            <Image
              src="/white-logo.png"
              alt="Stamford Publishers"
              width={160}
              height={48}
              className={s.brandLogo}
              priority
            />
          </Link>

          <nav className={s.mastNav} aria-label="Section links">
            <a href="#services">What we do</a>
            <a href="#process">How it works</a>
            <a href="#book">The printed book</a>
            <a href="#faq">Questions</a>
          </nav>

          <a className={s.mastTel} href={PHONE_HREF}>
            <span>Speak to a cookbook editor</span>
            <strong>{PHONE_CONVERSION_NUMBER}</strong>
          </a>

          <a className={cx("btn", "btnPrimary")} href="#start">
            Get my publishing plan
          </a>
        </div>
      </header>

      <main id="main">
        <section className={s.hero}>
          <div className={cx("shell", "heroIn")}>
            <div>
              <p className={cx("kicker", "kickerLight")}>Cookbook publishing services</p>
              <h1>From a box of recipe cards to a book on the shelf.</h1>
              <p className={s.heroSub}>
                Stamford Publishers is a full service publishing company for cookbook authors. We
                edit and standardize your recipes, direct the photography, set the interior in full
                color, choose a binding that opens flat on a counter, and put the finished book in
                front of readers. You keep the copyright and the royalties.
              </p>
              <div className={s.heroCta}>
                <a className={cx("btn", "btnPrimary", "btnLg")} href="#start">
                  Get my publishing plan
                </a>
                <a className={cx("btn", "btnGhostLight", "btnLg")} href={PHONE_HREF}>
                  Call and talk it through
                </a>
              </div>
              <p className={s.heroNote}>
                Free consultation, itemized quote, no obligation to publish with us.
              </p>
              <ul className={s.heroMarks}>
                <li>
                  <IconBook />
                  Full color interiors
                </li>
                <li>
                  <IconBag />
                  Lay flat binding
                </li>
                <li>
                  <IconGlobe />
                  Worldwide distribution
                </li>
                <li>
                  <IconCheck />
                  You keep 100% of rights
                </li>
              </ul>
            </div>

            <div>
              <div className={s.specimen}>
                <div className={s.specimenMarks} aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
                <article className={s.specimenPage}>
                  <div className={s.pageHead}>
                    <span>Chapter Four &nbsp;/&nbsp; Poultry</span>
                    <span>Trim 8 × 10 in</span>
                  </div>
                  <h2 className={s.pageTitle}>Roast Chicken with Lemon, Garlic and Thyme</h2>
                  <p className={s.pageNote}>
                    The first thing I learned to cook, and still the thing I make when I want the
                    house to smell like a Sunday. Take the bird out of the refrigerator a full hour
                    before it goes in the oven. That hour is most of the recipe.
                  </p>
                  <dl className={s.pageStats}>
                    <div>
                      <dt>Serves</dt>
                      <dd>4</dd>
                    </div>
                    <div>
                      <dt>Active</dt>
                      <dd>20 min</dd>
                    </div>
                    <div>
                      <dt>Total</dt>
                      <dd>1 hr 45 min</dd>
                    </div>
                    <div>
                      <dt>Oven</dt>
                      <dd>425°F</dd>
                    </div>
                  </dl>
                  <div className={s.pageCols}>
                    <div>
                      <p className={s.pageColhead}>Ingredients</p>
                      <ul className={s.ing}>
                        <li>1 whole chicken, about 4 lb</li>
                        <li>2 lemons, one halved, one sliced</li>
                        <li>1 head garlic, halved crosswise</li>
                        <li>6 sprigs thyme</li>
                        <li>3 tbsp butter, softened</li>
                        <li>1½ tsp kosher salt</li>
                        <li>Black pepper, freshly ground</li>
                      </ul>
                    </div>
                    <div>
                      <p className={s.pageColhead}>Method</p>
                      <ol className={s.mth}>
                        <li>
                          <b>1</b>
                          <span>
                            Heat the oven to 425°F. Pat the chicken dry inside and out and season it
                            all over with the salt and a generous grinding of pepper.
                          </span>
                        </li>
                        <li>
                          <b>2</b>
                          <span>
                            Push the halved lemon, the garlic and four sprigs of thyme into the
                            cavity. Rub the butter over the skin and tuck the lemon slices
                            underneath.
                          </span>
                        </li>
                        <li>
                          <b>3</b>
                          <span>
                            Roast for 1 hour 15 minutes, basting once at the halfway mark, until the
                            juices at the thigh run clear.
                          </span>
                        </li>
                      </ol>
                      <div className={s.plate}>
                        <span>Photo plate, 16:9, full bleed</span>
                      </div>
                    </div>
                  </div>
                  <div className={s.pageFoot}>
                    <span>Stamford Publishers interior specimen</span>
                    <span>42</span>
                  </div>
                </article>
              </div>
              <p className={s.specimenCap}>
                A typeset interior page, set to print specification with trim marks and folio.
                Layout specimen, not a client title.
              </p>
            </div>
          </div>
        </section>

        <section className={s.strip} aria-label="Production formats">
          <div className={s.shell}>
            <dl>
              <div>
                <dt>Trim sizes</dt>
                <dd>6 × 9 through 8.5 × 11</dd>
              </div>
              <div>
                <dt>Binding</dt>
                <dd>Lay flat, hardcover, wire-o, softcover</dd>
              </div>
              <div>
                <dt>Editions</dt>
                <dd>Print, ebook, fixed layout</dd>
              </div>
              <div>
                <dt>Channels</dt>
                <dd>Online retail, bookstores, direct sales</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className={cx("band", "bandPaper")}>
          <div className={s.shell}>
            <div className={s.bandHead}>
              <p className={s.kicker}>Why cookbooks are different</p>
              <h2>A cookbook is the hardest kind of book to publish well.</h2>
              <p className={s.lede}>
                A novel has one voice and one column of text. A cookbook has hundreds of numbers,
                two hundred ingredient names, a photography budget, a color press, and a reader
                holding it open with a wet hand. Most of what goes wrong with a cookbook happens
                long before the printer sees the file.
              </p>
            </div>
            <div className={s.compare}>
              <div className={s.compareCol}>
                <h3>What usually goes wrong</h3>
                <p className={s.compareSub}>The eight faults we find most often in a first draft</p>
                <ul>
                  <li>
                    Measurements drift between recipes. A cup here, 240 ml there, a knob of butter
                    in chapter four.
                  </li>
                  <li>
                    Ingredients listed out of the order they are used, so the cook keeps scanning
                    back up the page.
                  </li>
                  <li>
                    Photos shot across different months and different light, so the food changes
                    color through the book.
                  </li>
                  <li>Interiors printed in one ink to save money, which turns every dish gray.</li>
                  <li>A perfect bound spine that snaps shut the second you let go of it.</li>
                  <li>
                    No ingredient index, so nobody can find the recipe that uses up the leftover
                    buttermilk.
                  </li>
                  <li>
                    Yields, times and oven temperatures that were never checked by a second pair of
                    hands.
                  </li>
                  <li>
                    Files sent to press without bleed, so photos are trimmed into thin white edges.
                  </li>
                </ul>
              </div>
              <div className={s.compareCol}>
                <h3>What we do about it</h3>
                <p className={s.compareSub}>The matching pass in every Stamford project</p>
                <ul>
                  <li>
                    Every measurement standardized to one system, with the second system in
                    parentheses if you want both.
                  </li>
                  <li>
                    Ingredient lists reordered to match the order of use, and grouped when a recipe
                    has components.
                  </li>
                  <li>
                    A written photography brief that fixes one light direction, one surface palette
                    and one prop set.
                  </li>
                  <li>
                    Four color interiors with a proofed color target, so the food on page 90 matches
                    the food on page 12.
                  </li>
                  <li>
                    Binding chosen for how the book is actually used, and priced against your run
                    length.
                  </li>
                  <li>
                    A two level index, by recipe name and by main ingredient, built after the pages
                    are final.
                  </li>
                  <li>
                    A recipe check pass for yield, timing, temperature and step continuity before
                    anything is designed.
                  </li>
                  <li>
                    Print ready PDF/X files with bleed, trim marks and the printer&apos;s own
                    specification applied.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className={cx("band", "bandTint")} id="services">
          <div className={s.shell}>
            <div className={s.bandHead}>
              <p className={s.kicker}>Included in a cookbook project</p>
              <h2>Everything between your recipes and a finished book.</h2>
              <p className={s.lede}>
                You can take the whole path or any part of it. Most authors arrive with recipes and
                a strong point of view, and need the other eight things on this list.
              </p>
            </div>
            <div className={s.svc}>
              <div className={s.svcItem}>
                <svg
                  className={s.svcIco}
                  viewBox="0 0 32 32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M16 3v9" />
                  <path d="M11 6c0 3 2 4.5 5 6 3-1.5 5-3 5-6" />
                  <path d="M9 12h14l-2 15a2 2 0 0 1-2 1.8h-6A2 2 0 0 1 11 27Z" />
                  <path d="M13 17h6" />
                </svg>
                <h3>Recipe editing and standardization</h3>
                <p>
                  Every recipe read for consistent format, measurement, yield, temperature and step
                  order. Ingredient names normalized so scallions are scallions from the first page
                  to the last.
                </p>
              </div>
              <div className={s.svcItem}>
                <svg
                  className={s.svcIco}
                  viewBox="0 0 32 32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 6h13l4 4v16H5Z" />
                  <path d="M18 6v4h4" />
                  <path d="M9 15h9M9 19h9M9 23h5" />
                  <circle cx="24" cy="8" r="4" />
                </svg>
                <h3>Copyediting and proofreading</h3>
                <p>
                  Two editorial passes on headnotes, front matter and back matter, then a
                  proofread on the laid out pages, which is where cookbook errors actually hide.
                </p>
              </div>
              <div className={s.svcItem}>
                <svg
                  className={s.svcIco}
                  viewBox="0 0 32 32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 10h5l2-3h10l2 3h5v16H4Z" />
                  <circle cx="16" cy="17" r="5" />
                  <path d="M16 14.5v5M13.5 17h5" />
                </svg>
                <h3>Food photography direction</h3>
                <p>
                  A shot list, prop and surface palette, light direction and a style guide your
                  photographer can shoot from. If you already have images, we sort, retouch and
                  color correct what is usable.
                </p>
              </div>
              <div className={s.svcItem}>
                <svg
                  className={s.svcIco}
                  viewBox="0 0 32 32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="4" y="5" width="24" height="22" rx="2" />
                  <path d="M16 5v22" />
                  <path d="M8 10h5M8 14h5M8 18h4" />
                  <rect x="19" y="10" width="6" height="6" rx="1" />
                  <path d="M19 20h6M19 23h4" />
                </svg>
                <h3>Interior layout and typesetting</h3>
                <p>
                  Recipe templates that hold up across one page, two page and full spread recipes,
                  with room for notes, variations and a cook who leans a spoon on the corner.
                </p>
              </div>
              <div className={s.svcItem}>
                <svg
                  className={s.svcIco}
                  viewBox="0 0 32 32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M7 4h18a2 2 0 0 1 2 2v20a2 2 0 0 1-2 2H7Z" />
                  <path d="M7 4v24" />
                  <path d="M12 11h8M12 15h5" />
                  <path d="M20 20l2 2 4-4" />
                </svg>
                <h3>Cover and jacket design</h3>
                <p>
                  Front, spine and back designed together, with the spine width calculated from
                  your final page count and paper stock rather than guessed at.
                </p>
              </div>
              <div className={s.svcItem}>
                <svg
                  className={s.svcIco}
                  viewBox="0 0 32 32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M8 13V5h16v8" />
                  <rect x="4" y="13" width="24" height="9" rx="2" />
                  <path d="M8 22h16v6H8Z" />
                  <circle cx="23" cy="17" r="1.2" fill="currentColor" stroke="none" />
                </svg>
                <h3>Print production</h3>
                <p>
                  Trim size, paper weight, coating, binding and color proofing, then press ready
                  files. We speak to the printer so nothing arrives cropped, dark or off color.
                </p>
              </div>
              <div className={s.svcItem}>
                <svg
                  className={s.svcIco}
                  viewBox="0 0 32 32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="7" y="3" width="18" height="26" rx="2.5" />
                  <path d="M13 7h6" />
                  <path d="M11 13h10M11 17h10M11 21h7" />
                </svg>
                <h3>Ebook and fixed layout</h3>
                <p>
                  A reflowable ebook where the recipes lead, and a fixed layout edition when the
                  design has to survive the transfer. Both tested on real devices.
                </p>
              </div>
              <div className={s.svcItem}>
                <svg
                  className={s.svcIco}
                  viewBox="0 0 32 32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M17 4H7a3 3 0 0 0-3 3v10l11 11 11-11Z" />
                  <circle cx="11" cy="11" r="2" />
                  <path d="M4 21h8" strokeDasharray="2 2" />
                </svg>
                <h3>ISBN, copyright and metadata</h3>
                <p>
                  ISBN assignment, copyright registration support, BISAC categories, keywords and
                  the description fields that decide where your book turns up in a search.
                </p>
              </div>
              <div className={s.svcItem}>
                <svg
                  className={s.svcIco}
                  viewBox="0 0 32 32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="16" cy="16" r="12" />
                  <path d="M4 16h24" />
                  <path d="M16 4a19 19 0 0 1 0 24a19 19 0 0 1 0-24Z" />
                </svg>
                <h3>Distribution and launch</h3>
                <p>
                  Retail listings, print on demand fulfillment, bookstore ordering channels, review
                  copies and a launch plan sized to what you actually want the book to do.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={cx("band", "bandDark")} id="process">
          <div className={s.shell}>
            <div className={s.bandHead}>
              <p className={cx("kicker", "kickerLight")}>How a project runs</p>
              <h2>Six stages, and you sign off at every one.</h2>
              <p>
                Nothing moves to the next stage until you have seen the last one. If you want to
                stop after stage two and take the plan elsewhere, the plan is yours.
              </p>
            </div>
            <ol className={s.method}>
              <li>
                <span className={s.methodN} aria-hidden="true">
                  1
                </span>
                <div>
                  <h3>Consultation</h3>
                  <p>
                    Free, and there is nothing to prepare. Tell us what you have: finished recipes,
                    a folder of photos, a family binder, or an idea with a strong point of view. We
                    tell you what it needs and what it costs.
                  </p>
                </div>
              </li>
              <li>
                <span className={s.methodN} aria-hidden="true">
                  2
                </span>
                <div>
                  <h3>Recipe audit and plan</h3>
                  <p>
                    We read the recipes, count them, flag the ones that need testing, and write a
                    plan with format, page count, binding, photography scope, schedule and an
                    itemized quote.
                  </p>
                </div>
              </li>
              <li>
                <span className={s.methodN} aria-hidden="true">
                  3
                </span>
                <div>
                  <h3>Editing</h3>
                  <p>
                    Recipe standardization first, then copyediting on the surrounding text. You
                    review both, and the recipes still sound like you when they come back.
                  </p>
                </div>
              </li>
              <li>
                <span className={s.methodN} aria-hidden="true">
                  4
                </span>
                <div>
                  <h3>Design and photography</h3>
                  <p>
                    Cover concepts and two sample interior recipes come first. Once you approve a
                    look, the whole book is set into it and the shoot runs against the agreed brief.
                  </p>
                </div>
              </li>
              <li>
                <span className={s.methodN} aria-hidden="true">
                  5
                </span>
                <div>
                  <h3>Proof and press check</h3>
                  <p>
                    A digital proof, then a printed proof in your hands before the run. You see the
                    paper, the binding and the color before a single copy is sold.
                  </p>
                </div>
              </li>
              <li>
                <span className={s.methodN} aria-hidden="true">
                  6
                </span>
                <div>
                  <h3>Print, list and launch</h3>
                  <p>
                    Files go to press, listings go live across retail channels, review copies go
                    out, and your cookbook becomes something a stranger can order on a Tuesday
                    night.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section className={cx("band", "bandPaper")} id="book">
          <div className={s.shell}>
            <div className={s.bandHead}>
              <p className={s.kicker}>The physical book</p>
              <h2>Choose the book before you design the book.</h2>
              <p className={s.lede}>
                Binding, trim size and paper decide the price, the shelf presence and whether the
                book will sit open next to a mixing bowl. These choices come first, because the
                layout has to be built for them.
              </p>
            </div>
            <div className={s.bind}>
              <div className={s.bindCard}>
                <div className={s.bindArt} aria-hidden="true">
                  <svg
                    viewBox="0 0 100 60"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 44h88" />
                    <path d="M10 44c14-4 26-4 40 0" />
                    <path d="M50 44c14-4 26-4 40 0" />
                    <path d="M50 41v6" />
                    <path d="M20 30h20M60 30h20M24 24h12M64 24h12" opacity=".5" />
                  </svg>
                </div>
                <h3>Lay flat softcover</h3>
                <p>
                  A sewn or Otabind construction where the cover is glued only at the edges, so the
                  block opens flat and stays there without being held.
                </p>
                <p className={s.bindFor}>
                  <b>Best for</b> working cookbooks that live on a counter and get used weekly.
                </p>
              </div>
              <div className={s.bindCard}>
                <div className={s.bindArt} aria-hidden="true">
                  <svg
                    viewBox="0 0 100 60"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M8 16h38v34H8Z" />
                    <path d="M54 16h38v34H54Z" />
                    <path d="M50 12v42" />
                    <circle cx="50" cy="18" r="3.4" />
                    <circle cx="50" cy="27" r="3.4" />
                    <circle cx="50" cy="36" r="3.4" />
                    <circle cx="50" cy="45" r="3.4" />
                  </svg>
                </div>
                <h3>Concealed wire-o</h3>
                <p>
                  Wire binding hidden behind a printed spine, so the book looks like a hardcover on
                  a shelf and opens like a spiral on a bench.
                </p>
                <p className={s.bindFor}>
                  <b>Best for</b> heavily photographed books that need to fold right back.
                </p>
              </div>
              <div className={s.bindCard}>
                <div className={s.bindArt} aria-hidden="true">
                  <svg
                    viewBox="0 0 100 60"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 12h72a6 6 0 0 1 6 6v30a6 6 0 0 1-6 6H14Z" />
                    <path d="M14 12v42" />
                    <path d="M8 14v36" strokeWidth="3.4" />
                    <path d="M26 26h46M26 34h34" opacity=".5" />
                  </svg>
                </div>
                <h3>Case bound hardcover</h3>
                <p>
                  Board covers with sewn sections, a printed jacket or a foiled case. The heaviest,
                  longest lasting and most giftable of the four.
                </p>
                <p className={s.bindFor}>
                  <b>Best for</b> chef books, heirloom collections and anything sold as a present.
                </p>
              </div>
              <div className={s.bindCard}>
                <div className={s.bindArt} aria-hidden="true">
                  <svg
                    viewBox="0 0 100 60"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M50 50 16 16" />
                    <path d="M50 50 84 16" />
                    <path d="M50 50V20" opacity=".45" />
                    <path d="M24 22h14M62 22h14" opacity=".5" />
                  </svg>
                </div>
                <h3>Perfect bound softcover</h3>
                <p>
                  The standard glued paperback. The cheapest per copy and the fastest to reprint,
                  but the spine will close on you unless you crack it.
                </p>
                <p className={s.bindFor}>
                  <b>Best for</b> text led books, fundraisers and large first runs on a tight
                  budget.
                </p>
              </div>
            </div>
            <div className={s.specs}>
              <div className={s.specsCard}>
                <h4>Common trim sizes</h4>
                <ul>
                  <li>
                    Compact, recipe led <b>6 × 9 in</b>
                  </li>
                  <li>
                    Cookbook standard <b>7 × 10 in</b>
                  </li>
                  <li>
                    Photo led <b>8 × 10 in</b>
                  </li>
                  <li>
                    Large format <b>8.5 × 11 in</b>
                  </li>
                </ul>
              </div>
              <div className={s.specsCard}>
                <h4>Interior stock</h4>
                <ul>
                  <li>
                    Matte coated, photo heavy <b>100 to 128 gsm</b>
                  </li>
                  <li>
                    Uncoated, text led <b>90 to 120 gsm</b>
                  </li>
                  <li>
                    Color <b>Four color process</b>
                  </li>
                  <li>
                    Finish <b>Matte or satin</b>
                  </li>
                </ul>
              </div>
              <div className={s.specsCard}>
                <h4>Planning the extent</h4>
                <ul>
                  <li>
                    Photo led recipe <b>2 pages</b>
                  </li>
                  <li>
                    Text led recipe <b>1 page</b>
                  </li>
                  <li>
                    Front and back matter <b>16 to 24 pages</b>
                  </li>
                  <li>
                    Signatures fall in <b>Multiples of 8 or 16</b>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className={cx("band", "bandTint")}>
          <div className={s.shell}>
            <div className={s.bandHead}>
              <p className={s.kicker}>Who we publish</p>
              <h2>Eight kinds of cookbook, each with its own set of problems.</h2>
            </div>
            <ul className={s.kinds}>
              <li>
                <h3>Family and heirloom collections</h3>
                <p>
                  Handwritten cards, index boxes and half remembered quantities, turned into a book
                  the whole family can cook from. Transcription and recipe reconstruction included.
                </p>
              </li>
              <li>
                <h3>Chef and restaurant books</h3>
                <p>
                  Service recipes scaled down to a home kitchen without losing the dish. Yield
                  conversion, equipment substitution and technique notes for the reader who does
                  not own a blast chiller.
                </p>
              </li>
              <li>
                <h3>Health, diet and clinical nutrition</h3>
                <p>
                  Nutritional analysis per serving, allergen labeling, macro breakdowns and careful
                  handling of any health claim that appears anywhere in the text.
                </p>
              </li>
              <li>
                <h3>Baking and pastry</h3>
                <p>
                  The least forgiving category. Weight first measurement, baker&apos;s percentages,
                  dough temperature notes and the step photography that baking books live or die
                  on.
                </p>
              </li>
              <li>
                <h3>Regional and cultural cooking</h3>
                <p>
                  Non English ingredient names set with consistent transliteration and diacritics,
                  a sourcing appendix, and a glossary that respects the original language.
                </p>
              </li>
              <li>
                <h3>Community and fundraising books</h3>
                <p>
                  Many contributors, many formats, one voice. Contributor permissions, credit lines
                  and a print run priced so the fundraiser actually raises funds.
                </p>
              </li>
              <li>
                <h3>Single subject and technique books</h3>
                <p>
                  One ingredient, one method or one piece of equipment, carried across a whole
                  book. Structure matters more here than anywhere else.
                </p>
              </li>
              <li>
                <h3>Brand and product cookbooks</h3>
                <p>
                  Books built around a product line or a farm, with brand guidelines applied to the
                  design and a distribution plan that includes your own channels.
                </p>
              </li>
            </ul>
          </div>
        </section>

        <section className={cx("band", "bandPaper")}>
          <div className={cx("shell", "keep")}>
            <div>
              <p className={s.kicker}>Ownership</p>
              <h2>The book is yours. All of it.</h2>
              <p className={s.lede}>
                We are a publishing services company, not an acquiring publisher. We do not take a
                share of your book in exchange for producing it.
              </p>
            </div>
            <ul className={s.keepList}>
              <li>
                <IconCheck size={19} />
                <div>
                  <b>Full copyright</b>
                  <span>
                    In your recipes, your text, your photographs and your design. Registered in
                    your name.
                  </span>
                </div>
              </li>
              <li>
                <IconCheck size={19} />
                <div>
                  <b>One hundred percent of royalties</b>
                  <span>
                    Every retailer pays you. We take no cut of a single sale, on any channel, ever.
                  </span>
                </div>
              </li>
              <li>
                <IconCheck size={19} />
                <div>
                  <b>Your own imprint</b>
                  <span>
                    Publish under your name, your kitchen&apos;s name or your restaurant&apos;s
                    name. The ISBN is registered to you.
                  </span>
                </div>
              </li>
              <li>
                <IconCheck size={19} />
                <div>
                  <b>The production files</b>
                  <span>
                    Print ready PDFs and the source layout files, handed over at the end of the
                    project.
                  </span>
                </div>
              </li>
              <li>
                <IconCheck size={19} />
                <div>
                  <b>The right to walk away</b>
                  <span>
                    Stop at the end of any stage and take everything produced so far with you.
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section className={cx("band", "bandTint")} id="faq">
          <div className={s.shell}>
            <div className={s.bandHead}>
              <p className={s.kicker}>Before you call</p>
              <h2>The questions cookbook authors ask first.</h2>
            </div>
            <div className={s.faq}>
              {FAQ.map((item, index) => (
                <details key={item.q} open={openFaq === index}>
                  <summary
                    onClick={(event) => {
                      event.preventDefault();
                      setOpenFaq((current) => (current === index ? -1 : index));
                    }}
                  >
                    {item.q}
                  </summary>
                  <div className={s.faqA}>
                    {item.a.map((paragraph) => (
                      <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                    ))}
                    {item.fine ? <p className={s.faqFine}>{item.fine}</p> : null}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className={s.close} id="start">
          <div className={cx("shell", "closeIn")}>
            <div>
              <p className={cx("kicker", "kickerLight")}>Start here</p>
              <h2>Tell us about your cookbook.</h2>
              <p className={s.closeLede}>
                Send the details and a cookbook editor reads them, not a sales script. You get back
                a realistic assessment of what the book needs, roughly what it costs and how long
                it takes. If we are not the right fit, we will say so.
              </p>
              <a className={s.closeTel} href={PHONE_HREF}>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
                </svg>
                <span>
                  <span>Prefer to talk it through</span>
                  <strong>{PHONE_CONVERSION_NUMBER}</strong>
                </span>
              </a>
            </div>
            <LeadForm />
          </div>
        </section>
      </main>

      <footer className={s.foot}>
        <div className={cx("shell", "footIn")}>
          <div>
            <p className={s.footBrand}>Stamford Publishers</p>
            <p>
              Publishing services for independent cookbook authors, chefs and food brands. Editing,
              design, print production and distribution.
            </p>
          </div>
          <div className={s.footLinks}>
            <Link href="/">Home</Link>
            <Link href="/book-publishing">Services</Link>
            <Link href="/contact-us">Contact</Link>
            <Link href="/privacy-policy">Privacy policy</Link>
            <Link href="/terms-of-service">Terms</Link>
          </div>
        </div>
        <div className={s.shell}>
          <p className={s.footBar}>
            © {year} Stamford Publishers. All rights reserved. 640 St Paul Ave, Los Angeles, CA
            90017
          </p>
        </div>
      </footer>

      <div className={s.mobar} aria-label="Quick actions">
        <a className={cx("btn", "btnGhostLight")} href={PHONE_HREF}>
          Call us
        </a>
        <a className={cx("btn", "btnPrimary")} href="#start">
          Get my plan
        </a>
      </div>
    </div>
  );
}
