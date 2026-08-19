import Script from "next/script";
import ZendeskBehavior from "@/components/ZendeskBehavior";

const ZENDESK_SNIPPET_SRC =
  "https://static.zdassets.com/ekr/snippet.js?key=64721aa5-1553-4f2f-af2a-2b7d803b47b0";

/** Kept for later — currently unused; LiveChat is active in layout. */
export default function ZendeskWidget() {
  return (
    <>
      {/* Start of website1-breakingbarriers Zendesk Widget script */}
      <Script id="ze-snippet" src={ZENDESK_SNIPPET_SRC} strategy="afterInteractive" />
      {/* End of website1-breakingbarriers Zendesk Widget script */}
      <ZendeskBehavior />
    </>
  );
}
