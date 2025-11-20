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
    discount: "30%",
    title: "Sit in Style",
    description: `Handcrafted excellence for modern living. Let's make your home look beautiful.`,
    imageSrc: "/images/hero/hero-main.png",
    imageAlt: "headphone",
    link: "#",
  },
  {
    discount: "15%",
    title: "Transform your living room",
    description: `It's not just a sofa. It's where memories are made, movie nights begin, and naps hit just right.`,
    imageSrc: "/images/hero/hero-01.png",
    imageAlt: "headphone",
    link: "#",
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
        <CarouselContent className="-ml-4">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="flex-none basis-1/1 px-4">
              <div className="flex flex-col-reverse items-center justify-between sm:flex-row">
                <div className="max-w-[394px] px-4 py-10 sm:px-7.5 sm:py-15 lg:px-12.5 lg:py-14">
                  <div className="mb-10 flex items-center gap-4">
                    <span className="text-heading-1 font-semibold text-green-600">
                      {slide.discount}
                    </span>
                    <span className="text-dark text-sm sm:text-base">
                      Sale
                      <br />
                      Off
                    </span>
                  </div>

                  <h1 className="text-dark mb-3 text-3xl font-semibold sm:text-5xl">
                    <Link href={slide.link}>{slide.title}</Link>
                  </h1>

                  <p className="text-body">{slide.description}</p>

                  <Link
                    href={slide.link}
                    className="mt-10 inline-flex items-center justify-center rounded-sm bg-green-800 px-8 py-2.5 text-white transition hover:bg-green-900"
                  >
                    Shop Now
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
              idx === selectedIndex ? "bg-green-600" : "bg-gray-200"
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
