"use client";

import { useEffect } from "react";

/**
 * Scroll reveal, counters, and readiness quiz for the self-publishing LP.
 * Lead forms are handled by LeadForm.tsx.
 */
export function useSelfPubEffects(rootRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    /* Lift Zendesk launcher above the sticky mobile dock */
    const applyZendeskOffset = () => {
      const mobile = window.matchMedia("(max-width: 760px)").matches;
      const vertical = mobile ? "90px" : "0px";
      const zE = (window as Window & { zE?: (...args: unknown[]) => void }).zE;
      if (typeof zE !== "function") return false;
      try {
        zE("webWidget", "updateSettings", {
          webWidget: {
            offset: {
              horizontal: "12px",
              vertical,
              mobile: {
                horizontal: "12px",
                vertical: "90px",
              },
            },
          },
        });
        return true;
      } catch {
        return false;
      }
    };

    let tries = 0;
    const zendeskTimer = window.setInterval(() => {
      tries += 1;
      if (applyZendeskOffset() || tries > 40) {
        window.clearInterval(zendeskTimer);
      }
    }, 250);

    const onResize = () => applyZendeskOffset();
    window.addEventListener("resize", onResize);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const els = Array.from(root.querySelectorAll(".rv"));
    let ioReveal: IntersectionObserver | null = null;
    if (!prefersReduced && "IntersectionObserver" in window) {
      ioReveal = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, i) => {
            if (!entry.isIntersecting) return;
            (entry.target as HTMLElement).style.transitionDelay = `${Math.min(i, 5) * 60}ms`;
            entry.target.classList.add("in");
            ioReveal?.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
      );
      els.forEach((e) => ioReveal!.observe(e));
    } else {
      els.forEach((e) => e.classList.add("in"));
    }

    let ioCount: IntersectionObserver | null = null;
    const nums = Array.from(root.querySelectorAll<HTMLElement>("[data-count]"));
    if ("IntersectionObserver" in window) {
      ioCount = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target as HTMLElement;
            const end = parseInt(el.dataset.count || "0", 10) || 0;
            const suffix = el.dataset.suffix || "";
            if (prefersReduced) {
              el.textContent = end.toLocaleString() + suffix;
              ioCount?.unobserve(el);
              return;
            }
            let start: number | null = null;
            const duration = 1400;
            const frame = (t: number) => {
              if (start === null) start = t;
              const p = Math.min((t - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              el.textContent = Math.round(end * eased).toLocaleString() + suffix;
              if (p < 1) requestAnimationFrame(frame);
            };
            requestAnimationFrame(frame);
            ioCount?.unobserve(el);
          });
        },
        { threshold: 0.5 },
      );
      nums.forEach((n) => ioCount!.observe(n));
    }

    const OUTCOMES = {
      idea: {
        tag: "Start with ghostwriting",
        title: "The book exists, it just is not on paper yet",
        body: "Plenty of good books start exactly here. What you need first is a writer who can interview you, build a chapter outline from your material, and produce a draft you recognise as your own. Editing and publishing come after that, and they are the easy part.",
        items: [
          "A structured interview to capture the material",
          "A chapter by chapter outline for your approval",
          "A ghostwritten first draft in your voice",
        ],
      },
      partial: {
        tag: "Start with a draft assessment",
        title: "Finish the draft before you spend money on anything else",
        body: "A half-written manuscript is a good position to be in, but publishing decisions made now would be premature. Our editors read what exists, identify why the draft stalled, and either coach you through finishing it or write the remaining chapters with you.",
        items: [
          "A free read of what you have so far",
          "A plan for the remaining chapters",
          "Ghostwriting or coaching, whichever fits how you work",
        ],
      },
      published: {
        tag: "Start with distribution and marketing",
        title: "The book is out. The problem is reach, not writing",
        body: "An already published book that is not selling almost never needs rewriting. Most of the time it is listed on one platform only, split across separate print and ebook listings, and missing from the wholesale catalogue that bookstores and libraries actually order from. Widening distribution alone often moves the numbers before a single marketing dollar is spent.",
        items: [
          "A distribution audit across all seven of our retail and audio channels",
          "A combined listing per format instead of split print and ebook pages",
          "A launch or relaunch campaign with review and store outreach",
        ],
      },
      ready: {
        tag: "Start with publishing setup",
        title: "You are ready for production",
        body: "An edited, complete manuscript is the fastest possible starting point. What remains is cover design, interior typesetting, ISBN and copyright registration, and distribution setup across every channel at once. Most books in this position are on sale within three months.",
        items: [
          "Cover design concepts and interior typesetting",
          "ISBN and copyright registration in your name",
          "Distribution to Amazon, Ingram, B&N, Apple Books, Kobo and Audible",
        ],
      },
      edit: {
        tag: "Start with editing",
        title: "One editing pass stands between you and publication",
        body: "A complete draft that has not been professionally edited is the single most common situation we see. A friend reading it is genuinely useful, but it is not the same as an editor who works in your category. One proper pass is usually all that separates this manuscript from a publishable book.",
        items: [
          "A free sample edit so you can see the difference",
          "Developmental and line editing, then a final proof",
          "Straight into cover design and distribution after sign-off",
        ],
      },
    } as const;

    const GOAL_LINE: Record<string, string> = {
      speed:
        " Since speed is your priority, we will run design and distribution setup in parallel rather than in sequence.",
      reach:
        " Since reach is your priority, we will put your title into the Ingram catalogue from day one so libraries and independent stores can order it alongside your Amazon listing.",
      quality:
        " Since quality is your priority, we will assign an editor who has worked in your category and build in extra revision rounds.",
      income:
        " Since income is your priority, we will price the book against category bestsellers and make sure it is listed everywhere a buyer for that category actually shops.",
    };

    const res = root.querySelector<HTMLElement>("#quizRes");
    const steps = Array.from(root.querySelectorAll<HTMLElement>(".quiz-step"));
    const bars = Array.from(root.querySelectorAll(".quiz-bar i"));
    const answers: Record<string, string> = {};
    let current = 0;

    const show = (i: number) => {
      steps.forEach((s, k) => s.classList.toggle("on", k === i));
      bars.forEach((b, k) => b.classList.toggle("on", k <= i));
    };

    const pick = () => {
      if (answers.stage === "idea") return OUTCOMES.idea;
      if (answers.stage === "partial") return OUTCOMES.partial;
      if (answers.stage === "published") return OUTCOMES.published;
      return answers.edit === "yes" ? OUTCOMES.ready : OUTCOMES.edit;
    };

    const finish = () => {
      steps.forEach((s) => s.classList.remove("on"));
      bars.forEach((b) => b.classList.add("on"));
      res?.classList.add("on");
      const o = pick();
      const tag = root.querySelector("#resTag");
      const title = root.querySelector("#resTitle");
      const body = root.querySelector("#resBody");
      const list = root.querySelector("#resList");
      if (tag) tag.textContent = o.tag;
      if (title) title.textContent = o.title;
      if (body) body.textContent = o.body + (GOAL_LINE[answers.goal] || "");
      if (list) {
        list.innerHTML = o.items.map((item) => `<li>${item}</li>`).join("");
      }
      const dl = (window as Window & { dataLayer?: Record<string, unknown>[] }).dataLayer;
      dl?.push({ event: "quiz_complete", quiz_outcome: o.tag });
    };

    const onOpt = (ev: Event) => {
      const btn = (ev.target as HTMLElement).closest(".qopt") as HTMLElement | null;
      if (!btn || !root.contains(btn)) return;
      answers[btn.dataset.k || ""] = btn.dataset.v || "";
      if (current < steps.length - 1) {
        current += 1;
        show(current);
      } else {
        finish();
      }
    };

    const onBack = (ev: Event) => {
      const btn = (ev.target as HTMLElement).closest("[data-back]");
      if (!btn || !root.contains(btn)) return;
      if (current > 0) {
        current -= 1;
        show(current);
      }
    };

    const onReset = () => {
      Object.keys(answers).forEach((k) => delete answers[k]);
      current = 0;
      res?.classList.remove("on");
      show(0);
    };

    root.addEventListener("click", onOpt);
    root.addEventListener("click", onBack);
    root.querySelector("#quizReset")?.addEventListener("click", onReset);

    return () => {
      window.clearInterval(zendeskTimer);
      window.removeEventListener("resize", onResize);
      ioReveal?.disconnect();
      ioCount?.disconnect();
      root.removeEventListener("click", onOpt);
      root.removeEventListener("click", onBack);
      root.querySelector("#quizReset")?.removeEventListener("click", onReset);
      /* reset Zendesk offset when leaving the page */
      const zE = (window as Window & { zE?: (...args: unknown[]) => void }).zE;
      try {
        zE?.("webWidget", "updateSettings", {
          webWidget: {
            offset: { horizontal: "0px", vertical: "0px", mobile: { horizontal: "0px", vertical: "0px" } },
          },
        });
      } catch {
        /* ignore */
      }
    };
  }, [rootRef]);
}
