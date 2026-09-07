import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { BASE_PATH } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "z3rno — an embeddable memory engine for AI agents",
  description:
    "z3rno is an open-source memory engine for AI agents: a Rust core with native Python and TypeScript bindings, embeddable by default, auditable by design. Pre-launch, building in the open.",
  icons: {
    icon: `${BASE_PATH}/brand/z3rno-icon-dark.svg`,
  },
  openGraph: {
    title: "z3rno — an embeddable memory engine for AI agents",
    description:
      "A Rust core with native Python and TypeScript bindings. Embeddable by default. Auditable by design. Pre-launch and open source.",
    url: "https://the-ai-project-co.github.io/z3rno-website/",
    siteName: "z3rno",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
