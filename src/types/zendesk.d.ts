export {};

type ZeApi = (...args: unknown[]) => void;

declare global {
  interface Window {
    zE?: ZeApi;
  }
}
