export default function ChristianLpLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="lp-standalone min-h-screen">{children}</div>;
}
