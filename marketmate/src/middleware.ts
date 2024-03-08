import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res });

  // Verify if there is an authenticated Supabase user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Refresh session if expired - required for Server Components
  await supabase.auth.getSession();

  // If user is not signed in and is trying to get to /vendor, then redirect the user to /login
  if (!user && req.nextUrl.pathname.includes("/vendor")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If user is signed in and is trying to get to /login or /signup, then redirect the user to /
  if (user && (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/signup")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/", "/vendor/:path*"],
};
