import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ButtonLoader from "@/components/skeleton/button-loader";

export default function SubmitFormButton({
  className,
  isSubmitting,
  submittingText,
  btnText,
  disabled,
  showArrow = false,
}: {
  className?: string;
  isSubmitting: boolean;
  submittingText: string;
  btnText: string;
  disabled?: boolean;
  showArrow?: boolean;
}) {
  return (
    <Button
      disabled={isSubmitting || disabled}
      type="submit"
      className={cn(
        "bg-primary group h-12 w-full cursor-pointer font-semibold text-white shadow-lg transition-all duration-200 hover:from-amber-600 hover:to-orange-600 hover:shadow-xl",
        className,
      )}
    >
      <div className="flex items-center space-x-2">
        {isSubmitting && <ButtonLoader />}
        <span>{isSubmitting ? submittingText : btnText}</span>
        {showArrow && !isSubmitting && (
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        )}
      </div>
    </Button>
  );
}
