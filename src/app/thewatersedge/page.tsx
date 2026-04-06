import type { Metadata } from "next";
import PropertyPage from "@/components/PropertyPage";
import { properties } from "@/data/properties";

const property = properties.find((p) => p.slug === "thewatersedge")!;

export const metadata: Metadata = {
  title: property.name,
  description: property.description,
};

export default function TheWatersEdge() {
  return <PropertyPage property={property} />;
}
