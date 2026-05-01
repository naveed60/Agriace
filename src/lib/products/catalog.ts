export type ProductCatalogItem = {
  slug: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  image?: string;
  featured?: boolean;
  color?: "lime" | "yellow" | "green";
};

export const productCatalog: ProductCatalogItem[] = [
  {
    slug: "crownhuma-potassium-humate",
    name: "CrownHuma Potassium Humate",
    price: "PKR 399",
    description:
      "Organic soil conditioner and plant growth promoter built for stronger root systems and improved soil performance.",
    features: ["Increases root growth", "Improves soil fertility", "Eco-friendly and organic"],
    image: "/product-packaging.jpeg",
    featured: true,
  },
  {
    slug: "npk-20-20-20",
    name: "NPK 20-20-20",
    price: "PKR 449",
    description: "Balanced NPK formula for all-purpose plant nutrition across broad crop programs.",
    features: ["Balanced nutrients", "Fast absorption", "Suitable for all crops"],
    image: "/product-npk-20-20-20.svg",
  },
  {
    slug: "liquid-nutrients",
    name: "Liquid Nutrients",
    price: "PKR 349",
    description: "Quick-absorbing liquid fertilizer for rapid growth and visible in-season response.",
    features: ["Instant results", "Easy application", "Concentrated formula"],
    image: "/product-liquid-nutrients.svg",
  },
  {
    slug: "organic-compost",
    name: "Organic Compost",
    price: "PKR 299",
    description: "100% natural compost for enriching soil with organic matter and improving structure.",
    features: ["Rich in nutrients", "Improves soil structure", "Eco-friendly"],
    image: "/product-organic-compost.svg",
  },
  {
    slug: "micronutrient-mix",
    name: "Micronutrient Mix",
    price: "PKR 499",
    description: "Essential trace elements for plant health, cleaner growth, and deficiency prevention.",
    features: ["Complete micronutrients", "Prevents deficiencies", "Premium quality"],
    image: "/product-micronutrient-mix.svg",
  },
  {
    slug: "slow-release-granules",
    name: "Slow Release Granules",
    price: "PKR 549",
    description: "Time-release formula for sustained nutrition and fewer repeat applications.",
    features: ["3-month release", "Reduces application frequency", "Weather resistant"],
    image: "/product-slow-release-granules.svg",
  },
];

const productCatalogBySlug = new Map(productCatalog.map((product) => [product.slug, product]));

export function getProductBySlug(slug: string): ProductCatalogItem | undefined {
  return productCatalogBySlug.get(slug);
}
