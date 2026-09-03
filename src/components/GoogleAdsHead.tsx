type GoogleAdsHeadProps = {
  includeLeadConversion?: boolean;
};

export default function GoogleAdsHead({
  includeLeadConversion = false,
}: GoogleAdsHeadProps) {
  return (
    <>
      {/* Google tag (gtag.js) */}
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=AW-18251893341"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-18251893341');
`,
        }}
      />
      {includeLeadConversion ? (
        <>
          {/* Event snippet for Submit lead form (1) conversion page */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
  gtag('event', 'conversion', {
      'send_to': 'AW-18251893341/TUvJCI-tv9McEN2Ul_9D',
      'value': 1.0,
      'currency': 'USD'
  });
`,
            }}
          />
        </>
      ) : null}
      <script
        dangerouslySetInnerHTML={{
          __html: `
  gtag('config', 'AW-18251893341/FFlUCJie1dMcEN2Ul_9D', {
    'phone_conversion_number': '(562) 573-2551'
  });
`,
        }}
      />
      {/* Event snippet for Click to call conversion page
In your html page, add the snippet and call gtag_report_conversion when someone clicks on the chosen link or button. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
function gtag_report_conversion(url) {
  var callback = function () {
    if (typeof(url) != 'undefined') {
      window.location = url;
    }
  };
  gtag('event', 'conversion', {
      'send_to': 'AW-18251893341/DpucCImPv9McEN2Ul_9D',
      'value': 1.0,
      'currency': 'USD',
      'event_callback': callback
  });
  return false;
}
`,
        }}
      />
    </>
  );
}
