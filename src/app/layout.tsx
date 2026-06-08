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
  title: "Valeron | Victor Manuel Valerio",
  description:
    "Software Engineer & Full Stack Web Developer. Built to Conquer Tomorrow.",
  openGraph: {
    title: "Valeron | Portafolio Profesional",
    description:
      "Diseño y construyo soluciones integrales, desde aplicaciones de escritorio robustas hasta experiencias web inmersivas.",
    url: "https://valeron-portfolio.pages.dev",
    siteName: "Valeron",
    locale: "es_DO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
