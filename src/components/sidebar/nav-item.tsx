"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import logger from "@/lib/logger";
import { cn } from "@/lib/utils";

export function NavMain({
  items,
  label,
}: {
  label: string;
  items: {
    title: string;
    url?: string;
    icon: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const pathName = usePathname();
  const checkIsActive = (url?: string) => {
    logger.log("url", { url, pathName });
    return pathName === url;
  };
  const checkIsSubMenuActive = (url?: string) => {
    if (url) return pathName.includes(url);
    return pathName === url;
  };
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="tracking-wide">{label}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) =>
          item.items && item.items.length > 0 ? (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem className="pl-2">
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={cn(
                      "h-10 cursor-pointer rounded-sm! dark:hover:bg-gray-800 dark:hover:text-white!",
                      {
                        "text-primary bg-custom-gray-4/10 hover:text-primary!":
                          checkIsSubMenuActive(item.url),
                      },
                      checkIsActive(item.url)
                        ? "text-primary bg-custom-gray-4/10 hover:text-primary! dark:bg-white! dark:text-white"
                        : "hover:bg-custom-gray-4/10! hover:text-primary! dark:text-white!",
                    )}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          asChild
                          className={cn(
                            "group h-8 rounded-sm! dark:hover:bg-gray-800 dark:hover:text-white",
                            checkIsActive(subItem.url)
                              ? "text-primary! bg-custom-gray-4/10"
                              : "hover:bg-custom-gray-4/10! hover:text-primary dark:hover:text-white",
                          )}
                        >
                          <Link
                            href={subItem.url}
                            className={cn("flex items-center justify-start")}
                          >
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.title} className="pl-2">
              <SidebarMenuButton
                tooltip={item.title}
                className={cn(
                  "h-10 cursor-pointer rounded-sm! dark:text-white dark:hover:bg-gray-800 dark:hover:text-white",
                  checkIsActive(item.url)
                    ? "text-primary bg-custom-gray-4/10 hover:!text-primary!"
                    : "hover:bg-custom-gray-4/10! hover:text-primary",
                )}
                asChild
              >
                <Link href={item?.url ?? "#"}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ),
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
