"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

const inputClassName =
  "w-full rounded-2xl border border-[#e5dcc9] bg-[#fbf8f1] px-4 py-3 text-[#243821] outline-none transition-all duration-300 placeholder:text-[#9a8f7b] focus:border-[#94a24a] focus:bg-white focus:shadow-[0_0_0_4px_rgba(126,141,47,0.12)]";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    setError(null);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
        }),
      });

      const payload = (await response.json().catch(() => null)) as
        | { message?: string; error?: string }
        | null;

      if (!response.ok) {
        setError(payload?.error ?? "Unable to process your request.");
        return;
      }

      setMessage(
        payload?.message ??
          "If an account exists for this email, a password reset link has been sent."
      );
      setEmail("");
    } catch {
      setError("Unable to process your request right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#f5f0e4] py-14 sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(126,141,47,0.18),transparent_44%),radial-gradient(circle_at_bottom_left,rgba(47,93,49,0.14),transparent_42%)]" />

      <div className="container relative mx-auto max-w-xl px-6">
        <div className="rounded-[2rem] border border-[#ddd3bf] bg-white/92 p-8 shadow-[0_24px_56px_rgba(53,36,18,0.12)] backdrop-blur-sm sm:p-10">
          <p className="text-xs font-semibold tracking-[0.25em] text-[#7a6c57] uppercase">
            Account Recovery
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-[#243821] sm:text-[2.1rem]">
            Forgot Password
          </h1>
          <p className="mt-3 text-sm text-[#6a6457]">
            Enter your account email and we will send you a secure reset link.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <input
              type="email"
              required
              autoComplete="email"
              className={inputClassName}
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            {message ? <p className="text-sm text-[#2f5d31]">{message}</p> : null}
            {error ? <p className="text-sm text-red-700">{error}</p> : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full rounded-full bg-[linear-gradient(135deg,#2f5d31_0%,#7e8d2f_100%)] px-6 py-3.5 text-sm font-bold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_30px_rgba(47,93,49,0.22)] ${isSubmitting ? "cursor-not-allowed opacity-70" : ""}`}
            >
              {isSubmitting ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <Link
            href="/get-started"
            className="mt-5 inline-block text-sm font-medium text-[#6a6457] transition-colors hover:text-[#2f5d31]"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    </section>
  );
}
