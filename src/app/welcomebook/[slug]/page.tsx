import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import WelcomeBookViewer from "@/components/WelcomeBookViewer";
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

export default async function WelcomeBookForCottage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const book = welcomeBooks.find((b) => b.slug === slug);
  if (!book) notFound();

  const others = welcomeBooks.filter((b) => b.slug !== slug);

  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="container-edge max-w-3xl">
        <p className="eyebrow">Welcome to {book.name}</p>
        <h1
          className="mt-3 font-display text-[clamp(34px,5vw,46px)] leading-[1.04] text-pine"
          style={{ fontWeight: 500 }}
        >
          Your Welcome Book
        </h1>
        <p className="mt-4 max-w-[58ch] text-[16.5px] leading-relaxed text-muted">
          Everything you need for a smooth, restful stay at {book.name} —
          directions, the lay of the land, house notes, and our favourite things
          to do on Three Mile Lake.
        </p>

        <WelcomeBookViewer books={[book]} />

        <div className="mt-12 border-t border-edge pt-6">
          <p className="eyebrow">Other cottages</p>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            {others.map((b) => (
              <li key={b.slug}>
                <Link
                  href={`/welcomebook/${b.slug}`}
                  className="text-[14px] font-semibold text-clay transition-transform hover:translate-x-0.5"
                >
                  {b.name} &rarr;
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/welcomebook"
                className="text-[14px] text-muted underline decoration-edge underline-offset-2 transition-colors hover:text-clay"
              >
                All welcome books
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
