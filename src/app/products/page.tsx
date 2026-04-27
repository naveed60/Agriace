import Image from "next/image";
import ProductCarousel from "./ProductCarousel";

export default function Products() {
  const products = [
    {
      name: "CrownHuma Potassium Humate",
      price: "PKR 399",
      description: "Organic Soil Conditioner & Plant Growth Promoter - Eco-Friendly & Safe for Sustainable Agriculture",
      features: ["Increases Root Growth", "Improves Soil Fertility", "Eco-Friendly & Organic"],
      image: "/product-packaging.jpeg",
      featured: true,
    },
    {
      name: "NPK 20-20-20",
      price: "PKR 449",
      description: "Balanced NPK formula for all-purpose plant nutrition",
      features: ["Balanced nutrients", "Fast absorption", "Suitable for all crops"],
      image: "/product-npk-20-20-20.svg",
    },
    {
      name: "Liquid Nutrients",
      price: "PKR 349",
      description: "Quick-absorbing liquid fertilizer for rapid growth",
      features: ["Instant results", "Easy application", "Concentrated formula"],
      image: "/product-liquid-nutrients.svg",
    },
    {
      name: "Organic Compost",
      price: "PKR 299",
      description: "100% natural compost for enriching soil with organic matter",
      features: ["Rich in nutrients", "Improves soil structure", "Eco-friendly"],
      image: "/product-organic-compost.svg",
    },
    {
      name: "Micronutrient Mix",
      price: "PKR 499",
      description: "Essential trace elements for plant health",
      features: ["Complete micronutrients", "Prevents deficiencies", "Premium quality"],
      image: "/product-micronutrient-mix.svg",
    },
    {
      name: "Slow Release Granules",
      price: "PKR 549",
      description: "Time-release formula for sustained nutrition",
      features: ["3-month release", "Reduces application frequency", "Weather resistant"],
      image: "/product-slow-release-granules.svg",
    },
  ];

  return (
    <div className="relative overflow-hidden bg-[linear-gradient(180deg,#f6f0e4_0%,#eee5d4_46%,#e4eadc_100%)] py-20">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.34),transparent_34%),radial-gradient(circle_at_left_center,rgba(185,138,44,0.10),transparent_28%),radial-gradient(circle_at_right_18%,rgba(126,141,47,0.12),transparent_24%)]"
        aria-hidden="true"
      />
      <div className="relative container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="mb-4 text-5xl font-bold text-[#2c3f23]">
            Our Products
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-[#655f51]">
            Explore our comprehensive range of fertilizers and soil amendments
            designed for every agricultural need.
          </p>
        </div>

        {/* Brochure Section */}
        <div className="mx-auto mb-16 w-full max-w-[70rem] overflow-hidden rounded-[2rem] border border-[#ddd6c5] bg-[rgba(255,251,244,0.9)] shadow-[0_24px_60px_rgba(91,74,38,0.14)]">
          <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
            <div className="relative overflow-hidden bg-[linear-gradient(135deg,#213828_0%,#2d4a34_42%,#61612f_100%)] p-8 text-white lg:p-12">
              <div
                className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(217,188,108,0.16),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_36%)]"
                aria-hidden="true"
              />
              <div className="relative flex h-full flex-col justify-center">
                <h2 className="mb-4 text-3xl font-bold">
                  Download Our Product Brochure
                </h2>
                <p className="mb-6 text-lg text-[#eef2dd]">
                  Get detailed information about Crown Huma products, benefits, and application guidelines.
                </p>
                <ul className="mb-8 space-y-3">
                  <li className="flex items-center">
                    <svg className="mr-3 h-6 w-6 text-[#f0cf6a]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Complete product specifications
                  </li>
                  <li className="flex items-center">
                    <svg className="mr-3 h-6 w-6 text-[#f0cf6a]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Usage instructions & benefits
                  </li>
                  <li className="flex items-center">
                    <svg className="mr-3 h-6 w-6 text-[#f0cf6a]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Available in Urdu & English
                  </li>
                </ul>
                <a
                  href="/brochure-crown-huma.jpeg"
                  download="AgriAce-Crown-Huma-Brochure.jpeg"
                  className="inline-flex w-fit items-center justify-center gap-2 rounded-full border border-[#d5c694]/30 bg-[linear-gradient(135deg,#f4edda_0%,#e8dcc0_100%)] px-8 py-4 text-lg font-bold text-[#23371f] shadow-[0_14px_30px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d5c694]/55 hover:bg-[linear-gradient(135deg,#fbf6e8_0%,#ede1c7_100%)]"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Brochure
                </a>
              </div>
            </div>
            <div className="flex items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#fffdf8_0%,#f7efe0_100%)]">
              <Image
                src="/brochure-crown-huma.jpeg"
                alt="Crown Huma Product Brochure"
                width={500}
                height={700}
                sizes="(max-width: 1024px) 100vw, 35rem"
                className="block h-auto w-full max-w-[35rem]"
              />
            </div>
          </div>
        </div>

        <ProductCarousel products={products} />
      </div>
    </div>
  );
}
