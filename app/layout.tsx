import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import FontLoader from "../components/FontLoader";
import WhatsAppWidget from "../components/WhatsAppWidget";

export const metadata: Metadata = {
  title: "Best Fake ID Maker | Premium Scannable Fake IDs | JAYTIMMAID",
  description:
    "Best Fake ID Maker offering premium scannable fake IDs with holograms, UV features, and fast worldwide delivery.",
  icons: {
    icon: "/images/icon.png",
    shortcut: "/images/icon.png",
    apple: "/images/icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <FontLoader />
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
        <WhatsAppWidget />
        {children}
      </body>
    </html>
  );
}
