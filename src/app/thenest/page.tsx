import type { Metadata } from "next";
import PropertyPage from "@/components/PropertyPage";
import { properties } from "@/data/properties";

const property = properties.find((p) => p.slug === "thenest")!;

export const metadata: Metadata = {
  title: property.name,
  description: property.description,
};

export default function TheNest() {
  return <PropertyPage property={property} />;
}
