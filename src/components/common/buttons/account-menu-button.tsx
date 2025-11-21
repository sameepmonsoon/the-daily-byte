"use client";

import { useSession, signOut } from "next-auth/react";
import { UserRound, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const AccountMenu = () => {
  const { data: session } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="text-primary z-99999 flex cursor-pointer items-center gap-2.5 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:text-white">
          <UserRound className="size-5" />
          <div className="text-left">
            <p className="text-sm font-medium">{session?.user?.firstName}</p>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="z-99999 w-48 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
      >
        <DropdownMenuItem
          className="cursor-pointer text-red-600 dark:text-red-400 dark:hover:bg-gray-600"
          onClick={() => signOut()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountMenu;
