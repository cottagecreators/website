import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WelcomeBookForCottage from "@/components/WelcomeBookForCottage";
import { welcomeBooks } from "@/data/welcomeBooks";

type Params = Promise<{ slug: string }>;

// Pre-render one shareable page per cottage for the static export.
export function generateStaticParams() {
  return welcomeBooks.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = welcomeBooks.find((b) => b.slug === slug);
  if (!book) return { title: "Welcome Book" };
  return {
    title: `${book.name} — Welcome Book`,
    description: `Your welcome book for ${book.name}: directions, house notes, and everything you need for your stay on Three Mile Lake.`,
  };
}

export default async function WelcomeBookForCottagePage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const book = welcomeBooks.find((b) => b.slug === slug);
  if (!book) notFound();

  return <WelcomeBookForCottage book={book} />;
}
