import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";

const sfPro = localFont({
  src: [
    {
      path: "../fonts/sf-pro-400.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-sf-pro",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "TLD",
  description: "THE LAND DEVELOPERS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sfPro.variable} font-sf antialiased`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
