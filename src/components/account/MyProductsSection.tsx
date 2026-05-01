"use client";

import Link from "next/link";
import Image from "next/image";
import { useReducer, useState } from "react";

import { getProductBySlug } from "@/lib/products/catalog";
import { removeStoredProductSlug, readStoredProductSlugs } from "@/lib/account/client-storage";

export default function MyProductsSection({
  userId,
}: {
  userId: string;
}) {
  const [removingSlug, setRemovingSlug] = useState<string | null>(null);
  const [, refreshItems] = useReducer((value: number) => value + 1, 0);
  const items = readStoredProductSlugs(userId)
    .map((slug) => getProductBySlug(slug))
    .filter((product): product is NonNullable<ReturnType<typeof getProductBySlug>> => Boolean(product));

  const removeProduct = async (productSlug: string) => {
    setRemovingSlug(productSlug);

    try {
      removeStoredProductSlug(userId, productSlug);
      refreshItems();
    } finally {
      setRemovingSlug(null);
    }
  };

  if (!items.length) {
    return (
      <div className="flex h-full min-h-[24rem] flex-col items-center justify-center rounded-[2rem] border border-dashed border-[#d8d0bc] bg-[rgba(255,252,245,0.82)] p-8 text-center shadow-[0_12px_30px_rgba(66,52,23,0.06)]">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8b7d67]">
          My Products
        </p>
        <h3 className="mt-4 text-2xl font-semibold text-[#243821]">
          No products added yet
        </h3>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#655f51]">
          Start building your personal product shortlist. Added products will appear
          here for faster access from your account dashboard.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex rounded-full bg-[linear-gradient(135deg,#2f5d31_0%,#7e8d2f_100%)] px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
        >
          Purchase Products
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {items.map((product) => (
        <div
          key={product.slug}
          className="rounded-[1.7rem] border border-white/70 bg-white/88 p-5 shadow-[0_20px_50px_rgba(66,52,23,0.08)]"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 overflow-hidden rounded-[1.25rem] border border-[#e7ddc9] bg-[#f7f2e6]">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-2"
                  />
                ) : null}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#243821]">{product.name}</h3>
                <p className="mt-1 text-sm font-medium text-[#2f5d31]">{product.price}</p>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#655f51]">
                  {product.description}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/products"
                className="rounded-full border border-[#d8d0bc] px-5 py-3 text-center text-sm font-semibold text-[#2f5d31] transition-colors hover:bg-[#f6f2e8]"
              >
                View Product Catalog
              </Link>
              <button
                type="button"
                onClick={() => removeProduct(product.slug)}
                disabled={removingSlug === product.slug}
                className={`rounded-full bg-[#23371f] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1a2a17] ${
                  removingSlug === product.slug ? "cursor-not-allowed opacity-70" : ""
                }`}
              >
                {removingSlug === product.slug ? "Removing..." : "Remove"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
