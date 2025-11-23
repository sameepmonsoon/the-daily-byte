import React from "react";

import { cn } from "@/lib/utils";

interface LoadingContainerProps {
  loading: boolean;
  className?: string;
  props?: Record<string, unknown>;
}

export default function LoadingContainer({
  loading = false,
  children,
  className = "",
  props = {},
}: React.PropsWithChildren<LoadingContainerProps>) {
  return (
    <div
      className={cn(
        "relative",
        { "pointer-events-none opacity-50": loading },
        className,
      )}
      {...props}
    >
      {loading && (
        <div className="absolute top-0 z-50 flex h-full w-full items-center justify-center">
          {/* <Spinner className="h-10 w-10 " /> */}
          <svg
            className="text-brand-primary absolute mr-3 -ml-1 h-8 w-8 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-50"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-100"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}
      {children}
    </div>
  );
}
