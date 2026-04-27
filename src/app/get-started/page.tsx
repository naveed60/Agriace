"use client";

import { useState } from "react";

type AuthMode = "login" | "signup";

const sliderTrackClassName =
  "flex w-[200%] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]";

const socialButtonClassName =
  "flex h-11 w-11 items-center justify-center rounded-full border border-[#ddd3bf] text-[#6a6457] transition-colors hover:border-[#2f5d31] hover:text-[#2f5d31]";

const inputClassName =
  "w-full rounded-2xl border border-[#e5dcc9] bg-[#fbf8f1] px-4 py-3 text-[#243821] outline-none transition-all duration-300 placeholder:text-[#9a8f7b] focus:border-[#94a24a] focus:bg-white focus:shadow-[0_0_0_4px_rgba(126,141,47,0.12)]";

function SocialButtons() {
  return (
    <div className="mt-8 flex justify-center gap-3">
      <button
        type="button"
        className={socialButtonClassName}
        aria-label="Continue with Facebook"
      >
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </button>
      <button
        type="button"
        className={socialButtonClassName}
        aria-label="Continue with Google"
      >
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
      </button>
      <button
        type="button"
        className={socialButtonClassName}
        aria-label="Continue with LinkedIn"
      >
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </button>
    </div>
  );
}

function LoginForm() {
  return (
    <form className="mx-auto w-full max-w-md">
      <div className="rounded-full border border-[#e8dfcc] bg-white/80 px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.24em] text-[#7a6c57]">
        Member Login
      </div>

      <h3 className="mt-6 text-center text-3xl font-semibold tracking-[-0.03em] text-[#243821] sm:text-[2rem]">
        Sign in
      </h3>

      <SocialButtons />

      <p className="mt-6 text-center text-sm text-[#6a6457]">
        or use your account email
      </p>

      <div className="mt-6 space-y-4">
        <input type="email" placeholder="Email" className={inputClassName} />
        <input type="password" placeholder="Password" className={inputClassName} />
      </div>

      <button
        type="button"
        className="mt-3 text-sm font-medium text-[#6a6457] transition-colors hover:text-[#2f5d31]"
      >
        Forgot your password?
      </button>

      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-[linear-gradient(135deg,#2f5d31_0%,#7e8d2f_100%)] px-6 py-3.5 text-sm font-bold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_30px_rgba(47,93,49,0.22)]"
      >
        Sign In
      </button>
    </form>
  );
}

function SignupForm() {
  return (
    <form className="mx-auto w-full max-w-md">
      <div className="rounded-full border border-[#e8dfcc] bg-white/80 px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.24em] text-[#7a6c57]">
        New Registration
      </div>

      <h3 className="mt-6 text-center text-3xl font-semibold tracking-[-0.03em] text-[#243821] sm:text-[2rem]">
        Create Account
      </h3>

      <SocialButtons />

      <p className="mt-6 text-center text-sm text-[#6a6457]">
        or use your email for registration
      </p>

      <div className="mt-6 space-y-4">
        <input type="text" placeholder="Name" className={inputClassName} />
        <input type="email" placeholder="Email" className={inputClassName} />
        <input type="password" placeholder="Password" className={inputClassName} />
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-[linear-gradient(135deg,#2f5d31_0%,#7e8d2f_100%)] px-6 py-3.5 text-sm font-bold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_30px_rgba(47,93,49,0.22)]"
      >
        Sign Up
      </button>
    </form>
  );
}

function IntroPanel({
  eyebrow,
  title,
  description,
  buttonLabel,
  onClick,
}: {
  eyebrow: string;
  title: string;
  description: string;
  buttonLabel: string;
  onClick: () => void;
}) {
  return (
    <div className="flex h-full min-h-[340px] w-full items-center justify-center px-8 py-12 text-center sm:px-10 lg:min-h-[560px] lg:px-12">
      <div className="mx-auto flex w-full max-w-[24rem] flex-col items-center justify-center gap-5">
        <p className="text-[0.78rem] font-bold tracking-[0.3em] text-white/90 uppercase">
          {eyebrow}
        </p>
        <h2 className="text-4xl leading-[1.05] font-light tracking-[-0.04em] text-white sm:text-[4rem]">
          {title}
        </h2>
        <p className="max-w-[21rem] text-base leading-8 text-white/82 sm:text-[1.15rem]">
          {description}
        </p>
        <button
          type="button"
          onClick={onClick}
          className="mt-2 inline-flex min-w-40 items-center justify-center rounded-full border border-white/70 bg-transparent px-10 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:bg-white hover:text-[#2f5d31]"
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}

export default function GetStartedPage() {
  const [mode, setMode] = useState<AuthMode>("login");
  const isLogin = mode === "login";

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f7f3e8_0%,#eef3e6_100%)] py-14 sm:py-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-16 left-[10%] h-48 w-48 rounded-full bg-[#b98a2c]/10 blur-3xl" />
        <div className="absolute right-[8%] bottom-10 h-64 w-64 rounded-full bg-[#2f5d31]/12 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#7a6c57]">
            Account Access
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#243821] sm:text-5xl">
            Sign in and sign up inside one sliding card
          </h1>
          <p className="mt-4 text-base leading-7 text-[#655f51] sm:text-lg">
            Click the action button and the content now slides across the modal card
            instead of switching like a separate full page.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/88 shadow-[0_30px_90px_rgba(66,52,23,0.16)] backdrop-blur-xl">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
            <div className="relative min-h-[440px] overflow-hidden bg-[linear-gradient(145deg,#274d29_0%,#365d31_42%,#7e8d2f_100%)] text-white lg:min-h-[640px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,214,120,0.2),transparent_28%)]" />
              <div
                className={`absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isLogin ? "translate-x-0" : "-translate-x-full"
                }`}
              >
                <IntroPanel
                  eyebrow="New Here?"
                  title="Create Account"
                  description="Enter your personal details and start your journey with us."
                  buttonLabel="Sign Up"
                  onClick={() => setMode("signup")}
                />
              </div>
              <div
                className={`absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isLogin ? "translate-x-full" : "translate-x-0"
                }`}
              >
                <IntroPanel
                  eyebrow="One Of Us?"
                  title="Sign In"
                  description="To keep connected with us please login with your personal info."
                  buttonLabel="Sign In"
                  onClick={() => setMode("login")}
                />
              </div>
            </div>

            <div className="overflow-hidden bg-[linear-gradient(180deg,#fffdf8_0%,#f8f5ec_100%)] p-6 sm:p-8 lg:p-12">
              <div className="mb-8 flex justify-center">
                <div className="relative grid w-full max-w-xs grid-cols-2 rounded-full border border-[#e5dcc9] bg-white/80 p-1 text-sm font-semibold text-[#6a6457] shadow-[0_10px_30px_rgba(91,74,38,0.08)]">
                  <div
                    className={`absolute inset-y-1 w-[calc(50%-0.25rem)] rounded-full bg-[linear-gradient(135deg,#2f5d31_0%,#7e8d2f_100%)] shadow-[0_12px_24px_rgba(47,93,49,0.22)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isLogin ? "translate-x-0" : "translate-x-full"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className={`relative z-10 rounded-full px-5 py-3 transition-colors ${
                      isLogin ? "text-white" : "text-[#6a6457]"
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("signup")}
                    className={`relative z-10 rounded-full px-5 py-3 transition-colors ${
                      isLogin ? "text-[#6a6457]" : "text-white"
                    }`}
                  >
                    Sign Up
                  </button>
                </div>
              </div>

              <div className="overflow-hidden">
                <div
                  className={`${sliderTrackClassName} items-start ${
                    isLogin ? "translate-x-0" : "-translate-x-1/2"
                  }`}
                >
                  <div className="w-1/2 shrink-0">
                    <LoginForm />
                  </div>
                  <div className="w-1/2 shrink-0">
                    <SignupForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
