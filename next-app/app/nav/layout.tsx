import "../globals.css";
import NavBar from "@/components/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
