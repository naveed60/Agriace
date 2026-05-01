import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/auth";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/get-started");
  }
  const profileName = session.user.name ?? "AgriAce Customer";
  const profileEmail = session.user.email ?? "";
  const profileRole = session.user.role.replaceAll("_", " ");
  const initials = profileName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f7f3e8_0%,#eef3e6_100%)] py-10 sm:py-14">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-[7%] h-52 w-52 rounded-full bg-[#b98a2c]/10 blur-3xl" />
        <div className="absolute right-[10%] bottom-0 h-72 w-72 rounded-full bg-[#2f5d31]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 xl:grid-cols-[320px_minmax(0,1fr)]">
          <div className="flex h-full flex-col gap-6 xl:-ml-8 2xl:-ml-12">
            <aside className="rounded-[2rem] border border-white/70 bg-[rgba(255,252,245,0.92)] p-6 shadow-[0_24px_70px_rgba(66,52,23,0.1)] backdrop-blur-xl xl:self-start">
              <div className="rounded-[1.8rem] bg-[linear-gradient(145deg,#274d29_0%,#365d31_45%,#7e8d2f_100%)] p-6 text-white shadow-[0_20px_50px_rgba(47,93,49,0.22)]">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/92">
                    {profileRole}
                  </span>
                </div>

                <div className="mt-5 flex items-center gap-4">
                  <div className="flex h-18 w-18 items-center justify-center overflow-hidden rounded-[1.5rem] border border-white/15 bg-white/10 text-xl font-semibold">
                    {initials}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{profileName}</h2>
                    <p className="mt-1 text-sm text-white/78">{profileEmail}</p>
                  </div>
                </div>
              </div>

              <nav className="mt-6 space-y-2">
                <Link
                  href="/dashboard"
                  className="block rounded-2xl border border-[#e5dcc9] bg-white px-4 py-3 text-sm font-semibold text-[#243821] transition-colors hover:bg-[#f8f4ea]"
                >
                  Dashboard Home
                </Link>
                <Link
                  href="/dashboard/profile"
                  className="block rounded-2xl border border-[#e5dcc9] bg-white px-4 py-3 text-sm font-semibold text-[#243821] transition-colors hover:bg-[#f8f4ea]"
                >
                  Profile Settings
                </Link>
                <Link
                  href="/dashboard/my-products"
                  className="block rounded-2xl border border-[#e5dcc9] bg-white px-4 py-3 text-sm font-semibold text-[#243821] transition-colors hover:bg-[#f8f4ea]"
                >
                  My Products
                </Link>
                <Link
                  href="/products"
                  className="block rounded-2xl border border-[#e5dcc9] bg-white px-4 py-3 text-sm font-semibold text-[#243821] transition-colors hover:bg-[#f8f4ea]"
                >
                  Browse Products
                </Link>
                <Link
                  href="/contact"
                  className="block rounded-2xl border border-[#e5dcc9] bg-white px-4 py-3 text-sm font-semibold text-[#243821] transition-colors hover:bg-[#f8f4ea]"
                >
                  Contact Support
                </Link>
              </nav>
            </aside>

            <div className="flex flex-col rounded-[2rem] border border-[#d9dfd2] bg-[linear-gradient(180deg,#f5f8ef_0%,#eef5e8_100%)] p-5 shadow-[0_18px_40px_rgba(66,52,23,0.08)]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#62724a]">
                Workspace Tips
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#18361f]">
                Keep this area focused
              </h3>
              <div className="mt-4 space-y-3">
                <div className="rounded-[1.25rem] border border-white/70 bg-white/84 px-4 py-3">
                  <p className="text-sm font-semibold text-[#18361f]">
                    Start with your profile
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[#5f5a4d]">
                    Add core account details first for a cleaner buying flow.
                  </p>
                </div>
                <div className="rounded-[1.25rem] border border-white/70 bg-white/84 px-4 py-3">
                  <p className="text-sm font-semibold text-[#18361f]">
                    Save products separately
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[#5f5a4d]">
                    Use My Products to review items without crowding the dashboard.
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-[1.25rem] border border-[#dfe7d6] bg-white/68 px-4 py-4">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#6a7a50]">
                  Current Focus
                </p>
                <p className="mt-2 text-base font-semibold text-[#18361f]">
                  Complete profile before saving products
                </p>
                <p className="mt-1 text-sm leading-6 text-[#5f5a4d]">
                  This keeps your workspace organized and ready for purchase.
                </p>
              </div>

              <div className="mt-5">
                <Link
                  href="/dashboard/profile"
                  className="inline-flex items-center justify-center rounded-full bg-[#18361f] px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                >
                  Open Profile
                </Link>
              </div>
            </div>
          </div>

          <div className="h-full">{children}</div>
        </div>
      </div>
    </section>
  );
}
