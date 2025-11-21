import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function updateURLParams(currentParams: URLSearchParams, newParams: Record<string, string>): string {
  const updatedParams = new URLSearchParams(currentParams.toString());
  Object.entries(newParams).forEach(([key, value]) => {
    updatedParams.set(key, value);
  });
  return `?${updatedParams.toString()}`;
}
