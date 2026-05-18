import type { Metadata } from "next";
import { Noto_Sans, Noto_Sans_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const playfairDisplayHeading = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-heading",
});

const notoSans = Noto_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
});

const notoSansMono = Noto_Sans_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "OtoMarketer",
  description: "Yapay zeka destekli urun analiz ve pazarlama motoru",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={cn(
        "h-full",
        "antialiased",
        "font-sans",
        notoSans.variable,
        notoSansMono.variable,
        playfairDisplayHeading.variable
      )}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
