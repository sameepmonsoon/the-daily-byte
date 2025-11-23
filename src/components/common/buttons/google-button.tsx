"use client";
import { motion } from "framer-motion";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function GoogleButton({
  label,
  currentUrl,
  className,
}: {
  label: string;
  currentUrl?: string;
  className?: string;
}) {
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      className={cn("flex w-full justify-center", className)}
    >
      <Button
        variant="outline"
        className="dark:bg-primary flex h-12 w-full max-w-xs items-center justify-center gap-2.5 border-gray-200 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-white"
      >
        <Image
          className="h-4.5 w-4.5"
          src={`/icons/google-icon.svg`}
          alt="ggl"
          height={16}
          width={16}
        />
        {label}
      </Button>
    </motion.div>
  );
}

export default GoogleButton;
