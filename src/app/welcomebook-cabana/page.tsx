import type { Metadata } from "next";
import WelcomeBookForCottage from "@/components/WelcomeBookForCottage";
import { welcomeBooks } from "@/data/welcomeBooks";

// Flat, shareable per-cottage welcome-book URL (kept alongside the general
// /welcomebook used elsewhere).
const book = welcomeBooks.find((b) => b.slug === "muskokacabana")!;

export const metadata: Metadata = {
  title: `${book.name} — Welcome Book`,
  description: `Your welcome book for ${book.name}: directions, house notes, and everything you need for your stay on Three Mile Lake.`,
};

export default function Page() {
  return <WelcomeBookForCottage book={book} />;
}
