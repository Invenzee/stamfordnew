export default function CookbookLpLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="lp-standalone min-h-screen">{children}</div>;
}
