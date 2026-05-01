"use client";

import Link from "next/link";

import type { AccountBaseUser } from "@/lib/account/client-storage";

const activityColumns = [
  "Name",
  "Purchase Date",
  "Price",
  "Quantity",
  "Action",
];

const setupSteps = [
  {
    step: "01",
    title: "Complete profile",
    note: "Primary action",
  },
  {
    step: "02",
    title: "Save products",
    note: "Use My Products",
  },
  {
    step: "03",
    title: "Move to purchase",
    note: "Browse when ready",
  },
];

export default function DashboardOverview({ user }: { user: AccountBaseUser }) {
  const firstName = user.fullName.trim().split(/\s+/)[0] || "Customer";
  const roleLabel = user.role.replaceAll("_", " ");
  const topStats = [
    {
      label: "Account",
      value: roleLabel,
      note: "Private workspace",
    },
    {
      label: "Next Step",
      value: "Complete profile",
      note: "Recommended first action",
    },
    {
      label: "Products",
      value: "Separate screen",
      note: "Managed in My Products",
    },
  ];

  return (
    <div
      className="flex h-full flex-col"
      style={{
        color: "#18361f",
        opacity: 1,
      }}
    >
      <section className="grid flex-1 items-stretch gap-6 xl:grid-cols-[minmax(0,1fr)_290px]">
        <div
          className="flex h-full flex-col overflow-hidden rounded-[2rem] border"
          style={{
            borderColor: "#ded4c2",
            backgroundColor: "#ffffff",
            color: "#18361f",
            boxShadow: "0 22px 56px rgba(66,52,23,0.12)",
          }}
        >
          <div className="border-b border-[#e6dccb] px-7 py-8 sm:px-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <p
                  className="text-sm font-semibold tracking-[0.24em] uppercase"
                  style={{ color: "#7a6c57" }}
                >
                  Dashboard Overview
                </p>
                <h1
                  className="mt-4 max-w-[24rem] text-4xl font-semibold tracking-[-0.05em] sm:text-5xl"
                  style={{ color: "#18361f", lineHeight: "0.96" }}
                >
                  Welcome back, {firstName}
                </h1>
                <p
                  className="mt-4 max-w-xl text-base leading-7 sm:text-lg"
                  style={{ color: "#5f5a4d" }}
                >
                  Use your dashboard to complete setup, open saved products, and
                  move to purchase faster.
                </p>
              </div>

              <div className="w-full max-w-[18rem] rounded-[1.6rem] border border-[#e5dccb] bg-[#fbf8f2] p-4 shadow-[0_14px_30px_rgba(66,52,23,0.06)]">
                <p
                  className="text-[0.72rem] font-semibold tracking-[0.18em] uppercase"
                  style={{ color: "#8a7a62" }}
                >
                  Primary Action
                </p>
                <p
                  className="mt-2 text-xl font-semibold"
                  style={{ color: "#18361f" }}
                >
                  Complete your profile
                </p>
                <p
                  className="mt-2 text-sm leading-6"
                  style={{ color: "#5f5a4d" }}
                >
                  Finish your details before saving or purchasing products.
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  <Link
                    href="/dashboard/profile"
                    className="inline-flex items-center justify-center rounded-full bg-[#18361f] px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                  >
                    Complete Profile
                  </Link>
                  <Link
                    href="/products"
                    className="inline-flex items-center justify-center rounded-full border border-[#d9cfbc] bg-white px-5 py-3 text-sm font-semibold text-[#18361f] transition-transform hover:-translate-y-0.5"
                  >
                    Browse Products
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-7 grid gap-3 md:grid-cols-3">
              {topStats.map((item) => (
                <p
                  key={item.label}
                  className="rounded-[1.35rem] border px-5 py-4"
                  style={{ borderColor: "#e2d8c6", backgroundColor: "#fbf7ef" }}
                >
                  <span
                    className="block text-[0.7rem] font-semibold tracking-[0.2em] uppercase"
                    style={{ color: "#8a7b64" }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="mt-2 block text-lg font-semibold"
                    style={{ color: "#18361f" }}
                  >
                    {item.value}
                  </span>
                  <span
                    className="mt-1 block text-sm"
                    style={{ color: "#6d6758" }}
                  >
                    {item.note}
                  </span>
                </p>
              ))}
            </div>
          </div>

          <div className="flex flex-1 px-4 pt-3 pb-5 sm:px-7 sm:pb-7">
            <div
              className="flex h-full w-full flex-col overflow-hidden rounded-[1.5rem] border"
              style={{ borderColor: "#e5dbc9", backgroundColor: "#fcfaf5" }}
            >
              <div
                className="grid grid-cols-[0.9fr_1.35fr_0.8fr_0.95fr_0.9fr] border-b text-sm font-medium"
                style={{ borderColor: "#e5dbc9", color: "#4f5563" }}
              >
                {activityColumns.map((column) => (
                  <div
                    key={column}
                    className="flex min-h-[4.25rem] items-center border-r px-3 py-4 text-center leading-5 last:border-r-0 sm:px-4"
                    style={{ borderColor: "#ece2d0" }}
                  >
                    <span className="w-full text-[0.72rem] font-semibold tracking-[0.08em] whitespace-nowrap uppercase sm:text-xs">
                      {column}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-1 items-center justify-center px-4 py-7">
                <div className="max-w-md text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f0eadb] text-[#7a6c57] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
                    <svg
                      className="h-7 w-7"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M4 7h16M7 4h10m-9 7h8m-8 4h5m4.5 4H6.5A2.5 2.5 0 014 16.5v-9A2.5 2.5 0 016.5 5h11A2.5 2.5 0 0120 7.5v9a2.5 2.5 0 01-2.5 2.5z"
                      />
                    </svg>
                  </div>

                  <p
                    className="mt-4 text-xl font-semibold"
                    style={{ color: "#18361f" }}
                  >
                    No purchases yet
                  </p>
                  <p
                    className="mt-2 text-sm leading-7 sm:text-base"
                    style={{ color: "#405170" }}
                  >
                    Products you save or purchase will appear here with price,
                    quantity, and actions.
                  </p>
                  <Link
                    href="/products"
                    className="mt-5 inline-flex items-center justify-center rounded-full bg-[#18361f] px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                  >
                    Browse Products
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-full flex-col gap-5">
          <div
            className="flex-1 overflow-hidden rounded-[2rem] border"
            style={{
              borderColor: "#d8cfbd",
              backgroundColor: "#ffffff",
              color: "#18361f",
              boxShadow: "0 22px 56px rgba(66,52,23,0.10)",
            }}
          >
            <div className="bg-[linear-gradient(135deg,#264b28_0%,#73852d_100%)] px-6 py-5 text-white">
              <p className="text-xs font-semibold tracking-[0.22em] text-white/75 uppercase">
                Setup Progress
              </p>
              <p className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
                Finish setup in 3 steps
              </p>
            </div>

            <div className="p-5">
              <div
                className="rounded-[1.55rem] border p-4"
                style={{ borderColor: "#e5dccb", backgroundColor: "#fbf8f2" }}
              >
                <div className="space-y-3">
                  {setupSteps.map((item, index) => (
                    <div
                      key={item.step}
                      className="flex items-center justify-between rounded-[1.2rem] bg-white px-4 py-3 shadow-[0_10px_20px_rgba(66,52,23,0.05)]"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#edf3df] text-sm font-semibold text-[#2f5d31]">
                          {item.step}
                        </span>
                        <div>
                          <p
                            className="text-sm font-semibold"
                            style={{ color: "#18361f" }}
                          >
                            {item.title}
                          </p>
                          <p className="text-xs" style={{ color: "#6d6758" }}>
                            {item.note}
                          </p>
                        </div>
                      </div>

                      {index === 0 ? (
                        <span className="rounded-full bg-[#18361f] px-3 py-1 text-xs font-semibold text-white">
                          Start
                        </span>
                      ) : (
                        <span
                          className="rounded-full px-3 py-1 text-xs font-semibold"
                          style={{
                            backgroundColor: "#f5ecd9",
                            color: "#8b6835",
                          }}
                        >
                          Next
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-[1.3rem] bg-[#f3efe5] px-4 py-3">
                <p className="text-sm leading-7" style={{ color: "#5f5a4d" }}>
                  Start with profile setup, then save products, then move to
                  purchase.
                </p>
              </div>
            </div>
          </div>

          <div
            className="rounded-[2rem] border p-5"
            style={{
              borderColor: "#cce0db",
              backgroundColor: "#e6f3f1",
              boxShadow: "0 18px 40px rgba(55,84,82,0.08)",
            }}
          >
            <p className="text-sm font-semibold" style={{ color: "#23555a" }}>
              Dashboard note
            </p>
            <p className="mt-3 text-sm leading-7" style={{ color: "#35656a" }}>
              Product lists and profile editing stay in their own screens so
              this page remains a quick control center.
            </p>
          </div>

          <div
            className="rounded-[2rem] border p-5"
            style={{
              borderColor: "#d8cfbd",
              backgroundColor: "#ffffff",
              color: "#18361f",
              boxShadow: "0 18px 40px rgba(66,52,23,0.08)",
            }}
          >
            <p
              className="text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: "#7a6c57" }}
            >
              Need Help
            </p>
            <p
              className="mt-3 text-xl font-semibold tracking-[-0.02em]"
              style={{ color: "#18361f" }}
            >
              Talk to AgriAce support
            </p>
            <p className="mt-2 text-sm leading-7" style={{ color: "#5f5a4d" }}>
              Reach out if you need help with profile setup or product guidance.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center justify-center rounded-full bg-[#18361f] px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
