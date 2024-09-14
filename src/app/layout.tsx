import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "🧑‍💻 Kai Waløen",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* <Navigation /> */}
        {children}
      </body>
    </html>
  );
}
