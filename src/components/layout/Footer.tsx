import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

const ruleItems = [
  { href: "/terms-of-use", label: "Terms of Use" },
  { href: "/privacy-policy", label: "Privacy Policy" },
];

const productLinks = [
  { href: "/products", label: "Organic Fertilizers" },
  { href: "/products", label: "NPK Fertilizers" },
  { href: "/products", label: "Liquid Fertilizers" },
  { href: "/products", label: "Soil Amendments" },
];

const contactItems = [
  {
    label: "Email",
    value: "sales@agriace.com",
    href: "mailto:sales@agriace.com",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    label: "Phone",
    value: "+92 42 3810 4521",
    href: "tel:+924238104521",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    )
  },
  {
    label: "Address",
    value: "Sundar Industrial Estate, Lahore, Punjab, Pakistan",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
];

const socialLinks = [
  {
    href: "https://linkedin.com/company/agriace",
    label: "LinkedIn",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    )
  },
  {
    href: "https://facebook.com/agriace",
    label: "Facebook",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    )
  },
  {
    href: "https://twitter.com/agriace",
    label: "Twitter",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    )
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[linear-gradient(180deg,#191d18_0%,#111411_100%)] pt-0 text-[#eef1e8]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(196,174,120,0)_0%,rgba(196,174,120,0.75)_50%,rgba(196,174,120,0)_100%)]" />
        <div className="absolute top-0 left-[10%] h-32 w-32 rounded-full bg-[#b98a2c]/6 blur-3xl" />
        <div className="absolute right-[12%] bottom-10 h-52 w-52 rounded-full bg-[#6f7b54]/10 blur-3xl" />
      </div>

      <div className="relative border-t border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.015)_100%)]">
        <div className="mx-auto max-w-[1240px] px-6 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.8fr_0.8fr_1fr] lg:gap-12">
            <div className="lg:pr-6">
              <Link href="/" className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/6 backdrop-blur-sm">
                  <Image
                    src="/product-logo.jpeg"
                    alt="AgriAce Fertilizers"
                    width={56}
                    height={56}
                    className="h-12 w-12 rounded-xl object-cover"
                  />
                </div>

                <div>
                  <div className="text-xl font-semibold tracking-[0.01em] text-white">
                    AgriAce Fertilizers
                  </div>
                  <div className="mt-1 text-[0.72rem] font-semibold tracking-[0.24em] text-[#d8d3bf] uppercase">
                    Premium Plant Nutrition
                  </div>
                </div>
              </Link>

              <p className="mt-6 max-w-sm text-sm leading-[1.8] text-white/86 sm:text-[0.98rem]">
                Premium fertilizers for sustainable agriculture, built for stronger
                soil health, cleaner crop response, and dependable field performance.
              </p>

            </div>

            <div>
              <div className="text-[0.78rem] font-semibold tracking-[0.22em] text-[#ded6c2] uppercase">
                Quick Links
              </div>
              <ul className="mt-5 space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center text-[0.98rem] font-medium text-white/88 transition-colors duration-300 hover:text-[#d9c88f]"
                    >
                      <span className="relative">
                        {link.label}
                        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#d9c88f] transition-all duration-300 group-hover:w-full" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <div className="text-[0.78rem] font-semibold tracking-[0.22em] text-[#ded6c2] uppercase">
                  Rules
                </div>
                <ul className="mt-4 space-y-3">
                  {ruleItems.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="group inline-flex items-center text-[0.98rem] font-medium text-white/88 transition-colors duration-300 hover:text-[#d9c88f]"
                      >
                        <span className="relative">
                          {item.label}
                          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#d9c88f] transition-all duration-300 group-hover:w-full" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <div className="text-[0.78rem] font-semibold tracking-[0.22em] text-[#ded6c2] uppercase">
                Products
              </div>
              <ul className="mt-5 space-y-3">
                {productLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center text-[0.98rem] font-medium text-white/88 transition-colors duration-300 hover:text-[#d9c88f]"
                    >
                      <span className="relative">
                        {link.label}
                        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#d9c88f] transition-all duration-300 group-hover:w-full" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <div className="text-[0.78rem] font-semibold tracking-[0.22em] text-[#ded6c2] uppercase">
                  Connect
                </div>
                <div className="mt-4 flex items-center gap-2.5">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 text-white/72 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d9c88f]/45 hover:text-[#d9c88f]"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="text-[0.78rem] font-semibold tracking-[0.22em] text-[#ded6c2] uppercase">
                Contact
              </div>
              <ul className="mt-5 space-y-3">
                {contactItems.map((item) => (
                  <li key={item.label} className="flex items-start gap-3 text-[0.98rem] leading-relaxed text-white/84">
                    <span className="mt-0.5 text-[#d9c88f]">{item.icon}</span>
                    <div>
                      <span className="font-semibold text-white">{item.label}: </span>
                      {item.href ? (
                        <Link
                          href={item.href}
                          className="transition-colors duration-300 hover:text-[#d9c88f]"
                        >
                          {item.value}
                        </Link>
                      ) : (
                        <span>{item.value}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="mt-6 inline-flex rounded-full border border-[#d5c694]/30 bg-[linear-gradient(135deg,#f4edda_0%,#e8dcc0_100%)] px-6 py-3.5 text-sm font-semibold text-[#23371f] shadow-[0_14px_30px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d5c694]/55 hover:bg-[linear-gradient(135deg,#fbf6e8_0%,#ede1c7_100%)]"
              >
                Contact Sales
              </Link>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-white/8 pt-7 text-sm text-white/68 md:flex-row md:items-center md:justify-between">
            <p>&copy; {currentYear} AgriAce Fertilizers. All rights reserved.</p>
            <p className="text-white/58">Premium plant nutrition for dependable field performance.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
