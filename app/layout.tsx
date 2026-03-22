import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Press_Start_2P } from "next/font/google";

const press = Press_Start_2P({ subsets: ['latin'],
  variable: '--font-press',
  weight: '400'
 });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Static Code Analyzer",
  description: "A static code analysis tool that scans source code for security vulnerabilities without executing it, mapped to the OWASP Top 10 2025.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={press.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${press.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
