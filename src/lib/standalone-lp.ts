/** Routes that use standalone landing-page chrome (no global header/footer). */
export const STANDALONE_LP_PREFIXES = [
  "/Kids/lp",
  "/Editing/lp",
  "/Publishing/lp",
  "/Ghostwriting/lp",
  "/Marketing/lp",
  "/Christian/lp",
];

export const LP_CALL_THEMES: Record<string, { bg: string; icon: string }> = {
  "/kids/lp": { bg: "#9C27B0", icon: "#ffffff" },
  "/editing/lp": { bg: "#61DCC6", icon: "#111111" },
  "/publishing/lp": { bg: "#F24506", icon: "#ffffff" },
  "/ghostwriting/lp": { bg: "#F24506", icon: "#ffffff" },
  "/marketing/lp": { bg: "#ffc800", icon: "#111111" },
  "/christian/lp": { bg: "#C29A45", icon: "#1a1200" },
};

export function isStandaloneLpPath(pathname: string | null): boolean {
  const path = pathname?.toLowerCase();
  return STANDALONE_LP_PREFIXES.some((prefix) =>
    path?.startsWith(prefix.toLowerCase()),
  );
}

export function getLpCallTheme(pathname: string | null): {
  bg: string;
  icon: string;
} {
  const path = pathname?.toLowerCase() ?? "";
  const match = Object.entries(LP_CALL_THEMES).find(([prefix]) =>
    path.startsWith(prefix),
  );
  return match?.[1] ?? { bg: "#111111", icon: "#ffffff" };
}
