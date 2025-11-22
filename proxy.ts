import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Helper function to check if the path is not accessible to logged-in users
const isLoggedInUserRestrictedPath = (pathname: string) => {
  return (
    pathname === "/sign-in" ||
    pathname === "/register" ||
    pathname === "/reset-password" ||
    pathname === "/verify-email"
  );
};

// Helper function to handle redirection
const redirectTo = (url: string, request: NextRequest) => {
  return NextResponse.redirect(new URL(url, request.url));
};

export async function middleware(request: NextRequest) {
  const authToken = await getToken({ req: request });
  const { pathname } = request.nextUrl;
  // If the user is logged in and tries to access restricted paths
  if (isLoggedInUserRestrictedPath(pathname)) {
    if (authToken) {
      return redirectTo("/", request);
    }
  }

  //   If trying to access any other restricted paths without being logged in
  if (!authToken && pathname.startsWith("/my-account")) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }
}

export const config = {
  matcher: ["/sign-in", "/register", "/my-account/:path*", "/dashboard/:path"],
};
