/**
 * Canva welcome books, one per cottage. Embedded on /welcomebook (all three,
 * tabbed) and on /welcomebook/<slug> (a single shareable page per cottage —
 * these are the links shared directly with guests).
 * Slugs match the property slugs in {@link properties}.
 */
export interface WelcomeBook {
  slug: string;
  name: string;
  canvaId: string;
}

export const welcomeBooks: WelcomeBook[] = [
  { slug: "thewatersedge", name: "The Water's Edge", canvaId: "DAE8poJ7Eq0" },
  { slug: "muskokacabana", name: "Muskoka Cabana", canvaId: "DAFtr1UUqYU" },
  { slug: "thenest", name: "The Nest", canvaId: "DAF1BExCUhQ" },
];
