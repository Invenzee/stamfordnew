"use client";

import { useEffect } from "react";

const CLEAR_WINDOW_MS = 1500;

export default function ZendeskBehavior() {
  useEffect(() => {
    let chatOpen = false;

    const hasGuard = () => !!(history.state && history.state.zendeskOpen);

    const pushGuard = () => {
      if (!hasGuard()) {
        history.pushState({ zendeskOpen: true }, "", window.location.href);
      }
    };

    const pushGuardWithRetry = () => {
      pushGuard();
      window.setTimeout(pushGuard, 300);
      window.setTimeout(pushGuard, 1000);
    };

    const closeWidget = () => {
      chatOpen = false;
      if (typeof window.zE === "function") {
        try {
          window.zE("webWidget", "close");
        } catch {
          // ignore
        }
      }
    };

    const onPopState = () => {
      if (!chatOpen) return;
      closeWidget();
    };

    window.addEventListener("popstate", onPopState);

    function initZendeskChat() {
      if (typeof window.zE === "function") {
        window.zE(function () {
          // Launcher stays visible; do not auto-open on page load.
          window.zE?.("webWidget", "show");

          window.zE?.("webWidget:on", "open", function () {
            chatOpen = true;
            pushGuardWithRetry();
          });

          window.zE?.("webWidget:on", "close", function () {
            chatOpen = false;
          });

          // Agent message / unread → open chat (same idea as LiveChat agent reply)
          window.zE?.(
            "webWidget:on",
            "chat:unreadMessages",
            function (number: number) {
              if (number > 0) {
                window.zE?.("webWidget", "show");
                window.zE?.("webWidget", "open");
                chatOpen = true;
                pushGuardWithRetry();
              }
            },
          );
        });
      } else {
        window.setTimeout(initZendeskChat, 300);
      }
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
      box.dispatchEvent(
        new doc.defaultView!.Event("input", { bubbles: true }),
      );
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

    let showTries = 0;
    const showTimer = window.setInterval(function () {
      if (typeof window.zE === "function") {
        try {
          window.zE("webWidget", "show");
        } catch {
          // ignore
        }
      }
      if (++showTries > 40) window.clearInterval(showTimer);
    }, 250);

    return () => {
      window.removeEventListener("popstate", onPopState);
      window.clearInterval(clearBoot);
      window.clearInterval(showTimer);
      document.getElementById("bb-zd-mobile-only")?.remove();
    };
  }, []);

  return null;
}
