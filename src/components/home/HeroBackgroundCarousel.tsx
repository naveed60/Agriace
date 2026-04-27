"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type HeroSlide = {
  src: string;
  alt: string;
  mediaWrapperClassName?: string;
  imageClassName?: string;
};

type HeroBackgroundCarouselProps = {
  slides: HeroSlide[];
  intervalMs?: number;
};

export default function HeroBackgroundCarousel({
  slides,
  intervalMs = 5000,
}: HeroBackgroundCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToPrevious = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? slides.length - 1 : currentIndex - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    if (slides.length < 2) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
    }, intervalMs);

    return () => window.clearInterval(intervalId);
  }, [intervalMs, slides.length]);

  if (slides.length === 0) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={index !== activeIndex}
        >
          <div
            className={`absolute inset-0 ${slide.mediaWrapperClassName ?? ""}`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className={`transition-transform duration-[1400ms] ease-out ${
                index === activeIndex ? "scale-100" : "scale-[1.04]"
              } ${slide.imageClassName ?? "object-cover object-center"}`.trim()}
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={goToPrevious}
        className="pointer-events-auto absolute top-1/2 left-4 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white shadow-[0_18px_40px_rgba(0,0,0,0.3)] backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:bg-white/18 sm:left-6 sm:h-[3.25rem] sm:w-[3.25rem] lg:left-8"
        aria-label="Show previous hero image"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        type="button"
        onClick={goToNext}
        className="pointer-events-auto absolute top-1/2 right-4 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white shadow-[0_18px_40px_rgba(0,0,0,0.3)] backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:bg-white/18 sm:right-6 sm:h-[3.25rem] sm:w-[3.25rem] lg:right-8"
        aria-label="Show next hero image"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {slides.length > 1 ? (
        <div className="pointer-events-auto absolute inset-x-0 bottom-6 z-20 flex items-center justify-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={`hero-indicator-${slide.src}`}
              type="button"
              onClick={() => goToSlide(index)}
              className={`h-2.5 rounded-full border border-white/18 transition-all duration-300 ${
                index === activeIndex
                  ? "w-8 bg-white"
                  : "w-2.5 bg-white/35 hover:bg-white/55"
              }`}
              aria-label={`Show hero slide ${index + 1}`}
              aria-pressed={index === activeIndex}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
