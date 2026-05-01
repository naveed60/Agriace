import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";

export default async function TestimonialsPage() {
  const session = await getServerSession(authOptions);
  const isLoggedIn = Boolean(session?.user?.email);

  return (
    <div className="relative overflow-hidden bg-[linear-gradient(180deg,#f8f5ec_0%,#f2ebda_42%,#eef2e4_100%)] py-18 lg:py-20">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 inset-x-0 h-36 bg-[linear-gradient(180deg,rgba(47,93,49,0.07)_0%,rgba(47,93,49,0)_100%)]" />
        <div className="absolute -top-10 left-[8%] h-48 w-48 rounded-full bg-[#b98a2c]/12 blur-3xl" />
        <div className="absolute top-36 right-[12%] h-64 w-64 rounded-full bg-[#7e8d2f]/12 blur-3xl" />
      </div>

      <div className="relative container mx-auto px-6">
        <section className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#ddd4bf] bg-white/72 px-4 py-2 text-[0.72rem] font-semibold tracking-[0.22em] text-[#7a6c57] uppercase shadow-[0_10px_30px_rgba(91,74,38,0.08)] backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-[#7e8d2f]" />
            Testimonials
          </div>
          <h1 className="mt-5 text-4xl font-bold tracking-[-0.04em] text-[#22351d] sm:text-5xl">
            Share your review
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#5d5b4f]">
            A simple testimonial page for customer feedback.
          </p>
        </section>

        <section className="mx-auto mt-14 max-w-3xl">
          <div className="rounded-[2rem] border border-[#bfd0b6] bg-[linear-gradient(180deg,#f4faef_0%,#e6f0db_100%)] p-8 shadow-[0_26px_62px_rgba(47,93,49,0.14)]">
            <form className="grid gap-5">
              {!isLoggedIn ? (
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="mb-2 block text-sm font-medium text-[#4f5647]"
                    >
                      Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      placeholder="Your name"
                      className="w-full rounded-xl border border-[#ddd4bf] bg-white/84 px-4 py-3 text-[#22351d] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] outline-none transition-all duration-200 placeholder:text-[#8a8375] focus:border-[#7e8d2f] focus:ring-2 focus:ring-[#7e8d2f]/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-[#4f5647]"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      className="w-full rounded-xl border border-[#ddd4bf] bg-white/84 px-4 py-3 text-[#22351d] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] outline-none transition-all duration-200 placeholder:text-[#8a8375] focus:border-[#7e8d2f] focus:ring-2 focus:ring-[#7e8d2f]/20"
                    />
                  </div>
                </div>
              ) : null}

              <div>
                <textarea
                  id="review"
                  rows={7}
                  placeholder="Write your testimonial here..."
                  className="w-full rounded-xl border border-[#ddd4bf] bg-white/84 px-4 py-3 text-[#22351d] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] outline-none transition-all duration-200 placeholder:text-[#8a8375] focus:border-[#7e8d2f] focus:ring-2 focus:ring-[#7e8d2f]/20"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full bg-[#18361f] px-8 py-3.5 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
