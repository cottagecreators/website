import type { Metadata } from "next";
import PropertyPage from "@/components/PropertyPage";
import { properties } from "@/data/properties";

const property = properties.find((p) => p.slug === "muskokacabana")!;

export const metadata: Metadata = {
  title: property.name,
  description: property.description,
};

export default function MuskokaCabana() {
  return <PropertyPage property={property} />;
}
