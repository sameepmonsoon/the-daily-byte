"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Menu } from "@/types/menu";

interface DropdownProps {
  menuItem: Menu;
  stickyMenu?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  menuItem,
  stickyMenu = false,
}) => {
  const [dropdownToggler, setDropdownToggler] = useState(false);
  const pathUrl = usePathname();

  return (
    <li
      onClick={() => setDropdownToggler(!dropdownToggler)}
      className={cn(
        "group before:bg-green relative before:absolute before:top-0 before:left-0 before:h-[3px] before:w-0 before:rounded-b-[3px] before:duration-200 before:ease-out hover:before:w-full",
        pathUrl.includes(menuItem.title) && "before:w-full",
      )}
    >
      <Link
        href="#"
        className={cn(
          "hover:text-green text-custom-sm text-dark flex items-center gap-1.5 font-medium capitalize xl:py-6",
          stickyMenu && "xl:py-4",
          pathUrl.includes(menuItem.title) && "text-green!",
          true && "bg-red-dark",
        )}
      >
        {menuItem.title}
        <svg
          className="cursor-pointer fill-current"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.95363 5.67461C3.13334 5.46495 3.44899 5.44067 3.65866 5.62038L7.99993 9.34147L12.3412 5.62038C12.5509 5.44067 12.8665 5.46495 13.0462 5.67461C13.2259 5.88428 13.2017 6.19993 12.992 6.37964L8.32532 10.3796C8.13808 10.5401 7.86178 10.5401 7.67453 10.3796L3.00787 6.37964C2.7982 6.19993 2.77392 5.88428 2.95363 5.67461Z"
            fill=""
          />
        </svg>
      </Link>

      {/* Dropdown */}
      <ul
        className={cn(
          "dropdown",
          dropdownToggler && "flex",
          stickyMenu
            ? "xl:group-hover:translate-y-0"
            : "xl:group-hover:translate-y-0",
        )}
      >
        {menuItem?.submenu?.map((item, i) => (
          <li key={i}>
            <Link
              href={item.path}
              className={cn(
                "text-custom-sm hover:text-green hover:bg-gray-1 flex px-4.5 py-[7px]",
                pathUrl === item.path && "text-green bg-gray-1",
              )}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default Dropdown;
