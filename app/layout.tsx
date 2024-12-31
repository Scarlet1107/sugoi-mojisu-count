import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "すごい文字数カウント",
  description:
    "リアルタイム文字数カウントとAIアドバイスで文章を改善し、作業効率を大幅に向上できる便利なアプリ。無料で高性能なAIが使える！大学レポートやブログ執筆、X(Twitter)での投稿に",
  openGraph: {
    title: "すごい文字数カウント",
    description:
      "リアルタイム文字数カウントとAIアドバイスで文章を改善し、作業効率を大幅に向上できる便利なアプリ。無料で高性能なAIが使える！大学レポートやブログ執筆、X(Twitter)での投稿に",
    images: [
      {
        url: "/icon.png",
        width: 100,
        height: 100,
        alt: "Icon",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
