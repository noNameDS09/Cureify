import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getTokenFromRequest } from "./utils/auth";

export default clerkMiddleware();

const protectedRoutes = [
    "/dashboard",
    // Add more protected routes here
];

// Helper function to check if a path is protected
function isProtectedRoute(path: string): boolean {
    return protectedRoutes.some((route) => path.startsWith(route));
}

export async function middleware(request: NextRequest) {

  return NextResponse.next();

}

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
        // "/"
    ],
};
