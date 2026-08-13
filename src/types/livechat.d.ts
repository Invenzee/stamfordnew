export {};

type LiveChatVisibility = "maximized" | "minimized" | "hidden";

type LiveChatWidgetApi = {
  on: (event: string, callback: (data: never) => void) => void;
  call: (method: string, ...args: unknown[]) => void;
};

declare global {
  interface Window {
    __lc?: {
      license: number;
      integration_name?: string;
      product_name?: string;
      asyncInit?: boolean;
    };
    LiveChatWidget?: LiveChatWidgetApi;
  }
}
