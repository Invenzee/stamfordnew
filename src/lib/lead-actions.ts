export const OPEN_QUOTE_POPUP_EVENT = "open-quote-popup";

export function openQuotePopup() {
  window.dispatchEvent(new Event(OPEN_QUOTE_POPUP_EVENT));
}

export function openLiveChat() {
  const open = () => {
    window.zE?.("webWidget", "show");
    window.zE?.("webWidget", "open");
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
