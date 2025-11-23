import { cn } from "@/lib/utils";

export default function FormLoader({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-muted/60 absolute top-0 right-0 bottom-0 left-0 z-[50] flex h-full w-full items-center justify-center transition-all duration-200 ease-in-out",
        className,
      )}
    >
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-4 border-red-600 border-t-transparent"></div>
    </div>
  );
}
