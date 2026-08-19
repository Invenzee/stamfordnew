import Script from "next/script";
import ZendeskBehavior from "@/components/ZendeskBehavior";

const ZENDESK_SNIPPET_SRC =
  "https://static.zdassets.com/ekr/snippet.js?key=207e8ff0-acd1-4df0-a4be-a37ac05eb18f";

export default function ZendeskWidget() {
  return (
    <>
      {/* Start of brandwebsite-d Zendesk Widget script */}
      <Script id="ze-snippet" src={ZENDESK_SNIPPET_SRC} strategy="afterInteractive" />
      {/* End of brandwebsite-d Zendesk Widget script */}
      <ZendeskBehavior />
    </>
  );
}
