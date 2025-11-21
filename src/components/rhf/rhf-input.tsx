import { cva } from "class-variance-authority";
import { LucideIcon } from "lucide-react";
import { FieldValues, Path, useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { Textarea } from "../ui/textarea";

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  placeholder: string;
  variant?: "default" | "formGroup" | "single";
  className?: string;
  required?: boolean;
  showLabel?: boolean;
  inputFieldClassName?: string;
  icon?: LucideIcon;
  labelClassName?: string;
  rows?: number;
} & React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;

const inputFieldVariants = cva("form-group", {
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

export default function RHFInput<T extends FieldValues>({
  name,
  label,
  placeholder,
  required = false,
  variant,
  className,
  showLabel = true,
  type = "text",
  inputFieldClassName,
  icon: Icon,
  labelClassName,
  rows = 5,
  ...props
}: Props<T>) {
  const { control } = useFormContext();
  const inputId = `input-${name}`;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(inputFieldVariants({ variant, className }))}>
          {showLabel && (
            <FormLabel
              htmlFor={inputId}
              className={cn(
                "text-primary! font-medium dark:text-white!",
                labelClassName,
              )}
            >
              <span>
                {label}
                {required && <span className="text-red-500">*</span>}
              </span>
            </FormLabel>
          )}
          <FormControl>
            <div className="relative">
              {type === "textarea" ? (
                <Textarea
                  id={inputId}
                  placeholder={placeholder}
                  rows={rows}
                  {...field}
                  {...props}
                  className={cn(
                    "focus-visible:border-primary focus-visible:ring-primary-200 min-h-10 text-sm focus-visible:ring-1 dark:bg-gray-800 dark:text-white",
                    Icon && "pl-10",
                    inputFieldClassName,
                  )}
                />
              ) : (
                <Input
                  id={inputId}
                  placeholder={placeholder}
                  type={type}
                  {...field}
                  {...props}
                  className={cn(
                    "focus-visible:border-primary focus-visible:ring-primary-200 h-10 text-sm focus-visible:ring-1 dark:bg-gray-800 dark:text-white",
                    Icon && "pl-10",
                    inputFieldClassName,
                  )}
                />
              )}

              {Icon && (
                <Icon className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
              )}
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
