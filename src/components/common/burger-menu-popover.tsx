"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface MenuItem {
  title: string;
  path: string;
  submenu?: MenuItem[];
}

interface BurgerMenuPopoverProps {
  menuData: MenuItem[];
  className?: string;
  contentClassName?: string;
}

export const BurgerMenuPopover = ({
  menuData,
  className,
  contentClassName,
}: BurgerMenuPopoverProps) => {
  const pathname = usePathname();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          aria-label="Toggle menu"
          className={cn(
            "focus:ring-green flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 transition-colors hover:bg-gray-200 focus:ring-2 focus:ring-offset-2 focus:outline-none dark:bg-gray-800 dark:hover:bg-gray-700",
            className,
          )}
        >
          <Menu className="h-6 w-6 text-gray-900 dark:text-white" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        side="bottom"
        className={cn(
          "z-999999 flex w-56 flex-col gap-3 rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800",
          contentClassName,
        )}
      >
        {menuData.map((menuItem, i) => {
          const isActiveUrl = pathname.includes(menuItem.path);

          // Skip submenu for now
          if (menuItem.submenu) return null;

          return (
            <Link
              key={i}
              href={menuItem.path}
              className={cn(
                "text-dark hover:text-green before:bg-green relative text-sm font-medium transition before:absolute before:top-0 before:left-0 before:h-[3px] before:w-0 before:rounded-b-[3px] before:duration-200 before:ease-out hover:before:w-full dark:text-white/70 dark:hover:text-white",
                isActiveUrl && "text-green before:w-full dark:text-white",
              )}
            >
              {menuItem.title}
            </Link>
          );
        })}
      </PopoverContent>
    </Popover>
  );
};
