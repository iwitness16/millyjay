// Standalone layout — intentionally does NOT extend the root layout.
// This prevents the WhatsApp widget, live chat scripts, and any other
// site components from appearing on the seizure notice page.
export default function ShutdownLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
