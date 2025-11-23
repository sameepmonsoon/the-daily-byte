"use client";
import React, { useState, useEffect } from "react";
import CustomSelect from "../common/select/custom-category-select";
import { searchOptions } from "@/constants/navigation";
import { Search } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function HeaderBlogSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (searchQuery) params.set("search", searchQuery);
    else params.delete("search");

    if (pathname === "/") {
      // On home page → redirect to blogs page
      router.push(`/blogs?${params.toString()}`);
    } else {
      // On blogs or other page → just update the URL
      router.replace(`${pathname}?${params.toString()}`);
    }
  };

  // Handle clearing the searchQuery automatically
  //   useEffect(() => {
  //     if (searchQuery === "") {
  //       const params = new URLSearchParams(searchParams.toString());
  //       params.delete("search");

  //     }
  //   }, [searchQuery, pathname, router, searchParams]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-2">
        <CustomSelect options={searchOptions} />

        <div className="relative w-full max-w-[333px] sm:min-w-[333px]">
          <span className="bg-gray-4 absolute top-1/2 left-0 inline-block h-5.5 w-px -translate-y-1/2"></span>
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            type="search"
            name="search"
            id="search"
            placeholder="I am searching for..."
            autoComplete="off"
            className="dark:bg-primary/10 text-primary w-full rounded-[30px] border border-gray-200 bg-white py-2 pr-10 pl-4 duration-200 ease-in outline-none dark:border-white/30 dark:text-white"
          />

          <button
            type="submit"
            id="search-btn"
            aria-label="Search"
            className="hover:text-green absolute top-1/2 right-3 flex -translate-y-1/2 items-center justify-center duration-200 ease-in"
          >
            <Search className="size-4 dark:text-white" />
          </button>
        </div>
      </div>
    </form>
  );
}
