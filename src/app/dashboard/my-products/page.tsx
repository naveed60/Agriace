import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/auth";
import MyProductsSection from "@/components/account/MyProductsSection";

export default async function DashboardMyProductsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/get-started");
  }

  return (
    <div className="flex h-full flex-col space-y-8">
      <div className="rounded-[2rem] border border-white/70 bg-[rgba(255,252,245,0.92)] p-8 shadow-[0_24px_70px_rgba(66,52,23,0.12)] backdrop-blur-xl sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#7a6c57]">
          My Products
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#243821] sm:text-5xl">
          Saved Product Shortlist
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[#655f51] sm:text-lg">
          This is the dedicated screen for products you saved from the catalog. If
          nothing is saved yet, you can jump directly back to the products page.
        </p>
      </div>

      <div className="flex-1 rounded-[2rem] border border-white/70 bg-[rgba(255,252,245,0.92)] p-8 shadow-[0_24px_70px_rgba(66,52,23,0.1)] backdrop-blur-xl">
        <MyProductsSection userId={session.user.id} />
      </div>
    </div>
  );
}
