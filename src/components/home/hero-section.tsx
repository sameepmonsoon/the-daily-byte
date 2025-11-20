"use client";
import Image from "next/image";
import Link from "next/link";
import HeroCarousel from "./hero-carousel";

const Hero = () => {
  return (
    <section className="overflow-hidden bg-[#E5EAF4] pt-57.5 pb-10 sm:pt-45 lg:pt-30 lg:pb-12.5 xl:pt-51.5 xl:pb-15">
      <div className="mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <div className="flex flex-wrap gap-5">
          <div className="w-full xl:max-w-[757px]">
            <div className="relative z-1 overflow-hidden rounded-[10px] bg-white">
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

          <div className="w-full xl:max-w-[393px]">
            <div className="flex flex-col gap-5 sm:flex-row xl:flex-col">
              <div className="relative w-full rounded-[10px] bg-white p-4 sm:p-7.5">
                <div className="flex items-center gap-14">
                  <div>
                    <h2 className="text-dark mb-20 max-w-[153px] text-xl font-semibold">
                      <Link href="#"> Single Grey Sofa</Link>
                    </h2>

                    <div>
                      <p className="text-dark-4 text-custom-sm mb-1.5 font-medium">
                        limited time offer
                      </p>
                      <span className="flex items-center gap-3">
                        <span className="text-heading-5 text-red font-medium">
                          $150
                        </span>
                        <span className="text-dark-4 text-2xl font-medium line-through">
                          $180
                        </span>
                      </span>
                    </div>
                  </div>

                  <div>
                    <Image
                      src="/images/hero/hero-02.png"
                      alt="mobile image"
                      width={123}
                      height={161}
                    />
                  </div>
                </div>
              </div>
              <div className="relative w-full rounded-[10px] bg-white p-4 sm:p-7.5">
                <div className="flex items-center gap-14">
                  <div>
                    <h2 className="text-dark mb-20 max-w-[153px] text-xl font-semibold">
                      <Link href="#"> Aesthetic Wooden Chair</Link>
                    </h2>

                    <div>
                      <p className="text-dark-4 text-custom-sm mb-1.5 font-medium">
                        limited time offer
                      </p>
                      <span className="flex items-center gap-3">
                        <span className="text-heading-5 text-red font-medium">
                          $79
                        </span>
                        <span className="text-dark-4 text-2xl font-medium line-through">
                          $99
                        </span>
                      </span>
                    </div>
                  </div>

                  <div>
                    <Image
                      src="/images/hero/hero-main.png"
                      alt="mobile image"
                      width={123}
                      height={161}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Hero features --> */}
      {/* <HeroFeature /> */}
    </section>
  );
};

export default Hero;
