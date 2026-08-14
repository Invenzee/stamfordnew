"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { openLiveChat, openQuotePopup } from "@/lib/lead-actions";

type CtaButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function QuoteButton({
  children,
  className,
  onClick,
  type = "button",
  ...props
}: CtaButtonProps) {
  return (
    <button
      type={type}
      className={className}
      onClick={(event) => {
        onClick?.(event);
        openQuotePopup();
      }}
      {...props}
    >
      {children}
    </button>
  );
}

export function ChatButton({
  children,
  className,
  onClick,
  type = "button",
  ...props
}: CtaButtonProps) {
  return (
    <button
      type={type}
      className={className}
      onClick={(event) => {
        onClick?.(event);
        openLiveChat();
      }}
      {...props}
    >
      {children}
    </button>
  );
}
