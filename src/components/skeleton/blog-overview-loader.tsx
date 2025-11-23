import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogOverViewSkeleton() {
  return (
    <div className="mb-4 h-full space-y-6 md:block">
      <div className="space-y-0.5">
        <div className="mb-5 w-full">
          <div className="flex items-center justify-between gap-5">
            <div>
              <Skeleton className="h-6 w-52 font-medium dark:text-white" />
              <Skeleton className="text-muted-foreground mt-1.5 h-4 w-96" />
            </div>
          </div>

          <Separator className="mt-5" />
        </div>
      </div>
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
        {/* <aside className="-mx-4 lg:w-56 no-print">
          <div className="space-y-1 w-full lg:max-w-[240px] flex lg:flex-col gap-5 lg:gap-1 flex-wrap justify-evenly">
            {skeletonItems.map((item, index) => (
              <Skeleton
                key={index}
                className={item.className}
              />
            ))}
          </div>
        </aside> */}

        <div className="flex-1 rounded-xl border p-5 lg:max-w-7xl">
          <div className="space-y-6 overflow-hidden">
            {/* Title and Badge Skeleton */}
            <div className="space-y-4">
              <Skeleton className="h-8 w-48 animate-pulse rounded-md" />
              <Skeleton className="h-6 w-32 animate-pulse rounded-full" />
            </div>
            {/* Main Image Skeleton */}{" "}
            <div className="grid gap-6 xl:grid-cols-2">
              <Skeleton className="aspect-video w-full animate-pulse rounded-lg" />
              {/* Duration */}
              <div className="flex w-full gap-4">
                <div className="w-full space-y-4 rounded-lg border p-6">
                  {/* Branch */}
                  <div className="flex gap-4">
                    <Skeleton className="h-5 w-5 animate-pulse rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24 animate-pulse rounded" />
                      <Skeleton className="h-3 w-56 animate-pulse rounded" />
                      <Skeleton className="h-3 w-52 animate-pulse rounded" />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex gap-4">
                    <Skeleton className="h-5 w-5 animate-pulse rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32 animate-pulse rounded" />
                      <Skeleton className="h-3 w-40 animate-pulse rounded" />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex gap-4">
                    <Skeleton className="h-5 w-5 animate-pulse rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32 animate-pulse rounded" />
                      <Skeleton className="h-3 w-40 animate-pulse rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Event Details Grid */}
            <div className="grid grid-cols-1 gap-6">
              {/* Left Column - Event Info */}

              {/* Right Column - About & More */}
              <div className="space-y-6">
                {/* About Section */}
                <div className="rounded-lg border p-6">
                  <Skeleton className="mb-4 h-6 w-40 animate-pulse rounded" />
                  <Skeleton className="h-4 w-full animate-pulse rounded" />
                </div>

                {/* More Section */}
                <div className="rounded-lg border p-6">
                  <Skeleton className="mb-4 h-6 w-44 animate-pulse rounded" />
                  <Skeleton className="h-4 w-full animate-pulse rounded" />
                </div>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex gap-4">
              <Skeleton className="h-9 w-24 animate-pulse rounded-lg" />
              <Skeleton className="h-9 w-24 animate-pulse rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
