import type { Metadata, Viewport } from "next";
import "./globals.css";
import FontLoader from "../components/FontLoader";
import WhatsAppWidget from "../components/WhatsAppWidget";
import ConditionalScripts from "../components/ConditionalScripts";

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
  viewportFit: "cover",
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
        <ConditionalScripts />
        <WhatsAppWidget />
        {children}
      </body>
    </html>
  );
}
