"use client";
import Image from "next/image";
import Link from "next/link";
import HeroCarousel from "./hero-carousel";
import HeroFeature from "./hero-feature";

const Hero = () => {
  return (
    <section className="overflow-hidden bg-gray-100 pt-57.5 pb-10 sm:pt-45 lg:pt-30 lg:pb-12.5 xl:pt-51.5 xl:pb-15 dark:bg-gray-900!">
      <div className="mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <div className="flex flex-wrap gap-5">
          <div className="w-full xl:max-w-[757px]">
            <div className="relative z-1 overflow-hidden rounded-[10px] bg-white dark:bg-white/5">
              <Image
                src="/images/hero/hero-bg.png"
                alt="hero bg shapes"
                className="absolute right-0 bottom-0 -z-1"
                width={534}
                height={520}
              />

              <HeroCarousel />
            </div>
          </div>
          <div className="flex w-full flex-1 flex-col gap-5 sm:flex-row xl:max-w-[393px] xl:flex-col">
            {/* First Blog Card */}
            <div className="text-dark relative flex w-full flex-1 flex-col rounded-[10px] bg-white p-4 sm:p-7.5 dark:bg-white/5 dark:text-white">
              <div className="flex flex-1 items-start gap-6">
                <div className="flex flex-1 flex-col justify-between">
                  <h2 className="text-dark mb-2 text-xl font-semibold">
                    <Link href="/blogs/#">AI in Daily Life</Link>
                  </h2>
                  <p className="text-custom-sm mb-2 font-medium text-blue-400">
                    5 min
                  </p>
                  <p className="text-heading-5 text-red font-medium">
                    Explore how AI is reshaping the way we work, communicate,
                    and make decisions. Discover how artificial intelligence is
                    transforming our ...
                  </p>
                </div>
              </div>
            </div>

            {/* Second Blog Card */}
            <div className="text-primary relative flex w-full flex-1 flex-col rounded-[10px] bg-white p-4 sm:p-7.5 dark:bg-white/5 dark:text-white">
              <div className="flex flex-1 items-start gap-6">
                <div className="flex flex-1 flex-col justify-between">
                  <h2 className="text-dark mb-2 text-xl font-semibold">
                    <Link href="/blogs/#">
                      Beginner’s Guide to Stock Investing
                    </Link>
                  </h2>
                  <p className="text-custom-sm mb-2 font-medium text-blue-400">
                    6 min
                  </p>
                  <p className="text-heading-5 text-red font-medium">
                    Want to grow your wealth but don’t know where to start?
                    Learn the essentials of stock investing....
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <HeroFeature />
    </section>
  );
};

export default Hero;
