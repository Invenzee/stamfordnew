/** Routes that use standalone landing-page chrome (no global header/footer). */
export const STANDALONE_LP_PREFIXES = [
  "/book-marketing-lp",
  "/childrens-book-publishing-lp",
  "/editing-proofreading-lp",
  "/ghostwriting-services-lp",
  "/lp-book-publishing-services",
];

export function isStandaloneLpPath(pathname: string | null): boolean {
  return STANDALONE_LP_PREFIXES.some((prefix) => pathname?.startsWith(prefix));
}
