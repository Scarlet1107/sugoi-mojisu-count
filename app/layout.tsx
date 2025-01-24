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
  metadataBase: new URL("https://scarlet7.net"),
  title: "Scarlet",
  description:
    "WebエンジニアのScarletです。開発したアプリをまとめています。ご自由にお使いください。お仕事の依頼はこちらからscarlet7.second@gmail.com",
  icons: {
    icon: "https://scarlet7.net/icon.png",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://scarlet7.net",
    title: "Scarlet",
    description:
      "WebエンジニアのScarletです。開発したアプリをまとめています。ご自由にお使いください。今まで作成したアプリ一覧、「すごい文字数カウント」「タイヤ見積もりアプリ」など。お仕事の依頼はこちらからscarlet7.second@gmail.com",
    images: [
      {
        url: "https://scarlet7.net/icon.png",
        width: 800,
        height: 600,
        alt: "Scarlet",
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
