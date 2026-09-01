"use client";

import { useEffect } from "react";
import { OPEN_ZENDESK_EVENT } from "@/lib/lead-actions";

const CLEAR_WINDOW_MS = 1500;

function zeCall(...args: unknown[]) {
  if (typeof window.zE !== "function") return;
  try {
    window.zE(...args);
  } catch {
    // Classic vs Messaging APIs differ; ignore unsupported commands.
  }
}

function closeZendeskWidget() {
  zeCall("messenger", "close");
  zeCall("webWidget", "close");
}

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

/** True when the conversation panel is on screen, not just the launcher bubble. */
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

    const ensureGuardWithRetry = () => {
      ensureGuard();
      later(ensureGuard, 300);
      later(ensureGuard, 1000);
    };

    const releaseGuardSilently = () => {
      if (!guardActive) return;
      suppressPop = true;
      guardActive = false;
      history.back();
    };

    const markOpen = () => {
      chatOpen = true;
      ensureGuardWithRetry();
    };

    const markClosed = () => {
      chatOpen = false;
      // Widget closed from its own UI: drop the extra history entry so the
      // next Back press navigates normally. Skip if Back already consumed it.
      releaseGuardSilently();
    };

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
    window.addEventListener(OPEN_ZENDESK_EVENT, markOpen);

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

    let clearTries = 0;
    const clearBoot = window.setInterval(function () {
      if (bindClearHandlers() || ++clearTries > 100) {
        window.clearInterval(clearBoot);
      }
    }, 200);
    intervals.push(clearBoot);

    let showTries = 0;
    const showTimer = window.setInterval(function () {
      zeCall("webWidget", "show");
      bindWidgetEvents();
      if (++showTries > 40) window.clearInterval(showTimer);
    }, 250);
    intervals.push(showTimer);

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
