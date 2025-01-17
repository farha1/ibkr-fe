import type { Metadata } from "next";
import { Geist, Geist_Mono, Noticia_Text } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const noticiaText = Noticia_Text({
  variable: "--font-noticia-text",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "DGXP News",
  description: "DGXP News: For busy people who want to stay informed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${noticiaText.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
