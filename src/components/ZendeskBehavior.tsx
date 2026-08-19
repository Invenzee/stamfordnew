"use client";

import { useEffect } from "react";

const COLOR = "#000080";
const CLEAR_WINDOW_MS = 1500;

export default function ZendeskBehavior() {
  useEffect(() => {
    function initZendeskChat() {
      if (typeof window.zE === "function") {
        window.zE(function () {
          window.zE?.("webWidget", "open");
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

    function applyZeSettings() {
      if (typeof window.zE !== "function") return false;
      try {
        window.zE("webWidget", "updateSettings", {
          webWidget: {
            color: {
              theme: COLOR,
              launcher: COLOR,
              launcherText: "#FFFFFF",
              button: COLOR,
              header: COLOR,
              resultLists: COLOR,
              articleLinks: COLOR,
            },
          },
        });
        return true;
      } catch {
        return false;
      }
    }

    function getFrameDoc(selector: string) {
      const frame = document.querySelector(selector) as HTMLIFrameElement | null;
      if (!frame) return null;
      try {
        return frame.contentDocument || frame.contentWindow?.document || null;
      } catch {
        return null;
      }
    }

    function injectCss(doc: Document | null, cssText: string, styleId: string) {
      if (!doc?.head) return false;
      let style = doc.getElementById(styleId);
      if (!style) {
        style = doc.createElement("style");
        style.id = styleId;
        doc.head.appendChild(style);
      }
      style.textContent = cssText;
      return true;
    }

    function paintWidget() {
      const css =
        ".u-userLauncherColor:not([disabled]){" +
        "background-color:" +
        COLOR +
        " !important;" +
        "color:#fff !important;" +
        "fill:#fff !important;" +
        "}" +
        "header," +
        '[data-testid="widget-title"],' +
        ".HeaderView-sc-1gl8kno-0," +
        ".gJLDHj{" +
        "background:" +
        COLOR +
        " !important;" +
        "background-color:" +
        COLOR +
        " !important;" +
        "color:#fff !important;" +
        "}";

      injectCss(getFrameDoc("iframe#launcher"), css, "bb-zd-navy");
      injectCss(getFrameDoc("iframe#webWidget"), css, "bb-zd-navy");
    }

    function bootColor() {
      applyZeSettings();
      paintWidget();
    }

    let colorTries = 0;
    const colorTimer = window.setInterval(function () {
      bootColor();
      if (++colorTries > 60) window.clearInterval(colorTimer);
    }, 200);

    bootColor();

    let bindTries = 0;
    const bindTimer = window.setInterval(function () {
      if (typeof window.zE !== "function") {
        if (++bindTries > 100) window.clearInterval(bindTimer);
        return;
      }
      try {
        window.zE("webWidget:on", "open", function () {
          applyZeSettings();
          let i = 0;
          const t = window.setInterval(function () {
            paintWidget();
            if (++i > 20) window.clearInterval(t);
          }, 100);
        });
        window.zE("webWidget:on", "chat:unreadMessages", function () {
          paintWidget();
        });
        window.clearInterval(bindTimer);
      } catch {
        if (++bindTries > 100) window.clearInterval(bindTimer);
      }
    }, 200);

    return () => {
      window.clearInterval(clearBoot);
      window.clearInterval(colorTimer);
      window.clearInterval(bindTimer);
    };
  }, []);

  return null;
}
