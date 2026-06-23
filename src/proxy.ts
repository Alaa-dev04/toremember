import { UserTypes } from "./constants/auth.ct";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { parse } from "regexparam";

import {
  AUTH_PAGES,
  HOMEPAGE_ROLE_ROUTE,
  ROUTE_ROLE_MAP,
  FORBIDDEN,
} from "./constants/routes.ct";

export default withAuth(
  async (req) => {
    const { pathname } = req.nextUrl;

    // 1. Get session (JWT)
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // 2. Find required roles for this route
    const reqroles = (
      Object.entries(ROUTE_ROLE_MAP) as [string, UserTypes[]][]
    ).find(([path]) => {
      const regex = parse(path);

      if (path === "/") return pathname === "/";

      return regex.pattern.test(pathname);
    })?.[1];

    // 3. If user is logged in but visiting auth pages → redirect to homepage
    if (token && AUTH_PAGES.includes(pathname)) {
      const homepage =
        HOMEPAGE_ROLE_ROUTE[token?.role as UserTypes] || "/dashboard";

      return NextResponse.redirect(new URL(homepage, req.url));
    }

    // 4. If NOT logged in but route is protected → login
    if (!token && reqroles?.length) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // 5. If logged in but role not allowed → forbidden
    if (
      reqroles?.length &&
      token?.role &&
      !reqroles.includes(token?.role as UserTypes)
    ) {
      return NextResponse.redirect(new URL(FORBIDDEN as any, req.url));
    }

    // 6. Allow request
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true,
    },
  },
);
// 7. Apply middleware to all routes except system files
export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
