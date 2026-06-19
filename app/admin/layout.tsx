import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - JAYTIMMAID",
  description: "Admin dashboard for managing orders",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
