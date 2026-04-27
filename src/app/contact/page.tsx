"use client"
import { useState } from "react";
export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="relative overflow-hidden bg-[linear-gradient(180deg,#f8f5ec_0%,#f2ebda_42%,#eef2e4_100%)] py-20">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute top-0 inset-x-0 h-36 bg-[linear-gradient(180deg,rgba(47,93,49,0.07)_0%,rgba(47,93,49,0)_100%)]" />
        <div className="absolute -top-10 left-[8%] h-48 w-48 rounded-full bg-[#b98a2c]/12 blur-3xl" />
        <div className="absolute top-36 right-[12%] h-64 w-64 rounded-full bg-[#7e8d2f]/12 blur-3xl" />
        <div className="absolute bottom-10 left-1/3 h-56 w-56 rounded-full bg-[#2f5d31]/10 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-6">
        <div className="mb-12 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#ddd4bf] bg-white/70 px-4 py-2 text-[0.72rem] font-semibold tracking-[0.22em] text-[#7a6c57] uppercase shadow-[0_10px_30px_rgba(91,74,38,0.08)] backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-[#7e8d2f]" />
            Contact AgriAce
          </div>
          <h1 className="mb-4 text-5xl font-bold tracking-[-0.03em] text-[#22351d]">
            Contact Us
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-[#5d5b4f]">
            Have questions? We&apos;d love to hear from you. Send us a message and
            we&apos;ll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <div className="rounded-[1.75rem] border border-[#bfd0b6] bg-[linear-gradient(180deg,#f4faef_0%,#e6f0db_100%)] p-8 shadow-[0_26px_62px_rgba(47,93,49,0.14)] backdrop-blur-sm">
            <h2 className="mb-6 text-2xl font-bold text-[#22351d]">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="mb-2 block font-medium text-[#4f5647]"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-[#ddd4bf] bg-white/84 px-4 py-3 text-[#22351d] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] outline-none transition-all duration-200 placeholder:text-[#8a8375] focus:border-[#7e8d2f] focus:ring-2 focus:ring-[#7e8d2f]/20"
                  placeholder="Your name"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="mb-2 block font-medium text-[#4f5647]"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-[#ddd4bf] bg-white/84 px-4 py-3 text-[#22351d] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] outline-none transition-all duration-200 placeholder:text-[#8a8375] focus:border-[#7e8d2f] focus:ring-2 focus:ring-[#7e8d2f]/20"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="subject"
                  className="mb-2 block font-medium text-[#4f5647]"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-[#ddd4bf] bg-white/84 px-4 py-3 text-[#22351d] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] outline-none transition-all duration-200 placeholder:text-[#8a8375] focus:border-[#7e8d2f] focus:ring-2 focus:ring-[#7e8d2f]/20"
                  placeholder="How can we help?"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="mb-2 block font-medium text-[#4f5647]"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full rounded-xl border border-[#ddd4bf] bg-white/84 px-4 py-3 text-[#22351d] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] outline-none transition-all duration-200 placeholder:text-[#8a8375] focus:border-[#7e8d2f] focus:ring-2 focus:ring-[#7e8d2f]/20"
                  placeholder="Your message..."
                ></textarea>
              </div>

              <button type="submit" className="w-full btn-primary">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <div className="mb-6 rounded-[1.75rem] border border-[#cfc4ad] bg-[linear-gradient(180deg,#fdf8ee_0%,#efe5cf_100%)] p-8 shadow-[0_26px_62px_rgba(91,74,38,0.14)] backdrop-blur-sm">
              <h2 className="mb-6 text-2xl font-bold text-[#22351d]">
                Contact Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-4 rounded-full bg-[#2f5d31] p-3">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-[#22351d]">
                      Email
                    </h3>
                    <p className="text-[#59574c]">
                      info@agriace.com
                    </p>
                    <p className="text-[#59574c]">
                      support@agriace.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 rounded-full bg-[#7e8d2f] p-3">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-[#22351d]">
                      Phone
                    </h3>
                    <p className="text-[#59574c]">
                      +1 (555) 123-4567
                    </p>
                    <p className="text-[#59574c]">
                      +1 (555) 987-6543
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 rounded-full bg-[#b98a2c] p-3">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-[#22351d]">
                      Address
                    </h3>
                    <p className="text-[#59574c]">
                      123 Agriculture Street
                    </p>
                    <p className="text-[#59574c]">
                      City, State 12345
                    </p>
                    <p className="text-[#59574c]">
                      United States
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[1.5rem] border border-[#5a6f35] bg-[linear-gradient(90deg,#2f5d31_0%,#476b2f_52%,#7e8d2f_100%)] p-8 text-white shadow-[0_24px_50px_rgba(47,93,49,0.24)]">
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_left_center,rgba(255,255,255,0.12),transparent_28%),radial-gradient(circle_at_right_center,rgba(185,138,44,0.16),transparent_32%)]"
                aria-hidden="true"
              />
              <div className="relative">
                <h3 className="mb-4 text-2xl font-bold">Business Hours</h3>
              <div className="space-y-2">
                <p className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span className="font-semibold text-white/92">9:00 AM - 6:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="font-semibold text-white/92">10:00 AM - 4:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="font-semibold text-white/92">Closed</span>
                </p>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
