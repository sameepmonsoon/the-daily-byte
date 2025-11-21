import { Book, Home, Library, Sofa } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

// This page renders when a route like "/unknown" is requested.

const GlobalNotFound = () => {
  return (
    <main className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100/50 py-20 md:py-52">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-12">
          <h1 className="text-primary animate-bounce-in mb-6 text-8xl font-bold md:text-9xl">
            404
          </h1>
          <h2 className="text-foreground mb-4 text-4xl font-bold text-balance md:text-5xl">
            Oops! Page Not Found
          </h2>
          <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-pretty">
            It seems we can&apos;t find the page you&apos;re looking for. But
            don&apos;t worry, there&apos;s plenty more beautiful furniture to
            discover!
          </p>
        </div>
        <div className="mb-12">
          <div className="to-primary/10 mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-linear-to-br from-[#e3fff3]/10">
            <Library className="text-primary h-16 w-16" />
          </div>
          <div className="from-primary mx-auto h-1 w-24 rounded-full bg-linear-to-r to-[#e3fff1]"></div>
        </div>
        <div className="flex items-center justify-center">
          <Button
            asChild
            className="bg-primary hover:bg-primary/90 text-primary-foreground h-14 rounded-lg"
          >
            <Link href="/" className="flex cursor-pointer items-center gap-2">
              <Home className="h-5 w-5" />
              Back to Home
            </Link>
          </Button>
        </div>
        {/* Background Gradient Effect */}
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_center,_#06d9bdc5_0%,_transparent_70%)] opacity-20" />
      </div>
    </main>
  );
};

export default GlobalNotFound;
