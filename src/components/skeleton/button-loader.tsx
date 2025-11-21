import { cn } from "@/lib/utils";

export default function ButtonLoader({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "mr-2 inline-block h-3 w-3 animate-spin rounded-full border-[3px] border-current border-t-transparent text-white",
        className,
      )}
      role="status"
      aria-label="loading"
    ></span>
  );
}
