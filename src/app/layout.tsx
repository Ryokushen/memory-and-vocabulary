import type { Metadata } from "next";
import { Geist, Geist_Mono, Uncial_Antiqua } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const uncialAntiqua = Uncial_Antiqua({
  variable: "--font-lexforge",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lexforge",
  description: "Forge your vocabulary. Gamified RPG trainer powered by spaced repetition.",
  applicationName: "Lexforge",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Lexforge",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${uncialAntiqua.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
