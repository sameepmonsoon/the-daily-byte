"use client";

import React from "react";
import {
  Laptop,
  HeartPulse,
  Briefcase,
  Plane,
  Utensils,
  GraduationCap,
  Coffee,
} from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";

// Type for a single category
export interface Category {
  title: string;
  icon: React.ReactNode;
  href: string;
}

// Expanded category data
const categoryData: Category[] = [
  {
    title: "Technology",
    icon: <Laptop className="size-8" />,
    href: "/blogs/categories/1",
  },
  {
    title: "Lifestyle",
    icon: <Coffee className="size-8" />,
    href: "/blogs/categories/2",
  },
  {
    title: "Business",
    icon: <Briefcase className="size-8" />,
    href: "/blogs/categories/3",
  },
  {
    title: "Health & Wellness",
    icon: <HeartPulse className="size-8" />,
    href: "/blogs/categories/4",
  },
  {
    title: "Travel",
    icon: <Plane className="size-8" />,
    href: "/blogs/categories/5",
  },
  {
    title: "Food & Recipes",
    icon: <Utensils className="size-8" />,
    href: "/blogs/categories/6",
  },
  {
    title: "Education",
    icon: <GraduationCap className="size-8" />,
    href: "/blogs/categories/7",
  },
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
          <CarouselContent className="gap-4 px-4">
            {categoryData.map((item, index) => (
              <CarouselItem
                key={index}
                className="w-32 flex-none px-1 sm:w-36 md:w-40 lg:w-44"
              >
                <Link href={item.href} className="p-1">
                  <div className="items-center justify-center rounded-full bg-gray-100/80 dark:bg-gray-800">
                    <div className="flex aspect-square items-center justify-center p-4">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="mt-4 text-center text-sm font-medium text-gray-800 dark:text-white">
                    {item.title}
                  </h3>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default Categories;
