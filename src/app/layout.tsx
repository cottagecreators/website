import type { Metadata } from "next";
import { Cormorant_Garamond, Hanken_Grotesk } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TextUsButton from "@/components/TextUsButton";
import ChatWidget from "@/components/ChatWidget";
import "./globals.css";

// Display & headings
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

// UI & body
const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
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
      className={`${cormorant.variable} ${hanken.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <TextUsButton />
        <ChatWidget />
      </body>
    </html>
  );
}
