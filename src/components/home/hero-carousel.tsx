"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

import AutoplayPlugin from "embla-carousel-autoplay";

const slides = [
  {
    title: "Master Your Finances",
    description: `HTake control of your financial future with easy-to-follow strategies for investing in stocks, ETFs, and other assets. Learn how to make informed decisions, minimize risks, and build long-term wealth—even if you’re just starting out.`,
    imageSrc: "/images/stock-bull.png",
    imageAlt: "stock-finances",
    link: "/blogs/#",
  },
  {
    title: "Travel Green",
    description: `Discover eco-friendly travel tips that let you see the world without leaving a heavy footprint. From sustainable accommodations to low-impact adventures, learn how to enjoy your trips responsibly while making a positive impact on the planet.`,
    imageSrc: "/images/travel-green.png",
    imageAlt: "travel-green",
    link: "/blogs/#",
  },
];

const HeroCarousel = () => {
  const [api, setApi] = useState<CarouselApi | undefined>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <div className="relative w-full overflow-hidden">
      <Carousel
        className="w-full"
        setApi={setApi}
        plugins={[AutoplayPlugin({ delay: 4500, stopOnInteraction: false })]}
        opts={{ loop: true }}
      >
        <CarouselContent className="-ml-4 bg-white dark:bg-white/5">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="flex-none basis-1/1 px-4">
              <div className="flex flex-col-reverse items-center justify-between sm:flex-row">
                <div className="max-w-[394px] px-4 py-10 sm:px-7.5 sm:py-15 lg:px-12.5 lg:py-14">
                  <h1 className="text-dark mb-3 text-3xl font-semibold sm:text-5xl dark:text-white">
                    <Link href={slide.link}>{slide.title}</Link>
                  </h1>

                  <p className="text-body dark:text-white/70">
                    {slide.description}
                  </p>

                  <Link
                    href={slide.link}
                    className="bg-primary/90 hover:bg-primary mt-10 inline-flex items-center justify-center rounded-sm px-8 py-2.5 text-white transition dark:bg-white/5"
                  >
                    Read More
                  </Link>
                </div>

                <div className="shrink-0">
                  <Image
                    src={slide.imageSrc}
                    alt={slide.imageAlt}
                    width={351}
                    height={358}
                    className="block"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-20 flex -translate-x-1/2 gap-0">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`h-0.5 w-12 rounded-4xl transition-all ${
              idx === selectedIndex ? "bg-blue-600" : "bg-gray-200"
            }`}
            onClick={() => api?.scrollTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
