import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TextUsButton from "@/components/TextUsButton";
import ChatWidget from "@/components/ChatWidget";
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
  title: {
    default: "Cottage Creators — Muskoka Luxury Escape",
    template: "%s — Cottage Creators",
  },
  description:
    "Luxury cottage rentals on Three Mile Lake in Muskoka, Ontario. Book The Water's Edge treehouse, Muskoka Cabana, or The Nest for your perfect getaway.",
  metadataBase: new URL("https://cottagecreators.ca"),
  openGraph: {
    siteName: "Cottage Creators",
    locale: "en_CA",
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
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <TextUsButton />
        <ChatWidget />
      </body>
    </html>
  );
}
