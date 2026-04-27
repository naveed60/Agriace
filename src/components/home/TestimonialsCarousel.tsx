"use client";

import { useEffect, useRef } from "react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  location: string;
  accent: string;
};

const CARD_GAP_PX = 24;
const MARQUEE_SPEED_PX_PER_SECOND = 42;

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "previous" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={
        direction === "previous"
          ? "Show previous testimonials"
          : "Show next testimonials"
      }
      className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#d9cfbb] bg-[linear-gradient(180deg,#fffdf8_0%,#f5ecdc_100%)] text-[#23371f] shadow-[0_10px_24px_rgba(91,74,38,0.10)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#cdbf9a] hover:shadow-[0_16px_28px_rgba(91,74,38,0.14)]"
    >
      <svg
        className={`h-5 w-5 ${direction === "next" ? "" : "rotate-180"}`}
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
    </button>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  return (
    <article className="relative w-[21.5rem] shrink-0 overflow-hidden rounded-[2rem] border border-[#e2d8c4] bg-[linear-gradient(180deg,#fffdfa_0%,#f7efe0_100%)] p-7 shadow-[0_20px_48px_rgba(91,74,38,0.10)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_62px_rgba(91,74,38,0.14)] sm:w-[24rem] lg:w-[26rem]">
      <div
        className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${testimonial.accent}`}
        aria-hidden="true"
      />

      <div className="flex items-start justify-between gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#2f5d31_0%,#7e8d2f_100%)] text-white shadow-[0_12px_24px_rgba(47,93,49,0.18)]">
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7.17 6A5.001 5.001 0 002 11v7h7v-7H6.03a3 3 0 013.14-3H10V6H7.17zm9 0A5.001 5.001 0 0011 11v7h7v-7h-2.97a3 3 0 013.14-3H19V6h-2.83z" />
          </svg>
        </div>

        <div className="rounded-full border border-[#e5dcc9] bg-white/90 px-3 py-1 text-[0.7rem] font-semibold tracking-[0.18em] text-[#8b6835] uppercase">
          0{index + 1}
        </div>
      </div>

      <p className="mt-6 text-[1.02rem] leading-8 text-[#4f4a3f]">
        “{testimonial.quote}”
      </p>

      <div className="mt-8 border-t border-[#e6ddcc] pt-5">
        <div className="text-[1.02rem] font-bold text-[#2c3f23]">
          {testimonial.name}
        </div>
        <div className="mt-1 text-sm font-medium text-[#6d654f]">
          {testimonial.role}
        </div>
        <div className="mt-2 inline-flex items-center rounded-full bg-[#f3ecde] px-3 py-1 text-[0.72rem] font-semibold tracking-[0.16em] text-[#7f6c46] uppercase">
          {testimonial.location}
        </div>
      </div>
    </article>
  );
}

export default function TestimonialsCarousel({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const firstGroupRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const loopWidthRef = useRef(0);
  const isPausedRef = useRef(false);
  const prefersReducedMotionRef = useRef(false);

  const shiftTrack = (direction: "previous" | "next") => {
    const firstCard = firstGroupRef.current?.querySelector("article");
    const track = trackRef.current;

    if (!firstCard || !track || loopWidthRef.current <= 0) {
      return;
    }

    const step = firstCard.getBoundingClientRect().width + CARD_GAP_PX;
    let nextOffset =
      offsetRef.current + (direction === "previous" ? step : -step);

    while (nextOffset <= -loopWidthRef.current) {
      nextOffset += loopWidthRef.current;
    }

    while (nextOffset > 0) {
      nextOffset -= loopWidthRef.current;
    }

    offsetRef.current = nextOffset;
    track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
    lastTimestampRef.current = null;
  };

  useEffect(() => {
    const updateTrackPosition = () => {
      const track = trackRef.current;

      if (!track) {
        return;
      }

      track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
    };

    const normalizeOffset = (offset: number) => {
      const loopWidth = loopWidthRef.current;

      if (loopWidth <= 0) {
        return 0;
      }

      let nextOffset = offset;

      while (nextOffset <= -loopWidth) {
        nextOffset += loopWidth;
      }

      while (nextOffset > 0) {
        nextOffset -= loopWidth;
      }

      return nextOffset;
    };

    const measureTrack = () => {
      const firstGroup = firstGroupRef.current;

      if (!firstGroup) {
        return;
      }

      loopWidthRef.current = firstGroup.getBoundingClientRect().width;
      offsetRef.current = normalizeOffset(offsetRef.current);
      updateTrackPosition();
    };

    const track = trackRef.current;

    if (!track) {
      return;
    }

    track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionPreferenceChange = () => {
      prefersReducedMotionRef.current = mediaQuery.matches;
    };

    handleMotionPreferenceChange();

    const stepFrame = (timestamp: number) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }

      const delta = timestamp - lastTimestampRef.current;
      lastTimestampRef.current = timestamp;

      if (
        !isPausedRef.current &&
        !prefersReducedMotionRef.current &&
        loopWidthRef.current > 0
      ) {
        offsetRef.current = normalizeOffset(
          offsetRef.current -
            (MARQUEE_SPEED_PX_PER_SECOND * delta) / 1000,
        );
        updateTrackPosition();
      }

      animationFrameRef.current = window.requestAnimationFrame(stepFrame);
    };

    const resizeObserver = new ResizeObserver(() => {
      measureTrack();
    });

    if (firstGroupRef.current) {
      resizeObserver.observe(firstGroupRef.current);
    }

    mediaQuery.addEventListener("change", handleMotionPreferenceChange);
    measureTrack();
    animationFrameRef.current = window.requestAnimationFrame(stepFrame);

    return () => {
      resizeObserver.disconnect();
      mediaQuery.removeEventListener("change", handleMotionPreferenceChange);

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="mt-12">
      <div
        className="testimonial-marquee group relative"
        onMouseEnter={() => {
          isPausedRef.current = true;
        }}
        onMouseLeave={() => {
          isPausedRef.current = false;
          lastTimestampRef.current = null;
        }}
        onFocusCapture={() => {
          isPausedRef.current = true;
        }}
        onBlurCapture={({ currentTarget, relatedTarget }) => {
          if (
            !(relatedTarget instanceof Node) ||
            !currentTarget.contains(relatedTarget)
          ) {
            isPausedRef.current = false;
            lastTimestampRef.current = null;
          }
        }}
      >
        <div className="absolute top-1/2 left-0 z-30 -translate-x-1/2 -translate-y-1/2">
          <ArrowButton
            direction="previous"
            onClick={() => {
              shiftTrack("previous");
            }}
          />
        </div>

        <div className="absolute top-1/2 right-0 z-30 translate-x-1/2 -translate-y-1/2">
          <ArrowButton
            direction="next"
            onClick={() => {
              shiftTrack("next");
            }}
          />
        </div>

        <div className="relative overflow-hidden rounded-[2.5rem]">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-[linear-gradient(90deg,#f5eddc_0%,rgba(245,237,220,0)_100%)] sm:w-24"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-[linear-gradient(270deg,#f1e8d7_0%,rgba(241,232,215,0)_100%)] sm:w-24"
            aria-hidden="true"
          />

          <div
            ref={trackRef}
            className="testimonial-marquee-track flex w-max gap-6 py-4 pr-6 will-change-transform"
          >
            <div ref={firstGroupRef} className="flex gap-6">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={`${testimonial.name}-${testimonial.role}`}
                  testimonial={testimonial}
                  index={index}
                />
              ))}
            </div>

            <div className="flex gap-6" aria-hidden="true">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={`duplicate-${testimonial.name}-${testimonial.role}`}
                  testimonial={testimonial}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
