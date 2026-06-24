export interface FeatureMention {
  /** Publication / account name, e.g. "Narcity". */
  source: string;
  /** Playful one-liner describing the mention. */
  blurb: string;
  url: string;
  /** Decorative emoji shown on the card. */
  emoji: string;
  /** "Read" for articles, "Watch" for video. */
  kind: "Read" | "Watch";
}

export interface Property {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  /** Press / social mentions, rendered as a "Featured In" section. */
  featured?: FeatureMention[];
  /** Public Instagram post/reel permalinks, rendered as official embeds. */
  instagramPosts?: string[];
  /** Guest capacity, shown as a badge with a person icon. */
  sleeps: number;
  bedrooms: number;
  beds: number;
  baths: number;
  /** Hero/banner image (Hospitable CDN url). */
  heroImage: string;
  /**
   * Indicative off-season "from" nightly rate in CAD, shown on the booking
   * card. Sourced from the Hospitable calendar lows — adjust as pricing
   * changes (it's a marketing "from", not a live quote).
   */
  priceFrom: number;
  hospitable: string;
  airbnb: string;
  airbnbId: string;
}

export const properties: Property[] = [
  {
    slug: "thewatersedge",
    name: "The Water's Edge",
    tagline: "Unique Muskoka Treehouse",
    description:
      "A one-of-a-kind treehouse experience nestled in the trees on the shores of Three Mile Lake. Designed in 2018, The Water's Edge offers a luxury escape unlike anything else in Muskoka — a private dock for swimming and paddling, a two-sided indoor/outdoor fireplace, and a floating hammock net suspended over the forest floor.",
    features: [
      "Unique treehouse design",
      "Lakefront on Three Mile Lake",
      "Sandy beach access",
      "Two-sided indoor/outdoor fireplace",
      "Floating hammock net",
      "Private dock with sunset views",
      "Wi-Fi included",
    ],
    featured: [
      {
        source: "Narcity",
        blurb:
          "“Ontario's ‘Treehouse' Airbnb Lets You Float In A Giant Hammock With Endless Lake Views.”",
        url: "https://www.narcity.com/ontarios-treehouse-airbnb-lets-you-float-in-a-giant-hammock-with-endless-lake-views",
        emoji: "🪢",
        kind: "Read",
      },
      {
        source: "Holidays.com",
        blurb:
          "Ranked #8 in “11 Best Treehouse Airbnbs in Ontario” — “one of the most sublime treehouse Airbnbs in Ontario.”",
        url: "https://www.holidays.com/best-treehouse-airbnbs-in-ontario-canada/",
        emoji: "🌳",
        kind: "Read",
      },
      {
        source: "Best Airbnb Canada",
        blurb: "Hand-picked as one of Canada's standout treehouse stays.",
        url: "https://www.bestairbnb.ca/properties/waters-edge-treehouse",
        emoji: "🍁",
        kind: "Read",
      },
      {
        source: "@ontarioairbnbs",
        blurb:
          "“This magical treehouse on the water is the perfect spring getaway.”",
        url: "https://www.tiktok.com/@ontarioairbnbs/video/7495723145224015109",
        emoji: "📱",
        kind: "Watch",
      },
      {
        source: "@wellnesstravelled",
        blurb:
          "Spotlighted for its wood-barrel sauna and snowy-night, twinkle-light magic.",
        url: "https://www.tiktok.com/@wellnesstravelled/video/7171945768436239622",
        emoji: "🛁",
        kind: "Watch",
      },
    ],
    sleeps: 8,
    bedrooms: 4,
    beds: 6,
    baths: 1,
    heroImage:
      "https://assets.hospitable.com/property_images/1879234/z2RtqHvMA6JOJlbzj6eKeuUI2NpZNOUPfPZElbl2.jpg",
    priceFrom: 695,
    instagramPosts: [
      "https://www.instagram.com/cottagecreators/reel/DFczTHzJmdt/",
      "https://www.instagram.com/cottagecreators/reel/CYbelJep_rs/",
      "https://www.instagram.com/cottagecreators/p/C6Tq0GMguKR/",
    ],
    hospitable: "https://cottagecreators.hospitable.rentals",
    airbnb: "https://www.airbnb.com/h/thewatersedgemuskoka",
    airbnbId: "50249446",
  },
  {
    slug: "muskokacabana",
    name: "Muskoka Cabana",
    tagline: "Cute & Cozy Cottage Getaway",
    description:
      "Steps from a sandy beach on Three Mile Lake, this cute and cozy 1950s cottage was recently refreshed with a new kitchen, refinished pine floors, and a locally made timber queen bed. Inside, watch the water from the dining table or curl up on the leather couches. A comfy pull-out couch rounds out the sleeping space, so the Cabana sleeps up to 6. Book it together with The Nest next door for larger group getaways.",
    features: [
      "Steps to a sandy beach",
      "Pull-out couch — sleeps 6 total",
      "Updated kitchen with Nespresso",
      "Shared firepit & boat port",
      "Next door to The Nest",
      "Wi-Fi included",
    ],
    sleeps: 6,
    bedrooms: 2,
    beds: 3,
    baths: 1,
    heroImage:
      "https://assets.hospitable.com/property_images/1879238/A6PkuaxQCvi5RqOa2CFaVNGlXpippmybTXhDSMhM.jpg",
    priceFrom: 500,
    hospitable:
      "https://cottagecreators.hospitable.rentals/property/muskokacabana",
    airbnb: "https://www.airbnb.com/h/muskokacabana",
    airbnbId: "618880326561734158",
  },
  {
    slug: "thenest",
    name: "The Nest",
    tagline: "Lakefront Jewel in the Trees",
    description:
      "The Muskoka Nest is a jewel of a cottage perched up in the trees right on the edge of Three Mile Lake. With nearly floor-to-ceiling windows on three sides of the main living space, the name starts to make a lot of sense with the non-stop views framed by majestic trees. Steps to a sandy beach, beautiful sunsets from the dock, it doesn't get better than this.",
    features: [
      "Floor-to-ceiling windows",
      "Lakefront on Three Mile Lake",
      "Sandy beach access",
      "Stunning sunset views from the dock",
      "Water toys: canoe, kayak & SUP",
      "Book together with Muskoka Cabana for group trips",
    ],
    sleeps: 6,
    bedrooms: 3,
    beds: 3,
    baths: 1,
    heroImage:
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NjE4ODgyNzk3MjgzMTUyNzA2/original/5593bd09-33cd-461c-98ca-388b43aa264f.jpeg",
    priceFrom: 500,
    hospitable: "https://cottagecreators.hospitable.rentals",
    airbnb: "https://www.airbnb.com/h/muskokanest",
    airbnbId: "618882797283152706",
  },
];

export const siteConfig = {
  name: "Cottage Creators",
  tagline: "Muskoka luxury escape",
  address: "1093 Sutton Rd, Utterson, ON P0B 1M0",
  email: "info@cottagecreators.ca",
  instagram: "https://www.instagram.com/cottagecreators",
  facebook: "https://www.facebook.com/thewatersedgecottage/",
  hospitable: "https://cottagecreators.hospitable.rentals",
};
