// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    console.log("Middleware running for:", req.nextUrl.pathname); // Debug
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log("Token:", token); // Debug
        return !!token; // true if logged in
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"], // Protect all /admin routes
};