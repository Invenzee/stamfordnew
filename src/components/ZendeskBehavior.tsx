"use client";

import { useEffect } from "react";

const CLEAR_WINDOW_MS = 1500;
const DESKTOP_MQ = "(min-width: 768px)";

export default function ZendeskBehavior() {
  useEffect(() => {
    function isDesktop() {
      return window.matchMedia(DESKTOP_MQ).matches;
    }

    function syncLauncherForViewport() {
      if (typeof window.zE !== "function") return;
      try {
        if (isDesktop()) {
          window.zE("webWidget", "hide");
        } else {
          window.zE("webWidget", "show");
        }
      } catch {
        // Widget may not be ready yet.
      }
    }

    function initZendeskChat() {
      if (typeof window.zE === "function") {
        window.zE(function () {
          syncLauncherForViewport();

          if (!isDesktop()) {
            window.zE?.("webWidget", "open");
          }

          window.zE?.(
            "webWidget:on",
            "chat:unreadMessages",
            function (number: number) {
              if (number > 0) {
                window.zE?.("webWidget", "show");
                window.zE?.("webWidget", "open");
              }
            },
          );

          window.zE?.("webWidget:on", "close", function () {
            syncLauncherForViewport();
          });
        });
      } else {
        window.setTimeout(initZendeskChat, 300);
      }
    }

    initZendeskChat();

    const mq = window.matchMedia(DESKTOP_MQ);
    const onViewportChange = () => syncLauncherForViewport();
    mq.addEventListener("change", onViewportChange);

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

    function hideLauncherOnDesktopCss() {
      let style = document.getElementById("bb-zd-mobile-only");
      if (!style) {
        style = document.createElement("style");
        style.id = "bb-zd-mobile-only";
        document.head.appendChild(style);
      }
      style.textContent =
        "@media (min-width: 768px){" +
        "iframe#launcher," +
        "#launcher," +
        ".zEWidget-launcher," +
        "div[data-product='web_widget'] iframe#launcher{" +
        "display:none!important;visibility:hidden!important;pointer-events:none!important;" +
        "}" +
        "}";
    }

    hideLauncherOnDesktopCss();
    syncLauncherForViewport();

    let bootTries = 0;
    const bootTimer = window.setInterval(function () {
      hideLauncherOnDesktopCss();
      syncLauncherForViewport();
      if (++bootTries > 40) window.clearInterval(bootTimer);
    }, 250);

    return () => {
      mq.removeEventListener("change", onViewportChange);
      window.clearInterval(clearBoot);
      window.clearInterval(bootTimer);
      document.getElementById("bb-zd-mobile-only")?.remove();
    };
  }, []);

  return null;
}
