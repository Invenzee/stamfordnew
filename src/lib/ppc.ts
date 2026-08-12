const STORAGE_KEY = "stamford_ppc_lead_data";

const PPC_PARAM_KEYS = [
  "gclid",
  "gbraid",
  "wbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "campaignid",
  "adgroupid",
  "keyword",
  "matchtype",
  "device",
  "network",
] as const;

export type PpcLeadData = Record<string, string>;

function readStored(): PpcLeadData {
  if (typeof window === "undefined") return {};

  try {
    const session = window.sessionStorage.getItem(STORAGE_KEY);
    if (session) return JSON.parse(session) as PpcLeadData;
    const local = window.localStorage.getItem(STORAGE_KEY);
    if (local) return JSON.parse(local) as PpcLeadData;
  } catch {
    // ignore storage errors
  }

  return {};
}

function writeStored(data: PpcLeadData) {
  try {
    const value = JSON.stringify(data);
    window.sessionStorage.setItem(STORAGE_KEY, value);
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // ignore storage errors
  }
}

export function capturePpcParams() {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const stored = readStored();
  const next: PpcLeadData = { ...stored };
  let changed = false;

  for (const key of PPC_PARAM_KEYS) {
    const value = params.get(key)?.trim();
    if (value) {
      next[key] = value;
      changed = true;
    }
  }

  if (!next.landing_page) {
    next.landing_page = window.location.href;
    changed = true;
  }

  if (!next.referrer && document.referrer) {
    next.referrer = document.referrer;
    changed = true;
  }

  if (changed) {
    writeStored(next);
  }
}

export function getPpcLeadData(): PpcLeadData {
  const stored = readStored();
  const currentPage = typeof window !== "undefined" ? window.location.href : "";

  return {
    ...stored,
    ...(currentPage ? { current_page: currentPage } : {}),
  };
}
