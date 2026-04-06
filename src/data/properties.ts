export interface Property {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  images: string[];
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
      "A one-of-a-kind treehouse experience nestled in the trees on the shores of Three Mile Lake. Designed in 2018, The Water's Edge offers a luxury escape unlike anything else in Muskoka.",
    features: [
      "Unique treehouse design",
      "Lakefront on Three Mile Lake",
      "Sandy beach access",
      "Dock with sunset views",
      "Wi-Fi included",
    ],
    images: ["/images/hero-1.jpeg", "/images/hero-2.jpeg"],
    hospitable: "https://cottagecreators.hospitable.rentals",
    airbnb: "https://www.airbnb.ca/rooms/52571598",
    airbnbId: "52571598",
  },
  {
    slug: "muskokacabana",
    name: "Muskoka Cabana",
    tagline: "Cute & Cozy Cottage Getaway",
    description:
      "We're adding to our amazing cottage family with the property next door! Next to the Water's Edge there are two cute cabins which we're excited to share. These cottages are cute and cozy and are ready to enjoy, however we're looking forward to building them up to have their own unique and fun personalities.",
    features: [
      "2 bedrooms",
      "3 beds",
      "1 bath",
      "Next door to The Water's Edge",
      "Wi-Fi included",
    ],
    images: ["/images/cabana-hero.jpeg", "/images/hero-3.jpeg"],
    hospitable:
      "https://cottagecreators.hospitable.rentals/property/muskokacabana",
    airbnb: "https://www.airbnb.com/rooms/618880326561734158",
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
      "Book together with Muskoka Cabana for group trips",
    ],
    images: ["/images/hero-4.jpeg", "/images/hero-5.jpeg"],
    hospitable: "https://cottagecreators.hospitable.rentals",
    airbnb: "https://www.airbnb.ca/rooms/thenest",
    airbnbId: "thenest",
  },
];

export const siteConfig = {
  name: "Cottage Creators",
  tagline: "Muskoka luxury escape",
  address: "1093 Sutton Rd, Utterson, ON P0B 1M0",
  email: "info@cottagecreators.ca",
  phone: "647-989-4717",
  instagram: "https://www.instagram.com/cottagecreators",
  facebook: "https://www.facebook.com/thewatersedgecottage/",
  hospitable: "https://cottagecreators.hospitable.rentals",
};
