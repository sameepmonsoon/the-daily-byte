"use client";;
import { cva } from "class-variance-authority";
import { FieldValues, Path, useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props<T extends FieldValues> = {
  name: Path<T>;
  formLabel: string;
  placeholder: string;
  variant?: "default" | "formGroup" | "single";
  className?: string;
  required?: boolean;
  selectItems?: {
    id: string;
    name: string;
  }[];
  disabled?: boolean;
  inputFieldClassName?: string;
};

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

export default function RHFSelect<T extends FieldValues>({
  name,
  formLabel,
  placeholder,
  required = false,
  variant,
  className,
  selectItems,
  inputFieldClassName,
  disabled,
}: Props<T>) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className={cn(inputFieldVariants({ variant, className }))}>
            <FormLabel className="text-base font-medium !text-black">
              <span>
                {formLabel}
                {required && <span className="text-red-500">*</span>}
              </span>
            </FormLabel>
            <Select
              disabled={disabled}
              onValueChange={field.onChange}
              value={field?.value?.toString()}
            >
              <FormControl>
                <SelectTrigger
                  className={cn(
                    "w-full cursor-pointer text-sm font-medium",
                    inputFieldClassName,
                  )}
                >
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>

              <SelectContent>
                <SelectGroup>
                  {selectItems?.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
