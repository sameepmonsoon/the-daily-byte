"use client";

import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Tag,
  Truck,
  RefreshCcw,
  Shield,
  Headphones,
  Heart,
  Star,
  Box,
  Gift,
  Globe,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";

// Type for a single category
export interface Category {
  title: string;
  icon: React.ReactNode; // Lucide icon
}

// Expanded category data
const categoryData: Category[] = [
  {
    title: "Free Shipping",
    icon: <Truck className="size-8" />,
  },
  {
    title: "1 & 1 Returns",
    icon: <RefreshCcw className="size-8" />,
  },
  {
    title: "Secure Payments",
    icon: <Shield className="size-8" />,
  },
  {
    title: "24/7 Support",
    icon: <Headphones className="size-8" />,
  },
  { title: "New Arrivals", icon: <Tag className="size-8" /> },
  {
    title: "Best Sellers",
    icon: <Star className="size-8" />,
  },
  { title: "Favorites", icon: <Heart className="size-8" /> },
  { title: "Gift Cards", icon: <Gift className="size-8" /> },
];

const Categories: React.FC = () => {
  return (
    <section className="overflow-hidden pt-16 dark:border-t-[0.5px] dark:border-t-gray-700 dark:bg-gray-900 dark:text-white">
      <div className="mx-auto w-full max-w-[1170px] border-b border-gray-200 px-4 pb-16 sm:px-8 xl:px-0 dark:border-b-gray-700">
        {/* Section Header */}
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-xl font-semibold xl:text-2xl">
            Browse by Category
          </h2>
        </div>

        {/* Carousel */}
        <Carousel className="w-full">
          <CarouselContent className="gap-4 pl-2">
            {categoryData.map((item, index) => (
              <CarouselItem
                key={index}
                className="w-32 flex-none px-1 sm:w-36 md:w-40 lg:w-44"
              >
                <div className="p-1">
                  <div className="items-center justify-center rounded-full bg-gray-100/80 dark:bg-gray-800">
                    <div className="flex aspect-square items-center justify-center p-4">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="mt-4 text-center text-sm font-medium text-gray-800 dark:text-white">
                    {item.title}
                  </h3>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default Categories;
