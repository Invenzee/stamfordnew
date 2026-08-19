export const OPEN_QUOTE_POPUP_EVENT = "open-quote-popup";

export function openQuotePopup() {
  window.dispatchEvent(new Event(OPEN_QUOTE_POPUP_EVENT));
}

export function openLiveChat() {
  const maximize = () => {
    window.LiveChatWidget?.call("maximize");
  };

  if (window.LiveChatWidget) {
    maximize();
    return;
  }

  let tries = 0;
  const timer = window.setInterval(() => {
    if (window.LiveChatWidget) {
      window.clearInterval(timer);
      maximize();
    } else if (++tries > 50) {
      window.clearInterval(timer);
    }
  }, 200);
}
