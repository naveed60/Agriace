import Image from "next/image";
import Link from "next/link";

const overviewStats = [
  {
    label: "Established Focus",
    value: "Since 2010",
    detail: "Built around long-term agricultural input programs.",
  },
  {
    label: "Category Coverage",
    value: "4 Core Lines",
    detail: "Compost, NPK, liquid nutrients, and soil amendments.",
  },
  {
    label: "Commercial Position",
    value: "Premium Brand",
    detail: "Designed for stronger dealer, distributor, and grower perception.",
  },
];

const operatingPillars = [
  {
    title: "Soil-first thinking",
    copy:
      "AgriAce positions crop nutrition around soil condition, root-zone performance, and long-cycle field resilience instead of short-term input selling alone.",
    accent: "bg-[#2f5d31]",
  },
  {
    title: "Dependable product presentation",
    copy:
      "The brand is built to feel credible in the market, with packaging and visual systems that support premium positioning across dealers and distributors.",
    accent: "bg-[#7e8d2f]",
  },
  {
    title: "Practical field relevance",
    copy:
      "Every category is shaped to support real crop programs with formulations that are easier to explain, specify, and repeat commercially.",
    accent: "bg-[#b98a2c]",
  },
];

export default function CompanyOverviewPage() {
  return (
    <div className="relative overflow-hidden bg-[linear-gradient(180deg,#f8f5ec_0%,#f2ebda_42%,#eef2e4_100%)] py-20">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 inset-x-0 h-36 bg-[linear-gradient(180deg,rgba(47,93,49,0.07)_0%,rgba(47,93,49,0)_100%)]" />
        <div className="absolute -top-12 left-[8%] h-48 w-48 rounded-full bg-[#b98a2c]/12 blur-3xl" />
        <div className="absolute top-40 right-[10%] h-64 w-64 rounded-full bg-[#7e8d2f]/12 blur-3xl" />
        <div className="absolute bottom-10 left-1/3 h-56 w-56 rounded-full bg-[#2f5d31]/10 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-6">
        <section className="text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#ddd4bf] bg-white/70 px-4 py-2 text-[0.72rem] font-semibold tracking-[0.22em] text-[#7a6c57] uppercase shadow-[0_10px_30px_rgba(91,74,38,0.08)] backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-[#7e8d2f]" />
            Company Profile
          </div>
          <h1 className="mb-6 text-5xl font-bold tracking-[-0.03em] text-[#22351d]">
            Company Overview
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-[#5d5b4f]">
            AgriAce Fertilizers is a premium plant nutrition brand built around
            stronger soil health, cleaner crop response, and dependable
            commercial presentation.
          </p>
        </section>

        <section className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center lg:gap-14">
          <div className="max-w-xl">
            <h2 className="mb-6 text-3xl font-bold text-[#22351d]">
              Built for serious agricultural programs
            </h2>
            <p className="mb-4 text-[#59574c]">
              AgriAce Fertilizers serves growers, dealers, and distributors with
              nutrition systems designed to improve soil condition, support
              stronger uptake, and deliver a more premium market-facing brand
              experience.
            </p>
            <p className="mb-4 text-[#59574c]">
              The company focuses on product categories that matter in practical
              crop development: organic compost, NPK fertilizer, liquid
              nutrients, and soil amendments. Each line is positioned to be
              commercially credible and field-relevant at the same time.
            </p>
            <p className="text-[#59574c]">
              The result is a fertilizer business shaped around long-term brand
              trust, repeatable field performance, and clearer value
              communication across the sales chain.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[1.75rem] border border-[#d8cfbc] bg-[linear-gradient(135deg,#2f5d31_0%,#3f6c31_48%,#7e8d2f_100%)] p-8 shadow-[0_24px_60px_rgba(47,93,49,0.18)] sm:p-10 lg:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(185,138,44,0.22),transparent_36%)]" />
            <Image
              src="/product-packaging.jpeg"
              alt="AgriAce product packaging overview"
              width={900}
              height={680}
              className="relative z-10 w-full rounded-[1.4rem] border border-white/12 object-cover shadow-[0_18px_40px_rgba(0,0,0,0.2)]"
            />
          </div>
        </section>

        <section className="mt-16">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {overviewStats.map((item) => (
              <div
                key={item.label}
                className="rounded-[1.5rem] border border-[#d8cfbc] bg-[linear-gradient(180deg,#fffdf8_0%,#f6efdf_100%)] px-7 py-8 shadow-[0_18px_44px_rgba(91,74,38,0.08)]"
              >
                <div className="text-[0.72rem] font-semibold tracking-[0.22em] text-[#8b6835] uppercase">
                  {item.label}
                </div>
                <div className="mt-3 text-[2rem] leading-tight font-bold text-[#22351d]">
                  {item.value}
                </div>
                <p className="mt-3 text-[#5b594d]">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-[#22351d]">
              Operating Principles
            </h2>
            <p className="mt-4 text-lg text-[#5d5b4f]">
              The company is positioned around a few core ideas that shape both
              its product decisions and its market identity.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {operatingPillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-[1.5rem] border border-[#ddd4c1] bg-white/78 px-8 py-9 shadow-[0_18px_44px_rgba(91,74,38,0.08)] backdrop-blur-sm"
              >
                <div
                  className={`${pillar.accent} mb-5 flex h-14 w-14 items-center justify-center rounded-2xl shadow-[0_12px_24px_rgba(0,0,0,0.08)]`}
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-white" />
                </div>
                <h3 className="text-xl font-bold text-[#22351d]">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-[#5b594d]">{pillar.copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div className="rounded-[1.75rem] border border-[#d8cfbc] bg-[linear-gradient(180deg,rgba(255,255,255,0.82)_0%,rgba(250,246,237,0.94)_100%)] p-8 shadow-[0_24px_60px_rgba(91,74,38,0.1)] backdrop-blur-sm">
              <Image
                src="/brand-identity.jpeg"
                alt="AgriAce brand identity overview"
                width={1200}
                height={800}
                className="w-full rounded-[1.25rem] border border-[#e3dbc8]"
              />
            </div>

            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#ddd4bf] bg-white/75 px-4 py-2 text-[0.72rem] font-semibold tracking-[0.22em] text-[#7a6c57] uppercase shadow-[0_10px_30px_rgba(91,74,38,0.08)]">
                <span className="h-2 w-2 rounded-full bg-[#b98a2c]" />
                Brand Positioning
              </div>
              <h2 className="mt-5 text-3xl font-bold text-[#22351d]">
                A fertilizer company designed to look as credible as it performs
              </h2>
              <p className="mt-4 text-[#59574c]">
                AgriAce combines product communication, packaging design, and
                company presentation into one premium brand system. That helps
                the business present a more confident story in both field and
                trade conversations.
              </p>
              <p className="mt-4 text-[#59574c]">
                This company overview page is the entry point for users who want
                to understand what the business stands for before exploring
                products in detail.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/products"
                  className="btn-primary button-arrow button-arrow--solid min-w-[16rem] text-center shadow-[0_18px_34px_rgba(47,93,49,0.16)]"
                >
                  <span>Explore Products</span>
                  <span className="button-arrow__icon" aria-hidden="true">
                    <svg
                      className="h-4 w-4"
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
                  </span>
                </Link>
                <Link
                  href="/contact"
                  className="btn-secondary button-arrow button-arrow--light min-w-[15rem] text-center"
                >
                  <span>Contact Sales</span>
                  <span className="button-arrow__icon" aria-hidden="true">
                    <svg
                      className="h-4 w-4"
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
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
