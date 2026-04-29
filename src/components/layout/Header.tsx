"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

const navItems = [
  {
    href: "/",
    label: "Home",
    eyebrow: "Overview",
    support: "Brand Snapshot",
    title: "Welcome to AgriAce",
    description:
      "Discover premium fertilizer solutions designed for stronger soil health and reliable field performance.",
    image: "/brand-identity.jpeg",
    links: [
      { href: "/company-overview", label: "Company Overview" },
      { href: "/products", label: "Featured Products" },
      { href: "/about", label: "Why AgriAce" },
      { href: "/contact", label: "Get in Touch" },
    ],
  },
  {
    href: "/products",
    label: "Products",
    eyebrow: "Solutions",
    support: "Product Highlights",
    title: "Professional Product Range",
    description:
      "Explore organic inputs, mineral formulations, and crop-focused nutrition built for dependable growth.",
    image: "/product-packaging.jpeg",
    links: [
      { href: "/products", label: "Organic Solutions" },
      { href: "/products", label: "NPK Formulations" },
      { href: "/products", label: "Liquid Nutrients" },
      { href: "/contact", label: "Request a Quote" },
    ],
  },
  {
    href: "/about",
    label: "About",
    eyebrow: "Brand",
    support: "Company Profile",
    title: "About AgriAce Fertilizers",
    description:
      "Learn about our quality standards, agricultural focus, and the brand values behind our fertilizer line.",
    image: "/logo-title.jpeg",
    links: [
      { href: "/company-overview", label: "Company Overview" },
      { href: "/about", label: "Our Mission" },
      { href: "/about", label: "Quality Commitment" },
      { href: "/contact", label: "Connect With Us" },
    ],
  },
  {
    href: "/contact",
    label: "Contact",
    eyebrow: "Support",
    support: "Direct Assistance",
    title: "Talk to Our Team",
    description:
      "Reach out for product consultations, pricing details, and support tailored to your agricultural needs.",
    image: "/brochure-crown-huma.jpeg",
    links: [
      { href: "/contact", label: "Sales Inquiry" },
      { href: "/contact", label: "Product Support" },
      { href: "/contact", label: "Business Contact" },
      { href: "/contact", label: "Start a Conversation" },
    ],
  },
];

export default function Header() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const activeItem =
    navItems.find((item) => item.href === activeMenu) ?? navItems[0];

  const isNavActive = (href: string) => {
    if (href === "/about") {
      return pathname === "/about" || pathname === "/company-overview";
    }

    return pathname === href;
  };

  const navLinkClassName = (href: string) =>
    [
      "group relative inline-flex items-center gap-2 px-1 py-2 text-sm font-medium tracking-[0.01em] transition-colors duration-300",
      isNavActive(href) || activeMenu === href
        ? "text-[#2c3f23]"
        : "text-[#6a6558] hover:text-[#2c3f23]",
    ].join(" ");

  const isAuthenticated = status === "authenticated" && !!session?.user;
  const isSessionLoading = status === "loading";
  const isAuthPage = pathname === "/get-started";
  const shouldShowLoadingAuthUi = isSessionLoading && !isAuthPage;
  const profileName = session?.user?.name ?? "User";
  const profileEmail = session?.user?.email ?? "";
  const profileRole = session?.user?.role ?? "CUSTOMER";

  const handleSignOut = () => {
    const callbackUrl = `${window.location.origin}/`;
    void signOut({ callbackUrl });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#ddd6c5]/80 bg-[#fbf8f0]/94 shadow-sm backdrop-blur-xl">
      <nav className="container mx-auto px-6">
        <div className="flex h-20 items-center justify-between gap-4 md:grid md:grid-cols-[minmax(280px,1fr)_auto_minmax(280px,1fr)] md:gap-6">
          <Link
            href="/"
            className="flex min-w-0 flex-1 items-center md:max-w-[320px] md:justify-self-start"
          >
            <div className="flex h-14 w-[170px] shrink-0 items-center justify-center md:h-16 md:w-[210px]">
              <Image
                src="/logo_3.png"
                alt="AgriAce Fertilizers logo"
                width={258}
                height={126}
                className="h-12 w-full object-contain md:h-20"
                priority
              />
            </div>
          </Link>

          <div
            className="relative hidden items-center justify-center md:flex md:justify-self-center"
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className="flex items-center gap-7">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={navLinkClassName(item.href)}
                  onMouseEnter={() => setActiveMenu(item.href)}
                  onFocus={() => setActiveMenu(item.href)}
                >
                  {item.label}
                  <svg
                    className={`h-3.5 w-3.5 transition-transform duration-300 ${
                      activeMenu === item.href ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  <span
                    className={`absolute right-0 bottom-0 left-0 h-0.5 origin-left rounded-full bg-[#7e8d2f] transition-transform duration-300 ${
                      isNavActive(item.href) || activeMenu === item.href
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              ))}
            </div>

            {activeMenu && (
              <div
                className="absolute top-full left-1/2 z-50 w-[min(820px,94vw)] -translate-x-1/2"
                onMouseEnter={() => setActiveMenu(activeItem.href)}
              >
                <div className="h-4 w-full" />
                <div className="mega-menu-panel grid grid-cols-[280px_1fr] gap-4 rounded-[1.75rem] border border-[#ddd6c6]/80 bg-[rgba(255,251,244,0.96)] p-5 shadow-[0_30px_80px_rgba(91,74,38,0.14)] ring-1 ring-black/5 backdrop-blur-xl">
                  <div className="mega-menu-visual relative min-h-[260px] overflow-hidden rounded-[1.35rem] bg-[#efe6d4]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(185,138,44,0.22),transparent_42%),linear-gradient(180deg,#f5efe1_0%,#e9ddc4_100%)]" />
                    <div className="absolute inset-x-4 top-4 bottom-8 overflow-hidden rounded-[1.1rem] border border-white/70 bg-white/68 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                      <Image
                        src={activeItem.image}
                        alt={activeItem.title}
                        fill
                        sizes="248px"
                        className="mega-menu-image object-contain object-top p-2 pt-1"
                      />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,rgba(53,36,18,0)_0%,rgba(53,36,18,0.22)_100%)]" />
                    <div className="absolute right-4 bottom-4 left-4 rounded-2xl border border-white/12 bg-[rgba(53,36,18,0.46)] px-4 py-3 text-white shadow-[0_12px_30px_rgba(53,36,18,0.16)] backdrop-blur-md">
                      <div className="inline-flex items-center gap-2 text-[0.68rem] font-semibold tracking-[0.22em] text-white/90 uppercase">
                        <span className="h-2 w-2 rounded-full bg-[#d2c06e]" />
                        {activeItem.eyebrow}
                      </div>
                      <div className="mt-1.5 text-[0.92rem] font-medium tracking-[0.01em] text-white">
                        {activeItem.support}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between py-3 pr-2 pl-2">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-[#dfd6c4] bg-[#faf6ed] px-3 py-1.5 text-[0.72rem] font-semibold tracking-[0.2em] text-[#7a6c57] uppercase">
                        <span className="h-2 w-2 rounded-full bg-[#b98a2c]" />
                        {activeItem.eyebrow}
                      </div>

                      <h3 className="mt-3.5 max-w-xl text-[1.85rem] leading-tight font-semibold tracking-[-0.03em] text-[#2c3f23]">
                        {activeItem.title}
                      </h3>

                      <p className="mt-3 max-w-xl text-[0.98rem] leading-relaxed text-[#655f51]">
                        {activeItem.description}
                      </p>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      {activeItem.links.map((link) => (
                        <Link
                          key={`${activeItem.href}-${link.label}`}
                          href={link.href}
                          className="mega-menu-link button-arrow button-arrow--light group min-h-[4rem] rounded-2xl border border-[#e4dccb] bg-[#fdfaf4] px-4 py-4 text-left transition-all duration-300 hover:border-[#d7cfbb] hover:bg-white hover:shadow-[0_16px_30px_rgba(91,74,38,0.08)]"
                        >
                          <span className="text-[1rem] font-semibold text-[#2c3f23]">
                            {link.label}
                          </span>
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
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="hidden items-center justify-end gap-3 md:flex md:min-w-[280px] md:justify-self-end">
            <Link
              href="/contact"
              className="text-sm font-semibold whitespace-nowrap text-[#6a6558] transition-colors duration-300 hover:text-[#2c3f23]"
            >
              Contact Sales
            </Link>
            {shouldShowLoadingAuthUi ? (
              <span
                className="flex h-15 w-15 items-center justify-center rounded-full bg-[#edf2f6] text-[#98a0aa] shadow-[0_8px_20px_rgba(91,74,38,0.08)]"
                aria-label="Loading user session"
              >
                <svg
                  className="h-8 w-8"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 12a4.5 4.5 0 1 0-4.5-4.5A4.5 4.5 0 0 0 12 12Zm0 2.25c-3.49 0-6.75 1.77-6.75 4.5a.75.75 0 0 0 .75.75h12a.75.75 0 0 0 .75-.75c0-2.73-3.26-4.5-6.75-4.5Z" />
                </svg>
              </span>
            ) : isAuthenticated ? (
              <div className="group/profile relative">
                <button
                  type="button"
                  className="flex h-13 w-13 items-center justify-center rounded-full bg-[#276920] text-[#ddebdc] shadow-[0_8px_20px_rgba(91,74,38,0.08)] transition-colors duration-200 cursor-pointer hover:bg-[#244826]"
                  aria-label={`Signed in as ${profileName}`}
                  title={`Signed in as ${profileName}`}
                >
                  <svg
                    className="h-8 w-8"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 12a4.5 4.5 0 1 0-4.5-4.5A4.5 4.5 0 0 0 12 12Zm0 2.25c-3.49 0-6.75 1.77-6.75 4.5a.75.75 0 0 0 .75.75h12a.75.75 0 0 0 .75-.75c0-2.73-3.26-4.5-6.75-4.5Z" />
                  </svg>
                </button>
                <div className="pointer-events-none absolute top-full right-0 z-50 mt-3 w-72 translate-y-1 opacity-0 transition-all duration-200 group-hover/profile:pointer-events-auto group-hover/profile:translate-y-0 group-hover/profile:opacity-100">
                  <div className="rounded-2xl border border-[#ddd6c6]/80 bg-[rgba(255,251,244,0.98)] p-4 shadow-[0_24px_60px_rgba(91,74,38,0.16)] backdrop-blur-xl">
                    <p className="text-xs font-semibold tracking-[0.2em] text-[#7a6c57] uppercase">
                      Signed In
                    </p>
                    <p className="mt-2 text-sm font-semibold text-[#2c3f23]">
                      {profileName}
                    </p>
                    <p className="mt-1 truncate text-xs text-[#6a6558]">{profileEmail}</p>
                    <p className="mt-3 inline-flex rounded-full border border-[#d8d0bc] bg-white px-2.5 py-1 text-[0.65rem] font-semibold tracking-[0.18em] text-[#6a6558] uppercase">
                      {profileRole.replaceAll("_", " ")}
                    </p>
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="mt-4 w-full rounded-xl bg-[#2f5d31] px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#244826]"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href="/get-started"
                className="button-arrow button-arrow--solid group relative overflow-hidden rounded-xl bg-gradient-to-r from-[#2f5d31] to-[#7e8d2f] px-5 py-3.5 text-sm font-bold whitespace-nowrap text-white shadow-[0_8px_20px_rgba(47,93,49,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(47,93,49,0.3)]"
              >
                <span className="relative z-10">Get Started</span>
                <span
                  className="button-arrow__icon relative z-10"
                  aria-hidden="true"
                >
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
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </Link>
            )}
          </div>

          <button
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#ddd4c0] bg-white text-[#2c3f23] shadow-[0_6px_18px_rgba(91,74,38,0.06)] transition-colors hover:bg-[#f8f4ea] md:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="border-t border-[#e1dac8] pb-4 md:hidden">
            <div className="mt-4 rounded-xl border border-[#ddd4c0] bg-white p-4 shadow-[0_16px_40px_rgba(91,74,38,0.08)]">
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors duration-300 ${
                      isNavActive(item.href)
                        ? "bg-[#f6f0e3] text-[#2c3f23]"
                        : "text-[#655f51] hover:bg-[#faf6ed] hover:text-[#2c3f23]"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-1 gap-2">
                <Link
                  href="/contact"
                  className="rounded-lg border border-[#d8d0bc] px-4 py-3 text-center text-sm font-medium text-[#7a6c57] transition-colors duration-300 hover:bg-[#f8f4ea]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact Sales
                </Link>
                {shouldShowLoadingAuthUi ? (
                  <div className="rounded-lg border border-[#ddd4c0] bg-[#fdfaf4] p-3">
                    <p className="text-xs font-semibold tracking-[0.2em] text-[#7a6c57] uppercase">
                      Loading
                    </p>
                    <div className="mt-2 h-4 w-24 rounded bg-[#e6dfcf]" />
                    <div className="mt-2 h-3 w-36 rounded bg-[#ece6d8]" />
                  </div>
                ) : isAuthenticated ? (
                  <div className="rounded-lg border border-[#ddd4c0] bg-[#fdfaf4] p-3">
                    <p className="text-xs font-semibold tracking-[0.2em] text-[#7a6c57] uppercase">
                      Signed In
                    </p>
                    <p className="mt-2 text-sm font-semibold text-[#2c3f23]">{profileName}</p>
                    <p className="mt-1 truncate text-xs text-[#655f51]">{profileEmail}</p>
                    <p className="mt-2 text-[0.7rem] font-semibold tracking-[0.15em] text-[#7a6c57] uppercase">
                      {profileRole.replaceAll("_", " ")}
                    </p>
                    <button
                      type="button"
                      className="mt-3 w-full rounded-lg bg-[#2f5d31] px-3 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#244826]"
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleSignOut();
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/get-started"
                    className="rounded-lg bg-[#2f5d31] px-4 py-3 text-center text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#244826]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
