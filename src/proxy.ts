import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const publicRoutes = ["/login", "/register"];
const defaultAuthenticatedRoute = "/dashboard";

export async function proxy(req: NextRequest) {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const { pathname } = req.nextUrl;

    console.log(pathname)

    const isLoggedIn = !!token;
    const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

    if (isLoggedIn && isPublicRoute) {
        return NextResponse.redirect(
            new URL(defaultAuthenticatedRoute, req.url)
        );
    }

    if (!isLoggedIn && !isPublicRoute) {
        return NextResponse.redirect(
            new URL("/login", req.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    ],
};