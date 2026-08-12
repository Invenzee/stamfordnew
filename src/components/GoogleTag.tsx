export default function GoogleTag({
  fireLeadConversion = false,
}: {
  fireLeadConversion?: boolean;
}) {
  return (
    <>
      <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18251893341" />
      <script
        async
        dangerouslySetInnerHTML={{
          __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-18251893341');
`,
        }}
      />
      {fireLeadConversion ? (
        <script
          async
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
      ) : null}
      <script
        async
        dangerouslySetInnerHTML={{
          __html: `
  gtag('config', 'AW-18251893341/FFlUCJie1dMcEN2Ul_9D', {
    'phone_conversion_number': '(562) 573-2551'
  });
`,
        }}
      />
      <script
        async
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
