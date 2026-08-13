"use client";

import { useEffect } from "react";

type LiveChatVisibility = "maximized" | "minimized" | "hidden";

type LiveChatReadyData = {
  state?: { visibility?: LiveChatVisibility };
};

type LiveChatVisibilityData = {
  visibility?: LiveChatVisibility;
};

type LiveChatEventData = {
  type?: string;
  event_type?: string;
  author?: { type?: string };
};

type LiveChatWidgetApi = NonNullable<Window["LiveChatWidget"]>;

export default function LiveChatBehavior() {
  useEffect(() => {
    const debug = process.env.NODE_ENV !== "production";
    const lcLog = (...args: unknown[]) => {
      if (debug) {
        console.log("[LC]", ...args);
      }
    };

    let chatOpen = false;
    let tries = 0;
    let timer: ReturnType<typeof setInterval> | null = null;

    const hasGuard = () => !!(history.state && history.state.livechatOpen);

    const pushGuard = (reason: string) => {
      if (!hasGuard()) {
        history.pushState({ livechatOpen: true }, "", window.location.href);
        lcLog("guard pushed:", reason);
      }
    };

    const pushGuardWithRetry = (reason: string) => {
      pushGuard(reason);
      window.setTimeout(() => pushGuard(`${reason} +300ms`), 300);
      window.setTimeout(() => pushGuard(`${reason} +1000ms`), 1000);
    };

    const onPopState = (event: PopStateEvent) => {
      lcLog("popstate, chatOpen =", chatOpen, "state =", event.state);
      if (!chatOpen) return;

      chatOpen = false;
      window.LiveChatWidget?.call("minimize");
    };

    window.addEventListener("popstate", onPopState);

    const bindHandlers = (widget: LiveChatWidgetApi) => {
      lcLog("handlers bound");

      widget.on("ready", ((data: LiveChatReadyData) => {
        chatOpen = data?.state?.visibility === "maximized";
        lcLog("ready, chatOpen =", chatOpen);
        if (chatOpen) {
          pushGuardWithRetry("ready-maximized");
        }
      }) as (data: never) => void);

      widget.on("visibility_changed", ((data: LiveChatVisibilityData) => {
        chatOpen = data.visibility === "maximized";
        lcLog("visibility_changed ->", data.visibility);
        if (chatOpen) {
          pushGuardWithRetry("maximized");
        }
      }) as (data: never) => void);

      widget.on("new_event", ((event: LiveChatEventData) => {
        const isMessage =
          event.type === "message" || event.event_type === "message";
        const isAgent = event.author?.type === "agent";
        if (!isMessage || !isAgent) return;

        lcLog("agent message, chatOpen =", chatOpen);
        if (!chatOpen) {
          widget.call("maximize");
        }
        pushGuardWithRetry("agent-reply");
      }) as (data: never) => void);
    };

    if (window.LiveChatWidget) {
      bindHandlers(window.LiveChatWidget);
    } else {
      timer = setInterval(() => {
        if (window.LiveChatWidget) {
          if (timer) clearInterval(timer);
          timer = null;
          bindHandlers(window.LiveChatWidget);
          return;
        }

        tries += 1;
        if (tries > 100) {
          if (timer) clearInterval(timer);
          timer = null;
          lcLog("LiveChatWidget kabhi load nahi hua");
        }
      }, 200);
    }

    return () => {
      window.removeEventListener("popstate", onPopState);
      if (timer) clearInterval(timer);
    };
  }, []);

  return null;
}
