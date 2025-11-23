"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import CustomSelect from "./select/custom-category-select";
import { menuData, searchOptions } from "@/constants/navigation";
import { Search, TrendingUp, UserRound } from "lucide-react";
import { ThemeToggle } from "./buttons/theme-toggle-btn";
import { useSession } from "next-auth/react";
import { BurgerMenuPopover } from "./burger-menu-popover";
import HeaderBlogSearch from "../blogs/header-blog-search";

const Header = () => {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  1;

  // Sticky menu
  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
  });

  const session = useSession();
  const isAuthenticated = session.status === "authenticated";

  return (
    <header
      className={`fixed top-0 left-0 z-9999 w-full bg-white transition-all duration-300 ease-in-out dark:bg-gray-900 ${
        stickyMenu && "shadow"
      }`}
    >
      <div className="mx-auto max-w-[1170px] px-4 sm:px-7.5 xl:px-0">
        {/* <!-- header top start --> */}
        <div
          className={`flex flex-col items-end gap-5 duration-200 ease-out lg:flex-row lg:items-center xl:justify-between ${
            stickyMenu ? "py-4" : "py-6"
          }`}
        >
          {/* <!-- header top left --> */}
          <div className="flex w-full flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-10 xl:w-auto">
            <Link className="hrink-0" href="/">
              <Image src="/logo.png" alt="Logo" width={150} height={22} />
            </Link>

            <div className="w-full max-w-[475px]">
              <HeaderBlogSearch />
            </div>
          </div>

          {/* <!-- header top right --> */}
          <div className="flex w-full items-center gap-7.5 lg:w-auto">
            <span className="bg-gray-4 hidden h-7.5 w-px xl:block"></span>

            <div className="flex w-full items-center justify-between gap-10 lg:w-auto">
              <div className="flex items-center gap-5">
                <AccountLink
                  href={isAuthenticated ? "/dashboard/blogs/list" : "/sign-in"}
                  title={
                    isAuthenticated
                      ? (session?.data?.user?.firstName ?? "Account")
                      : "Sign In"
                  }
                />
              </div>
              {/* theme toggle button */}
              <ThemeToggle />
              {/* <!-- Hamburger Toggle Btn--> */}
              <BurgerMenuPopover
                menuData={menuData}
                className="xl:hidden"
                contentClassName="xl:hidden"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-b border-gray-200 dark:border-b dark:border-white/20">
        <div className="mx-auto max-w-[1170px] px-4 sm:px-7.5 xl:px-0">
          <div className="flex items-center justify-between">
            {/* <!--=== Main Nav Start ===--> */}
            <div
              className={`invisible absolute top-full right-4 h-0 w-[288px] items-center justify-between xl:visible xl:static xl:flex xl:h-auto xl:w-auto ${
                navigationOpen &&
                `border-gray-3 visible! h-auto! max-h-[400px] overflow-y-scroll rounded-md border bg-white p-5 shadow-lg`
              }`}
            >
              {/* <!-- Main Nav Start --> */}
              <nav>
                <ul className="flex flex-col gap-5 xl:flex-row xl:items-center xl:gap-6">
                  {menuData.map((menuItem, i) => {
                    const isActiveUrl = pathname.includes(menuItem.path);
                    return menuItem.submenu ? (
                      <></>
                    ) : (
                      <li
                        key={i}
                        className={cn(
                          "group before:bg-green relative before:absolute before:top-0 before:left-0 before:h-[3px] before:w-0 before:rounded-b-[3px] before:duration-200 before:ease-out hover:before:w-full",
                          isActiveUrl && "before:w-full",
                        )}
                      >
                        <Link
                          href={menuItem.path}
                          className={cn(
                            "hover:text-green text-custom-sm text-dark flex text-sm font-medium hover:text-blue-900 xl:py-6 dark:text-white/70 dark:hover:text-white",
                            stickyMenu && "xl:py-4",
                            isActiveUrl && "text-blue-900! dark:text-white!",
                          )}
                        >
                          {menuItem.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              {/* //   <!-- Main Nav End --> */}
            </div>
            <div className="hidden xl:block">
              <ul className="flex items-center gap-5.5">
                <li className="py-4">
                  <Link
                    href="#"
                    className="text-custom-sm text-dark hover:text-green flex items-center gap-1.5 text-sm font-medium hover:text-blue-900 dark:text-white/70 dark:hover:text-white"
                  >
                    <TrendingUp />
                    Latest Trending Blogs
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// account link
function AccountLink({ href, title }: { href: string; title: string }) {
  return (
    <Link
      href={href}
      className="text-primary flex items-center gap-2.5 dark:text-white"
    >
      <span className="flex size-10 items-center justify-center rounded-full border p-1">
        <UserRound className="size-4" />
      </span>

      <div>
        <span className="text-accent-foreground/60 block text-[10px] font-semibold uppercase dark:text-white">
          account
        </span>
        <p className="text-sm font-medium">{title}</p>
      </div>
    </Link>
  );
}

export default Header;
