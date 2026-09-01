export const OPEN_QUOTE_POPUP_EVENT = "open-quote-popup";
export const OPEN_ZENDESK_EVENT = "open-zendesk-chat";

export function openQuotePopup() {
  window.dispatchEvent(new Event(OPEN_QUOTE_POPUP_EVENT));
}

export function openLiveChat() {
  const open = () => {
    window.dispatchEvent(new Event(OPEN_ZENDESK_EVENT));
    try {
      window.zE?.("messenger", "open");
    } catch {
      // ignore
    }
    try {
      window.zE?.("webWidget", "show");
      window.zE?.("webWidget", "open");
    } catch {
      // ignore
    }
  };

  if (typeof window.zE === "function") {
    open();
    return;
  }

  let tries = 0;
  const timer = window.setInterval(() => {
    if (typeof window.zE === "function") {
      window.clearInterval(timer);
      open();
    } else if (++tries > 50) {
      window.clearInterval(timer);
    }
  }, 200);
}
