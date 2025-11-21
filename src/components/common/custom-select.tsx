"use client";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Option {
  label: string;
  value: string | number;
}

interface CustomSelectProps {
  options: Option[];
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | undefined>(
    options[0],
  );
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  // Close on outside click or scroll
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScroll, true);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [isOpen]);

  return (
    <div
      ref={dropdownRef}
      className="custom-select relative w-[200px] dark:bg-gray-900!"
    >
      <div
        onClick={toggleDropdown}
        className={cn(
          "select-selected text-primary cursor-pointer rounded-md rounded-r-none border bg-white px-3 py-2.5 text-sm whitespace-nowrap dark:border-white/30 dark:bg-gray-900 dark:text-white",
          isOpen && "select-arrow-active border-blue-500",
        )}
      >
        {selectedOption?.label}
      </div>

      {isOpen && (
        <div
          className={cn(
            "select-items text-primary absolute z-10 mt-1 w-full min-w-46 rounded-md border bg-white shadow-md dark:border-white/30 dark:bg-gray-900! dark:text-white",
          )}
        >
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(option)}
              className={cn(
                "select-item cursor-pointer px-3 py-2 hover:bg-gray-100 dark:hover:bg-white/10",
                selectedOption?.value === option?.value &&
                  "bg-gray-200 dark:bg-white/10",
              )}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
