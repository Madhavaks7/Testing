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

import { ClientProviders } from "./ClientProviders";

export const metadata = {
  title: "Techfusion | Stationery E-commerce",
  description: "Premium stationery products for all your needs.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-50 dark:bg-zinc-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
