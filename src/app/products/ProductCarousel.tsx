"use client";

import Image from "next/image";
import { startTransition, useState } from "react";

type Product = {
  name: string;
  price: string;
  description: string;
  features: string[];
  image?: string;
  featured?: boolean;
  color?: "lime" | "yellow" | "green";
};

const PAGE_SIZE = 3;

const productColorClasses: Record<NonNullable<Product["color"]>, string> = {
  lime: "bg-[#86d300]",
  yellow: "bg-[#f2b705]",
  green: "bg-[#08cf54]",
};

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "previous" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "previous" ? "Show previous products" : "Show next products"}
      className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#d9cfbb] bg-[linear-gradient(180deg,#fffdf8_0%,#f5ecdc_100%)] text-[#23371f] shadow-[0_10px_24px_rgba(91,74,38,0.10)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#cdbf9a] hover:shadow-[0_16px_28px_rgba(91,74,38,0.14)]"
    >
      <svg
        className={`h-5 w-5 ${direction === "next" ? "" : "rotate-180"}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div
      className={`flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-[#d8cfbb] bg-[#fffdfa] shadow-[0_18px_40px_rgba(91,74,38,0.12)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_52px_rgba(91,74,38,0.16)] ${
        product.featured ? "ring-2 ring-green-500" : ""
      }`}
    >
      {product.image ? (
        <div className="relative h-64 shrink-0 bg-[linear-gradient(180deg,#fffdfa_0%,#f3ebdc_100%)]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain p-6"
          />
          {product.featured && (
            <div className="absolute top-2 right-2 rounded-full bg-green-500 px-3 py-1 text-sm font-semibold text-white">
              Featured
            </div>
          )}
        </div>
      ) : (
        <div
          className={`flex h-64 shrink-0 items-center justify-center ${
            product.color ? productColorClasses[product.color] : "bg-[#86d300]"
          }`}
        >
          <svg className="h-24 w-24 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
      )}

      <div className="flex flex-1 flex-col bg-[linear-gradient(180deg,#f9f6ee_0%,#eef3e6_100%)] p-6">
        <h3 className="mb-2 text-2xl font-bold text-[#23371f]">{product.name}</h3>
        <p className="mb-4 text-3xl font-bold text-[#2f5d31]">{product.price}</p>
        <p className="mb-4 text-[#655f51]">{product.description}</p>

        <ul className="mb-6 space-y-2">
          {product.features.map((feature) => (
            <li key={feature} className="flex items-center text-[#655f51]">
              <svg
                className="mr-2 h-5 w-5 text-[#5f6f2c]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {feature}
            </li>
          ))}
        </ul>

        <button className="mt-auto w-full btn-primary" type="button">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

function PaginationDot({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={`h-3 rounded-full transition-all duration-300 ${
        active
          ? "w-10 bg-[linear-gradient(90deg,#2f5d31,#7e8d2f)] shadow-[0_8px_18px_rgba(47,93,49,0.24)]"
          : "w-3 bg-[#d8cfbc] hover:bg-[#bca77a]"
      }`}
    />
  );
}

export default function ProductCarousel({ products }: { products: Product[] }) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(products.length / PAGE_SIZE);
  const visibleProducts = products.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
  const goToPreviousPage = () =>
    startTransition(() => {
      setPage((currentPage) => (currentPage === 0 ? totalPages - 1 : currentPage - 1));
    });
  const goToNextPage = () =>
    startTransition(() => {
      setPage((currentPage) => (currentPage === totalPages - 1 ? 0 : currentPage + 1));
    });

  return (
    <section className="mt-4">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold tracking-[0.22em] text-[#8b6835] uppercase">
            Product Catalog
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-[#2c3f23]">
            Browse our featured fertilizer products
          </h2>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <ArrowButton
            direction="previous"
            onClick={goToPreviousPage}
          />
          <ArrowButton
            direction="next"
            onClick={goToNextPage}
          />
        </div>
      </div>

      <div className="relative lg:px-14">
        <div className="absolute top-1/2 left-0 z-10 hidden -translate-y-1/2 lg:block">
          <ArrowButton
            direction="previous"
            onClick={goToPreviousPage}
          />
        </div>

        <div className="absolute top-1/2 right-0 z-10 hidden -translate-y-1/2 lg:block">
          <ArrowButton
            direction="next"
            onClick={goToNextPage}
          />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {visibleProducts.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          {Array.from({ length: totalPages }, (_, pageIndex) => (
            <PaginationDot
              key={pageIndex}
              active={pageIndex === page}
              label={`Go to product page ${pageIndex + 1}`}
              onClick={() =>
                startTransition(() => {
                  setPage(pageIndex);
                })
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
