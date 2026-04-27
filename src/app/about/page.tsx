import Image from "next/image";

export default function About() {
  return (
    <div className="relative overflow-hidden bg-[linear-gradient(180deg,#f8f5ec_0%,#f2ebda_38%,#eef2e4_100%)] py-20">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute top-0 inset-x-0 h-36 bg-[linear-gradient(180deg,rgba(47,93,49,0.07)_0%,rgba(47,93,49,0)_100%)]" />
        <div className="absolute -top-12 left-[8%] h-48 w-48 rounded-full bg-[#b98a2c]/12 blur-3xl" />
        <div className="absolute top-40 right-[10%] h-64 w-64 rounded-full bg-[#7e8d2f]/12 blur-3xl" />
        <div className="absolute bottom-10 left-1/3 h-56 w-56 rounded-full bg-[#2f5d31]/10 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-6">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#ddd4bf] bg-white/70 px-4 py-2 text-[0.72rem] font-semibold tracking-[0.22em] text-[#7a6c57] uppercase shadow-[0_10px_30px_rgba(91,74,38,0.08)] backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-[#7e8d2f]" />
            Brand Story
          </div>
          <h1 className="mb-6 text-5xl font-bold tracking-[-0.03em] text-[#22351d]">
            About AgriAce Fertilizers
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-[#5d5b4f]">
            Leading the way in sustainable agriculture solutions since 2010
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-16 grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center lg:gap-14">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-[#d8cfbc] bg-[linear-gradient(135deg,#2f5d31_0%,#3f6c31_48%,#7e8d2f_100%)] p-8 shadow-[0_24px_60px_rgba(47,93,49,0.18)] sm:p-10 lg:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(185,138,44,0.22),transparent_36%)]" />
            <Image
              src="/logo-title.jpeg"
              alt="AgriAce Fertilizers - Premium Quality Logo"
              width={700}
              height={500}
              className="relative z-10 w-full max-w-2xl rounded-2xl border border-white/12 object-contain shadow-[0_18px_40px_rgba(0,0,0,0.2)]"
            />
          </div>
          <div className="max-w-xl">
            <h2 className="mb-6 text-3xl font-bold text-[#22351d]">
              Our Mission
            </h2>
            <p className="mb-4 text-[#59574c]">
              At AgriAce Fertilizers, we are committed to providing farmers and
              gardeners with the highest quality fertilizers that promote
              sustainable agriculture while maximizing crop yields.
            </p>
            <p className="text-[#59574c]">
              We believe in the power of science-based solutions combined with
              environmental responsibility. Our products are designed to
              nourish plants, enrich soil, and protect our planet for future
              generations.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="mb-12 text-center text-3xl font-bold text-[#22351d]">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-[1.5rem] border border-[#ddd4c1] bg-white/72 px-8 py-10 text-center shadow-[0_18px_44px_rgba(91,74,38,0.08)] backdrop-blur-sm">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#2f8a47]">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#22351d]">
                Sustainability
              </h3>
              <p className="text-[#5b594d]">
                We prioritize eco-friendly practices and renewable resources in
                all our products.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-[#ddd4c1] bg-white/72 px-8 py-10 text-center shadow-[0_18px_44px_rgba(91,74,38,0.08)] backdrop-blur-sm">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#7e8d2f]">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#22351d]">
                Quality
              </h3>
              <p className="text-[#5b594d]">
                Every product undergoes rigorous testing to ensure the highest
                standards.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-[#ddd4c1] bg-white/72 px-8 py-10 text-center shadow-[0_18px_44px_rgba(91,74,38,0.08)] backdrop-blur-sm">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#b98a2c]">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#22351d]">
                Customer Focus
              </h3>
              <p className="text-[#5b594d]">
                Your success is our success. We provide expert support and
                guidance.
              </p>
            </div>
          </div>
        </div>

        {/* Brand Identity Section */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-[#22351d]">
            Our Brand Identity
          </h2>
          <div className="rounded-[1.75rem] border border-[#d8cfbc] bg-[linear-gradient(180deg,rgba(255,255,255,0.78)_0%,rgba(250,246,237,0.92)_100%)] p-8 shadow-[0_24px_60px_rgba(91,74,38,0.1)] backdrop-blur-sm">
            <Image
              src="/brand-identity.jpeg"
              alt="AgriAce Brand Identity - Business Cards, Packaging & Marketing Materials"
              width={1200}
              height={800}
              className="w-full rounded-[1.25rem] border border-[#e3dbc8]"
            />
            <p className="mt-4 text-center text-[#6a675c]">
              Complete brand identity including business cards, product packaging, and marketing materials
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="relative overflow-hidden rounded-[1.5rem] border border-[#5a6f35] bg-[linear-gradient(90deg,#2f5d31_0%,#476b2f_52%,#7e8d2f_100%)] p-12 text-white shadow-[0_24px_50px_rgba(47,93,49,0.24)]">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_left_center,rgba(255,255,255,0.12),transparent_28%),radial-gradient(circle_at_right_center,rgba(185,138,44,0.16),transparent_32%)]"
            aria-hidden="true"
          />
          <div className="relative grid grid-cols-1 gap-8 text-center md:grid-cols-4">
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-lg text-white/90">Years of Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-lg text-white/90">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-lg text-white/90">Products</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-lg text-white/90">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
