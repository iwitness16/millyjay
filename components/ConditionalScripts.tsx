'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';

export default function ConditionalScripts() {
  const pathname = usePathname();

  // Don't load any third-party scripts on the shutdown page
  if (pathname === '/shutdown') return null;

  return (
    <Script id="smartsupp-chat" strategy="afterInteractive">
      {`
        var _smartsupp = _smartsupp || {};
        _smartsupp.key = '43c53eb0bbdfabc8ad91475bb435c62de7e57805';
        _smartsupp.orientation = "right";
        window.smartsupp||(function(d) {
          var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
          s=d.getElementsByTagName('script')[0];c=d.createElement('script');
          c.type='text/javascript';c.charset='utf-8';c.async=true;
          c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
        })(document);
      `}
    </Script>
  );
}
