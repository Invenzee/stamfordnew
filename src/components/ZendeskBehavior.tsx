"use client";

import { useEffect } from "react";
import { OPEN_ZENDESK_EVENT } from "@/lib/lead-actions";

/**
 * Zendesk draws the chat bubble. This file only controls how it behaves:
 * phone Back closes chat instead of leaving the site, unread messages open
 * the window, the bubble stays visible, and leftover text is cleared from
 * the typing box (without wiping what the visitor is actively writing).
 */

/** How long to keep retrying leftover-text cleanup after open/close/new message. */
const CLEAR_WINDOW_MS = 1500;

/** Safe Zendesk talker: send a command, or stay quiet if Zendesk is not ready. */
function zeCall(...args: unknown[]) {
  if (typeof window.zE !== "function") return;
  try {
    window.zE(...args);
  } catch {
    // Classic vs Messaging APIs differ; ignore unsupported commands.
  }
}

/** Close the conversation window (covers both new messenger and old widget). */
function closeZendeskWidget() {
  zeCall("messenger", "close");
  zeCall("webWidget", "close");
}

/** Ignore the small round chat button — that is not “chat is open.” */
function isLauncherFrame(frame: HTMLIFrameElement) {
  const id = frame.id.toLowerCase();
  const title = frame.title.toLowerCase();
  const name = frame.name.toLowerCase();
  return (
    id === "launcher" ||
    name === "launcher" ||
    title.includes("launcher") ||
    title.includes("unread message")
  );
}

/** True when the big conversation panel is on screen, not just the launcher bubble. */
function isChatPanelOpen() {
  const frames = document.querySelectorAll("iframe");
  for (const frame of frames) {
    if (!(frame instanceof HTMLIFrameElement) || isLauncherFrame(frame)) {
      continue;
    }

    const id = frame.id.toLowerCase();
    const title = frame.title.toLowerCase();
    const name = frame.name.toLowerCase();
    const isWidget =
      id === "webwidget" ||
      name === "webwidget" ||
      title.includes("messaging window") ||
      title.includes("zendesk");

    if (!isWidget) continue;

    const style = window.getComputedStyle(frame);
    if (
      style.display === "none" ||
      style.visibility === "hidden" ||
      style.opacity === "0" ||
      style.pointerEvents === "none"
    ) {
      continue;
    }

    const box = frame.getBoundingClientRect();
    if (box.width > 240 && box.height > 240) return true;
  }
  return false;
}

export default function ZendeskBehavior() {
  useEffect(() => {
    let chatOpen = false;
    /** Extra history entry is on the stack so Back closes chat instead of leaving. */
    let guardActive = false;
    /** Ignore the popstate we create ourselves when dropping the guard. */
    let suppressPop = false;
    let bound = false;
    const timeouts: number[] = [];
    const intervals: number[] = [];

    const later = (fn: () => void, ms: number) => {
      timeouts.push(window.setTimeout(fn, ms));
    };

    /** Phone Back-button lock: add a fake history step so Back does not leave the site. */
    const ensureGuard = () => {
      if (!chatOpen || guardActive) return;
      const prev =
        history.state && typeof history.state === "object" ? history.state : {};
      history.pushState(
        { ...prev, zendeskOpen: true },
        "",
        window.location.href,
      );
      guardActive = true;
    };

    /** Try the lock now and again shortly after — chat can load slowly. */
    const ensureGuardWithRetry = () => {
      ensureGuard();
      later(ensureGuard, 300);
      later(ensureGuard, 1000);
    };

    /** Visitor closed chat with Zendesk’s X: drop the extra history step quietly. */
    const releaseGuardSilently = () => {
      if (!guardActive) return;
      suppressPop = true;
      guardActive = false;
      history.back();
    };

    /** Chat is open — turn on the Back-button lock. */
    const markOpen = () => {
      chatOpen = true;
      ensureGuardWithRetry();
    };

    /** Chat is closed — remove the lock so the next Back leaves the page normally. */
    const markClosed = () => {
      chatOpen = false;
      // Widget closed from its own UI: drop the extra history entry so the
      // next Back press navigates normally. Skip if Back already consumed it.
      releaseGuardSilently();
    };

    /** Phone/browser Back: if chat is open, close it and stay on this page. */
    const onPopState = () => {
      if (suppressPop) {
        suppressPop = false;
        return;
      }

      const panelOpen = chatOpen || guardActive || isChatPanelOpen();
      if (!panelOpen) return;

      chatOpen = false;
      guardActive = false;
      closeZendeskWidget();
    };

    window.addEventListener("popstate", onPopState);
    // Site “Chat Now” buttons fire this so the same Back-button lock turns on.
    window.addEventListener(OPEN_ZENDESK_EVENT, markOpen);

    /** Hook Zendesk open/close, and auto-open the window when a new message arrives. */
    function bindWidgetEvents() {
      if (bound || typeof window.zE !== "function") return false;
      bound = true;

      zeCall("messenger:on", "open", markOpen);
      zeCall("messenger:on", "close", markClosed);
      zeCall("messenger:on", "unreadMessages", (count: number) => {
        if (count > 0) {
          zeCall("messenger", "open");
          markOpen();
        }
      });

      zeCall("webWidget", "show");
      zeCall("webWidget:on", "open", markOpen);
      zeCall("webWidget:on", "close", markClosed);
      zeCall("webWidget:on", "chat:unreadMessages", (number: number) => {
        if (number > 0) {
          zeCall("webWidget", "show");
          zeCall("webWidget", "open");
          markOpen();
        }
      });

      return true;
    }

    /** Wait until Zendesk finishes loading, then connect the behaviors above. */
    function initZendeskChat() {
      if (typeof window.zE === "function") {
        try {
          window.zE(function () {
            bindWidgetEvents();
          });
        } catch {
          // ignore
        }
        bindWidgetEvents();
        return;
      }
      later(initZendeskChat, 300);
    }

    initZendeskChat();

    /** Reach inside Zendesk’s mini-page so we can see the typing box. */
    function getWidgetDoc() {
      const frame = document.querySelector(
        "iframe#webWidget",
      ) as HTMLIFrameElement | null;
      if (!frame) return null;
      try {
        return frame.contentDocument || frame.contentWindow?.document || null;
      } catch {
        return null;
      }
    }

    /** Empty leftover text in the typing box, but never while the visitor is writing. */
    function clearComposer() {
      const doc = getWidgetDoc();
      if (!doc) return false;

      const box = doc.querySelector(
        'textarea[name="chatBox"], textarea[data-testid="message-field"]',
      ) as HTMLTextAreaElement | null;
      if (!box) return false;
      if (box.value === "") return true;
      if (box.dataset.bbUserTyping === "1") return true;

      const setter = Object.getOwnPropertyDescriptor(
        doc.defaultView!.HTMLTextAreaElement.prototype,
        "value",
      )?.set;
      if (!setter) return false;
      setter.call(box, "");
      box.dispatchEvent(new doc.defaultView!.Event("input", { bubbles: true }));
      return true;
    }

    /** Notice when the visitor is typing (or hitting Enter to send) so we don’t erase it. */
    function markTyping() {
      const doc = getWidgetDoc();
      if (!doc) return;
      const box = doc.querySelector(
        'textarea[name="chatBox"], textarea[data-testid="message-field"]',
      ) as HTMLTextAreaElement | null;
      if (!box || box.dataset.bbBound === "1") return;
      box.dataset.bbBound = "1";
      box.addEventListener("keydown", function (e) {
        box.dataset.bbUserTyping = "1";
        if (e.key === "Enter" && !e.shiftKey) {
          window.setTimeout(function () {
            box.dataset.bbUserTyping = "0";
          }, 0);
        }
      });
    }

    /** Keep clearing leftover text for a short burst — Zendesk sometimes pastes it back in. */
    function clearRepeatedly() {
      const start = Date.now();
      const timer = window.setInterval(function () {
        clearComposer();
        markTyping();
        if (Date.now() - start > CLEAR_WINDOW_MS) {
          window.clearInterval(timer);
        }
      }, 100);
    }

    /** Run leftover-text cleanup when chat opens, closes, or gets a new unread message. */
    function bindClearHandlers() {
      if (typeof window.zE !== "function") return false;
      try {
        window.zE("webWidget:on", "open", function () {
          const doc = getWidgetDoc();
          if (doc) {
            const box = doc.querySelector(
              'textarea[name="chatBox"], textarea[data-testid="message-field"]',
            ) as HTMLTextAreaElement | null;
            if (box) box.dataset.bbUserTyping = "0";
          }
          clearRepeatedly();
        });
        window.zE("webWidget:on", "close", function () {
          clearRepeatedly();
        });
        window.zE("webWidget:on", "chat:unreadMessages", function () {
          clearRepeatedly();
        });
      } catch {
        return false;
      }
      markTyping();
      return true;
    }

    // Keep trying until Zendesk is ready enough to attach the text-clearing behavior.
    let clearTries = 0;
    const clearBoot = window.setInterval(function () {
      if (bindClearHandlers() || ++clearTries > 100) {
        window.clearInterval(clearBoot);
      }
    }, 200);
    intervals.push(clearBoot);

    // Keep the chat bubble visible after the page loads so it does not stay hidden.
    let showTries = 0;
    const showTimer = window.setInterval(function () {
      zeCall("webWidget", "show");
      bindWidgetEvents();
      if (++showTries > 40) window.clearInterval(showTimer);
    }, 250);
    intervals.push(showTimer);

    /** Stop listeners and repeating checks when leaving this page. */
    return () => {
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener(OPEN_ZENDESK_EVENT, markOpen);
      for (const id of intervals) window.clearInterval(id);
      for (const id of timeouts) window.clearTimeout(id);
      document.getElementById("bb-zd-mobile-only")?.remove();
    };
  }, []);

  return null;
}
