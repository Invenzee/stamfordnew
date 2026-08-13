/** Routes that use standalone landing-page chrome (no global header/footer). */
export const STANDALONE_LP_PREFIXES = [
  "/Kids/lp",
  "/Editing/lp",
  "/Publishing/lp",
  "/Ghostwriting/lp",
  "/Marketing/lp",
];

export function isStandaloneLpPath(pathname: string | null): boolean {
  const path = pathname?.toLowerCase();
  return STANDALONE_LP_PREFIXES.some((prefix) =>
    path?.startsWith(prefix.toLowerCase()),
  );
}
