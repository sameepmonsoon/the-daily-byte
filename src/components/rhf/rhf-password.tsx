"use client";

import { cva } from "class-variance-authority";
import { Eye, EyeOff, LucideIcon } from "lucide-react";
import { useState } from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const passwordFieldVariants = cva("form-group", {
  variants: {
    variant: {
      default: "w-full",
      formGroup: "lg:w-[calc(50%-10px)] w-full",
      single: "w-full",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type Props<T extends FieldValues> = {
  inputFieldClassName?: string;
  name: Path<T>;
  label: string;
  placeholder: string;
  showLabel?: boolean;
  variant?: "default" | "formGroup" | "single";
  icon?: LucideIcon; // <-- added
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function RHFPasswordField<T extends FieldValues>({
  name,
  label,
  placeholder,
  showLabel = true,
  variant,
  required,
  inputFieldClassName,
  icon: Icon, // <-- destructure
  ...props
}: Props<T>) {
  const { control } = useFormContext();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible((prev) => !prev);
  const inputId = `input-${name}`;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className={cn(passwordFieldVariants({ variant }))}>
            {showLabel && (
              <FormLabel
                htmlFor={inputId}
                className="text-primary! font-medium dark:text-white!"
              >
                <span>
                  {label}
                  {required && <span className="text-red-600">*</span>}
                </span>
              </FormLabel>
            )}
            <FormControl>
              <div className="relative">
                <Input
                  id={inputId}
                  type={isVisible ? "text" : "password"}
                  placeholder={placeholder}
                  {...field}
                  {...props}
                  className={cn(
                    "focus-visible:border-primary focus-visible:ring-primary-200 h-10 pr-10 focus-visible:ring-1 dark:bg-gray-800 dark:text-white",
                    Icon && "pl-10",
                    inputFieldClassName,
                  )}
                />

                {/* Left icon */}
                {Icon && (
                  <Icon className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                )}

                {/* Right eye toggle */}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute top-0 right-0 h-full cursor-pointer px-3 py-2 text-gray-600 hover:bg-transparent"
                  onClick={toggleVisibility}
                  tabIndex={-1}
                >
                  {isVisible ? (
                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  )}
                  <span className="sr-only">
                    {isVisible ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
