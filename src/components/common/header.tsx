"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import CustomSelect from "./custom-select";
import { menuData, searchOptions } from "@/data/navigation";
import { Search, TrendingUp, User, UserRound } from "lucide-react";
import { ThemeToggle } from "./buttons/theme-toggle-btn";
import { useSession } from "next-auth/react";

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
              <form>
                <div className="flex items-center">
                  <CustomSelect options={searchOptions} />

                  <div className="relative w-full max-w-[333px] sm:min-w-[333px]">
                    {/* <!-- divider --> */}
                    <span className="bg-gray-4 absolute top-1/2 left-0 inline-block h-5.5 w-px -translate-y-1/2"></span>
                    <input
                      onChange={(e) => setSearchQuery(e.target.value)}
                      value={searchQuery}
                      type="search"
                      name="search"
                      id="search"
                      placeholder="I am searching for..."
                      autoComplete="off"
                      className="dark:bg-primary/10 text-primary w-full rounded-r-[5px] border border-l-0! border-gray-200 bg-gray-100 py-2 pr-10 pl-4 duration-200 ease-in outline-none dark:border-white/30 dark:text-white"
                    />

                    <button
                      id="search-btn"
                      aria-label="Search"
                      className="hover:text-green absolute top-1/2 right-3 flex -translate-y-1/2 items-center justify-center duration-200 ease-in"
                    >
                      <Search className="size-4 dark:text-white" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* <!-- header top right --> */}
          <div className="flex w-full items-center gap-7.5 lg:w-auto">
            <span className="bg-gray-4 hidden h-7.5 w-px xl:block"></span>

            <div className="flex w-full items-center justify-between gap-10 lg:w-auto">
              <div className="flex items-center gap-5">
                {isAuthenticated ? (
                  <Link
                    href="/my-account/profile"
                    className="text-primary flex items-center gap-2.5 dark:text-white"
                  >
                    <UserRound />

                    <div>
                      <span className="block text-sm uppercase">account</span>
                      <p className="text-sm font-medium">
                        {session?.data?.user?.firstName}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <Link
                    href="/sign-in"
                    className="text-primary flex items-center gap-2.5 dark:text-white"
                  >
                    <UserRound />

                    <div>
                      <span className="block text-sm uppercase">account</span>
                      <p className="text-sm font-medium">Sign In</p>
                    </div>
                  </Link>
                )}
              </div>
              {/* theme toggle button */}
              <ThemeToggle />
              {/* <!-- Hamburger Toggle BTN --> */}
              <button
                id="Toggle"
                aria-label="Toggler"
                className="block xl:hidden"
                onClick={() => setNavigationOpen(!navigationOpen)}
              >
                <span className="relative block h-5.5 w-5.5 cursor-pointer">
                  <span className="du-block absolute right-0 h-full w-full">
                    <span
                      className={`bg-dark relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm delay-[0] duration-200 ease-in-out ${
                        !navigationOpen && "w-full! delay-300"
                      }`}
                    ></span>
                    <span
                      className={`bg-dark relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm delay-150 duration-200 ease-in-out ${
                        !navigationOpen && "w-full! delay-400"
                      }`}
                    ></span>
                    <span
                      className={`bg-dark relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm delay-200 duration-200 ease-in-out ${
                        !navigationOpen && "w-full! delay-500"
                      }`}
                    ></span>
                  </span>

                  <span className="absolute right-0 block h-full w-full rotate-45">
                    <span
                      className={`bg-dark absolute top-0 left-2.5 block h-full w-0.5 rounded-sm delay-300 duration-200 ease-in-out ${
                        !navigationOpen && "h-0! delay-[0]"
                      }`}
                    ></span>
                    <span
                      className={`bg-dark absolute top-2.5 left-0 block h-0.5 w-full rounded-sm delay-400 duration-200 ease-in-out ${
                        !navigationOpen && "dealy-200 h-0!"
                      }`}
                    ></span>
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-b dark:border-white/20">
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
                      // <Dropdown key={i} menuItem={menuItem} stickyMenu={stickyMenu} />
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
                            "hover:text-green text-custom-sm text-dark flex text-sm font-medium hover:text-green-900 xl:py-6 dark:text-white/70 dark:hover:text-white",
                            stickyMenu && "xl:py-4",
                            isActiveUrl && "text-green-900! dark:text-white!",
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
                    className="text-custom-sm text-dark hover:text-green flex items-center gap-1.5 text-sm font-medium hover:text-green-900 dark:text-white/70 dark:hover:text-white"
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

export default Header;
